import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { TodoList } from "~/components/TodoList";

export default component$(() => {
    return (
        <div class="container mx-auto flex items-center justify-center flex-col py-8">
            <h1 class="text-4xl font-bold">Qwik.js Todo app</h1>
            <TodoList />
        </div>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
};
