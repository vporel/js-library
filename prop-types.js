

export class Type{
    required = false
    /**
     * 
     * @param {*} name 
     * @param {*} testFunction A function that check a given value is valid for the type
     * @param {*} formatFunction To give a special format to the value
     */
    constructor(name, testFunction, formatFunction = null){
        this.name = name 
        this.testFunction = testFunction
        this.formatFunction = formatFunction
    }

    isRequired(){
        this.required = true
        return this
    }

    /**
     * 
     * @param {*} value 
     * @returns null if the value is correct
     */
    test(value, propertyName){
        if(value == null || value == undefined || value == ""){
            if(this.required)
                return "The property '"+propertyName+"' is required but its value is empty"
        }else{
            if(!this.testFunction(value))
                return "The value '"+value+"' doesn't match the type '"+this.name+"'"
        }
        return null
    }

    format(value){
        return this.formatFunction ? this.formatFunction(value) : value
    }
}

/**
 * A Type that uses a regex to test a value
 */
export class RegexType extends Type{
    constructor(name, regex, formatFunction = null){
        super(name, value => regex.test(value), formatFunction)
    }
}

/**
 * Returns the boolean equivalent of a value
 * @param {boolean} value 
 */
export function parseBool(value){
    if(typeof value == "boolean") return value
    if(typeof value == "string") value = value.toLowerCase();
    if(value == "true") return true 
    if(value == "false") return false
    value = parseInt(value) // 0 ou 1 
    return isNaN(value) ? null : (value == 1 ? true : false)
}

/**
 * 
 * @param {*} propTypes 
 * @param {*} propsValues
 * @returns An array. If the array is not empty, there's at least one error
 */
export const check = (propTypes, propsValues) => {
    if(typeof propsValues != "object")
        propsValues = {}
    let errors = []
    let type, value, test
    for(let prop in propTypes){
        type = propTypes[prop]
        value = propsValues[prop]
        if(type instanceof Type){
            if(value == undefined && !type.required)
                continue
            test = type.test(value, prop)
            if(test !== null)
                errors.push(test)
            else
                propsValues[prop] = type.format(value)
        }else{
            throw new Error("The type defined for the property '"+ prop + "' is not an instance of 'Type' class")
        }
    } 
    return errors
}

const PropTypes = {
    get int(){return new RegexType("number", /^[0-9]+$/, value => {
        value = parseInt(value)
        return isNaN(value) ? null : value
    })},
    get float(){return new RegexType("float", /^[0-9]*[.,]?[0-9]*$/, value => {
        value = parseFloat(value)
        return isNaN(value) ? null : value
    })},
    get bool(){return new RegexType("bool", /^1|0|true|false$/, value => parseBool(value))},
    get string(){return new RegexType("string", /.+/)},
    get function(){return new Type("function", value => typeof value == "function")},
    get date(){
        return new RegexType(
            "date", 
            /^(0?[1-9]|11|12)[/-](0?[1-9]|[1-2][0-9]|30|31)[/-](\d{2}|\d{4})( (0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]))?$/,
            value => new Date(value)
        ) // The date string must begin with the month (m-d-Y)
    },
    get array(){
        return new Type("array", value => {
            try{
                return Array.isArray(value) || (typeof value == "string" && Array.isArray(JSON.parse(value)))
            }catch(e){
                return false
            }
        }, value => {
            if(typeof value == "string")
                return JSON.parse(value)
            return value
        })
    },
    get object(){
        return new Type("object", value => {
            try{
                return typeof value == "object" || (typeof value == "string" && (typeof (JSON.parse(value) == "object")))
            }catch(e){
                return false
            }
        }, value => {
            if(typeof value == "string")
                return JSON.parse(value)
            return value
        })
    }
}
export default PropTypes