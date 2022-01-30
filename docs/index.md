---
title: Welcome to NVH
---

**Warning: this is work in early stages of progress.**

Name-Value Hierarchy (NVH) is a lightweight markup language intended for encoding dictionary entries in lexicography. NVH is a less verbose alternative to XML. To give you a taste, here is what a dictionary entry might look like when encoded in NVH:

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

You will probably agree that the NVH version is shorter and less verbose than the XML version. NVH can do anything XML can do, but with fewer lines of code and with less syntax. NVH is easier for humans to read and write than XML, but retains all of XML's expressivity and machine-readability. Curious for more? Then read our **[informal introduction to NVH](intro-to-nvh.md)** to understand why NVH exists and how it compares to other serialization languages such as XML and JSON.

## NVH Schema

NVH comes with its own **[schema language](schema.md)** for constraining the structure of an NVH tree.

## Tools for working with NVH

We are developing parsers and other libraries for NVH
in **[JavaScript](https://github.com/michmech/nvh/tree/master/js)**
and **[Python](https://github.com/michmech/nvh/tree/master/python/python.md)**.

## Contributors

NVH is being developed by computational lexicographers
at [Lexical Computing](https://www.lexicalcomputing.com)
and at [Masaryk University](https://www.muni.cz/)'s
[Natural Language Processing Centre](https://nlp.fi.muni.cz/).

The idea for NVH originates from **[Michal Měchura](http://www.lexiconista.com/)**.
Other contributors are **Miloš Jakubíček**, **Vojtěch Kovář**, **Marek Medveď**, **Jan Michelfeit** and **Marek Blahuš**.

## Who uses NVH

[Lexical Computing](https://www.lexicalcomputing.com) uses NVH internally, in the [Lexonomy](https://www.lexonomy.eu) dictionary editor, and in the [Sketch Engine](https://www.sketchengine.eu) corpus management software.
