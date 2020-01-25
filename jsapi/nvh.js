/*
  A JavaScript parser, serializer and object model for NVHs (Name-Value Hierarchies).
  https://github.com/michmech/nvh
  Author: Michal Měchura, michmech@lexiconista.com
  This code is under the MIT License.
*/

const NVH={

  //Parses `input` into an NVH tree, returns the top node.
  //The `input` can be a (multi-line) string or an array of lines.
  //If `input` parses into more than one tree, only the first one is returnd.
  //If `input` parses into zero trees, then the optional argument `ifNull` is retuned, default `null`.
  parse: function(input, ifNull){
    var trees=NVH.parseMany(input, 1);
    return trees.length>0 ? trees[0] : (ifNull || null);
  },

  //Parses `input` into zero, one or more NVH trees, returns an array of their top nodes.
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
        //Any lines that don't look like nodes will be ignored:
        line.replace(/^([ \t]*)([^:]+):(.*)$/, function($0, whitespace, name, value){
          var node={name: name.trim(), value: value.trim(), children: []};
          //Clean up whitespace, detemine indentation level:
          whitespace=whitespace.replace(/\t/g, "  ");
          if(whitespace.length%2!=0) whitespace+=" ";
          var level=whitespace.length/2;
          //If this is the first line of the first tree, then its level is the top level:
          if(trees.length==0) topLevel=level;
          //If this is a top-level node:
          if(level<=topLevel) {
            topLevel=level;
            if(trees.length>=max) maxExceeded=true; else {
              //Add this top-level node as another tree:
              trees.push(node);
              ancestors=[];
              ancestors[topLevel]=node;
            }
          }
          //If this is not a top-level node:
          else {
            //Make sure there exists a parent one step above this level:
            while(!ancestors[level-1] && level>topLevel) level--;
            //Add this node to its parent as a child:
            ancestors[level-1].children.push(node);
            ancestors[level]=node;
          }
        });
      }
    });
    //Done:
    return trees;
  },

  //Serializes the `node` and its children into plain text, returns a string.
  //The optional argument `level` says which indentation level you want to use on the top node, default 0.
  serialize: function(node, level){
    var level=level || 0;
    var ret="";
    var whitespace=""; for(var i=0; i<level; i++) whitespace+="  ";
    ret+=`${whitespace}${node.name}: ${node.value}`.trimRight()+"\n";
    node.children.map(child => {
      ret+=NVH.serialize(child, level+1);
    });
    return ret;
  },

  //Serializes an array of `nodes` and their children into plain text, returns a string.
  //The optional argument `level` says which indentation level you want to use on the top nodes, default 0.
  serializeMany: function(nodes, level){
    return nodes.map(node => NVH.serialize(node, level)).join("");
  },

};

//Try to make myself available as a Node.js module:
try{ module.exports=NVH; } catch(err){}
