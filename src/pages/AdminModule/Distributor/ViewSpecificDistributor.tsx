import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import ChannelPartnerDocModule from './ChannelPartnerDocModule';
import BankDocumentModuleInCH from './BankDocumentModuleInCH';
import AnimateHeight from 'react-animate-height';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';

import ViewTripsInvoice from '@/pages/TripModule/TripsInvoice/ViewTripsInvoice';
import IconEdit from '@/components/Icon/IconEdit';
import { PiHandshakeDuotone } from 'react-icons/pi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbReportSearch } from 'react-icons/tb';
import { MdAttachMoney, MdOutlineModeOfTravel, MdOutlineSubscriptions } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import { AiOutlineAudit } from 'react-icons/ai';
import { staticDistributorData } from './ViewDistributor';
import DistributorModule from './DistributorModule';
import { BsPersonWorkspace } from 'react-icons/bs';
import FinanceAnalysis from '@/components/ChartAndGraph/Distributor/FinanceAnalysis';
import TravelAgencyReport from '@/components/ChartAndGraph/Distributor/BusinessReports/TravelAgencyReport';
import ServiceProviderReport from '@/components/ChartAndGraph/Distributor/BusinessReports/ServiceProviderReport';
import VehicleReport from '@/components/ChartAndGraph/Distributor/BusinessReports/VehicleReport';
import DistrSubscriptionReport from '@/components/ChartAndGraph/Distributor/SubscriptionReports/DistrSubscriptionReport';
import DistrPromotionChart from '@/components/ChartAndGraph/Distributor/PromotionReports/DistrPromotionChart';
import DisOnGoingTrips from '@/components/ChartAndGraph/Distributor/TripsReports/DisOnGoingTrips';
import DisScheduleTrips from '@/components/ChartAndGraph/Distributor/TripsReports/DisScheduleTrips';
import DisCancelledTrips from '@/components/ChartAndGraph/Distributor/TripsReports/DisCancelledTrips';
import DisTotalTrips from '@/components/ChartAndGraph/Distributor/TripsReports/DisTotalTrips';
import DisTicketReports from '@/components/ChartAndGraph/Distributor/TripsReports/DisTicketReports';
import DisBookingTripReports from '@/components/ChartAndGraph/Distributor/TripsReports/DisBookingTripReports';
import ViewAdminTeams from '../AdminTeams/ViewAdminTeams';
import VehicleTypePieChart from '@/components/ChartAndGraph/Distributor/SubscriptionReports/VehicleTypePieChart';
import DriverStatusReport from '@/components/ChartAndGraph/Distributor/TripsReports/DriverStatusReport';
import FinanceDetailReport from '@/components/ChartAndGraph/Distributor/FinancialReports/FinanceDetailReport';
import DistributorSettingsModule from './DistributorSettings/DistributorSettingsModule';
import ViewSpecificDistributorSettings from './DistributorSettings/ViewSpecificDistributorSettings';
import ViewSubDistributor from './SubDistributor/ViewSubDistributor';
import ViewSpecificBankAccount from '@/pages/WalletModule/BankAccountDetails/ViewSpecificBankAccount';

interface FormValues {
    bussinessName: string;
    Distributorcategory: string;
    fk_serviceCity: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    mobile: string;
    altMobile: string;
    password: string;
    country: string;
    state: string;
    city: string;
    subscriptionCommisionAmountType: string;
    subscriptionCommisionAmountValue: string;
    tripsCommisionAmountType: string;
    tripsCommisionAmountValue: string;
    registrationOfficeAddress: string;
    communicationOfficeAddress: string;
    remarks: string;
    status: string;
    fk_roletype: string;
    parentDistributor: string;
}

interface DocValues {
    profileImage: string;
    aadharCard: string;
    aadharImages: string;
    panImages: string;
    panCard: string;
    companyRegCertiImage: string;
    companyRegCertificate: string;
    gstImage: string;
    gst: string;
}
interface BankDoc {
    accountNumber: string;
    panNumber: string;
    voterId: string;
    aadhar: string;
    verificationHistory: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

interface FormValues {
    bookingType: string;
    serviceType: string;
    serviceCity: string;
    subscriptionType: string;
    taxPercentage: string;
    createdAt: string;
    updatedAt: string;
}

const ViewSpecificDistributor: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { DistributorId } = useParams();
    const initialFormValues: FormValues = {
        Distributorcategory: '',
        bussinessName: '',
        fk_serviceCity: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        mobile: '',
        altMobile: '',
        password: '',
        country: '',
        state: '',
        city: '',
        subscriptionCommisionAmountType: '',
        subscriptionCommisionAmountValue: '',
        tripsCommisionAmountType: '',
        tripsCommisionAmountValue: '',
        registrationOfficeAddress: '',
        communicationOfficeAddress: '',
        remarks: '',
        status: '',
        fk_roletype: '',
        parentDistributor: '',
        bookingType: '',
        serviceType: '',
        serviceCity: '',
        subscriptionType: '',
        taxPercentage: '',
        createdAt: '',
        updatedAt: '',
    };

