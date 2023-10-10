import Dexie from 'dexie'
import type { RecordItem, RecordTableProps } from '@/types/Record'
class Recordbase extends Dexie {
    record: Dexie.Table<RecordTableProps, number>
    recordItems: Dexie.Table<RecordItem, number>

    constructor() {
        super('Recordbase')

        // this.version(1).stores({
        //     record: '++id, *recordItems, createTime, endTime, lastModified, bg',
        // })

        this.version(3).stores({
            record: '++id, *recordItems.id, createDate, endDate',
        })

        this.version(4).stores({
            record: '++id, *recordItems.id, createDate',
            recordItems: '++id, recordId'
        })

        this.version(5).stores({
            record: '++id, createDate',
            recordItems: '++id, recordId'
        })

        this.record = this.table('record')
        this.recordItems = this.table('recordItems')
        
    }
}


export const db = new Recordbase()