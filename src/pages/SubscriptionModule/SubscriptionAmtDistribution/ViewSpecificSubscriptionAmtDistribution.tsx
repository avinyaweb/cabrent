import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import SubscriptionAmtDistributionModule from './SubscriptionAmtDistributionModule';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { staticSubscriptionAmtDistributionData } from './ViewSubscriptionAmtDistribution';
import { RiEyeLine, RiFileList3Line } from 'react-icons/ri';
import ViewSubscription from '../Subscription/ViewSubscription';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import IconEdit from '@/components/Icon/IconEdit';

interface FormValues {
    id: string;
    cgst: string;
    sgst: string;
    processingFee: string;
    planAmount: string;
    distributorcommision: string;
    platformFee: string; // Add missing properties
    platformName: string;
    fk_platformFee: string;
    platformAmount: string;
    amountAddOrSub: string;
    vehicleTypeName: string;
    fk_vehicleTypeFee: string;
    pgCharges: string;
    totalAmount: string;
    fk_serviceCity: string;
    ProfileStatus: string;
    vehicleTypeAmount: string;
    city: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    archive: string;
    changeType: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

const ViewSpecificSubscriptionAmtDistribution: React.FC = () => {
    const navigate = useNavigate();
    const viewSpecific = true;
    const { subscriptionAmtDistributionId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        cgst: '',
        sgst: '',
        processingFee: '',
        planAmount: '',
        distributorcommision: '',
        platformFee: '',
        platformName: '',
        fk_platformFee: '',
        platformAmount: '',
        amountAddOrSub: '',
        vehicleTypeName: '',
        fk_vehicleTypeFee: '',
        pgCharges: '',
        totalAmount: '',
        fk_serviceCity: '',
        vehicleTypeAmount: '',
        city: '',
        ProfileStatus: '',
        changeType: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array as per the interface
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    useEffect(() => {
        // Find the specific data based on the SubscriptionAmtDistributionId
        const specificData = staticSubscriptionAmtDistributionData.find((data) => data.id === subscriptionAmtDistributionId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [subscriptionAmtDistributionId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // It will add in future
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

    const handleSubmit = () => {
        window.location.reload();
    };

    // -will use in future

    // const handleCancel = () => {
    //     window.location.reload();
    // };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path--will use in future
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
            label: 'Subscription Amt Distribution Histroy',
            to: '/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Subscription Amt Distribution Histroy',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 3;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
    };

    const classNames = viewSpecific ? 'lg:w-1/4 pointer-events-none' : 'lg:w-1/4';

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
                                    <RiEyeLine className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">View Specific</span>
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
                                    <RiFileList3Line className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Subscription Master</span>
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
                                <div className="flex items-center gap-4 relative">
                                    <div className="flex items-center gap-5 ml-auto">
                                        <button
                                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                            onClick={() => {
                                                const viewUrl = `/SubscriptionModule/SubscriptionAmtDistribution/EditSubscriptionAmtDistribution/1`;
                                                navigate(viewUrl);
                                            }}
                                        >
                                            <h3>Edit</h3>
                                            <IconEdit />
                                        </button>
                                    </div>
                                </div>
                                <div className="panel mt-6">
                                    <form onSubmit={handleSubmit}>
                                        <SubscriptionAmtDistributionModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} />
                                    </form>
                                </div>

                                <div className="panel mt-6">
                                    <h1 className="text-4xl font-bold">Platform</h1>
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className="lg:w-1/3">
                                            <label htmlFor="fk_platformFee" className="block mb-1 text-md font-bold">
                                                Platform Fee
                                            </label>
                                            <input
                                                name="fk_platformFee"
                                                type="number"
                                                id="fk_platformFee"
                                                placeholder={`${viewSpecific ? '' : 'Enter Platform Fee'}`}
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value="40"
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className="lg:w-1/3">
                                            <label htmlFor="platformName" className="block mb-1 text-md font-bold">
                                                Platform Name
                                            </label>
                                            <input
                                                name="platformName"
                                                type="text"
                                                id="platformName"
                                                placeholder={`${viewSpecific ? '' : 'Enter Platform Name'}`}
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                // value={details.platformName}
                                                // onChange={onInputChange}
                                                value="55.7"
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        {/* <div className="lg:w-1/3">
                                            <label htmlFor="platformAmount" className="block mb-1 text-md font-bold">
                                                Platform Amount
                                            </label>
                                            <input
                                                name="platformAmount"
                                                type="number"
                                                id="platformAmount"
                                                placeholder={`${viewSpecific ? '' : 'Enter Platform Amount'}`}
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                // value={formData.platformAmount} // Make sure to update this value based on your state management
                                                value="Towner"
                                                onChange={handleInputChange}
                                            />
                                        </div> */}

                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="platformAmount" className="block mb-1">
                                                Platform Amount
                                            </label>
                                            {viewSpecific ? (
                                                <input
                                                    name="platformAmount"
                                                    type="text"
                                                    id="platformAmount"
                                                    className="form-input w-full pointer-events-none"
                                                    // value={details.platformAmount}
                                                    value="CARRENT"
                                                    readOnly
                                                />
                                            ) : (
                                                <input
                                                    name="platformAmount"
                                                    type="text"
                                                    id="platformAmount"
                                                    placeholder="Enter Total Amount"
                                                    className="form-input w-full"
                                                    // value={details.platformAmount}
                                                    // onChange={onInputChange}
                                                />
                                            )}
                                        </div>

                                        <div className="lg:w-1/3">
                                            <label htmlFor="fk_platformFee" className="block mb-1 text-md font-bold">
                                                Change Type
                                            </label>
                                            <input
                                                name="changeType"
                                                type="number"
                                                id="changeType"
                                                placeholder={`${viewSpecific ? '' : 'Enter Platform Fee'}`}
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value="Substraction"
                                                // value={formData.changeType}
                                                readOnly={viewSpecific}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="panel mt-6">
                                    <h1 className="text-4xl font-bold">Vehicle</h1>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        {/* <div className="lg:w-1/3">
                                            <label htmlFor="vehicleTypeName" className="block mb-1 text-md font-bold">
                                                Vehicle Type Name
                                            </label>
                                            <input
                                                name="vehicleTypeName"
                                                type="text"
                                                id="vehicleTypeName"
                                                placeholder={`${viewSpecific ? '' : 'Enter Vehicle Type Name'}`}
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                              
                                                // onChange={onInputChange}
                                                value="Vehicle sample"
                                                readOnly={viewSpecific}
                                            />
                                        </div> */}

                                        <div className="lg:w-1/3">
                                            <label htmlFor="vehicleTypeAmount" className="block mb-1 text-md font-bold">
                                                Vehicle Type Amount
                                            </label>
                                            <input
                                                name="vehicleTypeAmount"
                                                type="number"
                                                id="vehicleTypeAmount"
                                                placeholder={`${viewSpecific ? '' : 'Enter Vehicle Type Amount'}`}
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                // value={formData.vehicleTypeAmount} // Make sure to update this value based on your state management
                                                onChange={handleInputChange}
                                                value="20"
                                            />
                                        </div>

                                        <div className="lg:w-1/3">
                                            <label htmlFor="fk_platformFee" className="block mb-1 text-md font-bold">
                                                Change Type
                                            </label>
                                            <input
                                                name="changeType"
                                                type="number"
                                                id="changeType"
                                                placeholder={`${viewSpecific ? '' : 'Enter Platform Fee'}`}
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value="Addition"
                                                readOnly={viewSpecific}
                                            />
                                        </div>

                                        <div className="lg:w-1/3"></div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={classNames}>
                                            <label htmlFor="approvedAt" className="block mb-1 text-md font-bold">
                                                Approved At
                                            </label>
                                            <input
                                                name="approvedAt"
                                                type="text"
                                                id="approvedAt"
                                                placeholder="Enter Approved At"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={formData.approvedAt}
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
                                                placeholder="Enter Created At"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={formData.createdAt}
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
                                                placeholder="Enter Created By"
                                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                value={formData.createdBy}
                                            />
                                        </div>
                                    </div>

                                    <div className={classNames}></div>
                                </div>
                            </div>
                        </Tab.Panel>

                        {/* <Tab.Panel>
                            <ViewSubscription details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} tabs={true} />
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
                        </Tab.Panel> */}
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

export default ViewSpecificSubscriptionAmtDistribution;
