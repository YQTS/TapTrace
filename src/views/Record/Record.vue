<!--  -->
<template>
    <div class="record">
        <div class="btnArea">
            <button class="newRecord">新建</button>
        </div>
        <RecordTable :recordData="testData" />
    </div>
</template>

<script lang='ts' setup>
import { RecordTable } from '@/components/RecordTable'
import type { RecordTableProps } from '@/types/Record'

const testData: RecordTableProps = {
    id: '1',
    recordItems: [
        {
            id: '1',
            content: '测试内容1 <div>nihoa</div>',
            isDone: false
        },
        {
            id: '2',
            content: '测试内容2',
            isDone: false
        },
        {
            id: '3',
            content: '测试内容3',
            isDone: true
        }
    ],
    createTime: '2023/10/7'
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