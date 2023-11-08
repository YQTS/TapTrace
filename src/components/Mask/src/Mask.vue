<!--  -->
<template>
    <div :class="['mask', ` bg-[${bgColor}]`]">
        <slot></slot>
    </div>
</template>

<script lang='ts' setup>
const props = defineProps({
    bgColor: {
        type: String,
        default: () => 'red'
    }
})
</script>
<style scoped>
.mask {
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
</style>