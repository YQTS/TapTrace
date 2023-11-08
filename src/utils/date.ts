export const useTodayDate = () => {
    const dateObj = new Date()
    let year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    let day = dateObj.getDate()

    let monStr = month.toString()
    let dayStr = day.toString()

    if (month >= 1 && month <= 9) {
        monStr = "0" + monStr
    }
    if (day >= 1 && day <= 9) {
        dayStr = "0" + dayStr
    }

    const date = `${year}-${monStr}-${dayStr}`
    const time = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    const today = `${year}-${monStr}-${dayStr} ${time}`

    return {
        date,
        time,
        today
    }
}