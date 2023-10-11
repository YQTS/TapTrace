<!-- 新建弹窗 -->
<template>
    <dialog ref="newPopupRef" class="popup">
        <div contenteditable="true" class="content" placeholder="准备要做的事..." ref="contentRef" />
        <div class="btns">
            <button @click="handleConfirm">确定</button>
            <button @click="handleClose">取消</button>
        </div>
    </dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { getRecordItem } from '@/utils/record'

const newPopupRef = ref<HTMLDialogElement | null>(null)

const contentRef = ref<Elref>(null)

const handlePop = async (itemId: number) => {

    const item = await getRecordItem(itemId)

    console.log(item)

    if (contentRef.value && item?.content)
        contentRef.value.innerHTML = item?.content

    if (newPopupRef.value) {
        newPopupRef.value.showModal()
    }
}

const handleClose = () => {
    if (newPopupRef.value) {
        newPopupRef.value.close()
    }
    if (contentRef.value) {
        contentRef.value.innerHTML = ''
    }

}

const handleConfirm = () => {

}

defineExpose({
    handlePop
})

</script>
<style scoped>
.popup {
    position: relative;
    width: 50%;
    height: 50%;
    border-radius: 8px;
    padding: 12px;
    border: 1px black solid;
}

.content {
    width: 100%;
    height: 100%;
    outline: none;
}

.btns {
    display: flex;
    justify-content: space-around;
    position: absolute;
    width: 90%;
    bottom: 0;
}

[contenteditable=true]:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    display: block;
    color: #A8A3AF;
}
</style>