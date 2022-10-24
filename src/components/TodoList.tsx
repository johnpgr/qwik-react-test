import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { getAll } from "~/lib/todos";
import { Todo } from "~/types/Todo";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { qwikify$ } from "@builder.io/qwik-react";
import { CgSpinner } from "react-icons/cg";

export const CheckIcon = qwikify$(AiOutlineCheck);
export const CloseIcon = qwikify$(AiOutlineClose);
export const MenuButton = qwikify$(BsThreeDotsVertical);
export const Spinner = qwikify$(CgSpinner);

export const TodoList = component$(() => {
    const data = useResource$<Todo[]>(async () => getAll());

    return (
        <div>
            <Resource
                value={data}
                onPending={() => (
                    <Spinner className="text-blue-500 text-2xl animate-spin" />
                )}
                onRejected={(error) => <div>Error: {error.message}</div>}
                onResolved={(todos) => (
                    <ul className="grid grid-cols-4 gap-4 mt-4">
                        {todos.map((todo) => (
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
                                        {new Date(
                                            todo.createdAt
                                        ).toLocaleString()}
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
            />
        </div>
    );
});
