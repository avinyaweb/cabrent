import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Tab } from '@headlessui/react';
import ChannelPartnerModule from './ChannelPartnerModule';
import ChannelPartnerDocModule from './ChannelPartnerDocModule';
import BankDocumentModuleInCH from './BankDocumentModuleInCH';
import AuditLogsChannelpatner from '@/components/CommonTables/AuditLogsChannelpatner';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import { staticChannelPData } from './ViewChannelPartner';
import IconEdit from '@/components/Icon/IconEdit';
import { PiHandshakeDuotone } from 'react-icons/pi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbReportSearch } from 'react-icons/tb';
import { MdAttachMoney, MdOutlineModeOfTravel } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import { AiOutlineAudit } from 'react-icons/ai';
import ActiveRider from '@/components/ChartAndGraph/ChannelPartner/RiderReports/ActiveRider';
import InActiveRider from '@/components/ChartAndGraph/ChannelPartner/RiderReports/InActiveRider';
import OnGoingRider from '@/components/ChartAndGraph/ChannelPartner/RiderReports/OnGoingRider';
import PromotionChart from '@/components/ChartAndGraph/ChannelPartner/PromotionReports/PromotionChart';
import CancelledTrips from '@/components/ChartAndGraph/ChannelPartner/TripsReports/CancelledTrips';
import OnGoingTrips from '@/components/ChartAndGraph/ChannelPartner/TripsReports/OnGoingTrips';
import ScheduleTrips from '@/components/ChartAndGraph/ChannelPartner/TripsReports/ScheduleTrips';
import TotalTrips from '@/components/ChartAndGraph/ChannelPartner/TripsReports/TotalTrips';
import TicketReports from '@/components/ChartAndGraph/ChannelPartner/TripsReports/TicketReports';
import BookingTripReports from '@/components/ChartAndGraph/ChannelPartner/TripsReports/BookingTripReports';
import Cp_FinanceAnalysis from '@/components/ChartAndGraph/ChannelPartner/FinancialReports/Cp_FinanceAnalysis';

interface FormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    fk_roletype: string;
    bussinessName: string;
    channelPartnerType: string;
    fk_serviceCity: string;
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
    profileImage: string;
    parentChannelPartner: string;
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

