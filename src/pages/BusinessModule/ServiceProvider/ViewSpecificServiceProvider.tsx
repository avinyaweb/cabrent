import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { updateChannelPartner, getChannelPartnerById } from '@/services/ChannelPartnerService';
import ServiceProviderModule from './ServiceProviderModule';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { staticServiceProviderData } from './ViewServiceProvider';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import IconUser from '@/components/Icon/IconUser';
import IconEdit from '@/components/Icon/IconEdit';
import { RiSteeringFill, RiHistoryFill, RiFileTextFill, RiCoupon2Fill } from 'react-icons/ri';
import { IoDocumentTextOutline, IoCarSportOutline, IoTimeOutline, IoFlagOutline, IoTicketOutline } from 'react-icons/io5';
import ServiceProviderDocLayout from './ServiceProviderDocLayout';
import { Im500Px } from 'react-icons/im';
import ViewSubscriptionHistory from '@/pages/SubscriptionModule/SubscriptionHistory/ViewSubscriptionHistory';
import ViewSubscription from '@/pages/SubscriptionModule/Subscription/ViewSubscription';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { IoGiftOutline } from 'react-icons/io5';
// import ViewPGTransactions from '@/pages/TransactionModule/PGTransactions/ViewPGTransactions';
// import ViewWalletHistory from '@/pages/TransactionModule/WalletHistory/ViewWalletHistory';
import ViewRefferalHistory from '@/pages/PromotionModule/RefferalHistory/ViewRefferalHistory';
import ViewBonusHistory from '@/pages/PromotionModule/BonusHistory/ViewBonusHistory';
import ViewPromocodeHistory from '@/pages/PromotionModule/PromocodeHistory/ViewPromocodeHistory';
import ViewCouponMaster from '@/pages/PromotionModule/CouponMaster/ViewCouponMaster';
import ViewBookings from '@/pages/TripModule/Bookings/ViewBookings';
import ViewCouponHistory from '@/pages/PromotionModule/CouponHistory/ViewCouponHistory';
import ViewTickets from '@/pages/TripModule/Tickets/ViewTickets';
import ServiceCityModal from '@/components/Models/ServiceCityModal';
import VehicleModal from '@/components/Models/VehicleModal';
import SubscriptionModel from '@/components/Models/SubscriptionModel';
import { MdHistory } from 'react-icons/md';
import AuditLogsDriver from '@/components/CommonTables/AuditLogsDriver';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import { errorAlert, successAlert } from '@/utils/Toast';
import PurchaseSubscriptionModal from '@/components/Models/PurchaseSubscriptionModal';
import VehicleProfileSection from './VehicleProfileSection';
import { staticVehicleProfileData } from '../VehicleProfile/ViewVehicleProfile';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import SubscriptionHistoryReport from '@/components/ChartAndGraph/Driver/Subscription/SubscriptionHistoryReport';
import FinanceAnalysis from '@/components/ChartAndGraph/Driver/TotalFinanceReport/FinanceAnalysis';
import PromotionChart from '@/components/ChartAndGraph/Driver/PromotionReports/PromotionChart';
import TripsReports from '@/components/ChartAndGraph/Driver/Trips/TripsReports';
import TripTicketsReports from '@/components/ChartAndGraph/Driver/Trips/TripTicketsReports';
import TripBookingsReports from '@/components/ChartAndGraph/Driver/Trips/TripBookingsReports';
import CreateServiceProvider from './CreateServiceProvider';
import CreateBankAccount from '@/pages/WalletModule/BankAccountDetails/CreateBankAccount';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ViewBankAccount from '@/pages/WalletModule/BankAccountDetails/ViewBankAccount';
import EditBankAccount from '@/pages/WalletModule/BankAccountDetails/EditBankAccount';
import ViewSpecificBankAccount from '@/pages/WalletModule/BankAccountDetails/ViewSpecificBankAccount';
interface FormValues {
    serviceProviderType: string;
    driverKey: string;
    channelPartnerType: string;
    TravelAgency: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    fatherName: string;
    mobileNumber: string;
    altMobileNumber: string;
    country: string;
    state: string;
    city: string;
    dlNumber: string;
    dlValidity: string;
    policeVerNumber: string;
    batchNumber: string;
    batchValidity: string;
    password: string;
    permanentAddress: string;
    presentAddress: string;
    registerAddress: string;
    fk_serviceCity: string;
    badgeNumber: string;
    badgeValidity: string;
    isAvailable: boolean;
    driverStatus: string;
    driverLocation: boolean;
    emergencyContact: string;
    driverApprovalDate: string;
    panNumber: string;
    rtoDisplayCard: string;
    stateAndRto: string;
    verificationHistory: string;
    archive: string;

