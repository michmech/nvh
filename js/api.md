## An NVH element

```
DONE el.setText("sourcedode...") -> null
DONE el.getText() -> "sourcedode..."

DONE el.name --> "..."
DONE el.value --> "..."

DONE el._parent
DONE el._children

el.getParent() --> el | null
el.getPreviousSibling(?sel) --> el | null
el.getNextSibling(?sel) --> el | null

el.getAncestors(?sel) --> [el]
el.getClosestAncestor(?sel) -> el | null
el.getTopAncestor() -> el | null

el.hasChildren(?sel) -> true|false
DONE el.clearChildren()

el.getChildren(?sel) -> [el]
el.getFirstChild(?sel) -> el | null
el.getLastChild(?sel) -> el | null

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
