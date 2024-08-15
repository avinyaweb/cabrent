import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import FleetOwnerModule from './FleetOwnerModule';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { staticFleetOwnerData } from './ViewFleetOwner';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import Dropdown from '@/components/Dropdown';
import { IRootState } from '@/store';
import Tippy from '@tippyjs/react';
import IconEye from '@/components/Icon/IconEye';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import '../../../assets/css/tabs.css';
import { FaArrowUpRightFromSquare, FaCarSide } from 'react-icons/fa6';
import { RiBankLine, RiSteeringFill } from 'react-icons/ri';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTravelAgency from '@/components/CommonTables/AuditLogsTravelAgency';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { MdHistory, MdOutlineAttachMoney } from 'react-icons/md';
import { BiNews, BiTrip } from 'react-icons/bi';
import ViewSubscriptionHistory from '@/pages/SubscriptionModule/SubscriptionHistory/ViewSubscriptionHistory';
// import ViewPGTransactions from '@/pages/TransactionModule/PGTransactions/ViewPGTransactions';
import ViewBookings from '@/pages/TripModule/Bookings/ViewBookings';
import ViewTickets from '@/pages/TripModule/Tickets/ViewTickets';
import VehicleDetailsModal from '@/components/Models/VehicleDetailsModal';
import DriverDetailsModal from '@/components/Models/DriverDetailsModal';
import FleetOwnerDocLayout from './FleetOwnerDocLayout';
import { IoDocumentTextOutline } from 'react-icons/io5';
import ViewVehicleProfile from '../VehicleProfile/ViewVehicleProfile';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import { downloadExcel } from '@/utils/Excel';
import { errorAlert, successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import FinanceAnalysis from '@/components/ChartAndGraph/TravelAgency/TotalFinanceReport/FinanceAnalysis';
import TransactionReport from '@/components/ChartAndGraph/TravelAgency/TransactionsReport/TransactionReport';
import WalletReports from '@/components/ChartAndGraph/TravelAgency/WalletReport/WalletReports';
import PromotionChart from '@/components/ChartAndGraph/TravelAgency/PromotionReports/PromotionChart';
import TripsReports from '@/components/ChartAndGraph/TravelAgency/Trips/TripsReports';
import TripTicketsReports from '@/components/ChartAndGraph/TravelAgency/Trips/TripTicketsReports';
import TripBookingsReports from '@/components/ChartAndGraph/TravelAgency/Trips/TripBookingsReports';
import SubscriptionHistoryReport from '@/components/ChartAndGraph/TravelAgency/Subscription/SubscriptionHistoryReport';
import 'tippy.js/dist/tippy.css';
import StatusButtons from '@/components/StatusButtons';
import BankAccountModule from '@/pages/WalletModule/BankAccountDetails/BankAccountModule';
import BankAccountDocumentModule from '@/pages/WalletModule/BankAccountDetails/BankAccountDocumentModule';
import { staticBankAccountData } from '@/pages/WalletModule/BankAccountDetails/ViewBankAccount';

interface FormValues {
    companyType: string;
    distributor: string;
    TravelAgencyType: string;
    TravelAgencyName: string;
    mobileNumber: string;
    altMobileNumber: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    country: string;
    state: string;
    city: string;
    regAddress: string;
    commAddress: string;
    companyName: string;
    archive: string;
    fk_serviceCity: string;
    fatherName: string;
    // Added fleet management details
    ProfileStatus: string;
    leasedVehicle: string;
    agreedSaasContract: boolean;
    digitalTravelAgencyOwner: boolean;
    leasedAgreementImg: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
    //new fields:
    numberOfVehicle: string;
    numberOfDriver: string;
    activeDriver: string;
    inactiveDriver: string;
    activeVehicle: string;
    inactiveVehicle: string;
    Password: string;
    uniqueId: string;
    vehicleNumber: string;
    driverMobileNumber: string;
    driverName: string;
    driverPassword: string;
    referralCode: string;
    referredBy: string;
    distributorCode: string;
    ownerAddress: string;
    walletAmount: string;
    walletStatus: string;
}
interface VehicleProfileData {
    id: string;
    Driver: string;
    channelPartnerType: string;
    fleetManagementType: string;
    vehRegNumber: string;
    vehRTONumber: string;
    vehChasisNumber: string;
    vehCategory: string;
    seatCapacity: string;
    bootSpace: string;
    loadCapacity: string;
    bodyDimension: string;
    vehBrandName: string;
    vehType: string;
    vehBrandModel: string;
    vehColor: string;
    vehFuelType: string;
    fk_serviceCity: string;
    vehicleRegistrationDate: string;
    vehicleManufacturingDate: string;
    vehicleAge: string;
    loanBanker: string;
    loanAccNumber: string;
    emiAmt: string;
    emiDate: string;
    currLocation: string;
    ProfileStatus: string;
}
interface ServiceProviderData {
    id: string;
    Driver: string;
    channelPartnerType: string;
    fleetManagementType: string;
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
    pass: string;
    permanentAddress: string;
    presentAddress: string;
    fk_serviceCity: string;
    ProfileStatus: string;
}

interface BankAccountProps {
    id: string;
    bankName: string;
    fk_userId: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    panNumber: string;
    voterId: string;
    aadhar: string;
    gst: string;
    accountType: string;
    verificationHistory: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    bankVerify: string;
    pgLabel: string;
    pgVerify: string;

    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    userId: string;
    purpose: string;
    amount: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    pgTransactionId: string;
    transactionMode: string;
    walletStatus: string;
    appTransactionId: string;
    platformTransactionId: string;
    bankVerification: string;
    bankLabel: string;
    walletTransactionId: string;
    virtualTransactionId: string;
    paymentStatus: string;
    dateTime: string;
    distributorName: string;
    walletProfileStatus: string;
    walletIdFromUser: string;
    walletIdToUser: string;
    source: string;
}

interface BankDocProps {
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

const staticVehicleProfileData = [
    {
        id: '1',
        Driver: 'Type A',
        channelPartnerType: 'Partner X',
        fleetManagementType: 'Management 1',
        vehRegNumber: 'ABC123',
        vehRTONumber: 'RTO456',
        vehChasisNumber: 'CHS789',
        vehCategory: 'Category XYZ',
        seatCapacity: '5',
        bootSpace: 'Large',
        loadCapacity: '1000 kg',
        bodyDimension: '4.5m x 2m x 1.8m',
        vehBrandName: 'Brand 1',
        vehType: 'SUV',
        vehBrandModel: 'Model XYZ',
        vehColor: 'Red',
        vehFuelType: 'Petrol',
        fk_serviceCity: 'City A',
        vehicleRegistrationDate: '2023-05-20',
        vehicleManufacturingDate: '2023-04-15',
        vehicleAge: '1 year 8 months',
        loanBanker: 'Bank X',
        loanAccNumber: 'Loan789',
        emiAmt: '5000',
        emiDate: '25th',
        currLocation: 'Location ABC',
        ProfileStatus: 'No',
        updatedHistory: [
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T09:40:05.000Z',
                _id: '65928875e10d341487baa93a',
            },
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T10:28:30.000Z',
                _id: '659293cee10d341487baa9fa',
            },
        ],
    },
    {
        id: '2',
        Driver: 'Type B',
        channelPartnerType: 'Partner Y',
        fleetManagementType: 'Management 2',
        vehRegNumber: 'DEF456',
        vehRTONumber: 'RTO789',
        vehChasisNumber: 'CHS123',
        vehCategory: 'Category ABC',
        seatCapacity: '4',
        bootSpace: 'Medium',
        loadCapacity: '800 kg',
        bodyDimension: '4m x 1.8m x 1.5m',
        vehBrandName: 'Brand 2',
        vehType: 'Sedan',
        vehBrandModel: 'Model ABC',
        vehColor: 'Blue',
        vehFuelType: 'Diesel',
        fk_serviceCity: 'City B',
        vehicleRegistrationDate: '2022-10-10',
        vehicleManufacturingDate: '2022-08-05',
        vehicleAge: '1 year 3 months',
        loanBanker: 'Bank Y',
        loanAccNumber: 'Loan456',
        emiAmt: '4000',
        emiDate: '20th',
        currLocation: 'Location XYZ',
        ProfileStatus: 'Yes',
    },
    {
        id: '3',
        Driver: 'Type C',
        channelPartnerType: 'Partner Z',
        fleetManagementType: 'Management 3',
        vehRegNumber: 'GHI789',
        vehRTONumber: 'RTO123',
        vehChasisNumber: 'CHS456',
        vehCategory: 'Category PQR',
        seatCapacity: '7',
        bootSpace: 'Small',
        loadCapacity: '1200 kg',
        bodyDimension: '5m x 2.2m x 1.9m',
        vehBrandName: 'Brand 3',
        vehType: 'Hatchback',
        vehBrandModel: 'Model PQR',
        vehColor: 'Black',
        vehFuelType: 'Electric',
        fk_serviceCity: 'City C',
        vehicleRegistrationDate: '2024-01-01',
        vehicleManufacturingDate: '2023-12-01',
        vehicleAge: '1 month',
        loanBanker: 'Bank Z',
        loanAccNumber: 'Loan123',
        emiAmt: '6000',
        emiDate: '15th',
        currLocation: 'Location PQR',
        ProfileStatus: 'No',
    },
];

