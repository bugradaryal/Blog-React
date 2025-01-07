import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getSystemLanguage } from './utils/LanguageUtils.js';

import hometableen from './locales/en/hometable-en.json';
import hometabletr from './locales/tr/hometable-tr.json';

import registertableen from './locales/en/registertable-en.json';
import registertabletr from './locales/tr/registertable-tr.json';

import accounttableen from './locales/en/accounttable-en.json';
import accounttabletr from './locales/tr/accounttable-tr.json';

import logintableen from './locales/en/logintable-en.json';
import logintabletr from './locales/tr/logintable-tr.json';

import homepagetableen from './locales/en/homepagetable-en.json';
import homepagetabletr from './locales/tr/homepagetable-tr.json';

import emailtableen from './locales/en/emailtable-en.json';
import emailtabletr from './locales/tr/emailtable-tr.json';

import contacttableen from './locales/en/contacttable-en.json';
import contacttabletr from './locales/tr/contacttable-tr.json';

import blogtableen from './locales/en/blogtable-en.json';
import blogtabletr from './locales/tr/blogtable-tr.json';

import abouttableen from './locales/en/abouttable-en.json';
import abouttabletr from './locales/tr/abouttable-tr.json';

import bodyimagetableen from './locales/en/bodyimagetable-en.json';
import bodyimagetabletr from './locales/tr/bodyimagetable-tr.json';

import admintableen from './locales/en/admintable-en.json';
import admintabletr from './locales/tr/admintable-tr.json';
i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                hometable:hometableen,
                registertable: registertableen,
                accounttable: accounttableen,
                logintable: logintableen,
                homepagetable: homepagetableen,
                emailtable: emailtableen,
                contacttable: contacttableen,
                blogtable: blogtableen,
                abouttable: abouttableen,
                bodyimagetable: bodyimagetableen,
                admintable: admintableen
            },
            tr: {
                hometable:hometabletr,
                registertable: registertabletr,
                accounttable: accounttabletr,
                logintable: logintabletr,
                homepagetable: homepagetabletr,
                emailtable: emailtabletr,
                contacttable: contacttabletr,
                blogtable:blogtabletr,
                abouttable: abouttabletr,
                bodyimagetable: bodyimagetabletr,
                admintable: admintabletr
            },
        },
        interpolation: { escapeValue: false },
        fallbackLng: 'en',
        lng: 'en', // Varsayılan dil
        ns: ['hometable'], // Namespace'leri burada belirtiriz
        defaultNS: 'hometable', // Varsayılan namespace
    });

document.documentElement.setAttribute('lang', getSystemLanguage());

export default i18n; 