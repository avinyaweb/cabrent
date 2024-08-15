import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

interface ShowBankPopUp {
    event: any;
    closeModal: any;
    onSubmit: any;
}

const BankPopup: React.FC<ShowBankPopUp> = ({ event, closeModal, onSubmit }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [walletType, setWalletType] = useState<string>('Virtual wallet');
    const [transactionType, setTransactionType] = useState<string>('Debit');
    const [amount, setAmount] = useState<string>('');

    const handleButtonClick = (name: string) => {
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
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-2xl h-[70vh] text-black dark:text-white-dark">
                                    <h1 className="text-2xl mt-2 p-5 font-bold text-center">Wallet Transaction</h1>
                                    <div className="p-5 flex flex-col items-center">
                                        <div className="flex items-center w-full mb-4">
                                            <div
                                                className={`flex-1 p-4 ${selectedItem === 'Virtual Wallet Balance' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                                onClick={() => handleButtonClick('Virtual Wallet Balance')}
                                            >
                                                Virtual Wallet Balance: 2000
                                            </div>
                                            <div
                                                className={`flex-1 p-4 ${selectedItem === 'Real Wallet Balance' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                                                onClick={() => handleButtonClick('Real Wallet Balance')}
                                            >
                                                Real Wallet Balance: 4000
                                            </div>
                                        </div>

                                        <div className="flex w-full mb-4 space-x-4">
                                            <div className="w-1/2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Type</label>
                                                <select className="form-select w-full" value={walletType} onChange={(e) => setWalletType(e.target.value)}>
                                                    <option value="Virtual wallet">Virtual Wallet</option>
                                                    <option value="Real wallet">Real Wallet</option>
                                                </select>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                                                <select className="form-select w-full" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                                                    <option value="Debit">Debit</option>
                                                    {walletType === 'Real wallet' && <option value="Credit">Credit</option>}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Add Money</label>
                                            <input type="text" className="form-input w-full" placeholder="Add Money" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                        </div>
                                        <div className="flex justify-end items-center mt-4 w-full">
                                            <button type="button" className="btn btn-outline-danger mr-2" onClick={closeModal}>
                                                Discard
                                            </button>
                                            <button disabled={!selectedItem} type="button" className="btn btn-primary" onClick={handleSubmit}>
                                                Proceed
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

export default BankPopup;
