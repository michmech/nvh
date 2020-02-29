---
title: Welcome to Name-Value Hierarchy
---

**Welcome!** This website provides documentation for Name-Value Hierarchy, a lightweight markup language intended mainly (but certainly not only) for encoding dictionary entries in lexicography. NVH is a less verbose alternative to XML, to JSON, or to pretty much any serialization language you can think of. To give you a taste, here is what a dictionary entry might look like when encoded in NVH:

```
headword: bank
  partOfSpeech: noun
  definition: an institution where you store or borrow money
    translation: банка
    example: I got a large loan from the bank.|
      translation: Я получил крупный кредит в банке.
  definition: a stretch of land along a river
    translation: берег
    example: The house is on the north bank of the river.
      translation: Дом находится на северном берегу реки.
```

Curious for more? The following documents will explain what it's all about.

- **[An informal introduction to NVH](intro.md)**: Read this first to understand why NVH exists and how it compares to other serialization languages such as XML and JSON.

- **[The patterns of XML (ab)use in lexicography](patterns.md)**: Are you not entirely convinced that NVH solves a problem which needs to be solved? Then read this for a detailed analysis of how the use of XML in dictionaries leads to difficulties with excessive structural markup, and how NVH solves those difficulties.

- **[The NVH specification](spec.md)**: A formal specification of the NVH serialization language. Read this if you want to write your own NVH parser or some other tool. (More accurately, this specification describes the *base* of NVH – more about that later.)

## Base and extensions

The documents above have described what we call the *base* of NVH. In addition to the base, the NVH spefification comes with a couple of optional *extensions*. Each extension enriches NVH with additional features which cater to specific encoding patterns that occur in lexicography often enough to warrant special treatment.

 - **[The *multiname* extension](multiname.md)** allows element names in NVH to consist of several dot-separated *subnames*:  
  ```
  translation.ru: берег
  translation.de: Ufer
  translation.cs: břeh
  translation.ga: bruach
  ```

- **[The *multivalue* extension](multivalue.md)** allows elements in NVH to contain multiple values, and for each value to have its own child elements:  
```
headword:
  - colour
      region: ireland
      region: britain
  - color
      region: north-america
```

- **[The *inline* extension](inline.md)** enriches NVH with short-hand syntax for inline markup.  
```
example: House {prices} are rising.
  highlight: {prices}
    lemma: price
    partOfSpeech: noun
```

The extensions are optional in the sense that a parser (or any other tool you have built) may or may not support the extension, depending on whether it is needed. The base of NVH is brutally simple and writing a parser for it is trivial, which is indeed one of the strengths of NVH. The extensions introduce additional complexity which you may or may not need, depending on what you want to do with NVH. Either way, if you have written an NVH parser or some other tool, it is a good practice to state explicitly whether it supports any extensions, and which ones. The reference parsers of NVH which we have produced in JavaScript and C# (see below) support all extensions.

All extensions are **base-compatible**: if you have NVH-encoded data which makes use of an extension and if you parse it with a parser which doesn't support that extension, the data will still be valid and will be parsed successfully. For example, the *multiname* extension is base-compatible: a base-only parse will not "see" the subnames inside the names, but other than thay it will parse everything without trouble. However, if you are making NVH-encoded data available and if the data relies on an NVH extension in order to be understood correctly, it is a good practice to say so explicitly. And if you have received NVH data where you are not sure which extensions it needs, it's probably safer to parse it with a parser that supports all extensions.
