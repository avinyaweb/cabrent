import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import PromocodeHistoryModule from './PromocodeHistoryModule';
import { staticPromocodeHistoryData } from './ViewPromocodeHistory';
import IconHome from '@/components/Icon/IconHome';
import IconUser from '@/components/Icon/IconUser';
import { FaArrowUpRightFromSquare, FaSackDollar } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';
import CouponMasterModule from '../CouponMaster/CouponMasterModule';
import PromocodeMasterModule from '../PromocodeMaster/PromocodeMasterModule';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
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
    promocodeId: string;
    driverId: string;
    promocodeStatus: string;
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

const ViewSpecificPromocodeHistory: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { promocodeHistoryId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        promocodeId: '',
        driverId: '',
        promocodeStatus: '',
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
        const specificData = staticPromocodeHistoryData.find((data) => data.id === promocodeHistoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [promocodeHistoryId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    {
        /*
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateChannelPartner(channelPartnerId, formData);
      console.log('Channel Partner details updated successfully!');
    } catch (error: any) {
      console.error('Error updating channel partner details:', error.message);
    }
  };
*/
    }

    const handleSubmit = () => {
        window.location.reload();
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
        console.log('Edit clicked');
    };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Promocode History',
            to: '/PromotionModule/PromocodeHistory/ViewPromocodeHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/PromocodeHistory/ViewPromocodeHistory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Promocode History',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const promocodeDetails: InputSection[] = [
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

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaSackDollar className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Promocode History</span>
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
                                    <IconUser className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Linked user</span>
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
                                    <span className="text-md font-bold">Promocode Master</span>
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
                                <PromocodeHistoryModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
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
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
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
                            <div className=" panel mt-5">
                                <div>
                                    {promocodeDetails.map((section, index) => (
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
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    );
};

export default ViewSpecificPromocodeHistory;
