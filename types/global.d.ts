declare global {


    type Nullable<T> = T | null

    type Elref<T extends HTMLElement = HTMLDivElement> = Nullable<T>

    declare type Recordable<K = string, T = any> = Record<K extends null | undefined ? string : K, T>
}

export { }