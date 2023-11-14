<script setup lang="ts">
import { onMounted } from 'vue';
import { setCssVar } from '@/utils'
import { debounce } from '@/utils/debounce';
import { ref } from 'vue'

setCssVar('--scroll-thumb-color', '#fff')

const app = ref<Elref>()

const updateScrollThumbColor = debounce(() => setCssVar('--scroll-thumb-color', '#fff'), 1000)

onMounted(() => {
  app.value!.onscroll = () => {
    setCssVar('--scroll-thumb-color', '#39c5bcb4')
    updateScrollThumbColor()
  }
})

</script>

<template>
  <div id="app" ref="app">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
#app {
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

#app::-webkit-scrollbar {
    width: 5px;
  }
#app::-webkit-scrollbar-thumb {
  background-color: var(--scroll-thumb-color);
  border-radius: 5px;
  
}
#app::-webkit-scrollbar-thumb:hover {
  background-color: #39c5bcb4;
  border-radius: 5px;
}


</style>
