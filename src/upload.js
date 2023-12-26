import FileUploader from "./classes/FileUploader"
import { wait } from "./standard"

/**
 * Handle the upload process on a file input
 * The input can have the attribute multiple
 * @param {*} changeEvent Change event on an input file
 * @param {*} options
 * @returns 
 */
export function handleUpload(changeEvent, {maxSize, extensions, onProgress, onUploaded, onError} = {})
{
    if(!changeEvent) return
    changeEvent.preventDefault()
    let files = changeEvent.target.files
    const fileUploader = new FileUploader({maxSize, extensions, onUploaded, onError, onProgress})
    for(let file of files){ 
        fileUploader.upload(file)
    }
}
