/**
 * Convert a string from the dash case to the camel case
 * @param {string} str 
 * @returns 
 */
export function dashToCamelCase(str) {
    return str.replace(/-([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
    });
}

export function sluggify(text, divider = '-') {
    // lowercase
    text = text.toLowerCase();

    text = text.replace('~[éèêë]~u', "e");
    text = text.replace('~[ïî]~', "i");
    text = text.replace('~[àâä]~', "a");
    text = text.replace('~[ÿ]~', "y");
    text = text.replace('~[ôö]~', "o");
    text = text.replace('~[ûü]~', "u");

    // replace non letter or digits by divider
    text = text.replace('~[^\pL\d]+~u', divider);


    // remove unwanted characters
    text = text.replace('~[^-\w]+~', '');

    // trim
    text = text.trim();

    // remove duplicate divider
    text = text.replace('~-+~', divider);

    return text;
}

/**
 * @param {*} array 
 * @param {*} divider 
 * @returns {array}
 */
export function sluggifyArray(array, divider = '-'){
    return array.map(text => sluggify(text, divider))
}