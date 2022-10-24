/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import { Filters } from "~/types/filters";
import { BiFilter } from "react-icons/bi";

export const FiltersMenu = qwikify$(
    ({ filterStore }: { filterStore: { currentFilter: Filters } }) => {
        const [currentFilter, setCurrentFilter] = useState<Filters>("all");

        useEffect(() => {
            filterStore.currentFilter = currentFilter;
        }, [currentFilter]);

        return (
            <Menu as="div" className="z-10 relative inline-block text-left">
                <div>
                    <Menu.Button className="flex items-center rounded bg-zinc-900 font-semibold text-white py-1 px-4">
                        Filter
                        <BiFilter className="text-2xl ml-2 -mr-2" />
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
                    <div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-b-[10px] border-b-zinc-900 border-r-[5px] border-r-transparent absolute top-0 right-4" />
                        <Menu.Items className="absolute top-2 right-0 w-44 bg-zinc-900 text-white rounded drop-shadow-lg overflow-hidden">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={classNames(
                                            "text-left py-1 px-4 w-full",
                                            {
                                                "bg-zinc-800": active,
                                            }
                                        )}
                                        onClick={async () =>
                                            setCurrentFilter("all")
                                        }
                                    >
                                        All
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={classNames(
                                            "text-left py-1 px-4 w-full",
                                            {
                                                "bg-zinc-800": active,
                                            }
                                        )}
                                        onClick={async () =>
                                            setCurrentFilter("completed")
                                        }
                                    >
                                        Complete only
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={classNames(
                                            "text-left py-1 px-4 w-full",
                                            {
                                                "bg-zinc-800": active,
                                            }
                                        )}
                                        onClick={() =>
                                            setCurrentFilter("uncompleted")
                                        }
                                    >
                                        Uncomplete only
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </div>
                </Transition>
            </Menu>
        );
    }
);
