import Compressor from "compressorjs"

export default class FileUploader{
    constructor({maxSize, compressImages, extensions, onStart, onUploaded, onError, onProgress}){
        this.maxSize = maxSize
        this.compressImages = compressImages
        this.extensions = extensions
        this.onStart = onStart
        this.onUploaded = onUploaded
        this.onError = onError
        this.onProgress = onProgress
    }

    upload(file){
        if(this.extensions && this.extensions.length > 0){
		    let fileName = file.name.toLowerCase()
            let extensionError = true 
            for(let ext of this.extensions){
                if(fileName.endsWith(ext.toLowerCase()))
                    extensionError = false
            }
            if(extensionError){
                if(typeof this.onError == "function")
                    this.onError(file, "EXTENSION")
                return;
            }
	    }
        if(this.maxSize && file.size > this.maxSize && (!file.type.startsWith('image') || !this.compressImages)){
            if(typeof this.onError == "function")
                this.onError(file, "SIZE")
            return
        }
        if(this.onStart)
            this.onStart(file)
        let fileReader = new FileReader()
        //Events
        fileReader.onprogress = event => {
            if(typeof this.onProgress == "function")
                this.onProgress(file, Math.round((event.loaded/event.total) * 100)) // (file, percentage)
        }
        fileReader.onload = () => {
            if(typeof this.onUploaded == "function"){
                if(this.maxSize && file.size > this.maxSize && file.type.startsWith('image') && this.compressImages)
                    new Compressor(file, {
                        quality: (this.maxSize / file.size), 
                        success: result => this.onUploaded(result, URL.createObjectURL(result))
                    })
                else
                    this.onUploaded(file, fileReader.result)
            }
        }

        // Read file asynchronously.
        fileReader.readAsDataURL(file); // fileReader.result -> String
    }
}