const staticServiceProviderData = [
    {
        id: '1',
        Driver: 'Type A',
        channelPartnerType: 'Partner A',
        fleetManagementType: 'Management A',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        email: 'john@example.com',
        dob: '1990-05-15',
        gender: 'Male',
        fatherName: 'Michael Doe',
        mobileNumber: '1234567890',
        altMobileNumber: '9876543210',
        country: 'Country A',
        state: 'State A',
        city: 'City A',
        dlNumber: 'DL123456',
        dlValidity: '2025-12-31',
        policeVerNumber: 'PV7890',
        batchNumber: 'B12345',
        batchValidity: '2024-06-30',
        pass: 'Pass123',
        permanentAddress: '123 Street, City A',
        presentAddress: '456 Avenue, City B',
        fk_serviceCity: 'Service City A',
        ProfileStatus: 'No',
        updatedHistory: [
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T09:40:05.000Z',
                _id: '65928875e10d341487baa93a',
            },
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T10:28:30.000Z',
                _id: '659293cee10d341487baa9fa',
            },
        ],
    },
    {
        id: '2',
        Driver: 'Type B',
        channelPartnerType: 'Partner B',
        fleetManagementType: 'Management B',
        firstName: 'Jane',
        middleName: 'Johnson',
        lastName: 'Doe',
        email: 'jane@example.com',
        dob: '1992-08-20',
        gender: 'Female',
        fatherName: 'David Johnson',
        mobileNumber: '9876543210',
        altMobileNumber: '1234567890',
        country: 'Country B',
        state: 'State B',
        city: 'City B',
        dlNumber: 'DL654321',
        dlValidity: '2026-10-15',
        policeVerNumber: 'PV4567',
        batchNumber: 'B67890',
        batchValidity: '2023-09-30',
        pass: 'Pass456',
        permanentAddress: '789 Road, City C',
        presentAddress: '012 Lane, City D',
        fk_serviceCity: 'Service City B',
        ProfileStatus: 'Yes',
    },
    {
        id: '3',
        Driver: 'Type C',
        channelPartnerType: 'Partner C',
        fleetManagementType: 'Management C',
        firstName: 'Alice',
        middleName: 'Williams',
        lastName: 'Brown',
        email: 'alice@example.com',
        dob: '1988-12-10',
        gender: 'Female',
        fatherName: 'Robert Williams',
        mobileNumber: '8765432109',
        altMobileNumber: '1098765432',
        country: 'Country C',
        state: 'State C',
        city: 'City C',
        dlNumber: 'DL987654',
        dlValidity: '2024-11-20',
        policeVerNumber: 'PV3456',
        batchNumber: 'B23456',
        batchValidity: '2025-04-15',
        pass: 'Pass789',
        permanentAddress: '345 Boulevard, City E',
        presentAddress: '678 Park, City F',
        fk_serviceCity: 'Service City C',
        ProfileStatus: 'No',
    },
];

