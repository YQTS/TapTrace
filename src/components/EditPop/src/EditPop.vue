<!--  -->
<template>
    <div class=" w-96 h-80 sm:w-2/3 sm:h-2/3 bg-white rounded-lg">
        <div class=" w-full h-1/6 flex p-3 gap-5">
            <IconButton icon="mdi:color" :size="25" content="背景" />
        </div>
        <div class=" w-full h-4/6 p-3 border-y-2 overflow-auto">
            <div class=" w-full h-full outline-none" contenteditable="true" placeholder="空白记录..." v-html="showContent"
                ref="editRef" spellcheck="false">
            </div>
        </div>
        <div class=" w-full h-1/6 flex justify-end items-center p-3 gap-4">
            <button class=" w-16 h-8 bg-[var(--btn-light-color)] hover:bg-[var(--btn-light-hover-color)]"
                @click="handleCancel">取消</button>
            <button class=" w-16 h-8 text-white bg-[var(--btn-main-color)] hover:bg-[var(--btn-main-hover-color)]"
                @click="confirmEdit">确认</button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { IconButton } from '@/components/IconButton';
import { PropType } from 'vue';
import { updateItemContent } from '@/utils/record'
import { watch, ref } from 'vue';
import { unref } from 'vue';

const props = defineProps({
    record: {
        type: Object as PropType<Recordable>,
        default: () => { }
    }
})

const showContent = ref('')

const editRef = ref<Elref>()

watch(
    () => props.record,
    () => {
        props.record.content ?
            showContent.value = props.record.content :
            undefined
    },
    {
        immediate: true,
        deep: true
    }
)


const emits = defineEmits(['closeEdit'])
const handleCancel = () => {
    showContent.value = ''
    emits('closeEdit')
}

const confirmEdit = async () => {
    showContent.value = editRef.value?.innerHTML || ''
    await updateItemContent(props.record.id, unref(showContent))
    showContent.value = ''
    emits('closeEdit')
}

</script>
<style scoped>
.editPop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(213, 213, 213, 0.384);
    z-index: 2;
}

[contenteditable=true]:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    display: block;
    color: #A8A3AF;
}
</style>