import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "sr" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("userLang", newLang);
  };

  return (
    <p
      className="text-lg cursor-pointer text-gray-500"
      onClick={changeLanguage}
    >
      {i18n.language.toUpperCase() === "SR" ? "EN" : "SR"}
    </p>
  );
};

export default LanguageToggle;
