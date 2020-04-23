/*
  A JavaScript parser, serializer and object model for NVHs (Name-Value Hierarchies).
  https://github.com/michmech/nvh
  Author: Michal Měchura, michmech@lexiconista.com
  This code is under the MIT License.
*/

const NVH={

  //The constructor of an NVH element. Call it with or without `new`.
  //`name`: a string, required
  //`value`: a string, optional, default: an empty string
  Element: function(name, value){
    var elm={

      //My three basic properties:
      name: name, value: value || "", children: [],

      //Who is my parent? If I am the top-level element then this is `null`.
      //Note: If you've just added me to a parent manually, you need to call a `reparent`
      //method on my parent in order to keep my `parent` property up-to-date.
      parent: null,

      //Tell my children that I am their parent:
      reparentChildren: function(){
        this.children.map(child => {child.parent=this;});
      },
      //Tell all my descendants who their parents are:
      reparentDescendants: function(){
        this.reparentChildren();
        this.children.map(child => {child.reparentDescendants()});
      },
      //Tell me that I am the top-level element and tell all my descendants who their parents are:
      reparentFromTop: function(){
        this.parent=null;
        this.reparentDescendants();
      },

      //Returns an array of my child elements, in document order.
      //`name`: only return children having this name, default `null` or empty string means all children
      //        can be many pipe-delimited names: "definition|gloss"
      //The optional `max` argument says how many elements you want at most, default `null` means unlimited.
      getChildren: function(name, max){
        var names=[];
        if(name) name.split("|").map(x => { if(x!="") names.push(x); });
        var ret=[];
        this.children.map(el => {
          if(!max || ret.length<max) {
            if(names.length==0 || names.indexOf(el.name)>-1) ret.push(el);
          }
        });
        return ret;
      },

      //Returns an array of my child elements, in document order.
      //`name`: only return children *not* having this name, default `null` or empty string means all children
      //        can be many pipe-delimited names: "definition|gloss"
      //The optional `max` argument says how many elements you want at most, default `null` means unlimited.
      getChildrenOtherThan: function(name, max){
        var names=[];
        if(name) name.split("|").map(x => { if(x!="") names.push(x); });
        var ret=[];
        this.children.map(el => {
          if(!max || ret.length<max) {
            if(names.length==0 || names.indexOf(el.name)==-1) ret.push(el);
          }
        });
        return ret;
      },

      //Returns an array of my descendant elements, in document order.
      //`name`: only return children having this name, default `null` or empty string means all children
      //        can be many pipe-delimited names: "definition|gloss"
      //The optional `max` argument says how many elements you want at most, default `null` means unlimited.
      getDescendants: function(name, max){
        var names=[];
        if(name) name.split("|").map(x => { if(x!="") names.push(x); });
        var ret=[];
        this.children.map(el => {
          if(!max || ret.length<max) {
            if(names.length==0 || names.indexOf(el.name)>-1) ret.push(el);
            ret=ret.concat(el.getDescendants(name, max-ret.length));
          }
        });
        return ret;
      },

      //Returns an array of my descendant elements, in document order.
      //`name`: only return children *not* having this name, default `null` or empty string means all children
      //        can be many pipe-delimited names: "definition|gloss"
      //The optional `max` argument says how many elements you want at most, default `null` means unlimited.
      getDescendantsOtherThan: function(name, max){
        var names=[];
        if(name) name.split("|").map(x => { if(x!="") names.push(x); });
        var ret=[];
        this.children.map(el => {
          if(!max || ret.length<max) {
            if(names.length==0 || names.indexOf(el.name)==-1) ret.push(el);
            ret=ret.concat(el.getDescendants(name, max-ret.length));
          }
        });
        return ret;
      },

    };
    return elm;
  },

  //Parses `input` into an NVH tree, returns the top element.
  //The `input` can be a (multi-line) string or an array of lines.
  //If `input` parses into more than one tree, only the first one is returnd.
  //If `input` parses into zero trees, then the optional argument `ifNull` is retuned, default `null`.
  parse: function(input, ifNull){
    var trees=NVH.parseMany(input, 1);
    return trees.length>0 ? trees[0] : (ifNull || null);
  },

  //Parses `input` into zero, one or more NVH trees, returns an array of their top elements.
  //The `input` can be a (multi-line) string or an array of lines.
  //The optional `max` argument says how many trees you want at most, default `null` means unlimited.
  parseMany: function(input, max){
    //Turn the input into an array lines, if it isn't one already:
    if(typeof(input)=="string") input=input.replace(/\r/g, "").split("\n");
    //Prepare variables to use during parsing:
    var trees=[];
    var ancestors=[];
    var maxExceeded=false;
    var topLevel=0;
    //OK, let's go line by line:
    input.map((line, iLine) => {
      if(!maxExceeded){
        //Any lines that don't look like NVH elements will be ignored:
        line.replace(/^([ \t]*)([^:]+):(.*)$/, function($0, whitespace, name, value){
          var element=new NVH.Element(name.trim(), value.trim(), []);
          //Clean up whitespace, detemine indentation level:
          whitespace=whitespace.replace(/\t/g, "  ");
          if(whitespace.length%2!=0) whitespace+=" ";
          var level=whitespace.length/2;
          //If this is the first line of the first tree, then its level is the top level:
          if(trees.length==0) topLevel=level;
          //If this is a top-level element:
          if(level<=topLevel) {
            topLevel=level;
            if(trees.length>=max) maxExceeded=true; else {
              //Add this top-level element as another tree:
              trees.push(element);
              ancestors=[];
              ancestors[topLevel]=element;
            }
          }
          //If this is not a top-level element:
          else {
            //Make sure there exists a parent one step above this level:
            while(!ancestors[level-1] && level>topLevel) level--;
            //Add this element to its parent as a child:
            ancestors[level-1].children.push(element);
            ancestors[level]=element;
          }
        });
      }
    });
    //Done:
    trees.map(tree => {tree.reparentFromTop();});
    return trees;
  },

  //Serializes the `element` and its children into plain text, returns a string.
  //The optional argument `level` says which indentation level you want to use on the top element, default 0.
  //The optional argument `separateLevel` is the indentation level before which you want an empty line; default 0 meaning none
  serialize: function(element, level, separateLevel){
    var level=level || 0;
    var ret="";
    if(level>0 && level==separateLevel) ret+="\n";
    var whitespace=""; for(var i=0; i<level; i++) whitespace+="  ";
    ret+=`${whitespace}${element.name}: ${element.value}`.trimRight()+"\n";
    element.children.map(child => {
      ret+=NVH.serialize(child, level+1, separateLevel);
    });
    return ret;
  },

  //Serializes an array of `elements` and their children into plain text, returns a string.
  //The optional argument `level` says which indentation level you want to use on the top elements, default 0.
  //The optional argument `separate` says whether you want empty lines between the elements, default `false`.
  serializeMany: function(elements, level, separate){
    return elements.map(element => NVH.serialize(element, level)).join(separate ? "\n" : "");
  },

};

//Try to make myself available as a Node.js module:
try{ module.exports=NVH; } catch(err){}
