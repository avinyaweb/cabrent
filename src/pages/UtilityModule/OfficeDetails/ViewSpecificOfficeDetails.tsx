import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { getDocumentTypeById } from '@/services/UtilityServices/DocumentTypeServices';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import OfficeDetailsModule from './OfficeDetailsModule';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { FaRegAddressCard } from 'react-icons/fa6';

interface FormValues {
    id: string;
    Actions: string;
    Address: string;
    Mail: string;
    Phone: string;
    line_1: string;
    line_2: string;
    landmark: string;
    state: string;
    city: string;
    zip: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
}

// Define static data
const staticData = [
    {
        id: '1',
        Actions: 'Update',
        Address: '123 Main St',
        Mail: 'example@mail.com',
        Phone: '123-456-7890',
    },
    {
        id: '2',
        Actions: 'Delete',
        Address: '456 Elm St',
        Mail: 'test@mail.com',
        Phone: '987-654-3210',
    },
    {
        id: '3',
        Actions: 'Create',
        Address: '789 Oak St',
        Mail: 'info@mail.com',
        Phone: '555-555-5555',
    },
];

const ViewSpecificOfficeDetails: React.FC = () => {
    // future code -->>>
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const viewSpecific = true;
    const { OfficeDetailsId } = useParams();

    const initialFormValues: FormValues = {
        id: '',
        Actions: '',
        Address: '',
        Mail: '',
        Phone: '',
        line_1: '',
        line_2: '',
        landmark: '',
        state: '',
        city: '',
        zip: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
    };

    const [OfficeDetails, setOfficeDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //   const fetchChannelPartnerDetails = async () => {
    //     try {
    //       const response = await getDocumentTypeById(documentTypeId);
    //       console.log('Fetched Data', response);
    //       setDocumentTypeDetails(response.data.DocumentType);
    //     } catch (error: any) {
    //       console.error('Error fetching channel partner details:', error.message);
    //     }
    //   };

    //   fetchChannelPartnerDetails();
    // }, [documentTypeId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // future code -->>
        // const { name, value } = e.target;
        //setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
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
            label: 'Office Details',
            to: '/UtilityModule/OfficeDetails/ViewOfficeDetails',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/OfficeDetails/ViewOfficeDetails' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Details',
            to: `/UtilityModule/OfficeDetails/ViewSpecificOfficeDetails/${OfficeDetailsId}`,
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UtilityModule/OfficeDetails/ViewSpecificOfficeDetails${OfficeDetailsId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaRegAddressCard className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Office Details</span>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
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
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <OfficeDetailsModule details={OfficeDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={OfficeDetails?.approvedAt}
                                            value={'655c41a09164533a72584489'}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={OfficeDetails?.approvedBy}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={OfficeDetails?.createdAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            value={OfficeDetails?.createdBy}
                                        />
                                    </div>
                                </div>
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

export default ViewSpecificOfficeDetails;
