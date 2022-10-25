/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { useForm } from "react-hook-form";
import { Todo } from "~/types/Todo";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { createOne } from "~/lib/todos";
import { CgSpinner } from "react-icons/cg";

export const TodoFormModal = qwikify$(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, reset } = useForm<Todo>();

    async function onSubmit(data: Todo) {
        setIsSubmitting(true);
        await createOne({
            title: data.title,
            description: data.description,
            completed: 0,
        });
        setIsSubmitting(false);
        setIsOpen(false);
        reset();
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Create new
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title className="text-white font-bold text-2xl text-center">
                                        Create new todo
                                    </Dialog.Title>
                                    <form
                                        className="flex flex-col gap-4"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <div className="flex w-full flex-col gap-2">
                                            <label
                                                className="text-white font-bold"
                                                htmlFor="title"
                                            >
                                                Title
                                            </label>
                                            <input
                                                className="rounded px-4 py-2 bg-zinc-800 text-white"
                                                type="text"
                                                {...register("title")}
                                            />
                                        </div>
                                        <div className="flex w-full flex-col gap-2">
                                            <label
                                                className="text-white font-bold"
                                                htmlFor="description"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                rows={4}
                                                className="rounded px-4 py-2 bg-zinc-800 text-white resize-none"
                                                {...register("description")}
                                            />
                                        </div>
                                        <input
                                            type="number"
                                            value={1}
                                            hidden
                                            {...register("completed", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                        <button
                                            className="mt-2 bg-zinc-800 text-white hover:bg-zinc-800/30 rounded py-2 px-4 font-bold flex items-center justify-center gap-1"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Create
                                            {isSubmitting && (
                                                <CgSpinner className="animate-spin text-2xl" />
                                            )}
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});
