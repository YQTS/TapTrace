<!--  -->
<template>
    <div class="recordTable">
        <div class="recordContent" v-for="recordItem in recordData.recordItems" :key="recordItem.id">
            <div class="recordArea">
                <div contenteditable="true" :class="['record', {}]" placeholder="记录一下..." v-html="recordItem.content"></div>
            </div>
            <div class="btnArea">
                <ElTooltip effect="dark" placement="bottom" content="编辑">
                    <Icon icon="carbon:edit" :size="15" />
                </ElTooltip>
                <ElTooltip effect="dark" placement="bottom" content="完成">
                    <Icon icon="mdi:tick-outline" :size="15" />
                </ElTooltip>
                <ElTooltip effect="dark" placement="bottom" content="删除">
                    <Icon icon="akar-icons:cross" :size="15" />
                </ElTooltip>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { Icon } from '@/components/Icon'
import { ElTooltip } from 'element-plus';
import { PropType } from 'vue';
import type { RecordTableProps } from '@/types/Record'

const props = defineProps({
    recordData: {
        type: Object as PropType<RecordTableProps>,
        default: () => { { } }
    }
})

</script>
<style scoped>
.recordTable {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.recordContent {
    display: flex;
    width: 100%;
    border: 1px red solid;
    height: 40px;
}

.recordArea {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    overflow: hidden;
}

.btnArea {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    width: 30%;
    min-width: 100px;
    padding: 0 2px;
}

.record {
    position: relative;
    outline: none;
    width: 100%;
    font-size: large;
    padding: 0 5px;
    white-space: nowrap;
}

[contenteditable=true]:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    display: block;
    color: #A8A3AF;
}
</style>
