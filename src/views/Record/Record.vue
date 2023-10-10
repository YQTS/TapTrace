<!--  -->
<template>
    <div class="record">
        <div class="btnArea">
            <button class="newRecord" @click="handleAddRecordItem">新建</button>
        </div>
        <RecordTable />
    </div>
</template>

<script lang='ts' setup>
import { RecordTable } from '@/components/RecordTable'
import { createRecordItem, getRecordId, addRecordItem } from '@/utils/record'

const handleAddRecordItem = async () => {
    const newRecordItem = createRecordItem(getRecordId(), false)
    try {
        await addRecordItem(newRecordItem)
    } catch (error) {
        Promise.reject(error)
        throw new Error('Failed to update data')
    }
}



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