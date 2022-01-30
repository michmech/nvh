# NVH schema

An NVH schema is itself in the NVH format. It is very simple and best explained in an example:

```
hw: +
    lemma: ?
    pos: ?
    freq: ?
    comment: *
    form: *
        flag:
```

It uses the Kleene star (\*), Kleene plus (+) and question mark. A Kleene star makes a node optional and repeatable (zero to infinite repetitions), a Kleene plus makes an element obligatory and repeatable (one to infinite repetitions), a question mark makes an element optional but not repeatable (zero or one repetition). The above example may contain one ore more `hw` elements, each of which optionally contains a `lemma`, `pos` or `freq`, and any number of `comment` and `form`, which itself always must contain a single `flag`.
