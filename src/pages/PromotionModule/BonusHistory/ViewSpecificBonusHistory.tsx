import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import BonusHistoryModule from './BonusHistoryModule';
import { staticBonusHistoryData } from './ViewBonusHistory';
import IconHome from '@/components/Icon/IconHome';
import IconUser from '@/components/Icon/IconUser';
import BonusMasterModule from '../BonusMaster/BonusMasterModule';
import { FaArrowUpRightFromSquare, FaSackDollar } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';
import { AiOutlineAudit } from 'react-icons/ai';
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
    bonusId: string;
    userId: string;
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

const ViewSpecificBonusHistory: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { bonusHistoryId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bonusId: '',
        userId: '',
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
        const specificData = staticBonusHistoryData.find((data) => data.id === bonusHistoryId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [bonusHistoryId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (e.target instanceof HTMLInputElement) {
            setFormData({ ...formData, [name]: value });
        } else if (e.target instanceof HTMLSelectElement) {
            setFormData({ ...formData, [name]: value });
        }
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
            label: 'Bonus History',
            to: '/PromotionModule/BonusHistory/ViewBonusHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/BonusHistory/ViewBonusHistory' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Bonus History',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const bonusDetails: InputSection[] = [
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

    //FOUR SECTION DUMMY DATA FOR LINKED PROMOTION

    // const bonusHistory: InputSection[] = [
    //     {
    //         viewEndPoint: '/PromotionModule/BonusHistory/ViewSpecificBonusHistory/1',
    //         editEndPoint: '/PromotionModule/BonusHistory/EditBonusHistory/1',
    //         mainHeader: 'Bonus History',
    //         details: [
    //             { name: 'bonusId', title: 'Bonus', type: 'text', value: 'bonus 123' },
    //             { name: 'userId', title: 'User ID', type: 'text', value: '123' },
    //             { name: 'archive', title: 'Archive', type: 'text', value: 'PENDING' },
    //         ],
    //         viewSpecific: true,
    //     },
    // ];

    const couponHistory: InputSection[] = [
        {
            viewEndPoint: '/PromotionModule/CouponHistory/ViewSpecificCouponHistory/1',
            editEndPoint: '/PromotionModule/CouponHistory/EditCouponHistory/1',
            mainHeader: 'Coupon History',
            details: [
                { name: 'couponId', title: 'Coupon ', type: 'text', value: 'coupon 123' },
                { name: 'driverId', title: 'Driver', type: 'text', value: '456' },
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
                                    <span className="text-md font-bold">Bonus History</span>
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
                                    <span className="text-md font-bold">Bonus Master</span>
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
                                <BonusHistoryModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                                    <div className="lg:w-1/4 ">
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
                                    <div className="lg:w-1/4 ">
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
                                    <div className="lg:w-1/4 ">
                                        <label htmlFor="createdAt" className="block mb-1 pointer-events-none">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            placeholder="Enter Created At"
                                            className="form-input w-full pointer-events-none "
                                            value={formData.createdAt}
                                        />
                                    </div>
                                    <div className="lg:w-1/4 ">
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
                                    {bonusDetails.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} dropdown={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <>
                                {/* <div className="panel mt-6">
                                <div>
                                    {bonusHistory.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent sections={[section]} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr className='mt-10'/> */}
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
            </div>
        </>
    );
};

export default ViewSpecificBonusHistory;
