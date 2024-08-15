import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import CouponHistoryModule from './CouponHistoryModule';
import CouponMasterModule from '../CouponMaster/CouponMasterModule';
import { staticCouponHistoryData } from './ViewCouponHistory';
import IconHome from '@/components/Icon/IconHome';
import IconUser from '@/components/Icon/IconUser';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import InputComponent from '@/components/inputComponents';

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

interface FormValues {
    id: string;
    couponId: string;
    driverId: string;
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

const ViewSpecificCouponHistory: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { couponHistoryId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        couponId: '',
        driverId: '',
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
        const specificData = staticCouponHistoryData.find((data) => data.id === couponHistoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [couponHistoryId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log('Channel Partner details updated successfully!');
        } catch (error: any) {
            console.error('Error updating channel partner details:', error.message);
        }
    };

    const handleCancel = () => {
        window.location.reload();
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const [activeTab, setActiveTab] = useState('specific');

    const handleEditClick = () => {
        // Your logic here
        console.log('Edit clicked');
    };

    const couponDetails: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/CouponMaster/ViewSpecificCouponMaster/1',
            editEndPoint: '/PromotionModule/CouponMaster/EditCouponMaster/1',
            mainHeader: 'Coupon Bonus',
            details: [
                { name: 'couponCode', title: 'Coupon ', type: 'text', value: 'coupon 123' },
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

    const riderDetails: InputSection[] = [
        {
            viewEndPoint: '/RiderModule/RiderUsers/ViewSpecificRiderUsers/1',
            editEndPoint: '/RiderModule/RiderUsers/EditRiderUsers/1',
            mainHeader: 'Rider Details',
            details: [
                { name: 'firstName', title: 'First Name', type: 'text', value: 'John' },
                { name: 'lastName', title: 'Last Name', type: 'text', value: 'Doe' },
                { name: 'email', title: 'Email', type: 'email', value: 'johndoe@example.com' },
                { name: 'phone', title: 'Phone', type: 'tel', value: '1234567890' },
                { name: 'password', title: 'Password', type: 'password', value: '******' },
                { name: 'gender', title: 'Gender', type: 'text', value: 'Male' },
                { name: 'country', title: 'Country', type: 'text', value: 'USA' },
                { name: 'state', title: 'State', type: 'text', value: 'California' },
                { name: 'city', title: 'City', type: 'text', value: 'Los Angeles' },
                { name: 'serviceAvailableCity', title: 'Service Available City', type: 'text', value: 'New York' },
            ],
            viewSpecific: true,
        },
    ];

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Coupon History',
            to: '/PromotionModule/CouponHistory/ViewCouponHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/CouponHistory/ViewCouponHistory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Coupon History',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <Tab.Group>
                <div className="mt-6 panel">
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">View Specific</span>
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
                                    <span className="text-md font-bold">Coupon Master</span>
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
                                    <span className="text-md font-bold">Linked User</span>
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
                                <CouponHistoryModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedAt" className="block mb-1 pointer-events-none">
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
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedBy" className="block mb-1 pointer-events-none">
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
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdAt" className="block mb-1 pointer-events-none">
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

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdBy" className="block mb-1 pointer-events-none">
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
                                {couponDetails.map((section, index) => (
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
                                {riderDetails.map((section, index) => (
                                    <div key={index}>
                                        <InputComponent sections={[section]} dropdown={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel>
                        <div className="mt-5 panel">
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
        </>
    );
};

export default ViewSpecificCouponHistory;
