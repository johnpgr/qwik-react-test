import { component$, useMount$, useStore } from "@builder.io/qwik";
import { getAll } from "~/lib/todos";
import { Todo } from "~/types/Todo";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { qwikify$ } from "@builder.io/qwik-react";

export const CheckIcon = qwikify$(AiOutlineCheck);
export const CloseIcon = qwikify$(AiOutlineClose);
export const MenuButton = qwikify$(BsThreeDotsVertical);

export const TodoList = component$(() => {
    const store = useStore<{
        todos: Todo[] | null;
        isLoading: boolean;
        error?: string;
    }>({
        todos: [] as Todo[],
        isLoading: false,
    });

    useMount$(async () => {
        store.isLoading = true;
        await getAll()
            .then((todos) => {
                store.todos = todos;
                store.isLoading = false;
            })
            .catch((error) => {
                store.error = error.message;
                store.isLoading = false;
            });
    });

    return (
        <div>
            {store.isLoading && <div>Loading...</div>}
            {store.error && <div>{store.error}</div>}
            {store.todos && (
                <ul className="grid grid-cols-4 gap-4 mt-4">
                    {store.todos.map((todo) => (
                        <li
                            className="p-4 rounded bg-white drop-shadow-md flex"
                            key={todo.id}
                        >
                            <div className="flex flex-col h-full">
                                <span className="font-semibold">
                                    {todo.title}
                                </span>
                                <span className="text-sm text-zinc-500">
                                    {todo.description}
                                </span>
                                <span className="mt-auto text-sm">
                                    {new Date(todo.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex flex-col items-center mt-1 justify-between">
                                <button>
                                    <MenuButton className="text-xl" />
                                </button>
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
        </div>
    );
});
