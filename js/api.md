## An NVH element

```
DONE el.setText("sourcedode...") -> null
DONE el.getText() -> "sourcedode..."

DONE el.name --> "..."
DONE el.value --> "..."

DONE el._parent
DONE el._children

DONE el.getParent() --> el | null
DONE el.getPreviousSibling(?sel) --> el | null
DONE el.getNextSibling(?sel) --> el | null

DONE el.getAncestors(?sel) --> [el]
el.getClosestAncestor(?sel) -> el | null
DONE el.getTopAncestor() -> el | null

DONE el.hasChildren(?sel) -> true|false
DONE el.clearChildren()

DONE el.getChildren(?sel) -> [el]
DONE el.getFirstChild(?sel) -> el | null
DONE el.getLastChild(?sel) -> el | null

el.getDescendants(?sel) -> [el]
el.getFirstDescendant(?sel) -> el | null

DONE el.prependChild[ern](el | [el] | "sourcecode...")
DONE el.appendChild[ern](el | [el] | "sourcecode...")

el.insertSibling[s]Before(el | [el] | "sourcecode...")
el.insertSibling[s]After(el | [el] | "sourcecode...")

DONE el.removeFromParent()
el.replaceWith(el | [el] | "sourcecode...")

el.clone() -> el

```

## Selector `?sel`

either:
	argument one: the element name
		- a string, or
		- a regular expression
	argument two: the element value
		- a string, or
		- a regular expression
or:
	the only argument: a function which
		- takes an element
		- returns true or false

PLUS:
	- negatives (not these names)
	- paths?
