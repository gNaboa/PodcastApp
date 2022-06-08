export function convertDuration(duration : number){

    const hours = Math.floor(duration/3600 )  //converte de segundos para horas
    const minutes = Math.floor((duration %3600)/60)
    const seconds = duration % 60

    const result = [hours,minutes,seconds].map(
        unit=>String(unit).padStart(2,'0')
    ).join(':')

    return result
}