import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { FiltersMenu } from "~/components/FiltersMenu";
import { TodoList } from "~/components/TodoList";
import { Filters } from "~/types/filters";

export default component$(() => {
    const filterStore = useStore({
        currentFilter: "all" as Filters,
    });

    return (
        <div className="container mx-auto flex items-center justify-center flex-col py-8">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-4xl font-bold text-white">
                    Qwik.js Todo app
                </h1>
                <FiltersMenu filterStore={filterStore} client:visible />
            </div>
            <TodoList filterStore={filterStore} />
        </div>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
};