    profileImage: string;
    drivinglicense: string;
    aadharCard: string;
    aadharImages: string;
    panImages: string;
    panCard: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    remark: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

interface FormvehiValues {
    serviceProviderType: string;
    channelPartnerType: string;
    fleetManagementType: string;
    serviceType: string;
    vehRTONumber: string;
    vehicleAge: string;
    vehRegNumber: string;
    vehicleRegistrationDate: Date | null;
    vehicleManufacturingDate: Date | null;
    vehType: string; //
    serviceP: string; //-- doubt
    loanBanker: string;
    emiAmt: string;
    loanAccNumber: string;
    emiDate: string;
    currLocation: string;
    // vehicle Master
    seatCapacity: string; //
    vehColor: string; //
    vehBrandModel: string; //
    vehFuelType: string; //
    vehCategory: string; //
    vehManufacturer: string; //--new
    vehBrandName: string; //
    loadCapacity: string;
    vehChasisNumber: string;
    bootSpace: string;
    bodyDimension: string;
    archive: string;
    country: string;
    state: string;
    city: string;
    fk_serviceCity: string;
}

const ViewSpecificServiceProvider: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { serviceProviderId } = useParams();
    const initialFormValues: FormValues = {
        serviceProviderType: '',
        driverKey: '',
        channelPartnerType: '',
        TravelAgency: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        fatherName: '',
        mobileNumber: '',
        altMobileNumber: '',
        country: '',
        state: '',
        city: '',
        dlNumber: '',
        dlValidity: '',
        policeVerNumber: '',
        batchNumber: '',
        batchValidity: '',
        password: '',
        permanentAddress: '',
        presentAddress: '',
        registerAddress: '',
        fk_serviceCity: '',
        badgeNumber: '',
        badgeValidity: '',
        isAvailable: false,
        driverStatus: '',
        driverLocation: false,
        emergencyContact: '',
        driverApprovalDate: '',
        panNumber: '',
        rtoDisplayCard: '',
        stateAndRto: '',
        verificationHistory: '',
        archive: '',
        profileImage: '',
        drivinglicense: '',
        aadharCard: '',
        aadharImages: '',
        panImages: '',
        panCard: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        remark: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const vehicleinitialFormValues: FormvehiValues = {
        serviceProviderType: '',
        channelPartnerType: '',
        fleetManagementType: '',
        serviceType: '',
        vehRTONumber: '',
        vehicleAge: '',
        vehRegNumber: '',
        vehicleRegistrationDate: null,
        vehicleManufacturingDate: null,
        vehType: '',
        serviceP: '',
        loanBanker: '',
        emiAmt: '',
        loanAccNumber: '',
        emiDate: '',
        currLocation: '',
        seatCapacity: '',
        vehColor: '',
        vehBrandModel: '',
        vehFuelType: '',
        vehCategory: '',
        vehManufacturer: '',
        vehBrandName: '',
        loadCapacity: '',
        vehChasisNumber: '',
        bootSpace: '',
        bodyDimension: '',
        archive: '',
        country: '',
        state: '',
        city: '',
        fk_serviceCity: '',
    };

    const viewSpecific = true;
    const location = useLocation();
    // Extract the pathname from the location object
    const currentPath = location.pathname;

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [vehiformData, setvehiFormData] = useState<FormvehiValues>(vehicleinitialFormValues);
    const [modal1, setModal1] = useState(false);
    const [currentPage, setCurrentPage] = useState<string>('');

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticServiceProviderData.find((data) => data.id === serviceProviderId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [serviceProviderId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
            label: 'Driver',
            to: '/BusinessModule/ServiceProvider/ViewServiceProvider',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/ServiceProvider/ViewServiceProvider' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Driver',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleEditClick = () => {
        // Navigate to edit page
        navigate('/BusinessModule/VehicleProfile/EditVehicleProfile/1');
    };

    const handleViewClick = () => {
        // Navigate to view page
        navigate('/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/1');
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        switch (selectedOption) {
            case 'purchaseSubscription':
                setModal5(true);
                break;
            case 'addvehicle':
                setModal6(true);
                break;
            case 'edit':
                const editUrl = `/BusinessModule/VehicleProfile/EditVehicleProfile/1`;
                navigate(editUrl);
                break;
            case 'viewmore':
                const viewMoreUrl = `/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/1`;
                navigate(viewMoreUrl);
                break;

            case 'changevehicle':
                setModal4(true);
                break;
            default:
                break;
        }
    };

    const [addedCHPartnersType, setAddedCHPartnersType] = useState<any>();
    const [SelectedCHPartner, setSelectedCHPartners] = useState<any[]>([]);
    const [modal5, setModal5] = useState(false);
    const handleAddUserSubmit = (selectedCHPartners: any[], userID: string) => {
        setSelectedCHPartners(selectedCHPartners);
        // setAddedCHPartnersType(userID);
        if (userID === 'subscriptionAdded') {
            successAlert('Subscription Added Successfully');
        } else if (userID === 'subscriptionNotAdded') {
            errorAlert('Subscription Not Added');
        }
    };

    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [ServiceCityData, setServiceCityData] = useState<any[]>([]);
    const [modal6, setModal6] = useState(false);
    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setServiceCityData(selectedServiceCity);
        // setAddedServiceCityType(userID);
        if (userID === 'serviceCityAdded') {
            successAlert('Vehicle Added Successfully');
        } else if (userID === 'serviceCityNotAdded') {
            errorAlert('Vehicle Not Added');
        }
    };

    const [activeTab, setActiveTab] = useState('specific');

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

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

    //change vehicle
    const [modal4, setModal4] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<any[]>([]);
    const [addedVehicleType, setAddedVehicleType] = useState<any>();

    const vehicleColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type', sortable: true },
        { accessor: 'vehRegNumber', title: 'Vehicle Registration No', sortable: true },
        { accessor: 'vehRTONumber', title: 'Vehicle RTO Number', sortable: true },
        { accessor: 'vehChasisNumber', title: 'Vehicle Chasis Number', sortable: true },
        { accessor: 'vehCategory', title: 'Vehicle Category', sortable: true },
        { accessor: 'seatCapacity', title: 'Seat Capacity', sortable: true },
        { accessor: 'bootSpace', title: 'Boot Space', sortable: true },
        { accessor: 'loadCapacity', title: 'Load Capacity', sortable: true },
        { accessor: 'bodyDimension', title: 'Body Dimension', sortable: true },
        { accessor: 'vehBrandName', title: 'Vehicle Brand Name', sortable: true },
        { accessor: 'vehType', title: 'Vehicle Type', sortable: true },
        { accessor: 'vehBrandModel', title: 'Vehicle Brand Model', sortable: true },
        { accessor: 'vehColor', title: 'Vehicle Color', sortable: true },
        { accessor: 'vehFuelType', title: 'Vehicle Fuel Type', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'vehicleRegistrationDate', title: 'Vehicle Registration Date', sortable: true },
        { accessor: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', sortable: true },
        { accessor: 'vehicleAge', title: 'Vehicle Age', sortable: true },
        { accessor: 'loanBanker', title: 'Loan Banker', sortable: true },
        { accessor: 'loanAccNumber', title: 'Loan Acc Number', sortable: true },
        { accessor: 'emiAmt', title: 'EMI Amt', sortable: true },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true },
        { accessor: 'currLocation', title: 'Curr Location', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
    ];

    const handleAddVehicle = (selectedVeh: any[], id: string) => {
        successAlert('Change Vehicle Successfully');
        setSelectedVehicle(selectedVeh);
        setAddedVehicleType(id);
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
                                    <RiSteeringFill className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Driver</span>
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
                                    <span className="text-md font-bold">Driver Documents</span>
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
                                    <IoDocumentTextOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Bank Account</span>
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
                                    <IoCarSportOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                    <IoTimeOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Subscription History</span>
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
                                    <MdOutlineAttachMoney className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Financial Report</span>
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
                                    <IoGiftOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Promotion</span>
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
                                    <IoFlagOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Trip Report</span>
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
                                <div className="mt-5 flex justify-end items-center gap-3">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                        onClick={() => {
                                            const viewUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <ServiceProviderModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} noPassEdit={false} />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="approvedAt" className="block mb-1 font-bold text-md">
                                            Approved At
                                        </label>

                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.approvedAt}
                                            value="02-04-2024"
                                            onChange={handleInputChange}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="approvedBy" className="block mb-1 font-bold text-md">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.approvedBy}
                                            value="sonu"
                                            onChange={handleInputChange}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="createdAt" className="block mb-1 font-bold text-md">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.createdAt}
                                            value="02-04-2024"
                                            onChange={handleInputChange}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                        <label htmlFor="createdBy" className="block mb-1 font-bold text-md">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value="raju" />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-5 flex justify-end items-center gap-3">
                                <div
                                    className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                    onClick={() => {
                                        const viewUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/1`;
                                        navigate(viewUrl);
                                    }}
                                >
                                    <h3>Edit</h3>
                                    <IconEdit />
                                </div>
                            </div>

                            <ServiceProviderDocLayout details={formData} onInputChange={handleInputChange} viewSpecific={viewSpecific} />
                        </Tab.Panel>

                        {/* <Tab.Panel>
                            <div className="mt-5 flex justify-end items-center gap-3">
                                <div
                                    className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                    onClick={() => {
                                        const viewUrl = `/WalletModule/BankAccountDetails/EditBankAccount/1`;
                                        navigate(viewUrl);
                                    }}
                                >
                                    <h3>Update Bank Account</h3>
                                    <IconEdit />
                                </div>
                            </div>

                            <Tippy content="Click For Create">
                                <button
                                    onClick={() => {
                                        const viewUrl = `/WalletModule/BankAccountDetails/CreateBankAccount`;
                                        navigate(viewUrl);
                                    }}
                                    type="button"
                                    className="btn btn-success"
                                >
                                    Create bank Account
                                </button>
                            </Tippy>

                            <ViewSpecificBankAccount />
                        </Tab.Panel> */}
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center  justify-end gap-4 relative">
                                    <div className="lg:w-1/4 sm:w-full sm:mb-0">
                                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                            <option value="">Action Dropdown</option>
                                            <option value="purchaseSubscription">Assign Subscription</option>
                                            <option value="addvehicle">Add vehicle</option>
                                            <option value="changevehicle">Change Vehicle</option>
                                            <option value="edit">Edit</option>
                                            <option value="viewmore">View More</option>
                                        </select>
                                        {/* <VehicleModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} /> */}
                                        <PurchaseSubscriptionModal event={modal5} closeModal={() => setModal5(false)} onAddSubscription={handleAddUserSubmit} />
                                        <CommonPopUp
                                            title={'Change Vehicle'}
                                            columns={vehicleColumns}
                                            data={staticVehicleProfileData}
                                            event={modal4}
                                            closeModal={() => setModal4(false)}
                                            onSubmit={handleAddVehicle}
                                        />
                                    </div>
                                </div>

                                <VehicleProfileSection details={vehiformData} viewSpecific={true} />
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-5">
                                <SubscriptionHistoryReport />
                            </div>
                            {/* <ViewSubscriptionHistory details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} tabs={true} /> */}
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <FinanceAnalysis />

                                {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>PG Tranasaction</h2>
                                </div>
                                <ViewPGTransactions tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Wallet History</h2>
                                </div>
                                <ViewWalletHistory tabs={true} />
                                <div className="space-y-2 dark:prose-headings:text-white-dark mt-6 mb-6 flex justify-between">
                                    <h1 className="text-2xl font-bold">Wallet Details</h1>
                                    <div className="flex items-center gap-5 mr-3">
                                        <div
                                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                            onClick={() => {
                                                const viewUrl = `/TransactionModule/WalletHistory/ViewSpecificWalletHistory/1`;
                                                navigate(viewUrl);
                                            }}
                                        >
                                            <h3>View More</h3>
                                            <FaArrowUpRightFromSquare />
                                        </div>

                                        <div
                                            className="cursor-pointer  text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                            onClick={() => {
                                                const viewUrl = `/TransactionModule/WalletHistory/EditWalletHistory/1`;
                                                navigate(viewUrl);
                                            }}
                                        >
                                            <h3>Edit</h3>
                                            <IconEdit />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={`lg:w-1/2`}>
                                        <label htmlFor="walletAmount" className="block mb-1 font-bold text-md">
                                            Wallet Amount
                                        </label>
                                        <input
                                            name="walletAmount"
                                            type="text"
                                            id="walletAmount"
                                            placeholder="Enter Middle Name"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={'$120.05'}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`lg:w-1/2`}>
                                        <label htmlFor="walletStatus" className="block mb-1 font-bold text-md">
                                            Wallet Status
                                        </label>
                                        <input
                                            name="walletStatus"
                                            type="text"
                                            id="walletStatus"
                                            placeholder="Enter Last Name"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            value={'PENDING'}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className=" mt-5">
                                <PromotionChart />
                            </div>

                            {/* <div className="panel mt-5">
                                <Tab.Group>
                                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                        <Tab as={Fragment}>
                                            {({ selected }) => (
                                                <button
                                                    className={`${
                                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                                >
                                                    <RiHistoryFill className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                                    <span className="text-md font-bold">Referral History</span>
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
                                                    <RiCoupon2Fill className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                                    <RiFileTextFill className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                                    <IoTicketOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                                    <span className="text-md font-bold">Coupon Master</span>
                                                </button>
                                            )}
                                        </Tab>
                                    </Tab.List>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <ViewRefferalHistory details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} tabs={true} />
                                        </Tab.Panel>

                                        <Tab.Panel>
                                            <ViewBonusHistory details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} tabs={true} />
                                        </Tab.Panel>

                                        <Tab.Panel>
                                            <ViewPromocodeHistory details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} tabs={true} />
                                        </Tab.Panel>

                                        <Tab.Panel>
                                            <ViewCouponMaster details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} tabs={true} />
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div> */}
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-5">
                                <TripsReports />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/2">
                                        <TripTicketsReports />
                                    </div>
                                    <div className="lg:w-1/2">
                                        <TripBookingsReports />
                                    </div>
                                </div>

                                {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Booking</h2>
                                </div>
                                <ViewBookings tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Rating</h2>
                                </div>
                                <ViewCouponHistory tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Tickets</h2>
                                </div>
                                <ViewTickets tabs={true} /> */}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Audit logs</h2>
                                </div>
                                <AuditLogsDriver />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Verification Hisory</h2>
                                </div>
                                <VerificationHistory />
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

export default ViewSpecificServiceProvider;
