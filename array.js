
/**
 * Mix an array elements
 * @param {array} array 
 * @returns 
 */
export function shuffle(array){
    return array.sort((a, b) => 0.5 - Math.random());
}

/**
 * Generate an array from the min index to the max index
 * @param {integer} min 
 * @param {integer} max 
 * @returns array
 */
export function range(min, max){
    let ar = []
    for(let i = min;i<=max;i++)
        ar.push(i)
    return ar
}