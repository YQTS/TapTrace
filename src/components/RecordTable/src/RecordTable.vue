<!--  -->
<template>
    <div>
        <template class="recordTable" v-show="showContent">
            <div class="recordContent" v-for="item in recordModel" :key="item.id">
                <Transition appear enter-active-class="animate__animated animate__fadeInBottomLeft">
                    <div class="recordItem">
                        <div :class="['recordArea']">
                            <div contenteditable="true" :class="['record', {}]" placeholder="空白记录..." v-html="item.content"
                                @blur="handleSync($event, item.id!)" spellcheck="false">
                            </div>
                        </div>
                        <div class="btnArea">
                            <div>
                                <ElTooltip effect="dark" placement="bottom" content="编辑">
                                    <Icon icon="carbon:edit" :size="15" @click="handleEdit(item.id!)" />
                                </ElTooltip>
                            </div>
                            <div v-show="!item.isDone">
                                <ElTooltip effect="dark" placement="bottom" content="完成">
                                    <Icon icon="mdi:tick-outline" :size="15" @click="handleDone(item.id!)" />
                                </ElTooltip>
                            </div>
                            <div>
                                <ElTooltip effect="dark" placement="bottom" content="删除">
                                    <Icon icon="akar-icons:cross" :size="15" @click="handleDelete(item.id!)" />
                                </ElTooltip>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </template>
        <ElEmpty image="" description="暂未记事" v-show="!showContent" />
        <NewPopup ref="popUp" />
    </div>
</template>

<script lang='ts' setup>
import { Icon } from '@/components/Icon'
import { NewPopup } from '@/components/NewPopup';
import { ElEmpty, ElTooltip } from 'element-plus';
import { Ref, ref } from 'vue';
import type { RecordItem } from '@/types/Record'
import { useObservable } from '@vueuse/rxjs'
import { db } from '@/dexie';
import { liveQuery } from 'dexie';
import { deleteRecordItem, getRecordId, updateItemContent } from '@/utils/record'
import { computed } from 'vue';
import { debounce } from '@/utils/debounce';


const recordId = getRecordId()

let recordItems = useObservable(
    liveQuery(() => db.recordItems.where('recordId').equals(recordId!).toArray()) as any
) as Ref<RecordItem[]>

const recordModel = computed(() => {
    return recordItems.value && recordItems.value.reduce((result: RecordItem[], item) => {
        if (item.isDone) {
            result.unshift(item)
        } else {
            result.push(item)
        }
        return result
    }, [])
})


const handleDone = async (itemId: number) => {
    await db.recordItems.where('id').equals(itemId).modify(item => {
        item.isDone = true
    })
}

const handleDelete = async (itemId: number) => {
    await deleteRecordItem(itemId)
}

const showContent = computed(() => {
    return recordModel.value && recordModel.value.length ? true : false
})

const popUp = ref<typeof NewPopup | null>(null)

const handleEdit = (itemId: number) => {
    popUp.value!.handlePop(itemId)
}

const updateContent = debounce(updateItemContent, 1000)
const handleSync = async (e: any, itemId: number) => {
    updateContent(itemId, e.target.innerHTML)
}



</script>
<style scoped>
.recordTable {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.recordContent {
    width: 100%;
    height: 40px;
}



.recordItem {
    display: flex;
    border: 1px rgba(0, 0, 0, 0.379) solid;
    border-radius: 8px;
    width: 100%;
    min-height: 40px;
    max-height: 100px;

}

.recordArea::-webkit-scrollbar {
    display: none;
}

.recordArea {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    overflow: auto;
}

.record {
    position: relative;
    outline: none;
    width: 100%;
    font-size: large;
    padding: 0 10px;
    white-space: nowrap;
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



[contenteditable=true]:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    display: block;
    color: #A8A3AF;
}
</style>
