import PhotoViewer from "photoviewer";

export function showPhotoViewer(photos, options){
    if(!Array.isArray(photos)){
        try{
            photos = JSON.parse(photos)
        }catch(e){
            console.error("You didn't provide an array for the photos or the string is not a correct json string")
            return
        }
    }
    let defaultOptions = {
        title:false,
        initMaximized:true,
        footerToolbar: ['zoomIn','zoomOut','prev','next','actualSize']
    }
    if(options == undefined) options = {}
    options = {...defaultOptions, ...options}
    new PhotoViewer(photos, options)
}