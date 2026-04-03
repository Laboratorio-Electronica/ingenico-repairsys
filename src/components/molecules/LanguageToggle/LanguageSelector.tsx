import React, { useContext, useState } from 'react';
// import LanguageContext from '../../../context/LanguageContext'; // Language context for managing multilingual state
import { BiCaretDown, BiCaretUp } from 'react-icons/bi'; // Icons for dropdown indicators
import style from './LanguageSelector.module.css'; // CSS module for component styles
import { LanguageContext, LanguageContextType } from '@/context/LanguageContext';

// Define the expected type for the LanguageContext values
// type LanguageContextType = {
//   isSpanish: boolean;
//   setIsSpanish: (language: boolean) => void;
// };

/**
 * COMPONENT: Language
 *
 * Renders a button that toggles a language selection dropdown.
 * Users can select either Spanish or English.
 * The chosen language is stored in context and saved to localStorage for persistence.
 */
const LanguageToggleButton: React.FC = () => {
  const { language } = useContext(LanguageContext) as LanguageContextType;

  // State to control dropdown visibility
  const [menuLanguage, setMenuLanguage] = useState<boolean>(false);

  // Toggles the language dropdown menu open/closed
  const handlerMenuLanguage = () => {
    setMenuLanguage(!menuLanguage);
  };

  // Sets the selected language and stores it in localStorage
  const setLanguage = (languageSpanish: boolean) => {
    setLanguage(languageSpanish);
    localStorage.setItem('isSpanish', JSON.stringify(languageSpanish));
    handlerMenuLanguage(); // Close the menu after selection
  };

  return (
    <div className={style["language__container"]}>
      <button className={style["language__button"]} onClick={handlerMenuLanguage}>
        {language ? "Idioma" : "Language"} {/* Show label based on selected language */}
        {/* Toggle icon based on menu state */}
        {menuLanguage ? (
          <BiCaretUp className={style["language__button--deploy"]} />
        ) : (
          <BiCaretDown className={style["language__button--deploy"]} />
        )}
      </button>

      {/* Conditionally render the dropdown language options */}
      <div className={menuLanguage ? style['language__items-container'] : 'none'}>
        <p className={style["language__item"]} onClick={() => setLanguage(true)}>
          Español
        </p>
        <p className={style["language__item"]} onClick={() => setLanguage(false)}>
          English
        </p>
      </div>
    </div>
  );
};

/**
 * COMPONENT: LanguagePhone
 *
 * A simplified version of the Language component intended for mobile use.
 * Displays language options directly without the need for a dropdown toggle.
 */
const LanguageToggleButtonMobile: React.FC = () => {
  const { language } = useContext(LanguageContext) as LanguageContextType;

  // Sets the selected language and stores it in localStorage
  const setLanguage = (languageSpanish: boolean) => {
    setLanguage(languageSpanish);
    localStorage.setItem('isSpanish', JSON.stringify(languageSpanish));
  };

  return (
    <div className={style["language__items-container"]}>
      <p className={style["language__item"]} onClick={() => setLanguage(true)}>
        Español
      </p>
      <p className={style["language__item"]} onClick={() => setLanguage(false)}>
        English
      </p>
    </div>
  );
};

// Export both components for use in different views (desktop and mobile)
export { LanguageToggleButton, LanguageToggleButtonMobile };
