export interface CountriesModel {
  flags: FlagsObject;
  name: NameObject;
  cca2: string;
  cca3: string;
  idd?: {
    root: string;
    suffixes: string[];
  };
  altSpellings?: string[];
}

interface FlagsObject {
  png: string;
  svg: string;
  alt: string;
}

interface NameObject {
  common: string;
  official: string;
  nativeName: {
    eng: {
      official: string;
      common: string;
    };
  };
}
