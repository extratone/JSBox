var entities = [
  { name: $l10n("SOFTWARE"), code: "software" },
  { name: $l10n("IPAD"), code: "iPadSoftware" },
  { name: $l10n("MACOS"), code: "macSoftware" },
  { name: $l10n("MUSIC"), code: "musicTrack" },
  { name: $l10n("MOVIE"), code: "movie" },
  { name: $l10n("PODCAST"), code: "podcast" },
]

var countries = [
  { name: "πΊπΈ US", code: "us" },
  { name: "π¨π³ CN", code: "cn" },
  { name: "π­π° HK", code: "hk" },
  { name: "π¬π§ UK", code: "gb" },
  { name: "π―π΅ JP", code: "jp" },
  { name: "π¦πΊ AU", code: "au" },
  { name: "π³πΏ NZ", code: "nz" }
]

var currencies = {
  "us" : "$",
  "cn" : "οΏ₯",
  "hk" : "$",
  "gb" : "$",
  "jp" : "$",
  "au" : "$",
  "nz" : "$"
}

var langs = {
  "us" : "en",
  "cn" : "zh-Hans-CN",
  "hk" : "en",
  "gb" : "en",
  "jp" : "en",
  "au" : "en",
  "nz" : "en"
}

module.exports = {
  entities: entities,
  countries: countries,
  currencies: currencies,
  langs, langs
}