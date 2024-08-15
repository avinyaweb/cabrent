import React from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Tippy from '@tippyjs/react';
import { ImCheckboxChecked } from 'react-icons/im';
import { RiCheckboxCircleFill } from 'react-icons/ri';

interface UpdateArchive {
    event: any;
    closeModal: any;
    onSubmit: any;
}

const CategoryModal: React.FC<UpdateArchive> = ({ event, closeModal, onSubmit }) => {
    const [categoryName, setCategoryName] = useState<string | null>('');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value ?? null); // Provide null as the default value
    };

    const handleSubmit = async () => {
        await onSubmit(categoryName);
        setCategoryName('');
        closeModal();
    };

    return (
        <>
            <Transition appear show={event} as={Fragment}>
                <Dialog as="div" open={event} onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <h1 className="text-2xl mt-2 p-5 font-bold text-center">Create Category</h1>
                                    <div className="p-3">
                                        <div className="lg:w-1/3">
                                            <label htmlFor="createCategory" className="block mb-1 text-md font-bold">
                                                Category Name
                                            </label>
                                            <input
                                                name="createCategory"
                                                type="text"
                                                id="createCategory"
                                                placeholder="Enter Category "
                                                className="form-input w-full"
                                                value={categoryName ?? ''}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>

                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                                                Discard
                                            </button>
                                            <button disabled={!categoryName} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default CategoryModal;