const ViewSpecificFleetOwner: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const viewSpecific = true;
    const { fleetOwnerId } = useParams();

    const initialFormValues: FormValues = {
        companyType: '',
        distributor: '',
        TravelAgencyType: '',
        TravelAgencyName: '',
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
        regAddress: '',
        commAddress: '',
        fk_serviceCity: '',
        companyName: '',
        ProfileStatus: '', // Adding the missing property
        leasedVehicle: '',
        agreedSaasContract: false,
        digitalTravelAgencyOwner: false,
        leasedAgreementImg: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array

        //new fields:
        numberOfVehicle: ' ',
        numberOfDriver: ' ',
        activeDriver: ' ',
        inactiveDriver: ' ',
        activeVehicle: ' ',
        inactiveVehicle: ' ',
        Password: ' ',
        uniqueId: ' ',
        vehicleNumber: ' ',
        driverMobileNumber: ' ',
        driverName: ' ',
        driverPassword: ' ',
        referralCode: ' ',
        referredBy: ' ',
        distributorCode: ' ',
        ownerAddress: ' ',

        walletAmount: '',
        walletStatus: '',
    };

    const initialBanckValues: BankAccountProps = {
        id: '',
        bankName: '',
        fk_userId: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        panNumber: '',
        voterId: '',
        aadhar: '',
        gst: '',
        accountType: '',
        verificationHistory: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
        bankVerify: '',
        pgLabel: '',
        pgVerify: '',
        fromUser: '',
        toUser: '',
        toUserPhoneNumber: '',
        userId: '',
        purpose: '',
        amount: '',
        walletType: '',
        bankAccountIFSCFrom: '',
        bankAccountIFSCTo: '',
        pgTransactionId: '',
        transactionMode: '',
        walletStatus: '',
        appTransactionId: '',
        platformTransactionId: '',
        bankVerification: '',
        bankLabel: '',
        walletTransactionId: '',
        virtualTransactionId: '',
        paymentStatus: '',
        dateTime: '',
        distributorName: '',
        walletProfileStatus: '',
        walletIdFromUser: '',
        walletIdToUser: '',
        source: '',
    };

    const initialBanckDoc: BankDocProps = {
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

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [bankData, setBankData] = useState<BankAccountProps>(initialBanckValues);
    const [bankDoc, setBankDoc] = useState<BankDocProps>(initialBanckDoc);

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const [selectedDateRange_sp, setSelectedDateRange_sp] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    const handleDateRangeChange_sp = (range: DateRange | null) => {
        setSelectedDateRange_sp(range);
    };

    // traver agency static data.
    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticFleetOwnerData.find((data) => data.id === fleetOwnerId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues); // Set the entire form data
        }
    }, [fleetOwnerId]);

    // bank static data.
    useEffect(() => {
        const specificData = staticBankAccountData.find((data) => data.id === fleetOwnerId);
        if (specificData) {
            setBankData(specificData as unknown as BankAccountProps); // Set the entire form data
        }
    }, [fleetOwnerId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputinChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            label: 'Travel Agency',
            to: '/BusinessModule/FleetOwner/ViewFleetOwner',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/FleetOwner/ViewFleetOwner' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Travel Agency',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];
    // Table componenet.
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [VehicleProfileData, setVehicleProfileData] = useState<VehicleProfileData[]>(staticVehicleProfileData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<VehicleProfileData[]>([]);
    const [recordsData, setRecordsData] = useState<VehicleProfileData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<VehicleProfileData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (VehicleProfileData.length > 0) {
            const sortedData = VehicleProfileData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof VehicleProfileData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [VehicleProfileData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                Driver = '',
                channelPartnerType = '',
                fleetManagementType = '',
                vehRegNumber = '',
                vehRTONumber = '',
                vehChasisNumber = '',
                vehCategory = '',
                seatCapacity = '',
                bootSpace = '',
                loadCapacity = '',
                bodyDimension = '',
                vehBrandName = '',
                vehType = '',
                vehBrandModel = '',
                vehColor = '',
                vehFuelType = '',
                fk_serviceCity = '',
                vehicleRegistrationDate = '',
                vehicleManufacturingDate = '',
                vehicleAge = '',
                loanBanker = '',
                loanAccNumber = '',
                emiAmt = '',
                emiDate = '',
                currLocation = '',
                ProfileStatus = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                Driver?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                fleetManagementType?.toLowerCase().includes(searchString) ||
                vehRegNumber?.toLowerCase().includes(searchString) ||
                vehRTONumber?.toLowerCase().includes(searchString) ||
                vehChasisNumber?.toLowerCase().includes(searchString) ||
                vehCategory?.toLowerCase().includes(searchString) ||
                seatCapacity?.toLowerCase().includes(searchString) ||
                bootSpace?.toLowerCase().includes(searchString) ||
                loadCapacity?.toLowerCase().includes(searchString) ||
                bodyDimension?.toLowerCase().includes(searchString) ||
                vehBrandName?.toLowerCase().includes(searchString) ||
                vehType?.toLowerCase().includes(searchString) ||
                vehBrandModel?.toLowerCase().includes(searchString) ||
                vehColor?.toLowerCase().includes(searchString) ||
                vehFuelType?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                vehicleRegistrationDate?.toLowerCase().includes(searchString) ||
                vehicleManufacturingDate?.toLocaleLowerCase().includes(searchString) ||
                vehicleAge?.toLowerCase().includes(searchString) ||
                loanBanker?.toLowerCase().includes(searchString) ||
                loanAccNumber?.toLowerCase().includes(searchString) ||
                emiAmt?.toLowerCase().includes(searchString) ||
                emiDate?.toLowerCase().includes(searchString) ||
                currLocation?.toLowerCase().includes(searchString) ||
                ProfileStatus?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    // Function to toggle column visibility
    const toggleColumnVisibility = (columnAccessor: string) => {
        setHiddenColumns((prevHiddenColumns) => {
            if (prevHiddenColumns.includes(columnAccessor)) {
                return prevHiddenColumns.filter((col) => col !== columnAccessor);
            } else {
                return [...prevHiddenColumns, columnAccessor];
            }
        });
    };

    const columns: DataTableColumn<VehicleProfileData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/BusinessModule/VehicleProfile/EditVehicleProfile/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy>
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/${rowData.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IconEye />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'Driver', title: 'Service Provider Type', sortable: true, hidden: hiddenColumns.includes('Driver') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type', sortable: true, hidden: hiddenColumns.includes('fleetManagementType') },
        { accessor: 'vehRegNumber', title: 'Vehicle Registration No', sortable: true, hidden: hiddenColumns.includes('vehRegNumber') },
        { accessor: 'vehRTONumber', title: 'Vehicle RTO Number', sortable: true, hidden: hiddenColumns.includes('vehRTONumber') },
        { accessor: 'vehChasisNumber', title: 'Vehicle Chasis Number', sortable: true, hidden: hiddenColumns.includes('vehChasisNumber') },
        { accessor: 'vehCategory', title: 'Vehicle Category', sortable: true, hidden: hiddenColumns.includes('vehCategory') },
        { accessor: 'seatCapacity', title: 'Seat Capacity', sortable: true, hidden: hiddenColumns.includes('seatCapacity') },
        { accessor: 'bootSpace', title: 'Boot Space', sortable: true, hidden: hiddenColumns.includes('bootSpace') },
        { accessor: 'loadCapacity', title: 'Load Capacity', sortable: true, hidden: hiddenColumns.includes('loadCapacity') },
        { accessor: 'bodyDimension', title: 'Body Dimension', sortable: true, hidden: hiddenColumns.includes('bodyDimension') },
        { accessor: 'vehBrandName', title: 'Vehicle Brand Name', sortable: true, hidden: hiddenColumns.includes('vehBrandName') },
        { accessor: 'vehType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('vehType') },
        { accessor: 'vehBrandModel', title: 'Vehicle Brand Model', sortable: true, hidden: hiddenColumns.includes('vehBrandModel') },
        { accessor: 'vehColor', title: 'Vehicle Color', sortable: true, hidden: hiddenColumns.includes('vehColor') },
        { accessor: 'vehFuelType', title: 'Vehicle Fuel Type', sortable: true, hidden: hiddenColumns.includes('vehFuelType') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'vehicleRegistrationDate', title: 'Vehicle Registration Date', sortable: true, hidden: hiddenColumns.includes('vehicleRegistrationDate') },
        { accessor: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', sortable: true, hidden: hiddenColumns.includes('vehicleManufacturingDate') },
        { accessor: 'vehicleAge', title: 'Vehicle Age', sortable: true, hidden: hiddenColumns.includes('vehicleAge') },
        { accessor: 'loanBanker', title: 'Loan Banker', sortable: true, hidden: hiddenColumns.includes('loanBanker') },
        { accessor: 'loanAccNumber', title: 'Loan Acc Number', sortable: true, hidden: hiddenColumns.includes('loanAccNumber') },
        { accessor: 'emiAmt', title: 'EMI Amt', sortable: true, hidden: hiddenColumns.includes('emiAmt') },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true, hidden: hiddenColumns.includes('emiDate') },
        { accessor: 'currLocation', title: 'Curr Location', sortable: true, hidden: hiddenColumns.includes('currLocation') },
        { accessor: 'ProfileStatus', title: 'ProfileStatus', sortable: true, hidden: hiddenColumns.includes('ProfileStatus') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: VehicleProfileData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: VehicleProfileData[] = [];
        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }
        setSelectedRecords(updatedSelectedRecords);
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/VehicleProfile/EditVehicleProfile/${selectedRecords[0].id}`;
            navigate(editUrl);
        }
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChangeInDriver = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/${selectedRecords[0].id}`;
            navigate(editUrl);
        }
    };

    //============

    const [currentPage_sp, setCurrentPage_sp] = useState<string>('');
    const [ServiceProviderData, setServiceProviderData] = useState<ServiceProviderData[]>(staticServiceProviderData);
    const [page_sp, setPage_sp] = useState(1);
    const PAGE_SIZES_sp = [10, 20, 30, 50, 100];
    const [pageSize_sp, setPageSize_sp] = useState(PAGE_SIZES[0]);
    const [initialRecords_sp, setInitialRecords_sp] = useState<ServiceProviderData[]>([]);
    const [recordsData_sp, setRecordsData_sp] = useState<ServiceProviderData[]>([]);
    const [selectedRecords_sp, setSelectedRecords_sp] = useState<ServiceProviderData[]>([]);
    const [search_sp, setSearch_sp] = useState('');
    const [sortStatus_sp, setSortStatus_sp] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage_sp(1);
    }, [pageSize_sp]);

    useEffect(() => {
        const from = (page_sp - 1) * pageSize_sp;
        const to = from + pageSize_sp;
        setRecordsData_sp([...initialRecords_sp.slice(from, to)]);
    }, [page_sp, pageSize_sp, initialRecords_sp]);

    useEffect(() => {
        if (ServiceProviderData.length > 0) {
            const sortedData_sp = ServiceProviderData.slice().sort((a, b) => {
                const accessor = sortStatus_sp.columnAccessor as keyof ServiceProviderData;
                if (a[accessor] < b[accessor]) return sortStatus_sp.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus_sp.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords_sp(sortedData_sp);
            setRecordsData_sp(sortedData_sp.slice(0, pageSize_sp));
        }
    }, [ServiceProviderData, sortStatus_sp, pageSize_sp]);

    useEffect(() => {
        const filteredData_sp = initialRecords_sp.filter((item) => {
            const {
                Driver = '',
                channelPartnerType = '',
                fleetManagementType = '',
                firstName = '',
                middleName = '',
                lastName = '',
                email = '',
                dob = '',
                gender = '',
                fatherName = '',
                mobileNumber = '',
                altMobileNumber = '',
                country = '',
                state = '',
                city = '',
                dlNumber = '',
                dlValidity = '',
                policeVerNumber = '',
                batchNumber = '',
                batchValidity = '',
                pass = '',
                permanentAddress = '',
                presentAddress = '',
                fk_serviceCity = '',
                ProfileStatus = '',
            } = item || {};

            const searchString = search_sp ? search_sp.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                Driver?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                fleetManagementType?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                dob?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                fatherName?.toLowerCase().includes(searchString) ||
                mobileNumber?.toLowerCase().includes(searchString) ||
                altMobileNumber?.toLowerCase().includes(searchString) ||
                country?.toLowerCase().includes(searchString) ||
                state?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                dlNumber?.toLowerCase().includes(searchString) ||
                dlValidity?.toLowerCase().includes(searchString) ||
                policeVerNumber?.toLowerCase().includes(searchString) ||
                batchNumber?.toLowerCase().includes(searchString) ||
                batchValidity?.toLowerCase().includes(searchString) ||
                pass?.toLowerCase().includes(searchString) ||
                permanentAddress?.toLowerCase().includes(searchString) ||
                presentAddress?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                ProfileStatus?.toLocaleLowerCase().includes(searchString)
            );
        });

        setRecordsData_sp(filteredData_sp.slice(0, pageSize_sp));
    }, [search_sp, initialRecords_sp, pageSize_sp]);

    // State to manage hidden columns
    const [hiddenColumns_sp, setHiddenColumns_sp] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    // Function to toggle column visibility
    const toggleColumnVisibility_sp = (columnAccessor: string) => {
        setHiddenColumns_sp((prevHiddenColumns) => {
            if (prevHiddenColumns.includes(columnAccessor)) {
                return prevHiddenColumns.filter((col) => col !== columnAccessor);
            } else {
                return [...prevHiddenColumns, columnAccessor];
            }
        });
    };

    const columns_sp: DataTableColumn<ServiceProviderData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy>
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/${rowData.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IconEye />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'Driver', title: 'Service Provider Type', sortable: true, hidden: hiddenColumns.includes('Driver') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type', sortable: true, hidden: hiddenColumns.includes('fleetManagementType') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'dob', title: 'DOB', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'fatherName', title: 'Father Name', sortable: true, hidden: hiddenColumns.includes('fatherName') },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true, hidden: hiddenColumns.includes('mobileNumber') },
        { accessor: 'altMobileNumber', title: 'Alt Mobile Number', sortable: true, hidden: hiddenColumns.includes('altMobileNumber') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'dlNumber', title: 'DL Number', sortable: true, hidden: hiddenColumns.includes('dlNumber') },
        { accessor: 'dlValidity', title: 'DL Validity', sortable: true, hidden: hiddenColumns.includes('dlValidity') },
        { accessor: 'policeVerNumber', title: 'Police Verify No', sortable: true, hidden: hiddenColumns.includes('policeVerNumber') },
        { accessor: 'batchNumber', title: 'Batch No', sortable: true, hidden: hiddenColumns.includes('batchNumber') },
        { accessor: 'batchValidity', title: 'Batch Validity', sortable: true, hidden: hiddenColumns.includes('batchValidity') },
        { accessor: 'pass', title: 'Pass', sortable: true, hidden: hiddenColumns.includes('pass') },
        { accessor: 'permanentAddress', title: 'Permanent Add', sortable: true, hidden: hiddenColumns.includes('permanentAddress') },
        { accessor: 'presentAddress', title: 'Present Add', sortable: true, hidden: hiddenColumns.includes('presentAddress') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'ProfileStatus', title: 'ProfileStatus', sortable: true, hidden: hiddenColumns.includes('ProfileStatus') },
    ];

    const sortedData_sp = recordsData_sp; // Replace this with your sorting logic

    const handleRowClick_sp = (row: ServiceProviderData) => {
        const isSelected = selectedRecords_sp.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: ServiceProviderData[] = [];
        if (isSelected) {
            updatedSelectedRecords = selectedRecords_sp.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords_sp, row];
        }
        setSelectedRecords_sp(updatedSelectedRecords);
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const [DriverData, setDriverData] = useState<any[]>([]);
    const [driverType, setDriverType] = useState<any>();

    const [Vehicle, setVehicle] = useState<any[]>([]);
    // const [vehicleType, setVehicleType] = useState<any>();

    // const handleAddUserSubmit = (selectedVehicle: any[], userID: string) => {
    //     setVehicle(selectedVehicle);
    //     setVehicleType(userID);
    // };

    const handleAddDriverSubmit = (selectedDriver: any[], userID: string) => {
        setDriverData(selectedDriver);
        setDriverType(userID);
    };

    const [UpdateProfileStatus, setUpdateProfileStatus] = useState(false);
    // add update ProfileStatus
    const handleAddUpdateProfileStatus = (selectedProfileStatus: any[], id: string) => {
        successAlert('ProfileStatus Updated Succesfully');
        // handle update ProfileStatus
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange_sp = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords_sp.length === 1) {
            // const editUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/${selectedRecords[0].id}`;
            const editUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/2`;
            navigate(editUrl);
        } else if (selectedOption === 'removeDriver' && selectedRecords_sp.length === 1) {
            errorAlert('Driver removed succesfully');
        } else if (selectedOption === 'updateProfileStatus' && selectedRecords_sp.length === 1) {
            setUpdateProfileStatus(true);
        } else if (selectedOption === 'export' && selectedRecords_sp.length === 1) {
            downloadExcel(selectedRecords_sp, 'Driver');
        }
    };

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 10;

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
                    <Tab.List id="tabs" className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a] overflow-y-auto scrollbar-hide">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <HiOutlineOfficeBuilding className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Travel Agency</span>
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
                                    <span className="text-md font-bold">Documents</span>
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
                                    <FaCarSide className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                    <RiSteeringFill className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Driver Details</span>
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
                                    <RiBankLine className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                    <BiNews className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                    <BiTrip className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Trips</span>
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
                                <StatusButtons title="" />

                                <div className="mt-5 flex justify-end items-center gap-3">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                        onClick={() => {
                                            const viewUrl = `/BusinessModule/FleetOwner/EditFleetOwner/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <FleetOwnerModule details={formData} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                                        <label htmlFor="approvedAt" className="block mb-1 font-bold text-md">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.approvedAt}
                                            value="2024-01-07T10:15:00Z"
                                            onChange={handleInputChange}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                                        <label htmlFor="approvedBy" className="block mb-1 font-bold text-md">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.approvedBy}
                                            value="Tovino"
                                            onChange={handleInputChange}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                                        <label htmlFor="createdAt" className="block mb-1 font-bold text-md">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.createdAt}
                                            value="2024-01-06T14:00:00Z"
                                            onChange={handleInputChange}
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                                        <label htmlFor="createdBy" className="block mb-1 font-bold text-md">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={formData.createdBy}
                                            value="Admin456"
                                            readOnly={viewSpecific}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                {/* <Tippy content="Currently Ticket is Active">
                                    <button type="button" className="btn btn-success">
                                        Approved
                                    </button>
                                </Tippy> */}

                                <StatusButtons title="" />

                                <div className="mt-5 flex justify-end items-center gap-3">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                        onClick={() => {
                                            const viewUrl = `/BusinessModule/FleetOwner/EditFleetOwner/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="font-semibold text-lg">Documents</h2>
                                </div>

                                <FleetOwnerDocLayout details={formData} onInputChange={handleInputChange} viewSpecific={viewSpecific} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="font-semibold text-lg">Vehicle Details</h2>
                                </div>
                                <div className="flex justify-end mb-2">
                                    <button type="button" onClick={() => navigate('/BusinessModule/VehicleProfile/CreateVehicleProfile')} className="btn btn-primary w-1/4">
                                        Create Vehicle
                                    </button>
                                    {/* {vehicleType === 'vehicleAdded' ? (
                                    ) : (
                                        <button type="button" onClick={() => setModal1(true)} className="btn btn-primary w-1/4">
                                            Add Vehicle
                                        </button>
                                    )} */}
                                    {/* <VehicleDetailsModal event={modal1} closeModal={() => setModal1(false)} onAddVehicle={handleAddUserSubmit} /> */}
                                </div>
                                <ViewVehicleProfile tabs={true} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark ">
                                    <h2 className="font-semibold text-lg">Driver Details</h2>
                                </div>
                                <div className="flex justify-end p-3 mb-2">
                                    <button type="button" onClick={() => navigate('/BusinessModule/ServiceProvider/CreateServiceProvider')} className="btn btn-primary w-1/4">
                                        Create Driver
                                    </button>
                                    {/* {driverType === 'driverAdded' ? (
                                        <button type="button" onClick={() => setModal2(true)} className="btn btn-success w-1/4">
                                            Added
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => setModal2(true)} className="btn btn-primary w-1/4">
                                            Add Driver
                                        </button>
                                    )}
                                    <DriverDetailsModal event={modal2} closeModal={() => setModal2(false)} onAddDriver={handleAddDriverSubmit} /> */}
                                </div>
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 ">
                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 ">
                                        <div className="dropdown">
                                            {/* Dropdown content */}
                                            <Dropdown
                                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                btnClassName="w-full !flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                                button={
                                                    <>
                                                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                                        <div className="flex items-center ml-auto">
                                                            <IconCaretDown className="w-5 h-5" />
                                                        </div>
                                                    </>
                                                }
                                            >
                                                <ul className="!min-w-[300px] max-h-60 overflow-y-auto">
                                                    {' '}
                                                    {columns.map((col, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex flex-col"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <div className="flex items-center px-4 py-1">
                                                                <label className="cursor-pointer mb-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={!hiddenColumns_sp.includes(col.accessor)}
                                                                        className="form-checkbox"
                                                                        defaultValue={col.accessor}
                                                                        onChange={() => toggleColumnVisibility_sp(col.accessor)}
                                                                    />
                                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title || col.accessor}</span>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange_sp} className="cursor-pointer" />
                                    </div>
                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 ">
                                        <input type="text" className="form-input w-full " placeholder="Search..." value={search_sp} onChange={(e) => setSearch_sp(e.target.value)} />
                                    </div>
                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 ">
                                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange_sp(e.target.value)} required>
                                            <option value="">Action Dropdown</option>
                                            <option value="edit">Edit</option>
                                            <option value="removeDriver">Remove Driver</option>
                                            <option value="updateProfileStatus">Update ProfileStatus</option>
                                            <option value="export">Export</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="datatables mt-6">
                                    <DataTable
                                        className="whitespace-nowrap table-hover"
                                        records={sortedData_sp}
                                        columns={columns_sp}
                                        highlightOnHover
                                        totalRecords={ServiceProviderData.length}
                                        recordsPerPage={pageSize_sp}
                                        page={page_sp}
                                        onPageChange={(p) => setPage_sp(p)}
                                        recordsPerPageOptions={PAGE_SIZES_sp}
                                        onRecordsPerPageChange={setPageSize_sp}
                                        sortStatus={sortStatus_sp}
                                        onSortStatusChange={setSortStatus_sp}
                                        selectedRecords={selectedRecords_sp}
                                        onSelectedRecordsChange={(selectedRows) => setSelectedRecords_sp(selectedRows)}
                                        minHeight={200}
                                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                                        // onRowClick={(row) => handleRowClick(row)}
                                    />
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <SubscriptionHistoryReport />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="font-semibold text-lg">Active Subcription</h2>
                                </div>
                                <ViewSubscriptionHistory tabs={true} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <FinanceAnalysis />

                                <div className="mt-6 panel">
                                    <TransactionReport />
                                </div>

                                <div className="mt-6 panel">
                                    <WalletReports />
                                </div>

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-4">
                                    <h2 className="font-semibold text-lg">Canceled Tranasaction</h2>
                                </div>
                                {/* <ViewPGTransactions tabs={true} /> */}

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
                            <div className="mt-5 flex justify-end items-center gap-3">
                                <button
                                    className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                    onClick={() => navigate('/BusinessModule/FleetOwner/EditFleetOwner/1')}
                                >
                                    <h3>Update Bank Account</h3>
                                    <IconEdit />
                                </button>
                            </div>

                            <BankAccountModule details={bankData} onInputChange={handleInputChange} viewSpecific={true} isEdit={false} />
                            <BankAccountDocumentModule details={bankDoc} onInputChange={handleInputChange} viewSpecific={true} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <PromotionChart />

                                {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Promocode History</h2>
                                </div>
                                <ViewPromocodeHistory tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Coupon History </h2>
                                </div>
                                <ViewCouponHistory tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Referral History</h2>
                                </div>
                                <ViewRefferalHistory tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Bonus History</h2>
                                </div>
                                <ViewBonusHistory tabs={true} /> */}
                            </div>
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

                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-4">
                                    <h2 className="font-semibold text-lg">Booking</h2>
                                </div>
                                <ViewBookings tabs={true} />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="font-semibold text-lg">Tickets</h2>
                                </div>
                                <ViewTickets tabs={true} />
                                {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="font-semibold text-lg">Tickets</h2>
                                </div>
                                <ViewTickets tabs={true} /> */}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2 className="font-semibold text-lg">Audit logs</h2>
                                </div>
                                <AuditLogsTravelAgency />
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

                <UpdateArchivePopUp event={UpdateProfileStatus} closeModal={() => setUpdateProfileStatus(false)} onSubmit={handleAddUpdateProfileStatus} />
            </div>
        </>
    );
};

export default ViewSpecificFleetOwner;
