<template>
    <div class="input-container">
        <div>
            <label for="title">Title</label>
            <input v-model="title" type="text" placeholder="write title..." name="title">
        </div>
        <div>
            <label for="content">Content</label>
            <input v-model="content" type="text" placeholder="write content..." name="content">
        </div>
        <button @click="handleAddTodo">Add Todo</button>
    </div>
</template>

<script setup lang="ts">
import api from '@/service/api';
import { useGetData } from '@/stores/useGetData';
import { ref } from 'vue';

const title = ref<string>('')
const content = ref<string>('')
const store = useGetData()

const handleAddTodo = async () => {
    await api.createTodo(title.value,content.value)
    store.setFlag()
}

</script>

<style scoped>
.input-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
}

.input-container>div {
    width: 100%;
}

input {
    display: block;
    width: 100%;
    border: 1px solid #333;
    outline: none;
    border-radius: 5px;
    padding: 12px;
    font-size: 16px;
    color: #000;
}

label {
    margin-bottom: 1px;
    display: block;
    padding-left: 10px;
    font-weight: 600;
}

button {
    display: block;
    width: 28%;
    border-radius: 5px;
    background-color: rgb(57, 57, 238);
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    border: 0;
    cursor: pointer;
    padding: 12px;
}
</style>