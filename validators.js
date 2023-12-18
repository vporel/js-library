import _ from "./translator"

const validators = {}

validators.required = val => {
    if(val == null || val == 0 || ((typeof val == "string") && val.trim() == "")) return _("You should fill this field")
    return ""
}

validators.numberRange = (val, min = null, max = null) => {
    if(val == "" || val === null) return ""      //If the field is required, add the validator "required"
    val = parseInt(val)
    if(min === null && max === null) throw new Error("Both min and max cannot be null")
    if(min === null)
        if(val > max) return _("Less than or equal to") + " " + max 
    if(max === null)
        if(val < min) return _("Greater than or equal to") + " " + min 
    if(min !== null && max !== null){
        if(min > max) throw new Error(`min cannot be greater than max (min=${min}, max=${max})`)
        if(val < min || val > max) return _("Should be between") + " " +min + " and " + max
    }
    return ""
}

validators.stringLength = (val, min = null, max = null) => {
    val = "" + val //Convert to string
    if(val == "" || val == null) return ""      //If the field is required, add the validator "required"
    if(min === null && max === null) throw new Error("Both min and max cannot be null")
    if(min === null)
        if(val.length > max) return _("At most") + " " + max + " " + _("character") + (max > 1 ? "s" : "")
    if(max === null)
        if(val.length < min) return _("At least") + " " + min + " " + _("character") + (min > 1 ? "s" : "")
    if(min !== null && max !== null){
        if(min > max) throw new Error(`min cannot be greater than max (min=${min}, max=${max})`)
        if(val.length < min || val.length > max) return _("Should have between") + " " +min + " and " + max + " " + _("characters")
    }
    return ""
}


validators.regex = (val, regex, message) => {
    if(!regex.test(val)) return message 
    return ""
}

validators.email = (val) => {
    return validators.regex(val, /^.+\@\S+\.\S+$/, _("Invalid address")  )
}

/**
 * If using many validators
 * @param  {...any} validatorsResults 
 * @returns 
 */
validators.chain = (...validatorsResults) => { 
    for(const r of validatorsResults){
        if(r != "") return r
    }
    return ""
}

export default validators