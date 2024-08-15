import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import WalletHistoryModule from './WalletHistoryModule';
import { staticWalletHistoryData } from './ViewWalletHistory';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import InputComponent from '@/components/inputComponents';

interface FormValues {
    id: string;
    fk_walletMaster: string;
    paidToReference: string;
    paidByReference: string;
    transactionStatus: string;
    fk_pgTransactionId: string;
    paymentType: string;
    transactionMode: string;
    transactionAmount: string;
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

//wallet data
interface walletData {
    id: string;
    userType: string;
    userName: string;
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

//pg transaction
interface pgTransaction {
    id: string;
    amount: string;
    fk_userid: string;
    transactionMode: string;
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

const ViewSpecificWalletHistory: React.FC = () => {
    const { walletHistoryId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        fk_walletMaster: '',
        paidToReference: '',
        paidByReference: '',
        transactionStatus: '',
        fk_pgTransactionId: '',
        paymentType: '',
        transactionMode: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        transactionAmount: '',
        updatedHistory: [], // Initialize as an empty array
    };
    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    //wallet data
    const initialwalletData: walletData = {
        id: '',
        userType: '',
        userName: '',
        amount: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    // const [walletData, setWalletData] = useState<walletData>(initialwalletData);

    //pgtransaction
    const initialpgTransaction: pgTransaction = {
        id: '',
        amount: '',
        fk_userid: '',
        transactionMode: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [pgTransactionData, setPgTransaction] = useState<pgTransaction>(initialpgTransaction);

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

    const subscriptionData: InputSection[] = [
        {
            viewEndPoint: '/SubscriptionModule/Subscription/ViewSpecificSubscription/1',
            editEndPoint: '/SubscriptionModule/Subscription/EditSubscription/1',
            mainHeader: 'Subscription',
            details: [
                { name: 'planName', title: 'Plan Name', type: 'text', value: 'Subscription Plan 123' },
                { name: 'planDetails', title: 'Plan Details', type: 'text', value: 'Special Member' },
                { name: 'planAmount', title: 'Plan Amount', type: 'text', value: '99.99 /-' },
                { name: 'planDuration', title: 'Plan Duration', type: 'text', value: '12 months' },
                { name: 'planDistance', title: 'Plan Distance', type: 'text', value: 'Unlimited' },
                { name: 'serviceAvailCity', title: 'Service Available City', type: 'text', value: 'City XYZ' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'APPROVED' },
                // Additional fields
                { name: 'gst', title: 'GST', type: 'text', value: '18%' },
                { name: 'ProcessingFee', title: 'Processing Fee', type: 'text', value: '2.5%' },
                { name: 'PlatformName', title: 'Platform Name', type: 'text', value: 'Platform123' },
                { name: 'PlatformAmount', title: 'Platform Amount', type: 'text', value: '5.00 /-' },
                { name: 'VehicleTypeAmount', title: 'Vehicle Type Amount', type: 'text', value: '1.00 /-' },
                { name: 'PGCharges', title: 'PG Charges', type: 'text', value: '1.5%' },
                { name: 'TotalAmount', title: 'Total Amount', type: 'text', value: '108.49 /-' },
                { name: 'planDescription', title: 'Plan Description', type: 'text', value: 'Full access to all services' },
                { name: 'planLiveStartTime', title: 'Plan Live Start Time', type: 'datetime-local', value: '2024-01-01T00:00' },
                { name: 'planLiveEndTime', title: 'Plan Live End Time', type: 'datetime-local', value: '2024-12-31T23:59' },
                { name: 'approvedAt', title: 'Approved At', type: 'datetime-local', value: '2024-02-01T10:00' },
                { name: 'approvedBy', title: 'Approved By', type: 'text', value: 'Admin123' },
                { name: 'createdAt', title: 'Created At', type: 'datetime-local', value: '2024-01-01T09:00' },
                { name: 'createdBy', title: 'Created By', type: 'text', value: 'System' },
            ],
            viewSpecific: true,
        },
    ];

    const bankWithdrawData: InputSection[] = [
        {
            viewEndPoint: '/TransactionModule/BankAccount/ViewSpecificBankAccount/1',
            editEndPoint: '/TransactionModule/BankAccount/EditBankAccount/1',
            mainHeader: 'Bank Withdraw',
            details: [
                { name: 'bankName', title: 'Bank Name', type: 'text', value: 'XYZ Bank' },
                { name: 'accountHolderName', title: 'Account Holder Name', type: 'text', value: 'Alice Johnson' },
                { name: 'accountNumber', title: 'Account Number', type: 'text', value: '0987654321' },
                { name: 'ifscCode', title: 'IFSC Code', type: 'text', value: 'WXYZ0987654' },
                { name: 'branchName', title: 'Branch Name', type: 'text', value: 'Downtown Branch' },
                { name: 'panNumber', title: 'PAN Number', type: 'text', value: '3214569JHSI' },
                { name: 'voterId', title: 'Voter ID', type: 'text', value: '3214569JHSI' }, // Noted the repeated value from PAN, assuming intentional
                { name: 'aadhar', title: 'Aadhar Number', type: 'text', value: '3214569JHSI' }, // Noted the repeated value from PAN, assuming intentional
                { name: 'gst', title: 'GST Number', type: 'text', value: '3214569JHSI' }, // Noted the repeated value from PAN, assuming intentional
                { name: 'accountType', title: 'Account Type', type: 'text', value: 'Checking' },
                { name: 'archive', title: 'Archive Status', type: 'text', value: 'APPROVED' },
                { name: 'approvedAt', title: 'Approved At', type: 'datetime-local', value: '2024-02-01T10:00' },
                { name: 'approvedBy', title: 'Approved By', type: 'text', value: 'Admin123' },
                { name: 'createdAt', title: 'Created At', type: 'datetime-local', value: '2024-01-01T09:00' },
                { name: 'createdBy', title: 'Created By', type: 'text', value: 'System' },
            ],
            viewSpecific: true,
        },
    ];

    const bonusData: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/BonusMaster/ViewSpecificBonusMaster/1',
            editEndPoint: '/PromotionModule/BonusMaster/EditBonusMaster/1',
            mainHeader: 'Bonus Receive',
            details: [
                { name: 'bonusType', title: 'Bonus Type', type: 'text', value: 'Type C' },
                { name: 'amount', title: 'Amount', type: 'text', value: '50' },
                { name: 'bonusCode', title: 'Bonus Code', type: 'text', value: 'DISCOUNT789' },
                { name: 'startDate', title: 'Start Date', type: 'text', value: '2024-03-20' },
                { name: 'endDate', title: 'End Date', type: 'text', value: '2024-06-20' }, // Added field
                { name: 'description', title: 'Description', type: 'text', value: 'Third dummy data' },
                { name: 'message', title: 'Message', type: 'text', value: 'Enjoy your bonus!' }, // Added field
                { name: 'archive', title: 'Archive Status', type: 'text', value: 'ACTIVE' }, // Added field
            ],
            viewSpecific: true,
        },
    ];

    const refferalData: InputSection[] = [
        {
            viewEndPoint: '/promotionModule/referralMaster/viewSpecificReferralMaster/1',
            editEndPoint: '/promotionModule/referralMaster/editReferralMaster/1',
            mainHeader: 'Referral Bonus',
            details: [
                { name: 'fk_bonusId', title: 'Bonus ID', type: 'text', value: 'BONUS1234' }, // Added field
                { name: 'referralByType', title: 'Referral By Type', type: 'text', value: 'Social Media' },
                { name: 'referralBy', title: 'Referral By', type: 'text', value: '@exampleUser' },
                { name: 'messageForInviter', title: 'Message for Inviter', type: 'text', value: 'Join us on our journey and receive exclusive perks!' },
                { name: 'uniqueURL', title: 'Unique URL', type: 'text', value: 'https://example.com/socialReferral789' },
                { name: 'benefit', title: 'Benefit', type: 'text', value: 'Free month subscription' }, // Added field
                { name: 'archive', title: 'Archive Status', type: 'text', value: 'ACTIVE' }, // Added field
            ],
            viewSpecific: true,
        },
    ];

    // conditional render for this dummy data
    let data: InputSection[];

    if (formData.paymentType === 'Subscription') {
        data = subscriptionData;
    } else if (formData.paymentType === 'Bank Withdraw') {
        data = bankWithdrawData;
    } else if (formData.paymentType === 'Bonus Receive') {
        data = bonusData;
    } else {
        data = refferalData;
    }

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticWalletHistoryData.find((data) => data.id === walletHistoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [walletHistoryId]);

    const handleInputChange: (e: React.ChangeEvent<any>) => void = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //   {
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   try {
    //     await updateChannelPartner(channelPartnerId, formData);
    //     console.log('Channel Partner details updated successfully!');
    //   } catch (error: any) {
    //     console.error('Error updating channel partner details:', error.message);
    //   }
    // };
    //   }

    const handleSubmit = () => {
        window.location.reload();
    };

    // const handleCancel = () => {
    //     window.location.reload();
    // };

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
            label: 'Wallet History',
            to: '/TransactionModule/WalletHistory/ViewWalletHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/WalletHistory/ViewWalletHistory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Wallet History',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

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
                                    <span className="text-md font-bold">View Wallet History</span>
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
                                    <span className="text-md font-bold">PG Transaction</span>
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
                                    <span className="text-md font-bold">Payment Type</span>
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
                    {/* Render content based on selected tab */}
                    <Tab.Panel>
                        <>
                            <div className="panel mt-6">
                                <form onSubmit={handleSubmit}>
                                    <WalletHistoryModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="approvedAt" className="block mb-1">
                                                Approved At
                                            </label>
                                            <input name="approvedAt" type="text" id="approvedAt" className="form-input w-full pointer-events-none" value="13:00:02" />
                                        </div>
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="approvedBy" className="block mb-1">
                                                Approved By
                                            </label>
                                            <input name="approvedBy" type="text" id="approvedBy" className="form-input w-full pointer-events-none" value="saami" />
                                        </div>
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="createdAt" className="block mb-1">
                                                Created At
                                            </label>
                                            <input name="createdAt" type="text" id="createdAt" className="form-input w-full pointer-events-none" value="12:30:00" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className="lg:w-1/3 pointer-events-none">
                                            <label htmlFor="createdBy" className="block mb-1">
                                                Created By
                                            </label>
                                            <input name="createdBy" type="text" id="createdBy" className="form-input w-full pointer-events-none" value="sahal" />
                                        </div>

                                        <div className="lg:w-1/3"></div>
                                    </div>
                                </form>
                            </div>
                        </>
                    </Tab.Panel>

                    {/* other tab content */}

                    <Tab.Panel>
                        <>
                            <div className="panel mt-6">
                                <div>
                                    {walletMaster.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={false} />
                                        </div>
                                    ))}
                                    {/* Add any additional content for the subscription page */}
                                </div>
                            </div>
                        </>
                    </Tab.Panel>

                    <Tab.Panel>
                        <>
                            <div className="panel mt-6">
                                <div>
                                    {pgtransaction.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={false} />
                                        </div>
                                    ))}
                                    {/* Add any additional content for the subscription page */}
                                </div>
                            </div>
                        </>
                    </Tab.Panel>
                    <Tab.Panel>
                        <>
                            {/* Render Payment Type content */}
                            {/* walletHistory={true} */}
                            <div className="panel mt-6">
                                <div>
                                    {data.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
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

export default ViewSpecificWalletHistory;
