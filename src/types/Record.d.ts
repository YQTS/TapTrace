export type RecordItem = {
    id: string,
    content?: string,
    isDone?: boolean,
    bgColor?: string,
    bgImg?: string
}

export type RecordTableProps = {
    id?: number,
    recordItems?: RecordItem[],
    createDate?: string,
    createTime?: string,
    endDate?: string,
    endTime?: string,
    lastModified?: string
    bg?: string
}