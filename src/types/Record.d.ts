export type RecordItem = {
    id: stringg,
    content: string,
    isDone?: boolean,
    bgColor?: string,
    bgImg?: string
}

export type RecordTableProps = {
    id: string,
    recordItems: RecordItem[],
    createTime?: string,
    endTime?: string,
    lastModified?: string
    bg?: string
}