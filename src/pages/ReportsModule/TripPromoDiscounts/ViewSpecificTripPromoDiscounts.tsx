import React, { useState, ChangeEvent, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import TripPromoDiscountsModule from './TripPromoDiscountsModule';

interface FormValues {
    id: string;
    date: string;
    tripNumber: string;
    driverName: string;
    driverPhone: string;
    promoCode: string | null;
    promoAmount: number;
    amountToDriver: number;
    commission: number;
    totalAmount: number;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

const ViewSpecificChannelPartnerAPI: React.FC = () => {
    // future code -->>>
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const { TripPromoDiscountsId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        date: '',
        tripNumber: '',
        driverName: '',
        driverPhone: '',
        promoCode: null,
        promoAmount: 0,
        amountToDriver: 0,
        commission: 0,
        totalAmount: 0,
        updatedHistory: [],
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = StaticData.find((data) => data.id === TripPromoDiscountsId);

    //     // If specificData is found, update the formData state with its values
    //     if (specificData) {
    //         setFormData(specificData); // Set the entire form data
    //     }
    // }, [TripPromoDiscountsId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Trip Promo Discount',
            to: '/ReportsModule/DriverDutyReport/ViewDriverDutyReport',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/ReportsModule/DriverDutyReport/ViewDriverDutyReport' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Trip Promo Discount',
            to: '/ReportsModule/DriverDutyReport/ViewSpecificDriverDutyReport',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/ReportsModule/DriverDutyReport/ViewSpecificDriverDutyReport/${TripPromoDiscountsId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form>
                    <TripPromoDiscountsModule details={formData} onInputChange={handleInputChange} showStatus={true} />

                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                        <div className="lg:w-1/3">
                            <label htmlFor="createdBy" className="block mb-1">
                                Updated History
                            </label>
                            <div className="flex items-center justify-center">
                                <button type="button" className="btn btn-primary w-full" onClick={() => setModal1(true)}>
                                    Updated History
                                </button>
                            </div>
                            <Transition appear show={modal1} as={Fragment}>
                                <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
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
                                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                        <div className="flex items-start justify-center min-h-screen px-4">
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
                                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                        <div className="text-lg font-bold">Updated History</div>
                                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}></button>
                                                    </div>
                                                    <div className="p-5">
                                                        <div className="flex mb-4 font-bold justify-center">
                                                            <div className="w-1/2 text-center pr-2">Updated At</div>
                                                            <div className="w-1/2 text-center pl-2">Updated By</div>
                                                        </div>
                                                        {formData.updatedHistory && formData.updatedHistory.length > 0 ? (
                                                            formData.updatedHistory.map((update, index) => (
                                                                <div key={`updatedHistory-${index}`} className="flex mb-4">
                                                                    <div className="w-1/2 text-center pr-2 border border-gray-400">{update.updatedTime}</div>
                                                                    <div className="w-1/2 text-center pl-2 border border-gray-400">{update.updatedByObjectId || 'N/A'}</div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-center">No update history available</div>
                                                        )}

                                                        <div className="flex justify-center mt-8">
                                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
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

                        <div className="lg:w-1/3"></div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ViewSpecificChannelPartnerAPI;
