/* Uses the global constant TRANSLATION defined in the twig base template */
/**
 * Translate from english to french
 * @param {*} text 
 * @returns 
 */
export default function _(text, fr = null){
    if(fr != null) return fr;
    if(_TRANSLATIONS.fr){
        if(_TRANSLATIONS.fr.messages[text] != undefined)
            return _TRANSLATIONS.fr.messages[text]
        if(_TRANSLATIONS.fr.forms[text] != undefined)
            return _TRANSLATIONS.fr.forms[text]
        console.error("The text '"+text+"' could not be translated")
    }else{
        if(_TRANSLATIONS.en.messages[text] != undefined)
            return _TRANSLATIONS.en.messages[text]
        if(_TRANSLATIONS.en.forms[text] != undefined)
            return _TRANSLATIONS.en.forms[text]
    }
    return text
}