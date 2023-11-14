export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
    dom.style.setProperty(prop, val)
}