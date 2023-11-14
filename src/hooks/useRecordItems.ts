import { useObservable } from '@vueuse/rxjs'
import { RecordItem } from "@/types/Record"
import { liveQuery } from 'dexie';
import { db } from "@/dexie"
import { Ref } from 'vue';

export const useRecordItems = (recordId: number) => {
    let recordItems = useObservable(
        liveQuery(() => db.recordItems.where('recordId').equals(recordId).toArray()) as any
    ) as Ref<RecordItem[]>
    
    return {
        recordItems
    }
}