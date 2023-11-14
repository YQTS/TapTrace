<!--  -->
<template>
    <div>
        <ElDatePicker 
            type="date"
            :size="size" 
            v-model="dateModel" 
            format="YYYY-MM-DD" 
            value-format="YYYY-MM-DD"
            :clearable="false"
            :disabled-date="disabledDate"
            @change="changeDate"
        >
            <template #default="cell">
                <div>{{ cell.text }}</div>
                <span v-if="isDateInRecord(cell)" class=" absolute w-1.5 h-1.5 rounded-full left-[50%] translate-x-[-50%] bg-[var(--theme-color)]"></span>
            </template>
        </ElDatePicker>
    </div>
</template>

<script lang='ts' setup>
import { ElementPlusSize } from '@/types/ElementPlus';
import { ElDatePicker } from 'element-plus';
import { PropType, ref, watch, unref } from 'vue';
import { getRecordDatesWithItems } from '@/utils/record'
import { onMounted } from 'vue';

const props = defineProps({
    size: {
        type: String as PropType<ElementPlusSize>,
        default: 'default'
    },
    dateValue: {
        type: String,
        default: ''
    }
})

const dateModel = ref('')

watch(
    () => props.dateValue,
    () => {
        dateModel.value = props.dateValue
    },
    {
        immediate: true
    }
)

const emits = defineEmits(['changeDate'])
const changeDate = () => {
    emits('changeDate', unref(dateModel))
}

const recordDates = ref<string[]>()
const isDateInRecord = ({dayjs}) => {
    return recordDates.value && recordDates.value.includes(dayjs.format('YYYY-MM-DD'))
}

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}

onMounted(async () => {
    recordDates.value = await getRecordDatesWithItems()
})

</script>
<style>
.el-date-editor {
    --el-date-editor-width: 120px !important;
}

.el-input {
    --el-input-focus-border-color: var(--theme-color) !important;
}
</style>