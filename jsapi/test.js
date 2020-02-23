const NVH=require("./nvh.js");

var input=`
headword: můstek
  partOfSpeech: podstatné jméno
  property: rod mužský neživotný
  definition: most
    label: zdrob.
    example: Přecházejte přes potok opatrně – můstek je úzký a chybí mu zábradlí.
    translation.de: Steg
    translation.en: small bridge
  definition: stavba určená pro sportovní skoky (na lyžích, do vody aj.)
    example: Díky dokonalému odrazu z můstku zvládl skokan trojné salto bezchybně.
    translation.de: Sprungbrett
    translation.de: Sprungschanze
    translation.en: ski jump
    translation.en: spring board
`;

//var trees=NVH.parseMany(input);
//console.log(NVH.serializeMany(trees));

var elHeadword=NVH.parse(input);
console.log(elHeadword.getDescendants("translation.en").map(el => el.name));
