import axios from "axios";
import { Todo } from "~/types/Todo";

export async function getAll() {
    return axios
        .request<{ results: Todo[] }>({
            url: "https://start.honotest123.workers.dev/todos/list-all",
            method: "GET",
        })
        .then((res) => {
            return res.data.results;
        });
}

export async function deleteOne(id: string) {
    return axios
        .post(`https://start.honotest123.workers.dev/todos/${id}`)
        .then((res) => {
            console.log(res);
            return res.data;
        });
}
