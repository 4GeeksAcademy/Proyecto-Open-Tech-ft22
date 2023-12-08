import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "../../styles/navbar.css";
import spanishFlag from '../../img/spain.png';
import englishFlag from '../../img/united-kingdom.png';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [showOptions, setShowOptions] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        setShowOptions(false);
    };

    const languageOptions = [
        { value: 'en', label: 'English', flag: englishFlag },
        { value: 'es', label: 'Español', flag: spanishFlag },
    ];

    return (
        <div className="language-selector">
            <div
                className="selected-language"
                onClick={() => setShowOptions(!showOptions)}
            >
                <img src={languageOptions.find(opt => opt.value === selectedLanguage)?.flag} alt="Selected language" />
            </div>
            {showOptions && (
                <div className="dropdown-language">
                    {languageOptions.map(option => (
                        <div
                            key={option.value}
                            className={`option ${selectedLanguage === option.value ? 'selected' : ''}`}
                            onClick={() => changeLanguage(option.value)}
                        >
                            <img src={option.flag} alt={option.label} />
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;