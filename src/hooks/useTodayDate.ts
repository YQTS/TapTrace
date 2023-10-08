export const useTodayDate = () => {
    const today = new Date().toLocaleString()
    const date = today.split(' ')[0]
    const time = today.split(' ')[1]
    return {
        today,
        date,
        time
    }
}