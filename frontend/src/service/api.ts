import type { todo } from "@/views/HomeView.vue";

class Api {
    url = "http://localhost:3001/todo"

    async getAllTodo() {
        let response = await fetch(this.url)
        let data = await response.json()
        return data
    }

    async createTodo(title: string, content: string) {

        const todo = { title, content };

        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        if (!response.ok) {
            throw new Error('Failed to create todo');
        }

        const data = await response.json();
        console.log('New Todo Created:', data);
    }

    async DeleteTodo(id: string) {

        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }

        console.log('Todo successfully deleted');
    }

    async updateTodo(id: string, obj: todo) {

        const response = await fetch(`${this.url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Failed to update todo');
        }

        const data = await response.json();
        console.log('New Todo Updated:', data);
    }
}

export default new Api()