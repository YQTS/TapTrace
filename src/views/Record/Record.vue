<!--  -->
<template>
    <div class="record">
        <div class="btnArea">
            <button class="newRecord" @click="handleAddRecordItem">新建</button>
            <div class=" flex items-center">
                <IconButton icon="fontisto:date" :size="20" content="往期记录"></IconButton>
            </div>
        </div>
        <RecordTable />
    </div>
</template>

<script lang='ts' setup>
import { IconButton } from '@/components/IconButton';
import { RecordTable } from '@/components/RecordTable'
import { createRecordItem, getRecordId, addRecordItem } from '@/utils/record'

const handleAddRecordItem = async () => {
    const newRecordItem = createRecordItem(getRecordId(), '', false)
    try {
        await addRecordItem(newRecordItem)
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