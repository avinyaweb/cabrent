import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { staticSubscriptionWalletHistoryData } from './ViewSubscriptionWalletHistroy';
import InputComponent from '../../../components/inputComponents';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { RiMoneyDollarCircleLine, RiSteeringFill } from 'react-icons/ri';
import { MdHistory } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import SubscriptionWalletHistroyModule from './SubscriptionWalletHistroyModule';

interface FormValues {
    id: string;
    planId: string;
    purchasedBy: string;
    purchasedByRolesId: string;
    driverId: string;
    vehicleId: string;
    planStatus: string;
    startDate: string;
    endDate: string;
    couponHistoryId: string;
    walletHistoryId: string;
    transactionHistoryId: string;
    transactionStatus: string;
    paymentType: string;
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
    }[];
    viewSpecific: boolean;
}

interface InputComponentProps {
    sections: InputSection[];
    // Other props if needed
}

const ViewSpecificSubscriptionWalletHistroy: React.FC = () => {
    const subscriptionData: InputSection[] = [
        {
            viewEndPoint: '/SubscriptionModule/Subscription/ViewSpecificSubscription/1',
            editEndPoint: '/SubscriptionModule/Subscription/EditSubscription/1',
            mainHeader: '',
            details: [
                { name: 'planName', title: 'Plan Name', type: 'text', value: 'Subscription Plan 123' },
                { name: 'planDetails', title: 'Plan Details', type: 'text', value: 'Special Member' },
                { name: 'planAmount', title: 'Plan Amount', type: 'text', value: '99.99 /-' },
                { name: 'planDesc', title: 'Plan Description', type: 'text', value: 'A great subscription plan' },
                { name: 'planDuration', title: 'Plan Duration', type: 'text', value: '12 months' },
                { name: 'planDistance', title: 'Plan Distance', type: 'text', value: 'Unlimited' },
                { name: 'serviceAvailCity', title: 'Service Available City', type: 'text', value: 'City XYZ' },
                { name: 'serviceAvailCity', title: 'Service Available City', type: 'text', value: 'City XYZ' },
                { name: 'planLiveStartTime', title: 'Plan Live Start Time', type: 'text', value: '2024-04-01 12:00 PM' },
                { name: 'SubscriptionAmtDistribution', title: 'Subscription Amt Distribution', type: 'text', value: 'NYC' },
                { name: 'planLiveEndTime', title: 'Plan Live End Time', type: 'text', value: '2025-04-01 12:00 PM' },
                { name: 'Status', title: 'Status', type: 'text', value: 'Approved' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'APPROVED' },
            ],
            viewSpecific: true,
        },
    ];

    const promocodeData: InputSection[] = [
        {
            viewEndPoint: 'PromotionModule/PromocodeMaster/ViewSpecificPromocodeMaster/1',
            editEndPoint: '/PromotionModule/PromocodeMaster/EditPromocodeMaster/1',
            mainHeader: '',
            details: [
                { name: 'promocode', title: 'Promocode', type: 'text', value: 'WELCOME20' },
                { name: 'discountType', title: 'Discount Type', type: 'text', value: 'Percentage' },
                { name: 'validityStart', title: 'Validity Start', type: 'text', value: '2024-03-25' },
                { name: 'validityEnd', title: 'Validity End', type: 'text', value: '2024-03-25' },
                { name: 'startDate', title: 'Start Date', type: 'text', value: '2024-03-25' },
                { name: 'endDate', title: 'End Date', type: 'text', value: '2024-03-25' },
                { name: 'usage', title: 'Usage', type: 'text', value: 'Single use per customer' },
                { name: 'usageLimit', title: 'Usage Limit', type: 'text', value: '100' },
                { name: 'perUserUsageLimit', title: 'Per User Usage Limit', type: 'text', value: '4' },
            ],
            viewSpecific: true,
        },
    ];

    const paymentgateway: InputSection[] = [
        {
            viewEndPoint: '/TransactionModule/PGTransactions/ViewSpecificPGTransactions/1',
            editEndPoint: '/TransactionModule/PGTransactions/EditPGTransactions/1',
            mainHeader: 'PG Transaction',
            details: [
                { name: 'amount', title: 'Amount', type: 'text', value: '100.00' },
                { name: 'userID', title: 'User ID', type: 'text', value: 'user123' },
                { name: 'paymentStatus', title: 'Payment Status', type: 'text', value: 'Sucsess' },
                { name: 'status', title: 'Status', type: 'text', value: 'false' },
            ],
            viewSpecific: true,
        },
    ];

    const walletHistory: InputSection[] = [
        {
            viewEndPoint: '/TransactionModule/WalletHistory/ViewSpecificWalletHistory/1',
            editEndPoint: '/TransactionModule/WalletHistory/EditWalletHistory/1',
            mainHeader: 'Wallet History',
            details: [
                { name: 'walletMaster', title: 'Wallet Master', type: 'text', value: 'Wallet123' },
                { name: 'transactionStatus', title: 'Transaction Status', type: 'text', value: 'Completed' },
                { name: 'pgTransactionID', title: 'PG Transaction ID', type: 'text', value: 'PG-789' },
                { name: 'paymentType', title: 'Payment Type', type: 'text', value: 'Credit Card' },
                { name: 'subscription', title: 'Subscription', type: 'text', value: 'Gold Plan' },
                { name: 'transactionMode', title: 'Transaction Mode', type: 'text', value: 'Online' },
                { name: 'transactionAmount', title: 'Transaction Amount', type: 'text', value: '1000' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'No' },
                { name: 'paidToReferenceType', title: 'Paid To Reference Type', type: 'text', value: 'Type ABC' },
                { name: 'paidByReferenceType', title: 'Paid By Reference Type', type: 'text', value: 'Type XYZ' },
            ],
            viewSpecific: true,
        },
    ];

    const vehicleData: InputSection[] = [
        {
            viewEndPoint: '/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/1',
            editEndPoint: '/BusinessModule/VehicleProfile/EditVehicleProfile/1',
            mainHeader: '',
            details: [
                { name: 'vehicleRegNumber', title: 'Vehicle Registration Number', type: 'text', value: 'ABC123' },
                { name: 'vehicleRTONumber', title: 'Vehicle RTO Number', type: 'text', value: 'RTO456' },
                { name: 'vehicleChassisNumber', title: 'Vehicle Chassis Number', type: 'text', value: 'CHS789' },
                { name: 'serviceType', title: 'Service Type', type: 'text', value: 'Premium' },
                { name: 'vehicleManufacturer', title: 'Vehicle Manufacturer', type: 'text', value: 'Manufacturer XYZ' },
                { name: 'vehicleBodyType', title: 'Vehicle Body Type', type: 'text', value: 'Sedan' },
                { name: 'vehicleCategory', title: 'Vehicle Category', type: 'text', value: 'Category ABC' },
                { name: 'vehicleBrandName', title: 'Vehicle Brand Name', type: 'text', value: 'Brand XYZ' },
                { name: 'vehicleType', title: 'Vehicle Type', type: 'text', value: 'Type ABC' },
                { name: 'vehicleBrandModel', title: 'Vehicle Brand Model', type: 'text', value: 'Model XYZ' },
                { name: 'vehicleColor', title: 'Vehicle Color', type: 'text', value: 'Red' },
                { name: 'vehicleFuelType', title: 'Vehicle Fuel Type', type: 'text', value: 'Petrol' },
                { name: 'serviceCity', title: 'Service City', type: 'text', value: 'City XYZ' },
                { name: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', type: 'text', value: '2020-01-01' },
                { name: 'vehicleRegistrationDate', title: 'Vehicle Registration Date', type: 'text', value: '2021-01-01' },
                { name: 'vehicleAge', title: 'Vehicle Age', type: 'text', value: '3 years' },
                { name: 'country', title: 'Country', type: 'text', value: 'Country ABC' },
                { name: 'state', title: 'State', type: 'text', value: 'State XYZ' },
                { name: 'city', title: 'City', type: 'text', value: 'City XYZ' },
                { name: 'loanBanker', title: 'Loan Banker', type: 'text', value: 'Banker ABC' },
                { name: 'loanAccountNumber', title: 'Loan Account Number', type: 'text', value: '1234567890' },
                { name: 'emiAmount', title: 'EMI Amount', type: 'text', value: '5000' },
                { name: 'emiDate', title: 'EMI Date', type: 'text', value: '1st of every month' },
                { name: 'currentLocation', title: 'Current Location', type: 'text', value: 'Location XYZ' },
                { name: 'allowToRideLater', title: 'Allow To Rider Later', type: 'text', value: 'Yes' },
            ],
            viewSpecific: true,
        },
    ];

    const { subscriptionHistoryId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        planId: '',
        purchasedBy: '',
        purchasedByRolesId: '',
        driverId: '',
        vehicleId: '',
        planStatus: '',
        startDate: '',
        endDate: '',
        couponHistoryId: '',
        walletHistoryId: '',
        transactionHistoryId: '',
        transactionStatus: '',
        paymentType: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [],

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

        // Initialize as an empty array
    };

    const viewSpecific: boolean = true;

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticSubscriptionWalletHistoryData.find((data) => data.id === subscriptionHistoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [subscriptionHistoryId]);

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
            label: 'Subscription History',
            to: 'WalletModule/SubscriptionWalletHistroy/ViewSubscriptionWalletHistroy',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/WalletModule/SubscriptionWalletHistroy/ViewSpecificSubscriptionWalletHistroy' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Subscription History',
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

    const classNames = `${viewSpecific ? 'lg:w-1/2pointer-events-none' : 'lg:w-1/2'}`;

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
                                    <MdHistory className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">History</span>
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
                                    <RiMoneyDollarCircleLine className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Subscription</span>
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
                                    <BiNews className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Promocode</span>
                                </button>
                            )}
                        </Tab> */}
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <GrTransaction className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Transaction</span>
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
                                    <RiSteeringFill className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Vehicle Details</span>
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
                                    <MdHistory className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit log</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <SubscriptionWalletHistroyModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={classNames}>
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            readOnly
                                            className="pointer-events-none form-input w-full"
                                            // value={formData.approvedAt}
                                            value="11:00am"
                                        />
                                    </div>
                                    <div className={classNames}>
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            readOnly
                                            className="pointer-events-none form-input w-full"
                                            // value={formData.approvedBy}
                                            value="Azhar"
                                        />
                                    </div>
                                    <div className={classNames}>
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            readOnly
                                            className="pointer-events-none form-input w-full"
                                            // value={formData.createdAt}
                                            value="12:00pm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={classNames}>
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            readOnly
                                            className="pointer-events-none form-input w-full"
                                            // value={formData.createdBy}
                                            value="fayiz"
                                        />
                                    </div>

                                    <div className={classNames}></div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div>
                                    {subscriptionData.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent dropdown={false} sections={[section]} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel>
                        {/* <Tab.Panel>
                            <div className="mt-5">
                                <div>
                                    {promocodeData.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent dropdown={false} sections={[section]} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel> */}
                        <Tab.Panel>
                            <div className="mt-5">
                                <div>
                                    {paymentgateway.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent dropdown={false} sections={[section]} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5">
                                <div>
                                    {walletHistory.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent dropdown={false} sections={[section]} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-5">
                                <div>
                                    {vehicleData.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent dropdown={false} sections={[section]} />
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

export default ViewSpecificSubscriptionWalletHistroy;
