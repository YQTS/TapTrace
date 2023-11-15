<!--  -->
<template>
  <ElColorPicker 
    v-model="color" 
    show-alpha 
    :predefine="predefineColors" 
    @change="changeBgColor"
  />
</template>

<script lang='ts' setup>
import { ElColorPicker } from 'element-plus'
import { ref } from 'vue';

const emits = defineEmits(['changeBgColor'])

const color = ref<string>('')

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff'
])


const changeBgColor = (value: string | null) => {
  emits('changeBgColor', value)
}

defineExpose({
  color
})

</script>
<style scoped>
</style>