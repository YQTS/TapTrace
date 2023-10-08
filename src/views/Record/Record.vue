<!--  -->
<template>
    <div class="record">
        <div class="btnArea">
            <button class="newRecord">新建</button>
        </div>
        <RecordTable :recordItems="recordData?.recordItems" />
    </div>
</template>

<script lang='ts' setup>
import { RecordTable } from '@/components/RecordTable'
import type { RecordTableProps, RecordItem } from '@/types/Record'
import { useDexie } from '@/hooks/useDexie'
import { useTodayDate } from '@/hooks/useTodayDate';
import { ref } from 'vue'
// import { computed } from 'vue';
// import { unref } from 'vue';

const { getRecordData } = useDexie()
const { date } = useTodayDate()


const recordData = ref<RecordTableProps | null>(null)

const initRecord = async () => {
    recordData.value = await getRecordData(date)
}

initRecord()



</script>
<style scoped>
.record {
    padding: 10px 5px;
}

.btnArea {
    margin: 10px 0;
}

.newRecord {
    width: 80px;
    height: 40px;
    font-size: 18px;
    color: #f9f9f9;
    background: var(--btn-main-color);
    transition: background 0.2s;
}

.newRecord:hover {
    background: var(--btn-main-hover-color);
}
</style>