import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locals/en.json";
import hi from "./locals/hi.json";
import pa from "./locals/pa.json";
import fe from "./locals/fe.json";
import ch from "./locals/ch.json";
import ar from "./locals/ar.json";
import sp from "./locals/sp.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      pa: { translation: pa },
      fe: { translation: fe },
      ch: { translation: ch },
      ar: { translation: ar },
      sp: { translation: sp }
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
