export type RecordItem = {
    id: number,
    recordId?: number,
    content?: string,
    isDone?: boolean,
    bgColor?: string,
    bgImg?: string
}

export type RecordTableProps = {
    id?: number,
    createDate?: string,
    createTime?: string,
    endDate?: string,
    endTime?: string,
    lastModified?: string
    bg?: string
}