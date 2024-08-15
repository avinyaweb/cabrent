import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import PGTransactionsModulePage from './PGTransactionsModulePage';
import { staticPGTransactionsData } from './ViewPGTransactionsPage';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';

interface FormValues {
    id: string;
    amount: string;
    fk_userid: string;
    transactionMode: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;

    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    userId: string;
    purpose: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    pgTransactionId: string;
    walletStatus: string;
    appTransactionId: string;
    platformTransactionId: string;
    bankVerification: string;
    bankLabel: string;
    walletTransactionId: string;
    virtualTransactionId: string;
    dateTime: string;
    distributorName: string;
    walletProfileStatus: string;
    walletIdFromUser: string;
    walletIdToUser: string;
    source: string;

    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];

    purposeOfTransaction: string;
    creditAndDebit: string;

    paymentModule: string;
    paymentStatus: string;
    coupon: string;
    thirdParty: string;
}

const ViewSpecificPGTransactionsPage: React.FC = () => {
    const viewSpecific = true;
    const { pgTransactionsId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        amount: '',
        fk_userid: '',
        transactionMode: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [],
        purposeOfTransaction: '',

        fromUser: '',
        toUser: '',
        toUserPhoneNumber: '',
        userId: '',
        purpose: '',
        walletType: '',
        bankAccountIFSCFrom: '',
        bankAccountIFSCTo: '',
        pgTransactionId: '',
        walletStatus: '',
        appTransactionId: '',
        platformTransactionId: '',
        bankVerification: '',
        bankLabel: '',
        walletTransactionId: '',
        virtualTransactionId: '',
        dateTime: '',
        distributorName: '',
        walletProfileStatus: '',
        walletIdFromUser: '',
        walletIdToUser: '',
        source: '',

        creditAndDebit: '',
        paymentModule: '',
        paymentStatus: '',
        coupon: '',
        thirdParty: '',
        // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticPGTransactionsData.find((data) => data.id === pgTransactionsId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [pgTransactionsId]);

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
            label: 'PG Transactions',
            to: '/TransactionModule/PGTransactions/ViewPGTransactions',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/PGTransactions/ViewPGTransactions' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View PG Transactions',
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

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                <div className="panel mt-6">
                    <Tab.List className="mt-3 flex flex-wrap ">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">View PG Transaction</span>
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
                                    <span className="text-md font-bold">Audit Logs</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                </div>

                <Tab.Panels>
                    <Tab.Panel>
                        <div className="panel mt-6">
                            <form>
                                <PGTransactionsModulePage details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} viewSpecificEdit={false} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={formData.approvedAt}
                                            value="2024-01-05T12:00:00Z"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={formData.approvedBy}
                                            value="Admin"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={formData.createdAt}
                                            value="2024-01-05T08:30:00Z"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={formData.createdBy}
                                            value="Junaid"
                                        />
                                    </div>

                                    <div className="lg:w-1/3"></div>
                                </div>
                            </form>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className=" panel mt-2">
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2">Updated Hisory</h2>
                            </div>
                            <UpdatedHistoryTable />
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2">Log Files</h2>
                            </div>
                            <AuditLogsTable />
                            {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className='mb-2'>VerificationHisory</h2>
                                </div>
                                <VerificationHistory /> */}
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
        </>
    );
};

export default ViewSpecificPGTransactionsPage;
