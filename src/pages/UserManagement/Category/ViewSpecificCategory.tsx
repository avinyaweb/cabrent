import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
// import PGTransactionsModule from '@/pages/TransactionModule/PGTransactions/PGTransactionsModule';
import { staticPGTransactionsData } from '@/pages/WalletModule/PGTransactions/ViewPGTransactionsPage';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';

import ViewSubscription from '@/pages/SubscriptionModule/Subscription/ViewSubscription';
import ViewBonusMaster from '@/pages/PromotionModule/BonusMaster/ViewBonusMaster';
import ViewPromocodeMaster from '@/pages/PromotionModule/PromocodeMaster/ViewPromocodeMaster';
import ViewCouponMaster from '@/pages/PromotionModule/CouponMaster/ViewCouponMaster';

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
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

const ViewSpecificCategory: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const viewSpecific = true;
    const { CategoryId } = useParams();
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
        updatedHistory: [], // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [modal1, setModal1] = useState(false);

    // useEffect(() => {
    //     // Find the specific data based on the serviceProviderId
    //     const specificData = staticPGTransactionsData.find((data) => data.id === CategoryId);

    //     // If specificData is found, update the formData state with its values
    //     if (specificData) {
    //         setFormData(specificData); // Set the entire form data
    //     }
    // }, [CategoryId]);

    useEffect(() => {
        // Find the specific data based on the CategoryId
        const specificData = staticPGTransactionsData.find((data) => data.id === CategoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            // Ensure specificData matches the FormValues interface
            const formDataCopy: FormValues = {
                ...initialFormValues, // Start with initialFormValues
                ...specificData, // Override with specificData
            };
            setFormData(formDataCopy);
        }
    }, [CategoryId]);

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
            label: 'View Category',
            to: '/UserManagement/Category/ViewCategory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UserManagement/Category/ViewCategory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Specific Category',
            to: '/UserManagement/Category/ViewSpecificCategory/',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/UserManagement/Category/ViewSpecificCategory/${CategoryId}` ? 'text-blue-600' : ''
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
                                    <span className="text-md font-bold">Bonus</span>
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
                                    <span className="text-md font-bold">Promocode</span>
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
                                    <span className="text-md font-bold">Coupon</span>
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
                                    <span className="text-md font-bold">Subscription</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                </div>

                <Tab.Panels>
                    <Tab.Panel>
                        <div className=" panel mt-2">
                            <ViewBonusMaster tabs={true} />
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className=" panel mt-2">
                            <ViewPromocodeMaster tabs={true} />
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className=" panel mt-2">
                            <ViewCouponMaster tabs={true} />
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className="panel mt-2">
                            <ViewSubscription tabs={true} viewCategory={true} />
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

export default ViewSpecificCategory;
