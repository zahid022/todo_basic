<template>
  <main>
    <div class="container">
      <h1>Todo List</h1>
      <div class="todo">
        <TodoInput />
      </div>
      <div class="todo-list">
        <ul v-if="todo.length > 0">
          <TodoList v-for="item in todo" :item="item" :key="item.id" />
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import api from '@/service/api';
import { useGetData } from '@/stores/useGetData';
import { onMounted, ref, watch } from 'vue';

export interface todo {
  id: number;
  title: string;
  content: string;
}

const todo = ref<todo[]>([])

const store = useGetData()


const getData = async () => {
  todo.value = await api.getAllTodo()
}

onMounted(() => {
  getData()
})

watch(() => store.flag,
  () => {
    getData()
  }
)

</script>

<style scoped>
main {
  padding: 20px 0;
}

h1{
  text-align: center;
  margin-bottom: 40px;
}

.container {
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 0 20px;
}
.todo-list{
  padding-top: 40px;
}
</style>