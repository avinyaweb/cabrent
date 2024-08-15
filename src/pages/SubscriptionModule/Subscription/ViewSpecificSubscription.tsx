import React, { useState, Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import SubscriptionLayout from './SubscriptionLayout';
import { staticSubscriptionData } from './ViewSubscription';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { BiTransfer } from 'react-icons/bi';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { DataTableColumn } from 'mantine-datatable';
import { staticSubscriptionAmtDistributionData } from '../SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { successAlert } from '@/utils/Toast';
import SubscriptionHistoryReport from '@/components/ChartAndGraph/SubscriptionReport/Subscription/SubscriptionHistoryReport';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ViewSubscriptionHistory from '../SubscriptionHistory/ViewSubscriptionHistory';

interface FormValues {
    id: string;
    fk_serviceCity: string;
    planName: string;
    planDetails: string;
    gst: string;
    ProcessingFee: string;
    PlatformName: string;
    PlatformAmount: string;
    VehicleTypeAmount: string;
    PGCharges: string;
    TotalAmount: string;
    NumberOfDay: string;
    planAmount: string;
    planDescription: string;
    couponAmount: string;
    planLiveStartTime: string;
    planLiveEndTime: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    city: string;
    updatedBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string;
    }[];
    fk_subscriptionAmountDistribution: string;
    archive: string;

    //new fields:
    remainingDaysString: string;
    categoryString: string;
    newUser: string;
    countOfUse: string;
    couponIsApplicable: string;
    useWalletMoney: string;
    vehicleType: string;
    type: string;
}

