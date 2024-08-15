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

const UpdateServiceTypePopUp: React.FC<UpdateArchive> = ({ event, closeModal, onSubmit }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const tableData = [
        {
            id: 1,
            name: 'Daily',
            selected: true,
        },
        {
            id: 2,
            name: 'Rental',
        },
        {
            id: 3,
            name: 'Outstation',
        },
    ];

    const handleCheckboxChange = (name: string) => {
        setSelectedItem(name);
    };

    const handleSubmit = async () => {
        const id = '1';
        await onSubmit(selectedItem, id);
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
                                    <h1 className="text-2xl mt-2 p-5 font-bold text-center">Update Archive</h1>
                                    <div className="p-3">
                                        <div className="table-responsive mb-5">
                                            <div className="mt-4">
                                                {tableData.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className={`flex items-center justify-between cursor-pointer py-2 px-4 mb-2 rounded-md transition-colors ${
                                                            selectedItem === item.name ? 'bg-blue-100 dark:bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                                        }`}
                                                        onClick={() => handleCheckboxChange(item.name)}
                                                    >
                                                        <span className="font-bold">{item.name}</span>
                                                        {selectedItem === item.name && <RiCheckboxCircleFill className="h-7 w-7 text-blue-500" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                                                Discard
                                            </button>
                                            <button disabled={!selectedItem} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleSubmit}>
                                                Save
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

export default UpdateServiceTypePopUp;
