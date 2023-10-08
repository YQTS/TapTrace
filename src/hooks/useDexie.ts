import { db } from "@/dexie"
import { useTodayDate } from "./useTodayDate"

const { today, time } = useTodayDate()

export const useDexie = () => {
    
    const getRecordData = async (date: string) => {
        const hasTodayDate = await db.record.where('createDate').equals(`${date}`).count() !== 0 ? true : false

        if (!hasTodayDate) {
            try {
                await db.record.add({
                    createDate: date,
                    createTime: time,
                    lastModified: today,
                    recordItems: []
                })
            } catch {
                throw new Error('Failed to add new record to the database')
            }
        }

        const recordData = await db.record.where('createDate').equals(`${date}`).first()

        return recordData ? recordData : null

    }

    return {
        getRecordData
    }
    
}