import { Todo } from "~/types/Todo";

export async function getAll() {
    return fetch("https://start.honotest123.workers.dev/todos/list-all").then(
        async (res) => res.json().then((data) => data.results)
    );
}

export async function deleteById(id: number) {
    return fetch(
        `https://start.honotest123.workers.dev/todos/delete?id=${id}`,
        {
            method: "POST",
        }
    ).then(async (res) => res.json().then((data) => data.results));
}

export async function getCompletedOnly() {
    return fetch("https://start.honotest123.workers.dev/todos/completed").then(
        async (res) => res.json().then((data) => data.results)
    );
}

export async function getUncompletedOnly() {
    return fetch(
        "https://start.honotest123.workers.dev/todos/uncompleted"
    ).then(async (res) => res.json().then((data) => data.results));
}

export async function createOne({
    title,
    completed,
    description,
}: {
    title: string;
    completed: number;
    description: string;
}) {
    return fetch("https://start.honotest123.workers.dev/todos/new", {
        method: "POST",
        body: JSON.stringify({
            title,
            description,
            completed,
        }),
    }).then(async (res) => res.json().then((data) => data.results));
}
