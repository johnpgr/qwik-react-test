import { component$, Resource, useResource$, useStore } from "@builder.io/qwik";
import { getAll, getCompletedOnly, getUncompletedOnly } from "~/lib/todos";
import { Todo } from "~/types/Todo";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { qwikify$ } from "@builder.io/qwik-react";
import { CgSpinner } from "react-icons/cg";
import { DropMenu } from "./DropMenu";
import { Filters } from "~/types/filters";

export const CheckIcon = qwikify$(AiOutlineCheck);
export const CloseIcon = qwikify$(AiOutlineClose);
export const Spinner = qwikify$(CgSpinner);

export const TodoList = component$(
    ({ filterStore }: { filterStore: { currentFilter: Filters } }) => {
        const store = useStore({
            todoRefetch: 0,
        });

        const data = useResource$<Todo[]>(async ({ track, cleanup }) => {
            track(() => {
                store.todoRefetch, filterStore.currentFilter;
            });

            const controller = new AbortController();
            cleanup(() => controller.abort());

            if (filterStore.currentFilter === "completed")
                return getCompletedOnly();
            if (filterStore.currentFilter === "uncompleted")
                return getUncompletedOnly();
            return getAll();
        });

        return (
            <Resource
                value={data}
                onPending={() => (
                    <div className="h-[80vh] flex items-center justify-center">
                        <Spinner className="text-blue-500 text-4xl animate-spin" />
                    </div>
                )}
                onRejected={(error) => <div>Error: {error.message}</div>}
                onResolved={(todos) => (
                    <ul className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                        {todos.map((todo) => (
                            <li
                                className="p-4 rounded bg-zinc-900 drop-shadow-md flex"
                                key={todo.id}
                            >
                                <div className="flex flex-col h-full">
                                    <span className="text-white font-semibold">
                                        {todo.title}
                                    </span>
                                    <span className="text-sm text-zinc-400">
                                        {todo.description}
                                    </span>
                                    <span className="mt-auto text-sm text-white">
                                        {new Date(
                                            todo.createdAt
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center mt-1 justify-between">
                                    <DropMenu
                                        client:visible
                                        id={todo.id}
                                        store={store}
                                    />
                                    {todo.completed ? (
                                        <CheckIcon className="text-2xl text-green-500" />
                                    ) : (
                                        <CloseIcon className="text-2xl text-red-500" />
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            />
        );
    }
);
