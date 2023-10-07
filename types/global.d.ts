declare global {


    type Nullable<T> = T | null

    type Elref<T extends HTMLElement = HTMLDivElement> = Nullable<T>
}

export { }