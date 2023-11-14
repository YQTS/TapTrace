<!--  -->
<template>
    <div>
        <template class="recordTable" v-show="showContent">
            <span v-show="todoRecord.length" class=" font-thin text-sm">待完成</span>
            <div class="recordContent" v-for="item in todoRecord" :key="item.id">
                <Transition appear enter-active-class="animate__animated animate__jackInTheBox">
                    <div class="recordItem" @mouseenter="handleMouseenter(item.id)" @mouseleave="handleMouseleave">
                        <div class="recordArea" :class="{ 'slipLeft': hoverIndex === item.id }">
                            <div contenteditable="true" class="record" placeholder="空白记录..." v-html="item.content"
                                @blur="handleSync($event, item.id!)" spellcheck="false">
                            </div>
                        </div>
                        <div class="btnArea">
                            <IconButton icon="mdi:tick-outline" :size="15" content="完成" @click="handleDone(item.id)"
                                v-show="!item.isDone" />
                            <IconButton icon="carbon:edit" :size="15" content="编辑" @click="handleEdit(item.id)" />
                            <IconButton icon="akar-icons:cross" :size="15" content="删除" @click="handleDelete(item.id)" />
                        </div>
                    </div>
                </Transition>
            </div>
            <span v-show="doneRecord.length" class=" font-thin text-sm text-[var(--theme-color)]">已完成</span>
            <div class="recordContent" v-for="item in doneRecord" :key="item.id">
                <Transition appear enter-active-class="animate__animated animate__jackInTheBox">
                    <div class="recordItem" @mouseenter="handleMouseenter(item.id)" @mouseleave="handleMouseleave">
                        <div class="recordArea" :class="{ 'slipLeft': hoverIndex === item.id }">
                            <div contenteditable="true" class="record" placeholder="空白记录..." v-html="item.content"
                                @blur="handleSync($event, item.id!)" spellcheck="false">
                            </div>
                        </div>
                        <div class="btnArea">
                            <IconButton icon="carbon:edit" :size="15" content="编辑" @click="handleEdit(item.id)" />
                            <IconButton icon="akar-icons:cross" :size="15" content="删除" @click="handleDelete(item.id)" />
                        </div>
                    </div>
                </Transition>
            </div>
        </template>
        <ElEmpty description="暂未记事" v-show="!showContent" />
        <Mask v-show="showEdit" bg-color="">
            <Transition appear enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__zoomOut">
                <EditPop v-show="showEdit" @closeEdit="handleClosePop" :record="editRecord" />
            </Transition>
        </Mask>
    </div>
</template>

<script lang='ts' setup>
import { IconButton } from '@/components/IconButton';
import { Mask } from '@/components/Mask'
import { ElEmpty } from 'element-plus';
import { EditPop } from '@/components/EditPop'
import { Ref, ref, watch } from 'vue';
import type { RecordItem } from '@/types/Record'
import { useObservable } from '@vueuse/rxjs'
import { db } from '@/dexie';
import { liveQuery } from 'dexie';
import { deleteRecordItem, getRecordId, updateItemContent, getRecordItem, getRecordItems } from '@/utils/record'
import { computed } from 'vue';
import { debounce } from '@/utils/debounce';
import { inject } from 'vue';

const props = defineProps({
    recordIdProp: {
        type: Number,
        default: () => getRecordId()
    }
})

const refreshDatePicker = inject<Function>('refreshDatePicker')

let recordItems = ref<RecordItem[]>([])

const refreshRecordItems = async () => {
    recordItems.value = await getRecordItems(props.recordIdProp)
}

defineExpose({
    refreshRecordItems
})

watch(
    () => props.recordIdProp,
    async (newVal, oldVal) => {
        if (newVal !== oldVal) {
            await refreshRecordItems()
        }
    },
    {
        immediate: true
    }
)

const doneRecord = computed(() => recordItems.value && recordItems.value.filter(r => r.isDone))

const todoRecord = computed(() => recordItems.value && recordItems.value.filter(r => !r.isDone))

const handleDone = async (itemId: number) => {
    await db.recordItems.where('id').equals(itemId).modify(item => {
        item.isDone = true
    })
    await refreshRecordItems()
}

const handleDelete = async (itemId: number) => {
    await deleteRecordItem(itemId)
    await refreshRecordItems()
    if (refreshDatePicker) {
        refreshDatePicker()
    }
}

const showContent = computed(() => {
    return recordItems.value && recordItems.value.length ? true : false
})

// 展示编辑 传入数据
const showEdit = ref(false)
const editRecord = ref<Recordable>({})
const handleEdit = async (itemId: number) => {
    const record = await getRecordItem(itemId)
    editRecord.value = { ...record }
    showEdit.value = true
}
const handleClosePop = async () => {
    showEdit.value = false
    await refreshRecordItems()
}


const updateContent = debounce(updateItemContent, 1000)
const handleSync = async (e: any, itemId: number) => {
    updateContent(itemId, e.target.innerHTML)
}

// 鼠标移入移出
const hoverIndex = ref<number>()
const handleMouseenter = (itemId: number) => {
    hoverIndex.value = itemId
}
const handleMouseleave = () => {
    hoverIndex.value = -1
}

</script>
<style scoped>
.recordTable {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

.recordContent {
    display: flex;
}



.recordItem {
    display: flex;
    position: relative;
    flex: 1;
}

.recordArea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    border-radius: 8px;
    border: 1px #A8A3AF solid;
    background-color: white;
    overflow: hidden;
    transition: width 0.3s;
    z-index: 2;
}

/* .recordArea::-webkit-scrollbar {
    display: none;
} */

.record {
    position: relative;
    outline: none;
    font-size: large;
    width: 100%;
    padding: 10px 10px;
}

.btnArea {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 30%;
    min-width: 100px;
    padding: 0 2px;
    right: 0;
    z-index: 1;
}

.slipLeft {
    width: 70%;
    transition: width 0.5s;
}

[contenteditable=true]:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    display: block;
    color: #A8A3AF;
}
</style>
