import { RecordItem, RecordTableProps } from "@/types/Record"
import { db } from "@/dexie"
import { useTodayDate } from './date'

const { today, date, time } = useTodayDate()

 // 初始化并获取当天表格
export const initRecord = async (d: string = date) => {

    // const hasTodayDate = await db.record.where('createDate').equals(`${d}`).count() !== 0 ? true : false

    // if (!hasTodayDate) {
    //     try {
    //         await db.record.add({
    //             createDate: d,
    //             createTime: time,
    //             lastModified: today,
    //         })
    //     } catch {
    //         throw new Error('Failed to add new record to the database')
    //     }
    // }
    

    const recordId = await createRecord(d)

    localStorage.setItem('recordId', JSON.stringify(recordId))
}

export const createRecord = async (d: string = date) => {
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

    const recordId = (await db.record.where('createDate').equals(d).first())?.id

    return recordId

}

export const getRecordId = (): number => {
    return JSON.parse(localStorage.getItem('recordId')!)
}

export const createRecordItem = (recordId: number, content: string, isDone?: boolean, bgColor?: string, bgImg?: string ): any => {
    const recordItem = {
        recordId,
        isDone,
        content,
        bgColor,
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

export const getRecordByDate = async (date: string) => {
    return await db.record.where('createDate').equals(date).first()
}

export const updateItemContent = async (itemId: number, content: string) => {
    return await db.recordItems.update(itemId, {
        content
    })
}

export const updateItemBgColor = async (itemId: number, bgColor: string) => {
    return await db.recordItems.update(itemId, {
        bgColor
    })
}

export const updateItemBgImg = async (itemId: number, bgImg: string) => {
    return await db.recordItems.update(itemId, {
        bgImg
    })
}

export const deleteRecordItem = async (id: number) => {
    return await db.recordItems.delete(id)
}

export const getRecordDatesWithItems = async () => {
    const records = await db.record.toArray()
    const arr: string[] = []
    let itemNum: number
    let r: RecordTableProps
    for (let i = 0; i < records.length; i++) {
        r = records[i]
        itemNum = await db.recordItems.where('recordId').equals(r.id!).count()
        if (r.createDate && itemNum !== 0) {
            arr.push(r.createDate)
        }

    }
    return arr
}