const ViewSpecificSubscription: React.FC = () => {
    const navigate = useNavigate();
    const viewSpecific = true;
    const { subscriptionId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        fk_serviceCity: '',
        planName: '',
        planDetails: '',
        gst: '',
        ProcessingFee: '',
        PlatformName: '',
        PlatformAmount: '',
        VehicleTypeAmount: '',
        city: '',
        PGCharges: '',
        TotalAmount: '',
        NumberOfDay: '',
        planAmount: '',
        planDescription: '',
        couponAmount: '',
        planLiveStartTime: '',
        planLiveEndTime: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        fk_subscriptionAmountDistribution: '',

        updatedHistory: [],

        //new fields:
        newUser: ' ',
        countOfUse: ' ',
        couponIsApplicable: ' ',
        useWalletMoney: ' ',
        vehicleType: ' ',
        type: ' ',
        remainingDaysString: '',
        categoryString: '',
    };

    const classNames = viewSpecific ? 'lg:w-1/4 pointer-events-none' : 'lg:w-1/4';

    const [formData, setFormData] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticSubscriptionData.find((data) => data.id === subscriptionId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [subscriptionId]);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
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
            label: 'Subscription',
            to: '/SubscriptionModule/Subscription/ViewSubscription',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/Subscription/ViewSubscription' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Subscription',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 4;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit') {
            const editUrl = `/SubscriptionModule/SubscriptionAmtDistribution/EditSubscriptionAmtDistribution/1}`;
            navigate(editUrl);
        } else if (selectedOption === 'viewMore') {
            const editUrl = `/SubscriptionModule/SubscriptionAmtDistribution/ViewSpecificSubscriptionAmtDistribution/1}`;
            navigate(editUrl);
        } else if (selectedOption === 'subAmtDist') {
            setModal4(true);
        }
    };

    //change amount  distri.

    const [modal4, setModal4] = useState(false);
    const [selectedSubscriptionAmountDist, setSelectedSubscriptionAmountDist] = useState<any[]>([]);
    const [addedSubscriptionAmountDistType, setAddedSubscriptionAmountDistType] = useState<any>();

    const subscriptionAmountDistColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'cgst', title: 'CGST', sortable: true },
        { accessor: 'sgst', title: 'SGST', sortable: true },
        { accessor: 'processingFee', title: 'Processing Fee', sortable: true },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'isChPartCommisionApplicable', title: 'CH Partner Comm Applicable', sortable: true },
        { accessor: 'platformFee', title: 'Platform Fee', sortable: true },
        { accessor: 'amountAddOrSub', title: 'Amount Add Or Sub', sortable: true },
        { accessor: 'pgCharges', title: 'PG Charges', sortable: true },
        { accessor: 'totalAmount', title: 'Total Amount', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'archive', title: 'archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
    ];
    const handleAddSubscriptionAmountDist = (selectedSubscriptionAmtDist: any[], id: string) => {
        successAlert('change Subscription Amount Distribution Successfully');
        setSelectedSubscriptionAmountDist(selectedSubscriptionAmtDist);
        setAddedSubscriptionAmountDistType(id);
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                    <Tab.List className="mt-3 flex flex-wrap ">
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
                                    <FaMoneyBillTransfer className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Subs Amount Dist</span>
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
                                    <BiTransfer className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Subscription Report</span>
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
                                <Tippy content="Currently Ticket is Active">
                                    <button type="button" className="btn btn-success">
                                        Active
                                    </button>
                                </Tippy>

                                <div className="flex items-center gap-4 relative">
                                    <div className="flex items-center gap-5 ml-auto">
                                        <button
                                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                            onClick={() => {
                                                const viewUrl = `/SubscriptionModule/Subscription/EditSubscription/1`;
                                                navigate(viewUrl);
                                            }}
                                        >
                                            <h3>Edit</h3>
                                            <IconEdit />
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <SubscriptionLayout details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} />
                                </div>

                                <hr />

                                <div className="mt-2">
                                    <h1 className="text-4xl font-bold">Vehicle *</h1>
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={classNames}>
                                            <label htmlFor="vehiclefee" className="block mb-1 text-md font-bold">
                                                Vehicle Fee
                                            </label>
                                            <input
                                                name="vehiclefee"
                                                type="text"
                                                id="vehiclefee"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'5%'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                        <div className={classNames}>
                                            <label htmlFor="changetype" className="block mb-1 text-md font-bold">
                                                Change Type
                                            </label>
                                            <input
                                                name="changetype"
                                                type="text"
                                                id="changetype"
                                                placeholder="Enter changetype"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'Addition'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className={classNames}>
                                            <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                                                Vehicle Type
                                            </label>
                                            <input
                                                name="vehicleType"
                                                type="text"
                                                id="vehicleType"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'Mini'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className={classNames}>
                                            <label htmlFor="flatorpersentage" className="block mb-1 text-md font-bold">
                                                Flat or Persentage
                                            </label>
                                            <input
                                                name="flatorpersentage"
                                                type="text"
                                                id="flatorpersentage"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'Flat'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-5" />

                                {/* <div className="panel mt-6">
                <h1 className="text-4xl font-bold">Platform</h1>

                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="fk_platformFee" className="block mb-1 text-md font-bold">
                            Platform Fee
                        </label>
                        <select
                            name="fk_platformFee"
                            id="fk_platformFee"
                            className="form-select w-full"
                            onChange={handleInputChange}
                            value={formData.fk_platformFee} // Make sure to update this value based on your state management
                        >
                            <option value="">Select Platform Fee</option>
                            <option value="towner">Towner</option>
                            <option value="channelpartner">Channel Partner</option>
                            <option value="phonepay">PhonePay</option>
                        </select>
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="platformName" className="block mb-1 text-md font-bold">
                            Platform Name
                        </label>
                        <input
                            name="platformName"
                            type="text"
                            id="platformName"
                            placeholder="Enter Platform Name"
                            className="form-input w-full"
                            onChange={handleInputChange}
                            value={formData.platformName} // Make sure to update this value based on your state management
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="platformAmount" className="block mb-1 text-md font-bold">
                            Platform Amount
                        </label>
                        <input
                            name="platformAmount"
                            type="number"
                            id="platformAmount"
                            placeholder="Enter Platform Amount"
                            className="form-input w-full"
                            onChange={handleInputChange}
                            value={formData.platformAmount} // Make sure to update this value based on your state management
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="fk_platformFee" className="block mb-1 mt-1 text-md font-bold">
                            Change Type
                        </label>
                        <select
                            name="fk_platformFee"
                            id="fk_platformFee"
                            className="form-select w-full"
                            onChange={handleInputChange}
                            value={formData.fk_platformFee} // Make sure to update this value based on your state management
                        >
                            <option value="">Select Change Type</option>
                            <option value="towner">Addition</option>
                            <option value="channelpartner">Subsctraction</option>
                        </select>
                    </div>
                </div>
            </div> */}

                                <div className="mt-2">
                                    <h1 className="text-4xl font-bold">Platform *</h1>
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={classNames}>
                                            <label htmlFor="platformFee" className="block mb-1 text-md font-bold">
                                                Platform Fee
                                            </label>
                                            <input
                                                name="platformFee"
                                                type="text"
                                                id="platformFee"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'5%'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                        <div className={classNames}>
                                            <label htmlFor="platformName" className="block mb-1 text-md font-bold">
                                                Platform Name
                                            </label>
                                            <input
                                                name="PlatformName"
                                                type="text"
                                                id="platformName"
                                                placeholder="Enter platformName"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'CARRENT'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className={classNames}>
                                            <label htmlFor="platformAmount" className="block mb-1 text-md font-bold">
                                                Platform Amount
                                            </label>
                                            <input
                                                name="platformAmount"
                                                type="text"
                                                id="platformAmount"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'Mini'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className={classNames}>
                                            <label htmlFor="ChangeType" className="block mb-1 text-md font-bold">
                                                Change Type
                                            </label>
                                            <input
                                                name="ChangeType"
                                                type="text"
                                                id="ChangeType"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'Addition'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-5" />
                                <div className="mt-2">
                                    <h1 className="text-4xl mt-5 font-bold">Tax *</h1>
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={classNames}>
                                            <label htmlFor="cgst" className="block mb-1 text-md font-bold">
                                                CGST
                                            </label>
                                            <input
                                                name="cgst"
                                                type="text"
                                                id="cgst"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'5%'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                        <div className={classNames}>
                                            <label htmlFor="sgst" className="block mb-1 text-md font-bold">
                                                SGST
                                            </label>
                                            <input
                                                name="sgst"
                                                type="text"
                                                id="sgst"
                                                placeholder="Enter SGST"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'5%'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className={classNames}>
                                            <label htmlFor="processingFee" className="block mb-1 text-md font-bold">
                                                Processing Fee
                                            </label>
                                            <input
                                                name="processingFee"
                                                type="text"
                                                id="processingFee"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'$5'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={classNames}>
                                            <label htmlFor="Distributor" className="block mb-1 text-md font-bold">
                                                Distributor Commision
                                            </label>
                                            <input
                                                name="Distributor"
                                                type="text"
                                                id="Distributor"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'Yes'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className={classNames}>
                                            <label htmlFor="PaymentGatewayCharges" className="block mb-1 text-md font-bold">
                                                Payment Gateway Charges
                                            </label>
                                            <input
                                                name="PaymentGatewayCharges"
                                                type="text"
                                                id="PaymentGatewayCharges"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'Yes'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className={classNames}>
                                            <label htmlFor="TotalAmount" className="block mb-1 text-md font-bold">
                                                Total Amount
                                            </label>
                                            <input
                                                name="TotalAmount"
                                                type="text"
                                                id="TotalAmount"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={'1000'}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6" />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                                    <div className={classNames}>
                                        <label htmlFor="approvedAt" className="block mb-1 text-md font-bold">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            // placeholder="Enter Approved At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={formData.approvedAt}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={classNames}>
                                        <label htmlFor="approvedBy" className="block mb-1 text-md font-bold">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            placeholder="Enter Approved By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={formData.approvedBy}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={classNames}>
                                        <label htmlFor="createdAt" className="block mb-1 text-md font-bold">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            // placeholder="Enter Created At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={formData.createdAt}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={classNames}>
                                        <label htmlFor="createdBy" className="block mb-1 text-md font-bold">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={formData.createdBy}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={classNames}>
                                        <label htmlFor="updatedBy" className="block mb-1 text-md font-bold">
                                            Updated By
                                        </label>
                                        <input
                                            name="updatedBy"
                                            type="text"
                                            id="updatedBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={formData.updatedBy}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={classNames}>
                                        <label htmlFor="updatedAt" className="block mb-1 text-md font-bold">
                                            Updated At
                                        </label>
                                        <input
                                            name="updatedAt"
                                            type="text"
                                            id="updatedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={formData.updatedAt}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={`${viewSpecific ? 'lg:w-full' : 'lg:w-1/3'}`}>
                                        <label htmlFor="archive" className="block mb-1 font-bold text-md">
                                            Archive
                                        </label>
                                        <select
                                            name="archive"
                                            id="archive"
                                            className={`form-select w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.archive}
                                            value="PENDING"
                                            onChange={handleInputChange}
                                            disabled={viewSpecific}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="APPROVED">Approved</option>
                                            <option value="REJECTED">Rejected</option>
                                            <option value="HOLD">Hold</option>
                                            <option value="SUSPENDED">Suspended</option>
                                        </select>
                                    </div>
                                    <div className={`${viewSpecific ? 'lg:w-full' : 'lg:w-1/3'}`}></div>
                                    <div className={`${viewSpecific ? 'lg:w-full' : 'lg:w-1/3'}`}></div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <SubscriptionHistoryReport />
                            </div>

                            <hr className="mt-10" />
                            <h1 className="block mb-1 text-md font-bold mt-4">Active Subscription</h1>
                            <ViewSubscriptionHistory details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} tabs={true} />
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
        // Subs Amount Distribution
    );
};

export default ViewSpecificSubscription;
