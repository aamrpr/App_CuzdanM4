import * as RNLocalize from 'react-native-localize';
const locales = RNLocalize.getLocales();

const Trans: any = {
    EN: require("../../Assets/Lang/en.json"),
    AR: require("../../Assets/Lang/ar.json")
};

export const TR: any = (key: string, Param: { k1: '' }) => {
    try {
        let Lang = 'EN';
        Lang = locales[0].languageCode.toUpperCase();
        if (Trans[Lang][key]) {
            return RednerTransualteWithParam(Trans[Lang][key], Param);
        }
        else {
            return RednerTransualteWithParam(key, Param);;
        }
    } catch (error) {
        return key;
    }
}

export const GetLang = () => {
    return locales[0].languageCode.toUpperCase();
}


export const RednerTransualteWithParam = (text: string, Param: any) => {
    try {
        return text.replace(/\$\$(\w+)\$\$/g, (_, key) => {
            return Param && Object.prototype.hasOwnProperty.call(Param, key)
                ? Param[key]
                : '';
        });
    } catch (error) {
        return text;
    }
}