export const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout | null = null
    return (...args: any) => {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(undefined, ...args)
            timer = null
        }, delay)
    }
}