import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import BookingAmtDistributionModule from './BookingAmtDistributionModule';
import { staticBookingAmtDistributionData } from './ViewBookingAmtDistribution';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';

interface FormValues {
    id: string;
    actualTripCost: string;
    cgst: string;
    sgst: string;
    leadCharges1: string;
    leadCharges2: string;
    convinenceCharge: string;
    adminCharge: string;
    tax: string;
    techCharges: string;
    promotionDiscount: string;
    SPDiscount: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
        remark?: string;
    }[];
}

const ViewSpecificBookingAmtDistribution: React.FC = () => {
    const { bookingAmtDistributionId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        actualTripCost: '',
        cgst: '',
        sgst: '',
        leadCharges1: '',
        leadCharges2: '',
        convinenceCharge: '',
        adminCharge: '',
        tax: '',
        techCharges: '',
        promotionDiscount: '',
        SPDiscount: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [],
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticBookingAmtDistributionData.find((data) => data.id === bookingAmtDistributionId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
            // Set the entire form data
        }
    }, [bookingAmtDistributionId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Booking Amt Distribution',
            to: '/TripModule/BookingAmtDistribution/ViewBookingAmtDistribution',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/BookingAmtDistribution/ViewBookingAmtDistribution' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Booking Amt Distribution',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            {/* <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} /> */}

            <div className="panel mt-6">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                // className={`${
                                //     selected ? 'text-secondary !outline-none before:!w-full' : ''
                                // } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    {/* <TbBrandBooking className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Booking Amt Distribution</span> */}
                                </button>
                            )}
                        </Tab>
                        {/* <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <AiOutlineAudit className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit Log</span>
                                </button>
                            )}
                        </Tab> */}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <BookingAmtDistributionModule details={formData} onInputChange={handleInputChange} showStatus={true} isEditable={isEditable} />

                                {/* <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1 ">
                                            Approved At
                                        </label>

                                        <input name="approvedAt" type="text" id="approvedAt" placeholder="Enter Approved At" className="form-input w-full" value={formData.approvedAt} />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input name="approvedBy" type="text" id="approvedBy" placeholder="Enter Approved By" className="form-input w-full" value={formData.approvedBy} />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input name="createdAt" type="text" id="createdAt" placeholder="Enter Created At" className="form-input w-full" value={formData.createdAt} />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" placeholder="Enter Created By" className="form-input w-full" value={formData.createdBy} />
                                    </div>
                                </div> */}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Audit logs</h2>
                                </div>
                                <AuditLogsTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    );
};

export default ViewSpecificBookingAmtDistribution;
