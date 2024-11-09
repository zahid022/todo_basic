<template>
    <li>
        <div class="left">
            <div :class="flag && 'none'">
                <p>{{ item.title }}</p>
                <p>{{ item.content }}</p>
            </div>
            <div :class="!flag && 'none'">
                <div class="inputGroups">
                    <div>
                        <label for="title">Title :</label>
                        <input v-model="inputTitle" name="title" type="text" />
                    </div>
                    <div>
                        <label for="content">Content :</label>
                        <input v-model="inputContent" name="content" type="text" />
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <button @click="() => handleEdit(item.id)">{{ contentEdit }}</button>
            <button @click="() => handleDelete(item.id)">Delete</button>
        </div>
    </li>
</template>

<script setup lang="ts">
import api from '@/service/api';
import { useGetData } from '@/stores/useGetData';
import type { todo } from '@/views/HomeView.vue';
import { ref } from 'vue';

const props = defineProps<{
    item: todo
}>()

const flag = ref<boolean>(false)
const contentEdit = ref<string>("Edit")
const inputTitle = ref<string>(props.item.title)
const inputContent = ref<string>(props.item.content)


const store = useGetData()

const handleDelete = async (id: number) => {
    await api.DeleteTodo(String(id))
    store.setFlag()
}

const handleEdit = async (id: number) => {
    flag.value = !flag.value

    let obj: todo = {
        id,
        title: inputTitle.value,
        content: inputContent.value
    }
    if (flag.value) {
        contentEdit.value = "Submit"
    } else {
        contentEdit.value = "Edit"
        await api.updateTodo(String(id), obj)
        store.setFlag()
    }
}

</script>

<style scoped>
li {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #333;
}

.none {
    display: none;
}

.left {
    width: 60%;
}

.left p {
    margin-bottom: 5px;
    font-size: 16px;
}

.inputGroups {
    display: flex;
    gap: 5px;
}

.left input {
    display: block;
    padding: 8px 5px;
    border: 1px solid #333;
    border-radius: 3px;
    outline: none;
    margin-bottom: 5px;
}

.right {
    width: 39%;
    display: flex;
    justify-content: space-between;
}

.right button {
    display: block;
    width: 48%;
    padding: 12px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
}

.right button:nth-child(1) {
    background-color: green;
}

.right button:nth-child(2) {
    background-color: red;
}
</style>