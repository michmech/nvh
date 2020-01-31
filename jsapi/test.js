const NVH=require("./nvh.js");

var input=`
headword: můstek
  partOfSpeech: podstatné jméno
  property: rod mužský neživotný
  definition: most
    label: zdrob.
    example: Přecházejte přes potok opatrně – můstek je úzký a chybí mu zábradlí.
    translations:
      de: Steg
      en: small bridge
  definition: stavba určená pro sportovní skoky (na lyžích, do vody aj.)
    example: Díky dokonalému odrazu z můstku zvládl skokan trojné salto bezchybně.
    translations:
      de: Sprungbrett
      de: Sprungschanze
      en: ski jump
      en: spring board
`;

var trees=NVH.parseMany(input);
console.log(NVH.serializeMany(trees));