const ViewSpecificChannelPartner: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { channelPartnerId }: { channelPartnerId?: string | undefined } = useParams();
    const initialFormValues: FormValues = {
        bussinessName: '',
        channelPartnerType: '',
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
        status: 'PENDING',
        profileImage: '',
        fk_roletype: '',
        parentChannelPartner: '',
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

    const [channelPartnerDetails, setChannelPartnerDetails] = useState<FormValues>(initialFormValues);
    const [cp_DocData, setcp_DocData] = useState<DocValues>(initialDocValues);
    const [cp_BankDocData, setcp_BankDocData] = useState<BankDoc>(initialBankDocValues);

    const [modal1, setModal1] = useState(false);

    useEffect(() => {
        const specificData: any = staticChannelPData.find((data) => data.id === channelPartnerId);
        if (specificData) {
            setChannelPartnerDetails(specificData); // Set the entire form data
        }
    }, [channelPartnerId]);

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
        setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
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

    const CHBANKDOC = {
        _id: '',
        passBook: '',
        cancelCheque: '',
    };

    const [channelParnerBankDoc, setchannelParnerBankDoc] = useState(CHBANKDOC);

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
                        currentPath === '/AdminModule/ChannelPartner/ViewChannelPartner/' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/AdminModule/ChannelPartner/ViewChannelPartner"
                        className={currentPage === 'AdminModule/ChannelPartner/ViewchannelPartner' ? 'active' : ''}
                        onClick={() => setCurrent('/viewchannelPartner')}
                    >
                        Channel Partner
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${channelPartnerId}` ? 'text-blue-600' : ''
                    }`}
                >
                    View Channel Partner
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
                                    <PiHandshakeDuotone className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Channel Partner</span>
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
                                    <TbReportSearch className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Rider Reports</span>
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
                                    <MdOutlineSubscriptions className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Subscription Reports</span>
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
                                    <BiNews className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Promotion Reports</span>
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
                                    <MdOutlineModeOfTravel className="w-5 h-5 ltr:mr-2 rtl:ml-2" />

                                    <span className="text-md font-bold">Trip Reports</span>
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

                                    <span className="text-md font-bold">Financial Reports</span>
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
                                            const viewUrl = `/AdminModule/ChannelPartner/EditChannelPartner/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <ChannelPartnerModule details={channelPartnerDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} redirect={true} />
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
                                            const viewUrl = `/AdminModule/ChannelPartner/EditChannelPartner/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <div className=" panel mt-3">
                                    <BankDocumentModuleInCH details={cp_BankDocData} onInputChange={handleInputChange} viewSpecific={viewSpecific} />
                                </div>
                                <div className=" panel mt-3">
                                    <ChannelPartnerDocModule details={cp_DocData} onInputChange={handleInputChange} viewSpecific={viewSpecific} />
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <ActiveRider />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <InActiveRider />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <OnGoingRider />
                                    </div>
                                </div>
                                {/* <ViewRiderUser tabs={true} /> */}

                                {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="mb-2">Travel Agency</h2>
                                </div>
                                <ViewFleetOwner tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Vehicle</h2>
                                </div>
                                <ViewVehicleProfile tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Driver</h2>
                                </div>

                                <ViewServiceProvider tabs={true} /> */}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <PromotionChart />

                            {/* <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="mb-2">Subscription History</h2>
                                </div>
                                <ViewSubscriptionHistory tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Subscription invoice</h2>
                                </div>

                                <ViewSubscriptionInvoice tabs={true} />
                            </div> */}

                            {/* <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="mb-2">Promocode Master</h2>
                                </div>
                                <ViewPromocodeMaster tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h3 className="mb-2">Promocode History</h3>
                                </div>
                                <ViewPromocodeHistory tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Coupon Master</h2>
                                </div>
                                <ViewCouponMaster tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h3 className="mb-2">Coupon History</h3>
                                </div>
                                <ViewCouponHistory tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Referral Master</h2>
                                </div>
                                <ViewRefferalMaster tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h3 className="mb-2">Referral History</h3>
                                </div>
                                <ViewRefferalHistory tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Bonus Master</h2>
                                </div>
                                <ViewBonusMaster tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h3 className="mb-2">Bonus History</h3>
                                </div>
                                <ViewBonusHistory tabs={true} />
                            </div> */}
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                <div className="lg:w-1/4">
                                    <OnGoingTrips />
                                </div>
                                <div className="lg:w-1/4">
                                    <ScheduleTrips />
                                </div>
                                <div className="lg:w-1/4">
                                    <CancelledTrips />
                                </div>
                                <div className="lg:w-1/4">
                                    <TotalTrips />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                <div className="lg:w-1/2">
                                    <TicketReports />
                                </div>
                                <div className="lg:w-1/2">
                                    <BookingTripReports />
                                </div>
                            </div>

                            {/* <div className=" mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="mb-2">Booking</h2>
                                </div>
                                <ViewBookings tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Tickets</h2>
                                </div>
                                <ViewTickets tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Rider</h2>
                                </div>
                                <ViewRiderUser tabs={true} />

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Trips Invoice</h2>
                                </div>
                                <ViewTripsInvoice tabs={true} />
                            </div> */}
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                <div className="">
                                    <Cp_FinanceAnalysis />
                                </div>
                            </div>
                            {/* <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="mb-2">Financial Details</h2>
                                </div>

                                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/2 pointer-events-none">
                                        <label htmlFor="transactionStatus" className="block mb-1">
                                            Total Spend
                                        </label>
                                        <input
                                            name="transactionStatus"
                                            type="text"
                                            id="transactionStatus"
                                            value="1229"
                                            placeholder="Enter Transaction Status"
                                            className="form-input w-full pointer-events-none"
                                        />
                                    </div>
                                    <div className="lg:w-1/2 pointer-events-none">
                                        <label htmlFor="vehicleId" className="block mb-1">
                                            Total Earned
                                        </label>
                                        <input name="vehicleId" type="text" id="vehicleId" value="65555525" placeholder="Enter PG Transaction ID" className="form-input w-full pointer-events-none" />
                                    </div>
                                </div>
                            </div> */}
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
                                <AuditLogsChannelpatner />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">VerificationHisory</h2>
                                </div>
                                <VerificationHistory />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                {/*  next & previous button */}
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

export default ViewSpecificChannelPartner;
