import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { FiltersMenu } from "~/components/FiltersMenu";
import { TodoFormModal } from "~/components/TodoForm";
import { TodoList } from "~/components/TodoList";
import { Filters } from "~/types/filters";

export default component$(() => {
    const filterStore = useStore({
        currentFilter: "all" as Filters,
    });

    return (
        <div className="px-4 lg:px-0 w-full lg:w-fit lg:container lg:mx-auto flex items-center justify-center flex-col py-8">
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-center w-full">
                <h1 className="text-center lg:text-left text-8xl lg:text-4xl font-bold text-white">
                    Qwik.js Todo app
                </h1>
                <TodoFormModal client:visible />
                <FiltersMenu filterStore={filterStore} client:visible />
            </div>
            <TodoList filterStore={filterStore} />
        </div>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
};
