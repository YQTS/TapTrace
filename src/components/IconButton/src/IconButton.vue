<!--  -->
<template>
    <div>
        <ElTooltip effect="dark" placement="bottom" :content="content">
            <Icon :icon="icon" :size="size" />
        </ElTooltip>
    </div>
</template>

<script lang='ts' setup>
import { Icon } from '@/components/Icon'
import { ElTooltip } from 'element-plus';

const props = defineProps({
    content: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    size: {
        type: Number,
        default: 15
    }
})
</script>
<style scoped></style>