/*
  A JavaScript parser, serializer and object model for NVH (Name-Value Hierarchies).
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
      //My name. Must be a string.
      name: name,

      //My value. Must be a string.
      value: value || "",

      //Internal data, not part of the API, do not mess with these.
      _children: [],
      _parent: null,

      //Reparse me from this NVH source code.
      //If the source code parses into more than one top-level element, only the first one is taken.
      setText: function(text){
        var el=NVH.parse(text);
        if(el){
          this.name=el.name;
          this.value=el.value;
          this.setChildren(el._children);
        }
      },

      //Serialize me into NVH source code.
      getText: function(){
        return NVH.serialize(this);
      },

      //Returns my parent element.
      //If I don't have a parent, then returns null.
      getParent: function(){
        return this._parent;
      },

      //Tells you whether I have children. Returns true or false.
      hasChildren: function(){
        return this_children.length>0;
      },

      //Returns (a copy of) an array of my children.
      getChildren: function(){
        return this._children.map(x => x);
      },

      //Returns my first child.
      //If I don't have children, then returns null.
      getFirstChild: function(){
        if(this._children.length>0) return this._children[0];
        return null;
      },

      //Returns my last child.
      //If I don't have children, then returns null.
      getLastChild: function(){
        if(this._children.length>0) return this._children[this._children.length-1];
        return null;
      },

      //Make it so that I am no longer my parent's child.
      removeFromParent: function(){
        if(this._parent){
          var i=this._parent._children.indexOf(this);
          if(i>-1) this._parent._children.splice(i, 1);
          this._parent=null;
        }
      },

      //Make it so that my children are no longer my children.
      clearChildren: function(){
        while(this._children.length>0) this._children[0].removeFromParent();
      },

      //Make these elements my children. Add them to the end of the list.
      //Input: NVH source code, or an array of elements, or a single element.
      appendChildren: function(children){
        NVH.parseMany(children).map(child => {
          child.removeFromParent();
          this._children.push(child);
          child._parent=this;
        });
      },

      //A synonym for `appendChildren`.
      appendChild: function(child){
        this.appendChildren(child);
      },

      //Make these elements my children. Add them to the start of the list.
      //Input: NVH source code, or an array of elements, or a single element.
      prependChildren: function(children){
        NVH.parseMany(children).slice(0).reverse().map(child => {
          child.removeFromParent();
          this._children.unshift(child);
          child._parent=this;
        });
      },

      //A synonym for `prependChildren`.
      prependChild: function(child){
        this.appendChildren(child);
      },

      //Returns my sibling who is immediately before me.
      //If I have no siblings before me, then returns null.
      getPreviousSibling: function(){
        if(this._parent){
          var i=this._parent._children.indexOf(this);
          if(i>0) return this._parent._children[i-1];
        }
        return null;
      },

      //Returns my sibling who is immediately after me.
      //If I have no siblings after me, then returns null.
      getNextSibling: function(){
        if(this._parent){
          var i=this._parent._children.indexOf(this);
          if(i<this._parent._children.length-1) return this._parent._children[i+1];
        }
        return null;
      },

      //Returns an array of my ancestors, including my parent.
      //Ordered by distance from me, closest first.
      getAncestors: function(){
        var ret=[];
        var parent=this._parent;
        while(parent) {
          ret.push(parent);
          parent=parent._parent;
        }
        return ret;
      },

      //Returns my top-most ancestor.
      //If I don't have any ancestors, returns null.
      getTopAncestor: function(){
        var parent=this._parent;
        while(parent && parent._parent) {
          parent=parent._parent;
        }
        return parent;
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
    //If it seems like the input already is parsed, return it:
    if(Array.isArray(input) &&input.length>0 && typeof(input[0])=="object") return input;
    if(typeof(input)=="object") return [input];
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
            ancestors[level-1].appendChild(element);
            ancestors[level]=element;
          }
        });
      }
    });
    //Done:
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
    element._children.map(child => {
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