    const initialDocValues: DocValues = {
        profileImage: '',
        aadharCard: '',
        aadharImages: '',
        panImages: '',
        panCard: '',
        companyRegCertiImage: '',
        companyRegCertificate: '',
        gstImage: '',
        gst: '',
    };

    const initialBankDocValues: BankDoc = {
        accountNumber: '',
        panNumber: '',
        voterId: '',
        aadhar: '',
        verificationHistory: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
    };

    const [DistributorDetails, setDistributorDetails] = useState<FormValues>(initialFormValues);
    const [DIS_DocData, setDIS_DocData] = useState<DocValues>(initialDocValues);
    const [DIS_BankDocData, setDIS_BankDocData] = useState<BankDoc>(initialBankDocValues);

    // future code -->>
    // const [modal1, setModal1] = useState(false);

    useEffect(() => {
        const specificData: any = staticDistributorData.find((data) => data.id === DistributorId);
        if (specificData) {
            setDistributorDetails(specificData); // Set the entire form data
        }
    }, [DistributorId]);

    // useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //         try {
    //             const response = await getChannelPartnerById(channelPartnerId);
    //             console.log('Fetched Data', response);
    //             setChannelPartnerDetails(response.data.channelPartner);
    //         } catch (error: any) {
    //             console.error('Error fetching channel partner details:', error.message);
    //         }
    //     };

    //     fetchChannelPartnerDetails();
    // }, [channelPartnerId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDistributorDetails({ ...DistributorDetails, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const viewSpecific = true;

    const [active, setActive] = useState<string>('1');
    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    // handling next & previous Buttons for tabs.
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 8;

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
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Distributor/ViewDistributor/' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/AdminModule/Distributor/ViewDistributor"
                        className={currentPage === 'AdminModule/Distributor/ViewDistributor' ? 'active' : ''}
                        onClick={() => setCurrent('/viewDistributor')}
                    >
                        Distributor
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `` ? 'text-blue-600' : ''
                    }`}
                >
                    View Distributor
                </li>
            </ol>

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
                                    <BsPersonWorkspace className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Distributor</span>
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
                                    <IoDocumentTextOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Documents Details</span>
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
                                    <IoDocumentTextOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Distributor Admin team</span>
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
                                    <MdAttachMoney className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Distribution Settings</span>
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
                                    <MdAttachMoney className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Sub Distributor</span>
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
                                    <MdAttachMoney className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Bank Account</span>
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

                                    <span className="text-md font-bold">Audit Logs</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center  rounded-md p-1"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/Distributor/EditDistributor/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <DistributorModule
                                    details={DistributorDetails}
                                    onInputChange={handleInputChange}
                                    showStatus={true}
                                    viewSpecific={viewSpecific}
                                    redirect={true}
                                    isEditPage={false}
                                    noPassEdit={false}
                                />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1 text-md font-bold">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            placeholder="Enter Approved At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={channelPartnerDetails.approvedAt}
                                            value="12:31:2"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedBy" className="block mb-1 text-md font-bold">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            placeholder="Enter Approved By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={channelPartnerDetails.approvedBy}
                                            value="manu"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdAt" className="block mb-1 text-md font-bold">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            placeholder="Enter Created At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={channelPartnerDetails.createdAt}
                                            value="12:00"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1 text-md font-bold">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            placeholder="Enter Created By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={channelPartnerDetails.createdBy}
                                            value="shaan"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center  rounded-md p-1"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/Distributor/EditDistributor/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <div className=" panel mt-3">
                                    <BankDocumentModuleInCH details={DIS_BankDocData} onInputChange={handleInputChange} viewSpecific={viewSpecific} />
                                </div>
                                <div className=" panel mt-3">
                                    <ChannelPartnerDocModule details={DIS_DocData} onInputChange={handleInputChange} viewSpecific={viewSpecific} />
                                </div>
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <ViewAdminTeams tabs={true} />
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2">Distributor Settings</h2>
                            </div>
                            <ViewSpecificDistributorSettings tabs={false} />
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2"> Sub Distributor </h2>
                            </div>
                            <ViewSubDistributor tabs={true} />
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2">Bank Details</h2>
                            </div>
                            <ViewSpecificBankAccount />
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-2">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Logs File</h2>
                                </div>
                                <AuditLogsTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">VerificationHisory</h2>
                                </div>
                                <VerificationHistory />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                {/* Next & Previous Buttons */}
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

export default ViewSpecificDistributor;
