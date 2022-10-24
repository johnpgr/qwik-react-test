/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteById } from "~/lib/todos";

export const DropMenu = qwikify$(
    ({ id, store }: { id: number; store: { todoRefetch: number } }) => {
        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button>
                        <BsThreeDotsVertical className="text-6xl lg:text-2xl text-white" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-80 flex flex-col gap-4 lg:gap-0 p-4 lg:p-0 lg:w-32 bg-zinc-900 text-white rounded drop-shadow-lg overflow-hidden">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        "text-6xl lg:text-base text-left py-1 px-4 w-full",
                                        {
                                            "bg-zinc-800": active,
                                        }
                                    )}
                                >
                                    Edit
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        "text-6xl lg:text-base text-left py-1 px-4 w-full",
                                        {
                                            "bg-zinc-800": active,
                                        }
                                    )}
                                    onClick={async () =>
                                        deleteById(id).then(
                                            () => store.todoRefetch++
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        );
    }
);
