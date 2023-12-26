
 /**
  * Faire défiler la page jusqu'à selector
  * @param mixed selector
  * 
  * @return [type]
  */
export function scrollTo(selectorOrElement, behavior = "smooth"){
    if(!(selectorOrElement instanceof HTMLElement))
        selectorOrElement = document.querySelector(selectorOrElement)
    window.scrollTo({left: 0, top: selectorOrElement.offsetTop - 100, behavior})
}

export function onMobile(){
    return window.innerWidth <= 768
}

export function onDesktop(){
    return !onMobile()
}

/**
 * Says if the app is running in standalone mode
 */
export function standaloneMode(){
    return window.matchMedia('(display-mode: standalone)').matches
}

export async function wait(milliseconds){

    return await new Promise(resolve => setTimeout(resolve, milliseconds))
}
