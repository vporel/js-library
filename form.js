
/**
 * Object that can be used to simulate a change event on an element
 * @param {*} fieldName 
 * @param {*} value 
 */
export function changeObject(fieldName, value){
    return {
        target: {
            name: fieldName,
            value
        }
    }
}