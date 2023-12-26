
/**
 * Create a search string including the current path search options
 * @param {object} params Options to add
 */
export function getUrlSearchString(params){
    const urlParams = new URLSearchParams(window.location.search) //Get the current parameters
    Object.keys(params).forEach(key => {
        urlParams.set(key, params[key]) 
    })
    return urlParams.toString()
}