import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import AppOfferedMoneyModule from './AppOfferedMoneyModule';
import { staticAppOfferedMoneyData } from './ViewAppOfferedMoney';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { FaSackDollar } from 'react-icons/fa6';
import { AiOutlineAudit } from 'react-icons/ai';
import InputComponent from '@/components/inputComponents';

interface FormValues {
    id: string;
    bankName: string;
    userId: string;
    amount: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

interface InputSection {
    viewEndPoint: string;
    editEndPoint: string;
    mainHeader: string;
    details: {
        name: string;
        title: string;
        type: string;
        value: string;
        options?: string[];
    }[];
    viewSpecific: boolean;
}

interface InputComponentProps {
    sections: InputSection[];
    dropdown: boolean;
}

const ViewSpecificAppOfferedMoney: React.FC = () => {
    const { appOfferedMoneyId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bankName: '',
        userId: '',
        amount: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticAppOfferedMoneyData.find((data) => data.id === appOfferedMoneyId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [appOfferedMoneyId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData({ ...formData, [name]: value });
    };

    //will Use in future
    //     {
    //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //       await updateChannelPartner(channelPartnerId, formData);
    //       console.log('Channel Partner details updated successfully!');
    //     } catch (error: any) {
    //       console.error('Error updating channel partner details:', error.message);
    //     }
    //   };
    //     }

    const driverDetails: InputSection[] = [
        {
            viewEndPoint: '/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/1',
            editEndPoint: '/BusinessModule/ServiceProvider/EditServiceProvider/1',
            mainHeader: 'Driver Details',
            details: [
                { name: 'fullName', title: 'Full Name', type: 'text', value: 'John Doe' },
                { name: 'licenseNumber', title: 'License Number', type: 'text', value: 'ABC123' },
                { name: 'vehicleNumber', title: 'Vehicle Number', type: 'text', value: 'XYZ456' },
                { name: 'contactNumber', title: 'Contact Number', type: 'text', value: '9876543210' },
                { name: 'email', title: 'Email', type: 'email', value: 'john.doe@example.com' },
                { name: 'address', title: 'Address', type: 'text', value: '123 Main St, City, Country' },
                { name: 'dob', title: 'Date of Birth', type: 'date', value: '1990-01-01' },
                { name: 'gender', title: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], value: 'Male' },
                // New fields
                { name: 'serviceProviderType', title: 'Service Provider Type', type: 'text', value: 'TypeA' },
                { name: 'channelPartnerType', title: 'Channel Partner Type', type: 'text', value: 'ChannelA' },
                { name: 'TravelAgency', title: 'Travel Agency', type: 'text', value: 'AgencyX' },
                { name: 'firstName', title: 'First Name', type: 'text', value: 'John' },
                { name: 'middleName', title: 'Middle Name', type: 'text', value: 'Robert' },
                { name: 'lastName', title: 'Last Name', type: 'text', value: 'Doe' },
                // 'email', 'dob', and 'gender' already included
                { name: 'fatherName', title: "Father's Name", type: 'text', value: 'Michael Doe' },
                { name: 'mobileNumber', title: 'Mobile Number', type: 'text', value: '1234567890' },
                { name: 'altMobileNumber', title: 'Alternate Mobile Number', type: 'text', value: '9876543210' },
                { name: 'country', title: 'Country', type: 'text', value: 'USA' },
                { name: 'state', title: 'State', type: 'text', value: 'California' },
                { name: 'city', title: 'City', type: 'text', value: 'Los Angeles' },
                { name: 'dlNumber', title: "Driver's License Number", type: 'text', value: 'DL123456' },
                { name: 'dlValidity', title: "Driver's License Validity", type: 'text', value: '2025-01-01' },
                { name: 'policeVerNumber', title: 'Police Verification Number', type: 'text', value: 'PV789' },
                { name: 'batchNumber', title: 'Batch Number', type: 'text', value: 'B123' },
                { name: 'batchValidity', title: 'Batch Validity', type: 'text', value: '2024-12-31' },
                { name: 'password', title: 'Password', type: 'password', value: 'dummyPassword' }, // Assuming you want to mask this field
                { name: 'permanentAddress', title: 'Permanent Address', type: 'text', value: '456 Park Ave, City, Country' },
                { name: 'presentAddress', title: 'Present Address', type: 'text', value: '789 Elm St, City, Country' },
                { name: 'fk_serviceCity', title: 'Service City', type: 'text', value: 'New York' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'No' },
                { name: 'approvedAt', title: 'Approved At', type: 'datetime-local', value: '2024-03-30T12:00' }, // Assuming datetime format
                { name: 'approvedBy', title: 'Approved By', type: 'text', value: 'Admin' },
                { name: 'createdAt', title: 'Created At', type: 'datetime-local', value: '2024-03-01T09:00' }, // Assuming datetime format
                { name: 'createdBy', title: 'Created By', type: 'text', value: 'System' },
                { name: 'remark', title: 'Remark', type: 'text', value: 'Lorem ipsum dolor sit amet' },
            ],
            viewSpecific: true,
        },
    ];

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
            label: 'App Offered Money',
            to: '/PromotionModule/AppOfferedMoney/ViewAppOfferedMoney',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/AppOfferedMoney/ViewSpecificAppOfferedMoney' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View App Offered Money',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    // handling next & previous Buttons for tabs.
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 6;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
    };

    const walletMaster: InputSection[] = [
        {
            viewEndPoint: '/TransactionModule/WalletMaster/ViewSpecificWalletMaster/1',
            editEndPoint: '/TransactionModule/WalletMaster/EditWalletMaster/1',
            mainHeader: 'Wallet Details',
            details: [
                { name: 'userType', title: 'User Type', type: 'text', value: 'Driver' },
                { name: 'userName', title: 'User Name', type: 'text', value: 'user123' },
                { name: 'amount', title: 'Amount', type: 'number', value: '100.00' },
                { name: 'archive', title: 'Archive', type: 'select', options: ['PENDING', 'APPROVED', 'REJECTED', 'HOLD', 'SUSPENDED'], value: 'PENDING' },
            ],
            viewSpecific: true,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaSackDollar className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">App Offered Money</span>
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
                                    <span className="text-md font-bold">Liked User</span>
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
                                    <span className="text-md font-bold">Wallet Master</span>
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
                                <AppOfferedMoneyModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input name="approvedAt" type="text" id="approvedAt" className="form-input w-full pointer-events-none" value="12:00:34" />
                                    </div>
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input name="approvedBy" type="text" id="approvedBy" className="form-input w-full pointer-events-none" value="shamil" />
                                    </div>
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input name="createdAt" type="text" id="createdAt" className="form-input w-full pointer-events-none" value="12:00:34" />
                                    </div>
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" className="form-input w-full pointer-events-none" value="james" />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <>
                                <div className="panel mt-6">
                                    {driverDetails.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={true} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        </Tab.Panel>
                        <Tab.Panel>
                            <>
                                <div className="panel mt-6">
                                    {walletMaster.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={true} />
                                        </div>
                                    ))}
                                </div>
                            </>
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
                <div className="flex justify-end mt-4">
                    <div className="flex gap-6 mt-4">
                        <button className="btn btn-primary" onClick={handlePrevious} disabled={currentTabIndex === 0}>
                            Previous
                        </button>
                        <button className="btn btn-primary" onClick={handleNext} disabled={currentTabIndex === totalTabs - 1}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewSpecificAppOfferedMoney;
