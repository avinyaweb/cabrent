import React, { useState, Fragment } from 'react';
import ReactQuill from 'react-quill';
import { Dialog, Transition } from '@headlessui/react';

interface FormValues {
    id: string;
    couponCode: string;
    couponName: string;
    couponDesc: string;
    usage: string;
    amount: string;
    benefit: string;
    archive: string;
    value: string;
}

interface CreateCouponModalProps {
    event: boolean;
    closeModal: () => void;
    onSubmit: (formData: FormValues) => void;
}

const CreateCouponModal: React.FC<CreateCouponModalProps> = ({ event, closeModal, onSubmit }) => {
    const initialFormValues: FormValues = {
        id: '',
        couponCode: '',
        couponName: '',
        couponDesc: '',
        usage: '',
        amount: '',
        benefit: '',
        archive: '',
        value: '',
    };

    const [details, setDetails] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };
    // future code -->>>
    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setDetails((prevDetails) => ({
    //         ...prevDetails,
    //         [name]: value,
    //     }));
    // };

    const handleCouponSubmit = () => {
        onSubmit(details);
        closeModal();
    };

    return (
        <div className="mb-5">
            <div className="flex items-center justify-center gap-2">
                <div>
                    <Transition appear show={event} as={Fragment}>
                        <Dialog as="div" open={event} onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div className="fixed inset-0 bg-[black]/60 z-[999]">
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
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-6xl my-8 text-black dark:text-white-dark">
                                            <h1 className="text-2xl mt-2 p-5 font-bold text-center">Create coupon</h1>
                                            <div>
                                                <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                                                    <div className="lg:w-1/3">
                                                        <label htmlFor="couponCode" className="block mb-1 pointer-events-none">
                                                            Coupon Code
                                                        </label>
                                                        <input
                                                            name="couponCode"
                                                            type="text"
                                                            id="couponCode"
                                                            placeholder="Enter Coupon Code"
                                                            className="form-input w-full"
                                                            value={details.couponCode}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="lg:w-1/3">
                                                        <label htmlFor="couponName" className="block mb-1 pointer-events-none">
                                                            Coupon Name
                                                        </label>
                                                        <input
                                                            name="couponName"
                                                            type="text"
                                                            id="couponName"
                                                            placeholder="Enter Coupon Name"
                                                            className="form-input w-full"
                                                            value={details.couponName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="lg:w-1/3">
                                                        <label htmlFor="benefit" className="block mb-1 pointer-events-none">
                                                            Benefit
                                                        </label>
                                                        <input
                                                            name="benefit"
                                                            type="text"
                                                            id="benefit"
                                                            placeholder="Enter Benefit"
                                                            className="form-input w-full"
                                                            value={details.benefit}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                                    <div className="lg:w-1/3">
                                                        <label htmlFor="usage" className="block mb-1 pointer-events-none">
                                                            Usage
                                                        </label>
                                                        <input
                                                            name="usage"
                                                            type="text"
                                                            id="usage"
                                                            placeholder="Enter Usage"
                                                            className="form-input w-full"
                                                            value={details.usage}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="lg:w-1/3">
                                                        <label htmlFor="amount" className="block mb-1 pointer-events-none">
                                                            Amount
                                                        </label>
                                                        <input
                                                            name="amount"
                                                            type="number"
                                                            id="amount"
                                                            placeholder="Enter Amount"
                                                            className="form-input w-full"
                                                            value={details.amount}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="lg:w-1/3">
                                                        <label htmlFor="archive" className="block mb-1 ">
                                                            Archive
                                                        </label>
                                                        <select id="archive" name="archive" className="form-select text-white-dark" required value={details.archive} onChange={handleInputChange}>
                                                            <option value="">Select Archive</option>
                                                            <option value={'PENDING'}>Pending</option>
                                                            <option value={'APPROVED'}>Approved</option>
                                                            <option value={'REJECTED'}>Rejected</option>
                                                            <option value={'HOLD'}>Hold</option>
                                                            <option value={'SUSPENDED'}>Suspended</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className={`lg:w-1/3 mt-4`}>
                                                    <label htmlFor="remarks" className="block mb-1">
                                                        Coupon Description
                                                    </label>
                                                    <ReactQuill theme="snow" value={details.value} className="h-24" />
                                                </div>

                                                <div className="p-5">
                                                    <div className="flex justify-end items-center gap-5">
                                                        <button onClick={closeModal} type="button" className="btn btn-outline-danger">
                                                            Discard
                                                        </button>
                                                        <button type="button" className="btn btn-primary" onClick={handleCouponSubmit}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponModal;
