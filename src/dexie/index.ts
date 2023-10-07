import Dexie from 'dexie'
import type { RecordTableProps } from '@/types/Record'
class Recordbase extends Dexie {
    record: Dexie.Table<RecordTableProps, number>

    constructor() {
        super('Recordbase')

        this.version(1).stores({
            record: '++id, *recordItems, createTime, endTime, lastModified, bg',
        })

        this.record = this.table('record')
    }
}


export const db = new Recordbase()