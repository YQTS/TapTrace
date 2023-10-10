import { RecordItem } from "@/types/Record"
import { db } from "@/dexie"
import { useTodayDate } from './date'

const { today, date, time } = useTodayDate()

 // 初始化并获取当天表格
export const initRecord = async (d: string = date) => {

    const hasTodayDate = await db.record.where('createDate').equals(`${d}`).count() !== 0 ? true : false

    if (!hasTodayDate) {
        try {
            await db.record.add({
                createDate: d,
                createTime: time,
                lastModified: today,
            })
        } catch {
            throw new Error('Failed to add new record to the database')
        }
    }

    const recordId = (await db.record.where('createDate').equals(date).first())?.id

    localStorage.setItem('recordId', JSON.stringify(recordId))
}

export const getRecordId = (): number => {
    return JSON.parse(localStorage.getItem('recordId')!)
}

export const createRecordItem = (recordId: number, isDone?: boolean, bg?: string, bgImg?: string ): RecordItem => {
    const recordItem = {
        recordId,
        isDone,
        bg,
        bgImg
    }
    return recordItem
}

export const getRecord = async (recordId: number) => {
    return await db.record.get(recordId)
}

export const addRecordItem = async (recordItem: RecordItem) => {
    await db.recordItems.add(recordItem)
}

export const getRecordItem = async (itemId: number) => {
    return await db.recordItems.where('id').equals(itemId).first()
}

export const getRecordItems = async (recordId: number) => {
    return await db.recordItems.where('recordId').equals(recordId).toArray()
}

export const deleteRecordItem = async (id: number) => {
    return await db.recordItems.delete(id)
}