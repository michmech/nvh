---
title: Welcome to NVH
---

**Warning: this is work in early stages of progress.**

This website gives information about Name-Value Hierarchy (NVH), a lightweight markup language intended for encoding dictionary entries in lexicography. NVH is a less verbose alternative to XML. To give you a taste, here is what a dictionary entry might look like when encoded in NVH:

```
headword: bank
  partOfSpeech: noun
  definition: an institution where you store or borrow money
    translation: банка
    example: I got a large loan from the bank.
      translation: Я получил крупный кредит в банке.
  definition: a stretch of land along a river
    translation: берег
    example: The house is on the north bank of the river.
      translation: Дом находится на северном берегу реки.
```

Compare it to what the same entry might look like when encoded in XML:

```
<entry>
  <headword>bank</headword>
  <partOfSpeech>noun</partOfSpeech>
  <sense>
    <definition>an institution where you store or borrow money</definition>
    <translation>банка</translation>
    <exampleContainer>
      <example>I got a large loan from the bank.</example>
      <translation>Я получил крупный кредит в банке.</translation>
    </exampleContainer>
  </sense>
  <sense>
    <definition>a stretch of land along a river</definition>
    <translation>берег</translation>
    <exampleContainer>
      <example>The house is on the north bank of the river.</example>
      <translation>Дом находится на северном берегу реки.</translation>
    </exampleContainer>
  </sense>
</entry>
```

You will probably agree that the NVH version is shorter and less verbose than the XML version. NVH can do anything XML can do, but with fewer lines of code and with less technical syntax. NVH is easier for humans to read and write than XML, but retains all of XML's expressivity and machine-readability.

Curious for more? Then read the following documents to understand why NVH exists and how it compares to other serialization languages such as XML and JSON:

- **[An informal introduction to NVH »](intro-to-nvh.md)**

NVH comes with its own schema language for constrainig the structure of an NVH tree:


- **[An informal introduction to NVH Schema »](intro-to-nvh-schema.md)**

And, last but not least, NVH comes with its own stylesheet language for pretty-printing an NVH tree into human-readable HTML or into any other document markup language (and yes, even into XML):

- **[An informal introduction to NVH Stylesheets »](intro-to-nvh-stylesheets.md)**


## NVH compared to XML

If you are not entirely convinced that NVH solves a problem which needs to be solved, then we recommend these long reads.

- **[On the use and abuse of XML in lexicography](critique-xml.md)**  A detailed analysis of how the use of XML in dictionaries leads to difficulties with excessive structural markup, and how NVH solves those difficulties.

- **[On some frequent problems with entry schemas and entry stylesheets in lexicography](critique-schemas-stylesheets.md)** Like NVH itself, NVH Schema and NVH Stylesheets are optimized for the needs of lexicography: they make it easy to express the things that often need to be expressed when working with dictionary entries. This document explains what those things are and how those things are sometimes unnecessarily difficult to express in conventional XML-based schema formalisms and stylesheet formalisms such as DTD, RelaxNG and XSLT.


## Specifications

The following are formal specifications of the NVH language, the NVH Schema language, and the NVH Stylesheet language. Read these if you want to write your own parser, validator, or some other tool.

- **[NVH specification »](spec-nvh.md)**
- **[NVH Schema specification »](spec-nvh-schema.md)**
- **[NVH Stylesheets specification »](spec-nvh-stylesheets.md)**
- **[NVH Lookups specification »](spec-nvh-lookups.md)**


## Tools

We have parsers and other libraries for NVH in **JavaScript** and **[Python »](python/python.md)**.

- **[NVH Parser/Serializer](nvh-parser.md)** is a library which converts NVH trees between a plain-text serialization and an in-memory object model. Also, it checks NVH trees for well-formedness and emits user-friendly error messages when the tree is not well-formed.

- **[NVH Traverser](nvh-traverser.md)** is a library for programmer-friendly querying, traversing and manipulating of NVH trees. What XPath is for XML and jQuery is for HTML, the Traverser is for NVH.

- **[NVH Schemer](nvh-schemer.md)** is a library for parsing NVH Schemas and for validating NVH trees against them. If the tree is not valid, Schemer emits user-friendly error messages.

- **[NVH Styler](nvh-styler.md)** is a library for parsing NVH Stylesheets and for applying them onto NVH trees in order to produce human-friendly dictionary entries in HTML or in any other document markup language.


## Who uses NVH

[Lexical Computing](https://www.lexicalcomputing.com) uses NVH internally and in the [Lexonomy](https://www.lexonomy.eu) dictionary editor as well as [Sketch Engine](https://www.sketchengine.eu) corpus management software.
