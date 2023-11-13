<!--  -->
<template>
    <div class="record">
        <div class="btnArea">
            <IconButton icon="basil:add-outline" content="新增记事" :size="25" @click="handleAddRecordItem" />
            <DatePicker v-if="showDatePicker" size="small" :dateValue="date" @changeDate="handleDate" />
        </div>
        <RecordTable ref="RecordTableRef" :recordIdProp="recordIdProp" />
    </div>
</template>

<script lang='ts' setup>
import { DatePicker } from '@/components/DatePicker';
import { IconButton } from '@/components/IconButton';
import { RecordTable } from '@/components/RecordTable'
import { createRecordItem, getRecordId, addRecordItem, getRecordByDate, createRecord } from '@/utils/record'
import { useTodayDate } from '@/utils/date'
import { ref } from 'vue';

const { date } = useTodayDate()

const recordDate = ref(date)

const recordIdProp = ref(getRecordId())

const showDatePicker = ref(true)

const handleDate = async (value: string) => {
    // value为传入的日期
    recordDate.value = value
    const record = await getRecordByDate(value)
    console.log('在这')
    if (record === void 0) {
        const newRecordId = await createRecord(value)
        console.log('newId', newRecordId)
        recordIdProp.value = newRecordId!
        showDatePicker.value = false
    } else {
        recordIdProp.value = record.id!
    }
    setTimeout(() => {
        showDatePicker.value = true
    }, 0);
}

const RecordTableRef = ref<typeof RecordTable>()

const handleAddRecordItem = async () => {
    const newRecordItem = createRecordItem(recordIdProp.value, '', false)
    try {
        await addRecordItem(newRecordItem)
        await RecordTableRef.value!.refreshRecordItems()
    } catch (error) {
        Promise.reject(error)
        throw new Error('Failed to update data')
    }
}

const handlePastRecord = () => {

}



</script>
<style scoped>
.record {
    padding: 10px 5px;
}

.btnArea {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 10px 0;
}

.newRecord {
    color: #f9f9f9;
    background: var(--btn-main-color);
    transition: background 0.2s;
}

.newRecord:hover {
    background: var(--btn-main-hover-color);
}

.pastRecord {
    background: var(--btn-light-color);
    transition: background 0.2s;
}

.pastRecord:hover {
    background: var(--btn-light-hover-color);
}
</style>