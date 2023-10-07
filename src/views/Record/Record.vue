<!--  -->
<template>
    <div class="record">
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
.record {}
</style>