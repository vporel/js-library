/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */

import { parseISO } from "date-fns";
import _ from "./translator";

/**
 * @param {Date|string} date 
 * @param {{dayText:string, monthText:string, yearText:string, hourText:string, minuteText:string}} options Pour le format time-to-now On aura par exemple '5 jours'
 */
export function timeToNow(date, {
    dayText = _("day", "jour"), monthText = _("month", "mois"), yearText = _("year", "an"), 
    hourText = _("hour", "heure"), minuteText = "minute", secondText = _("second", "seconde")} = {}
){
    if(typeof date == "string")
        date = new Date(date)
    let formattedDate;
    let timeDifference = (new Date().getTime() - date.getTime()) / 1000; // /100 to get the time in seconds
    const oneYearTime = 365*24*60*60, oneMonthTime = 30*24*60*60, oneDayTime = 24*60*60, 
        oneHourTime = 60*60, oneMinuteTime = 60 ;
    let suffix = "";
    if(timeDifference > oneYearTime) // timeDifference > 1 an
        formattedDate = Math.ceil(timeDifference / oneYearTime), suffix = yearText
    else if(timeDifference > oneMonthTime) // timeDifference > 1 mois
        formattedDate = Math.ceil(timeDifference / oneMonthTime), suffix = monthText
    else if(timeDifference > oneDayTime) //...
        formattedDate = Math.ceil(timeDifference / oneDayTime), suffix = dayText
    else if(timeDifference > oneHourTime) // ...
        formattedDate = Math.ceil(timeDifference / oneHourTime), suffix = hourText
    else if(timeDifference > oneMinuteTime) //...
        formattedDate = Math.ceil(timeDifference / oneMinuteTime), suffix = minuteText
    else // Il y a juste quelques secondes (moins d'une minute)
        formattedDate = Math.ceil(timeDifference), suffix = secondText
    formattedDate += " " + suffix + ((formattedDate > 1 && suffix != monthText) ? "s" : "");
    return formattedDate;
}

/**
 * Create a date object if typeof date == "string"
 * @param {*} date 
 * @returns 
 */
export function parseDate(date){
    return typeof date == "string" ? parseISO(date) : date
}