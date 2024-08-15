import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import RequestMoneyModule from './RequestMoneyModule';
import { staticMoneyRequestData } from './ViewRequestMoney';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import InputComponent from '@/components/inputComponents';

interface FormValues {
    id: string;
    moneyRequestType: string;
    amount: string;
    fk_toPerson: string;
    fk_fromPerson: string;
    remarks: string;
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

const ViewSpecificRequestMoney: React.FC = () => {
    const { moneyRequestId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        moneyRequestType: '',
        amount: '',
        fk_toPerson: '',
        fk_fromPerson: '',
        remarks: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    const [modal1, setModal1] = useState(false);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticMoneyRequestData.find((data) => data.id === moneyRequestId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [moneyRequestId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //   {
    //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //       await updateChannelPartner(channelPartnerId, formData);
    //       console.log('Channel Partner details updated successfully!');
    //     } catch (error: any) {
    //       console.error('Error updating channel partner details:', error.message);
    //     }
    //   };
    // }

    const walletHistory: InputSection[] = [
        {
            viewEndPoint: '/TransactionModule/WalletHistory/ViewSpecificWalletHistory/1',
            editEndPoint: '/TransactionModule/WalletHistory/EditWalletHistory/1',
            mainHeader: 'Wallet History',
            details: [
                { name: 'walletMaster', title: 'Wallet Master', type: 'text', value: 'Wallet123' },
                { name: 'paidToReference', title: 'Paid To Reference', type: 'text', value: 'RecipientABC' },
                { name: 'paidByReference', title: 'Paid By Reference', type: 'text', value: 'PayerXYZ' },
                { name: 'transactionStatus', title: 'Transaction Status', type: 'text', value: 'Completed' },
                { name: 'pgTransactionID', title: 'PG Transaction ', type: 'text', value: 'PG-789' },
                { name: 'paymentType', title: 'Payment Type', type: 'text', value: 'Direct' },
                { name: 'transactionMode', title: 'Transaction Mode', type: 'text', value: 'Online' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'PENDING' },
                { name: 'paidToRefrenceType', title: 'Paid To Reference Type', type: 'text', value: 'BANK' },
                { name: 'paidByRefrenceType', title: 'Paid By Reference Type', type: 'text', value: 'WALLET' },
                { name: 'transactionAmount', title: 'Transaction Amount', type: 'text', value: '$1000' },
            ],
            viewSpecific: true,
        },
    ];

    const pgtransaction: InputSection[] = [
        {
            viewEndPoint: '/TransactionModule/PGTransactions/ViewSpecificPGTransactions/1',
            editEndPoint: '/TransactionModule/PGTransactions/EditPGTransactions/1',
            mainHeader: 'PG Transaction',
            details: [
                { name: 'amount', title: 'Amount', type: 'text', value: '100' },
                { name: 'status', title: 'Status', type: 'text', value: 'Pending' },
                { name: 'fk_userid', title: 'User Name', type: 'text', value: 'shahul' },
                { name: 'transactionMode', title: 'Transaction Mode', type: 'text', value: 'QR' },
            ],
            viewSpecific: true,
        },
    ];

    const handleSubmit = () => {
        window.location.reload();
    };

    // const handleCancel = () => {
    //   window.location.reload();
    // };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //   setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Request Money',
            to: '/WalletModule/InternerUserTransaction/RequestMoney/ViewRequestMoney',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${currentPath === '/TransactionModule/MoneyRequest/ViewMoneyRequest' ? 'text-blue-600' : ''}`,
        },
        {
            label: 'View Request Money',
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
                                    <span className="text-md font-bold">View Request Money</span>
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
                                    <span className="text-md font-bold">Wallet History</span>
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
                                    <span className="text-md font-bold">PG Trasaction</span>
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
                            <form onSubmit={handleSubmit}>
                                <RequestMoneyModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-12">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            placeholder="Enter Approved At"
                                            className="form-input w-full pointer-events-none"
                                            value={formData.approvedAt}
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
                                            placeholder="Enter Approved By"
                                            className="form-input w-full pointer-events-none"
                                            value={formData.approvedBy}
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
                                            placeholder="Enter Created At"
                                            className="form-input w-full pointer-events-none"
                                            value={formData.createdAt}
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
                                            placeholder="Enter Created By"
                                            className="form-input w-full pointer-events-none"
                                            value={formData.createdBy}
                                        />
                                    </div>

                                    <div className="lg:w-1/3"></div>
                                </div>
                            </form>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className=" panel mt-5">
                            <div>
                                {walletHistory.map((section, index) => (
                                    <div key={index}>
                                        <InputComponent sections={[section]} dropdown={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className=" panel mt-5">
                            <div>
                                {pgtransaction.map((section, index) => (
                                    <div key={index}>
                                        <InputComponent sections={[section]} dropdown={false} />
                                    </div>
                                ))}
                            </div>
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

export default ViewSpecificRequestMoney;
