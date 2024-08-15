import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Tab } from '@headlessui/react';
import AppOfferedMoneyHistoryModule from './AppOfferedMoneyHistoryModule';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { staticAppOfferedMoneyHistoryData } from './ViewAppOfferedMoneyHistory';
import InputComponent from '@/components/inputComponents';
import { RiSecurePaymentLine } from 'react-icons/ri';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { AiOutlineAudit } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';

interface FormValues {
    id: string;
    fk_applicationOfferedMoney: string;
    fk_couponHistoryId: string;
    fk_bonusHistoryId: string;
    fk_refferalHistoryId: string;
    fk_promocodeHistoryId: string;
    amount: string;
    paymentType: string;
    paidToRefrence: string;
    paidToRefrenceType: string;
    paidByRefrence: string;
    paidByRefrenceType: string;
    transactionStatus: string;
    transactionMode: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        remark: string;
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

const ViewSpecificAppOfferedMoneyHistory: React.FC = (viewSpecific) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { appOfferedMoneyHistoryId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        fk_applicationOfferedMoney: '',
        fk_couponHistoryId: '',
        fk_bonusHistoryId: '',
        fk_refferalHistoryId: '',
        fk_promocodeHistoryId: '',
        amount: '',
        paymentType: '',
        paidToRefrence: '',
        paidToRefrenceType: '',
        paidByRefrence: '',
        paidByRefrenceType: '',
        transactionStatus: '',
        transactionMode: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the appOfferedMoneyHistoryId
        const specificData = staticAppOfferedMoneyHistoryData.find((data) => data.id === appOfferedMoneyHistoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [appOfferedMoneyHistoryId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
            label: 'Application Offered Money History',
            to: '/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Application Offered Money History',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    //some conditional render

    const applicationOfferedMoney: InputSection[] = [
        {
            viewEndPoint: '/applicationModule/offeredMoney/viewSpecificOfferedMoney/1',
            editEndPoint: '/applicationModule/offeredMoney/editOfferedMoney/1',
            mainHeader: 'Offered Money',
            details: [
                { name: 'bankName', title: 'Bank Name', type: 'text', value: 'ABC Bank' },
                { name: 'UserName', title: 'User Name', type: 'text', value: 'john_doe' },
                { name: 'amount', title: 'Amount', type: 'text', value: '500' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'PENDING' },
            ],
            viewSpecific: true,
        },
    ];
    //FOUR SECTION DUMMY DATA FOR LINKED PROMOTION

    const bonusHistory: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/BonusHistory/ViewSpecificBonusHistory/1',
            editEndPoint: '/PromotionModule/BonusHistory/EditBonusHistory/1',
            mainHeader: 'Bonus History',
            details: [
                { name: 'bonusId', title: 'Bonus', type: 'text', value: 'bonus 123' },
                { name: 'userId', title: 'User ID', type: 'text', value: '123' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'PENDING' },
            ],
            viewSpecific: true,
        },
    ];

    const couponHistory: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/CouponHistory/ViewSpecificCouponHistory/1',
            editEndPoint: '/PromotionModule/CouponHistory/EditCouponHistory/1',
            mainHeader: 'Coupon History',
            details: [
                { name: 'couponId', title: 'Coupon ', type: 'text', value: 'coupon 123' },
                { name: 'driverId', title: 'Driver ID', type: 'text', value: '456' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'PENDING' },
            ],
            viewSpecific: true,
        },
    ];

    const referralHistory: InputSection[] = [
        {
            viewEndPoint: '/promotionModule/refferalHistory/viewSpecificRefferalHistory/1',
            editEndPoint: '/PromotionModule/RefferalHistory/EditRefferalHistory/1',
            mainHeader: 'Referral History',
            details: [
                { name: 'invitedBy', title: 'Invited By', type: 'text', value: 'John Smith' },
                { name: 'invitedToType', title: 'Invited To Type', type: 'text', value: 'Driver' },
                { name: 'referralHistoryStatus', title: 'Referral History Status', type: 'text', value: 'Pending' },
                { name: 'referralMaster', title: 'Referral Master', type: 'text', value: '123456' },
                { name: 'invitedByUser', title: 'Invited By User', type: 'text', value: 'jsmith@example.com' },
                { name: 'invitedToUser', title: 'Invited To User', type: 'text', value: 'johndoe@example.com' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'PENDING' },
            ],
            viewSpecific: true,
        },
    ];

    const promocodeHistory: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/PromocodeHistory/ViewSpecificPromocodeHistory/1',
            editEndPoint: '/PromotionModule/PromocodeHistory/EditPromocodeHistory/1',
            mainHeader: 'Promocode History',
            details: [
                { name: 'promocodeId', title: 'Promocode ', type: 'text', value: 'promocode 123' },
                { name: 'driverId', title: 'Driver ID', type: 'text', value: '789' },
                { name: 'promocodeStatus', title: 'Promocode Status', type: 'text', value: 'Active' },
                { name: 'archive', title: 'Archive', type: 'text', value: 'PENDING' },
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

    //will use in future
    //   const bonusData: InputSection[] = [
    //     {
    //       viewEndPoint: '/PromotionModule/BonusMaster/ViewSpecificBonusMaster/1',
    //       editEndPoint: '/PromotionModule/BonusMaster/EditBonusMaster/1',
    //       mainHeader: 'Bonus Receive',
    //       details: [
    //         { name: 'bonusType', title: 'Bonus Type', type: 'text', value: 'Type C' },
    //         { name: 'amount', title: 'Amount', type: 'text', value: '50' },
    //         { name: 'bonusCode', title: 'Bonus Code', type: 'text', value: 'DISCOUNT789' },
    //         { name: 'startDate', title: 'Start Date', type: 'text', value: '2024-03-20' },
    //         { name: 'endDate', title: 'End Date', type: 'text', value: '2024-06-20' }, // Added field
    //         { name: 'description', title: 'Description', type: 'text', value: 'Third dummy data' },
    //         { name: 'message', title: 'Message', type: 'text', value: 'Enjoy your bonus!' }, // Added field
    //         { name: 'archive', title: 'Archive Status', type: 'text', value: 'ACTIVE' }, // Added field
    //       ],
    //       viewSpecific: true,
    //     },
    //   ];

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

    const couponBonus: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/CouponMaster/ViewSpecificCouponMaster/1',
            editEndPoint: '/PromotionModule/CouponMaster/EditCouponMaster/1',
            mainHeader: 'Coupon Bonus',
            details: [
                { name: 'couponCode', title: 'Coupon Code', type: 'text', value: 'SAVE20' },
                { name: 'couponName', title: 'Coupon Name', type: 'text', value: 'Discount 20%' },
                { name: 'couponDesc', title: 'Coupon Description', type: 'text', value: 'Get a 20% discount on selected items' },
                { name: 'usage', title: 'Usage', type: 'text', value: 'Single use per customer' },
                { name: 'amount', title: 'Amount', type: 'text', value: '20' },
                { name: 'benefit', title: 'Benefit', type: 'text', value: 'Save up to 20% on your next purchase' }, // Added field
                { name: 'archive', title: 'Archive', type: 'text', value: 'ACTIVE' }, // Added field
            ],
            viewSpecific: true,
        },
    ];

    const promocodeData: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/PromocodeMaster/ViewSpecificPromocodeMaster/1',
            editEndPoint: '/PromotionModule/PromocodeMaster/EditPromocodeMaster/1',
            mainHeader: 'Promo Code',
            details: [
                { name: 'promoCode', title: 'Promo Code', type: 'text', value: 'FREEDELIVERY' },
                { name: 'discountType', title: 'Discount Type', type: 'text', value: 'Fixed' },
                { name: 'validityStart', title: 'Validity Start', type: 'text', value: '2024-02-15' },
                { name: 'validityEnd', title: 'Validity End', type: 'text', value: '2024-03-15' },
                { name: 'startTime', title: 'Start Time', type: 'text', value: '09:00' },
                { name: 'endTime', title: 'End Time', type: 'text', value: '21:00' },
                { name: 'usage', title: 'Usage', type: 'text', value: 'Unlimited use' },
                // Additional fields
                { name: 'usageLimit', title: 'Usage Limit', type: 'text', value: '500' },
                { name: 'perUsageLimit', title: 'Per Usage Limit', type: 'text', value: '5' },
                { name: 'fk_serviceCity', title: 'Service City', type: 'text', value: 'Los Angeles' },
                { name: 'tripType', title: 'Trip Type', type: 'text', value: 'One Way' },
                { name: 'days', title: 'Days', type: 'text', value: 'All days' },
                { name: 'archive', title: 'Archive Status', type: 'text', value: 'APPROVED' },
            ],
            viewSpecific: true,
        },
    ];

    // Conditional render for this dummy data
    let data: InputSection[];

    if (formData.paymentType === 'Subscription') {
        data = subscriptionData;
    } else if (formData.paymentType === 'Bank Withdraw') {
        data = bankWithdrawData;
    } else if (formData.paymentType === 'Pomocode') {
        data = promocodeData;
    } else if (formData.paymentType === 'Referral Bonus') {
        data = refferalData;
    } else if (formData.paymentType === 'Coupon Bonus') {
        data = couponBonus;
    } else {
        data = promocodeData;
    }

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
                                    <span className="text-md font-bold"> App Offered Money History</span>
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
                                    <RiSecurePaymentLine className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                    {/* <RiSecurePaymentLine className="w-5 h-5 ltr:mr-2 rtl:ml-2" /> */}
                                    <span className="text-md font-bold">Application Offered Money</span>
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
                                    {/* <RiSecurePaymentLine className="w-5 h-5 ltr:mr-2 rtl:ml-2" /> */}
                                    <span className="text-md font-bold">Linked Promotion</span>
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
                                <AppOfferedMoneyHistoryModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input name="approvedAt" type="text" id="approvedAt" className="form-input w-full" value={formData.approvedAt} />
                                    </div>
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input name="approvedBy" type="text" id="approvedBy" className="form-input w-full" value={formData.approvedBy} />
                                    </div>
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input name="createdAt" type="text" id="createdAt" className="form-input w-full pointer-events-none" value={formData.createdAt} />
                                    </div>
                                    <div className="lg:w-1/4 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" className="form-input w-full pointer-events-none" value={formData.createdBy} />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className=" mt-6">
                                <div>
                                    {data.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className=" mt-6">
                                <div>
                                    {applicationOfferedMoney.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <>
                                <div className="panel mt-6">
                                    <div>
                                        {bonusHistory.map((section, index) => (
                                            <div key={index}>
                                                <InputComponent sections={[section]} dropdown={false} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <hr className="mt-10" />
                                <div className="panel mt-6">
                                    <div>
                                        {couponHistory.map((section, index) => (
                                            <div key={index}>
                                                <InputComponent sections={[section]} dropdown={false} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <hr className="mt-10" />
                                <div className="panel mt-6">
                                    <div>
                                        {referralHistory.map((section, index) => (
                                            <div key={index}>
                                                <InputComponent sections={[section]} dropdown={false} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <hr className="mt-10" />
                                <div className=" panel mt-6">
                                    <div>
                                        {promocodeHistory.map((section, index) => (
                                            <div key={index}>
                                                <InputComponent sections={[section]} dropdown={false} />
                                            </div>
                                        ))}
                                    </div>
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

export default ViewSpecificAppOfferedMoneyHistory;
