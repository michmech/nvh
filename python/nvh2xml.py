#!/usr/bin/python3
# Copyright (c) 2019 Lexical Computing: Marek Blahuš
#
# Permission is hereby granted, free of charge, to any person
# obtaining a copy of this software and associated documentation
# files (the "Software"), to deal in the Software without
# restriction, including without limitation the rights to use,
# copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the
# Software is furnished to do so, subject to the following
# conditions:
# 
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
# OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
# HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
# WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
# OTHER DEALINGS IN THE SOFTWARE.

# generic NVH to XML convertor, using nvh.py and exporting node value as attribute

import sys
from nvh import nvh
from xml.sax.saxutils import escape, quoteattr

def esc(text):
  return escape(text, {'"'})

def node(n, indent = 0):
  indent_str = indent * ' ';
  print('%s<%s%s%s>' % (indent_str, escape(n.name if n.name else 'dictionary'), ' v=%s' % (quoteattr(n.value)) if n.value else '', ' /' if not n.children else ''))
  for c in n.children:
    node(c, indent + 2)
  if n.children:
    print('%s</%s>' % (indent_str, escape(n.name if n.name else 'dictionary')))

print('<?xml version="1.0"?>')
the_nvh = nvh.parse_file(sys.stdin)
node(the_nvh)
