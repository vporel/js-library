import {get, post} from "./api"

/**
 * 
 * @param {function} callback The function to call if the permission is granted
 */
function requestNotificationPermission(callback){
    if(!('Notification' in window)) return
    if(window.Notification.permission == "granted") callback()
    else
        window.Notification.requestPermission().then(permission => {
            if(permission == "granted") callback()
        })
}

/**
 * 
 * @param {object} extraData Extra informations to send to the server for the registration
 */
export function registerServiceWorker(scriptPath, publicKeyUrl, subscriptionUrl, extraData = {}){
    if('serviceWorker' in navigator)
        requestNotificationPermission(async () => {
            const publicKey = (await get(publicKeyUrl)).data
            const registration = await navigator.serviceWorker.register(scriptPath);
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicKey,
            })
            await post(subscriptionUrl, {subscription, ...extraData})
        })
    else 
        console.log("Service worker not supported")
}