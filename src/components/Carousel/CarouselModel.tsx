import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface CarouselModelProps {
    event: boolean; // Change the type accordingly
    closeModal: () => void;
    title: string;
    files: string[]; // Change the type accordingly
}

const CarouselModel: React.FC<CarouselModelProps> = ({ event, closeModal, title, files }) => {
    return (
        <>
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
                                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full h-1/2 max-w-2xl my-8 text-black dark:text-white-dark">
                                                <h1 className="text-center font-bold text-xl py-3">{title}</h1>
                                                <div>
                                                    <Carousel>
                                                        {files?.map((imageUrl: any, ind: number) => {
                                                            return (
                                                                <div key={ind} className="p-3 h-[350px] border rounded shadow-xl overflow-hidden flex justify-center items-center">
                                                                    <img src={imageUrl} alt={`${title} img ${ind + 1}`} className="object-cover rounded-md" />
                                                                </div>
                                                            );
                                                        })}
                                                    </Carousel>
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex justify-end items-center gap-5">
                                                        <button onClick={closeModal} type="button" className="btn btn-outline-danger">
                                                            Close
                                                        </button>
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
        </>
    );
};

export default CarouselModel;
