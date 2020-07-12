const NVH=require("./nvh.js");

var tree=`
headword: můstek
  pos: podstatné jméno
    property: rod mužský neživotný
  definition: most
    label: zdrob
    example: Přecházejte přes potok opatrně – můstek je úzký a chybí mu zábradlí.
    lang: de
      translation: Steg
    lang: en
      translation: small bridge
  definition: stavba určená pro sportovní skoky (na lyžích, do vody aj.)
    example: Díky dokonalému odrazu z můstku zvládl skokan trojné salto bezchybně.
    lang: de
      translation: Sprungbrett
      translation: Sprungschanze
    lang: en
      translation: ski jump
      translation: spring board
`;
var el=NVH.parse(tree);
console.log(el.getText());
console.log(el.clone().getText());

var lookups=`
$pos:
  n: podstané jméno
  adj: přídavné jméno
  v: sloveso
  adv: příslovce
$gender:
  masc: rod mužský
  fem: rod ženský
  neut: rod střední
$aspect:
  perf: dokonavý
  imperf: nedokonavý
$label:
  zdrob: zdrobnělina
  vulg: vulgarita
$lang:
  de: německy
  en: anglicky
  ru: rusky
`;

var schema=`
headword: /.+/
  [0..n] pos: $pos
    "n" [1..n] property: $gender
    "v" [1..n] propery: $aspect
  [1..n] definition: /.+/
    [0..n] label: $label
    [0..n] example: /.+/
    [0..1] lang: de @lang
    [0..1] lang: en @lang
    [0..1] lang: ru @lang

@lang:
  [1..n] translation: /.+/
`;

var style=`
headword:
  <div class="headword">
    <span class="value">{{.}}</span>
    {{pos}{, }}
    {<ol class="definitions">{definition}</ol>}
  </div>
pos:
  <span class="pos">
    {{.$pos}}{, {property}{, }}
  </span>
property:
  {{.$gender$aspect}}
definition:
  <li class="definition">
    <span class="bullet">–</span>
    <span class="value">
      {{label}}
      {{.}}
    </span>
    {{example}}
    {{lang}}
  </li>
label:
  {{.$label}}.
example:
  <div class="example">
    <span class="bullet">⋄</span>
    <span class="value">{{.}}</span>
  </div>
lang:
  <div class="lang">
    <span class="value" title="{{.$lang}}">{{.}}</span>
    {{translation}{ &middot;}}
  </div>
translation:
  <span class="translation">{{.}}</span>
`;
