# Name-Value Hierarchy (NVH)

**Warning: this is work in early stages of progress.**

NVH is a lightweight markup language, intended mainly (but certainly not only) for encoding dictionary entries in lexicography. NVH is a less verbose alternative to XML. This is what a dictionary entry might look like when encoded in NVH:

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

Like in XML, a document in NVH is a basically a tree-structured hierarchy of elements. In our example, this is the top-level element:

```
headword: bank
```

Each element in NVH consists of three things: a name (`headword`), a plain-text value (`bank`) and a list of child elements. The parent-child relation is indicated through indentation at the beginning of the lines:

```
headword: bank
  partOfSpeech: noun
  definition: an institution where you store or borrow money
  definition: a stretch of land along a river
```

In our example here, the top-level element has three child elements. Each child element can have child elements of its own, and this creates the tree structure:

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

Yes, but XML is a tree-structured hierarchy of elements too, you might say. So how exactly is NVH different from XML? In XML, each element consists of two things: a name and a value, where the value can be a plain-text string or a list of child elements. In NVH, on the other hand, an element consists of not two but three things: a name, a plain-text value, and a list of child elements. Where an XML element is a pair of two things, a NVH element is an triple of three things.

Thanks to this, almost any tree structure will end up looking "flatter" in NVH than in XML. This property of NVH allows us to encode data with less verbosity than XML – which is particularly useful for the kinds of data we typically work with in lexicography. This property of NVH is also what gives NVH its name: an NVH tree structure is a hierarchy of name-and-value pairs: a *Name-Value Hierarchy*.

In addition, NVH says good-bye to a few other things that make XML difficult to write for humans: there are no angle brackets (`<` and `>`) and there are no closing tags to match with opening tags (like `<example>...</example>`). The parent-child relation is indicated through indentation and whitespace, an idea borrowed from other computer languages (namely YAML and Python).
