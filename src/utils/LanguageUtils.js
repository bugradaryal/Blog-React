import { LANGUAGE_CODES } from '../constants/language';
import { tr, enUS } from 'date-fns/locale';

// Sistem dilini ayarlamak için kullanılır.
export const setSystemLanguage = (language) => {
    localStorage.setItem('i18n_lang', language, { expires: 365 });  // Yeni dili localStorage'a kaydet
};

// Sistem dilini almak için kullanılır.
// Eğer sistem dilini belirten bir çerez yoksa, varsayılan olarak "tr" (Türkçe) dönülür.
export const getSystemLanguage = () => localStorage.getItem('i18n_lang') || "en";

// date-fns kütüphanesi için lokalizasyon ayarlarını döndürür.
// getFnsLocale() fonksiyonu, sistem diline göre doğru lokalizasyon ayarlarını döndürür.
// Dil koduna (LANGUAGE_CODES.TR veya LANGUAGE_CODES.EN) göre switch-case yapısı kullanılır.
export const getFnsLocale = () => {
    const lang = getSystemLanguage();
    switch (lang) {
        case LANGUAGE_CODES.TR:
            return tr; // Türkçe lokalizasyon ayarlarını döndürür.
        case LANGUAGE_CODES.EN:
            return enUS; // İngilizce (ABD) lokalizasyon ayarlarını döndürür.
        default:
            return tr; // Varsayılan olarak Türkçe lokalizasyon ayarlarını döndürür.
    }
};

// Kullanıcı arayüzü dil kodunu döndürür.
// getLocale() fonksiyonu, sistem diline göre doğru dil kodunu döndürür.
// Dil koduna (LANGUAGE_CODES.TR veya LANGUAGE_CODES.EN) göre switch-case yapısı kullanılır.
export const getLocale = () => {
    const lang = getSystemLanguage();
    switch (lang) {
        case LANGUAGE_CODES.TR:
            return LANGUAGE_CODES.TR; // Türkçe dil kodunu döndürür.
        case LANGUAGE_CODES.EN:
            return LANGUAGE_CODES.EN; // İngilizce dil kodunu döndürür.
        default:
            return tr; // Varsayılan olarak Türkçe dil kodunu döndürür.
    }
};