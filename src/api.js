 
/**
 * Basic functions for a server request (GET, POST, DELETE, POST WITH FILES)
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */

/**
 * Requete auprès du serveur
 * @param {string} method 
 * @param {string} url
 * @param {object} data Un object javascript
 */
async function serverQuery(method, url, data){
    const options = {method} 
    if(method == "POST" || method == "PATCH" || method == "PUT") options.body = JSON.stringify(data ?? {})
    options.headers = {
        "Content-Type": (method != "PATCH") ? "application/json" : "application/merge-patch+json",
        accept: "application/json"
    }
    let response = await fetch(url, options)
    if(response.ok){
        if(method == "DELETE") return {status: 1}
        const jsonResponse = await response.json()
        if(jsonResponse.status == 1 && jsonResponse.data == undefined) jsonResponse.data = null
        return jsonResponse
    }
    try{
        const jsonResponse = await response.json()
        jsonResponse.status = 0
        jsonResponse.statusCode = jsonResponse.statusCode ?? response.status
        if(!jsonResponse.errorMessage && jsonResponse.violations)   //Violations for a 422 or a 400 error
            jsonResponse.errorMessage = jsonResponse.violations[0].message
        return jsonResponse    
    }catch(e){
        console.log(await response.text())
        return null
    }
}

/**
 * Requete de type GET
 * @param {*} url Sans l'adresse du serveur -  ex : /messages
 * @param {object} queryData Will be converted to query string
 */
export async function get(url, queryData){
    if(queryData) url = url+"?"+new URLSearchParams(queryData).toString()
    return await serverQuery("GET", url, null)
}

/**
 * Requete de type POST
 * @param {*} url Sans l'adresse du serveur -  ex : /messages
 * @param {object} data Un object javascript
 */
export async function post(url, data = {}){
    return await serverQuery("POST", url, data)
}

/**
 * Requete de type PATCH
 * @param {*} url Sans l'adresse du serveur -  ex : /messages
 * @param {object} data Un object javascript
 */
export async function patch(url, data){
    return await serverQuery("PATCH", url, data)
}

export async function _delete(url, data){
    return await serverQuery("DELETE", url, data)
}

/**
 * Custom POST function to send data with files
 * If there's many files, the keys will be fileKey-1, fileKey-2, ...
 * @param {*} url 
 * @param {*} data 
 * @param {array|File} files If files is an array the files key will be (ex: file-1, file-2)     
 * @returns 
 */
export async function postWithFiles(url, data, files, fileKey = "file"){
    const formData = new FormData()
    if(data) for(let key in data) formData.append(key, data[key])
    if(Array.isArray(files) || (files instanceof FileList)){
        for(let i = 1;i<=files.length;i++) formData.append(fileKey+"-"+i, files[i-1])
    }else formData.append(fileKey, files)     //Files is not an array
    let response = await fetch(url, {
        method: "POST",
        body: formData
    })
    if(response.ok){
        const jsonResponse = await response.json()
        if(jsonResponse.status == 1 && jsonResponse.data == undefined) jsonResponse.data = null
        return jsonResponse
    }else{
        console.error(await response.text())
        return null;        //there was and error (404, 500, ...)
    }
}



