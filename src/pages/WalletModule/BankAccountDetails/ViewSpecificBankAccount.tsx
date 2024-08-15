import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BankAccountModule from './BankAccountModule';
import { staticBankAccountData } from './ViewBankAccount';
import BankAccountDocumentModule from './BankAccountDocumentModule';
import { CiBank } from 'react-icons/ci';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa6';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import InputComponent from '@/components/inputComponents';

interface FormValues {
    id: string;
    bankName: string;
    fk_userId: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    panNumber: string;
    voterId: string;
    aadhar: string;
    gst: string;
    accountType: string;
    verificationHistory: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    bankVerify: string;
    pgLabel: string;
    pgVerify: string;

    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    userId: string;
    purpose: string;
    amount: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    pgTransactionId: string;
    transactionMode: string;
    walletStatus: string;
    appTransactionId: string;
    platformTransactionId: string;
    bankVerification: string;
    bankLabel: string;
    walletTransactionId: string;
    virtualTransactionId: string;
    paymentStatus: string;
    dateTime: string;
    distributorName: string;
    walletProfileStatus: string;
    walletIdFromUser: string;
    walletIdToUser: string;
    source: string;
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

const ViewSpecificBankAccount: React.FC = () => {
    const viewSpecific = true;
    const { bankAccountId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bankName: '',
        fk_userId: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        panNumber: '',
        voterId: '',
        aadhar: '',
        gst: '',
        accountType: '',
        verificationHistory: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
        bankVerify: '',
        pgLabel: '',
        pgVerify: '',
        fromUser: '',
        toUser: '',
        toUserPhoneNumber: '',
        userId: '',
        purpose: '',
        amount: '',
        walletType: '',
        bankAccountIFSCFrom: '',
        bankAccountIFSCTo: '',
        pgTransactionId: '',
        transactionMode: '',
        walletStatus: '',
        appTransactionId: '',
        platformTransactionId: '',
        bankVerification: '',
        bankLabel: '',
        walletTransactionId: '',
        virtualTransactionId: '',
        paymentStatus: '',
        dateTime: '',
        distributorName: '',
        walletProfileStatus: '',
        walletIdFromUser: '',
        walletIdToUser: '',
        source: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticBankAccountData.find((data) => data.id === bankAccountId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [bankAccountId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            label: 'Bank Account',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Bank Account',
            to: '/TransactionModule/BankAccount/ViewSpecificBankAccount',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/TransactionModule/BankAccount/ViewSpecificBankAccount/${bankAccountId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

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
    return (
        <>
            {/* <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} /> */}
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
                                    <CiBank className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Bank account</span>
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
                                    <IoDocumentTextOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Documents</span>
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
                                    <FaRegUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">User List</span>
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
                        </Tab> */}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <BankAccountModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} />
                                <div>
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="approvedAt" className="block mb-1 ">
                                                Approved At
                                            </label>
                                            <input
                                                name="approvedAt"
                                                type="text"
                                                id="approvedAt"
                                                placeholder="Enter Approved At"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                                readOnly={viewSpecific}
                                                value={formData.approvedAt}
                                            />
                                        </div>
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="approvedBy" className="block mb-1 ">
                                                Approved By
                                            </label>
                                            <input
                                                name="approvedBy"
                                                type="text"
                                                id="approvedBy"
                                                placeholder="Enter Approved By"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                                readOnly={viewSpecific}
                                                value={formData.approvedBy}
                                            />
                                        </div>
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="createdAt" className="block mb-1 ">
                                                Created At
                                            </label>
                                            <input
                                                name="createdAt"
                                                type="text"
                                                id="createdAt"
                                                placeholder="Enter Created At"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                                readOnly={viewSpecific}
                                                value={formData.createdAt}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="createdBy" className="block mb-1 ">
                                                Created By
                                            </label>
                                            <input
                                                name="createdBy"
                                                type="text"
                                                id="createdBy"
                                                placeholder="Enter Created By"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                                readOnly={viewSpecific}
                                                value={formData.createdBy}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <BankAccountDocumentModule details={formData} onInputChange={handleInputChange} showStatus={false} viewSpecific={viewSpecific} />
                            </div>
                        </Tab.Panel>
                        {/* <Tab.Panel>
                            <div className="mt-5">
                                <UserListModule viewSpecific={viewSpecific} />
                            </div>
                        </Tab.Panel> */}

                        {/* <Tab.Panel>
                            <div className=" panel mt-5">
                                <div>
                                    {driverDetails.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={false} />
                                        </div>
                                    ))}
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
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Verification Hisory</h2>
                                </div>
                                <VerificationHistory />
                            </div>
                        </Tab.Panel> */}
                    </Tab.Panels>
                </Tab.Group>
                {/* <div className="flex justify-end mt-4">
                    <div className="flex gap-6 mt-4">
                        <button className="btn btn-primary" onClick={handlePrevious} disabled={currentTabIndex === 0}>
                            Previous
                        </button>
                        <button className="btn btn-primary" onClick={handleNext} disabled={currentTabIndex === totalTabs - 1}>
                            Next
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default ViewSpecificBankAccount;
