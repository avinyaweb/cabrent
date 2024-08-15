import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { downloadExcel } from '@/utils/Excel';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { successAlert } from '@/utils/Toast';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticTicketData } from '@/pages/AdminModule/AdminTickets/ViewAdminTickets';
import { staticVehicleProfileData } from '../VehicleProfile/ViewVehicleProfile';
import { staticSubscriptionData } from '@/pages/SubscriptionModule/Subscription/ViewSubscription';

interface ServiceProviderData {
    id: string;
    serviceProviderType: string;
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
    isAvailable: string;
    badgeNumber: string;
    badgeValidity: string;
    emergencyContact: string;
    driverStatus: string;
    registerAddress: string;
    driverLocation: string;
    driverKey: string;
    rtoDisplayCard: string;
    StateandRTO: string;
    verificationHistory: string;
    permanentAddress: string;
    presentAddress: string;
    serviceCity: string;
    ProfileStatus: string;

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
    fleetManagementType: string;
    currLocation: string;
    updatedHistory: {
        updatedByObjectId: string;
        updatedTime: string;
        _id: string;
    }[];
}

export const staticServiceProviderData: ServiceProviderData[] = [
    {
        id: '1',
        serviceProviderType: 'Owner',
        channelPartnerType: 'tacle distributor limited',
        TravelAgency: 'ammus agency',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        email: 'john@example.com',
        dob: '1990-05-15',
        gender: 'Male',
        fatherName: 'Michael Doe',
        mobileNumber: '1234567890',
        altMobileNumber: '9876543210',
        country: 'india',
        state: 'kerala',
        city: 'kochi',
        dlNumber: 'DL123456',
        dlValidity: '2025-12-31',
        policeVerNumber: 'PV7890',
        batchNumber: 'B12345',
        batchValidity: '2024-06-30',
        password: 'Password123',
        permanentAddress: '123 Street, City A',
        presentAddress: '456 Avenue, City B',
        registerAddress: '789 Lane, City C',
        isAvailable: 'true',
        badgeNumber: 'BADGE123',
        badgeValidity: '2024-12-31',
        emergencyContact: '9876543211',
        driverStatus: 'Active',
        driverLocation: 'Chickpet',
        driverKey: 'DriverKey123',
        rtoDisplayCard: 'RTOCard123',
        StateandRTO: 'State RTO 456',
        serviceCity: 'Service City A',
        verificationHistory: 'Verified',
        ProfileStatus: 'Pending',
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
        fleetManagementType: 'Type X',
        currLocation: 'Location ABC',
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
        serviceProviderType: 'Owner com driver',
        channelPartnerType: 'racly distributor',
        TravelAgency: 'Lottas agency',
        firstName: 'Jane',
        middleName: 'Johnson',
        lastName: 'Doe',
        email: 'jane@example.com',
        dob: '1992-08-20',
        gender: 'Female',
        fatherName: 'David Johnson',
        mobileNumber: '9876543210',
        altMobileNumber: '1234567890',
        country: 'india',
        state: 'kerala',
        city: 'kochi',
        dlNumber: 'DL654321',
        dlValidity: '2026-10-15',
        policeVerNumber: 'PV4567',
        batchNumber: 'B67890',
        batchValidity: '2023-09-30',
        password: 'Password456',
        permanentAddress: '789 Road, City C',
        presentAddress: '012 Lane, City D',
        registerAddress: '456 Street, City E',
        isAvailable: 'false',
        badgeNumber: 'BADGE456',
        badgeValidity: '2023-12-31',
        emergencyContact: '9876543212',
        driverStatus: 'Inactive',
        driverLocation: 'banashakari',
        driverKey: 'DriverKey456',
        rtoDisplayCard: 'RTOCard456',
        StateandRTO: 'State RTO 789',
        serviceCity: 'Service City B',
        verificationHistory: 'Not Verified',
        ProfileStatus: 'Approved',
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
        fleetManagementType: 'Type Y',
        currLocation: 'Location XYZ',
        updatedHistory: [
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T09:40:05.000Z',
                _id: '65928875e10d341487baa93a',
            },
        ],
    },
    {
        id: '3',
        serviceProviderType: 'Owner',
        channelPartnerType: 'abc limited',
        TravelAgency: 'ashish travels',
        firstName: 'Alice',
        middleName: 'Williams',
        lastName: 'Brown',
        email: 'alice@example.com',
        dob: '1988-12-10',
        gender: 'Female',
        fatherName: 'Robert Williams',
        mobileNumber: '8765432109',
        altMobileNumber: '1098765432',
        country: 'india',
        state: 'tamilnadu',
        city: 'madura',
        dlNumber: 'DL987654',
        dlValidity: '2024-11-20',
        policeVerNumber: 'PV3456',
        batchNumber: 'B23456',
        batchValidity: '2025-04-15',
        password: 'Password789',
        permanentAddress: '345 Boulevard, City E',
        presentAddress: '678 Park, City F',
        registerAddress: '123 Avenue, City G',
        isAvailable: 'true',
        badgeNumber: 'BADGE789',
        badgeValidity: '2025-12-31',
        emergencyContact: '9876543213',
        driverStatus: 'Active',
        driverLocation: 'JP nagar',
        driverKey: 'DriverKey789',
        rtoDisplayCard: 'RTOCard789',
        StateandRTO: 'State RTO 123',
        serviceCity: 'Service City C',
        verificationHistory: 'Verified',
        ProfileStatus: 'Hold',
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
        fleetManagementType: 'Type Z',
        emiAmt: '6000',
        emiDate: '15th',
        currLocation: 'Location PQR',
        updatedHistory: [
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T09:40:05.000Z',
                _id: '65928875e10d341487baa93a',
            },
        ],
    },
];

const ViewServiceProvider: React.FC<{ tabs: boolean; userManagementPage?: boolean }> = ({ tabs, userManagementPage = true }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const location = useLocation();

    // Set the current page here
    const [currentPage, setCurrentPage] = useState<string>('');
    const [modal3, setmodal3] = useState(false);
    const [ServiceProviderData, setServiceProviderData] = useState<ServiceProviderData[]>(staticServiceProviderData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ServiceProviderData[]>([]);
    const [recordsData, setRecordsData] = useState<ServiceProviderData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<ServiceProviderData[]>([]);
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

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    //handle date sorting
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // add update ProfileStatus
    const handleAddUpdateProfileStatus = (selectedProfileStatus: any[], id: string) => {
        successAlert('ProfileStatus Updated Succesfully');
        // handle update ProfileStatus
    };

    // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View Driver'));

    //     const fetchServiceProviderData = async () => {
    //         try {
    //             const { data } = await getServiceProviderData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 //setServiceProviderData(newData);
    //                 setServiceProviderData(staticServiceProviderData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching service provider data:', error.message);
    //         }
    //     };
    //     fetchServiceProviderData();
    // }, [dispatch]);

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    useEffect(() => {
        if (ServiceProviderData.length > 0) {
            const sortedData = ServiceProviderData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ServiceProviderData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ServiceProviderData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                serviceProviderType = '',
                channelPartnerType = '',
                TravelAgency = '',
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
                password = '',
                permanentAddress = '',
                presentAddress = '',
                registerAddress = '',
                isAvailable = '',
                badgeNumber = '',
                badgeValidity = '',
                emergencyContact = '',
                driverStatus = '',
                driverLocation = '',
                driverKey = '',
                rtoDisplayCard = '',
                StateandRTO = '',
                verificationHistory = '',
                serviceCity = '',
                ProfileStatus = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                serviceProviderType?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                TravelAgency?.toLowerCase().includes(searchString) ||
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
                password?.toLowerCase().includes(searchString) ||
                permanentAddress?.toLowerCase().includes(searchString) ||
                presentAddress?.toLowerCase().includes(searchString) ||
                registerAddress?.toLowerCase().includes(searchString) ||
                isAvailable?.toString().toLowerCase().includes(searchString) ||
                badgeNumber?.toLowerCase().includes(searchString) ||
                badgeValidity?.toLowerCase().includes(searchString) ||
                emergencyContact?.toLowerCase().includes(searchString) ||
                driverStatus?.toLowerCase().includes(searchString) ||
                driverLocation?.toString().toLowerCase().includes(searchString) ||
                driverKey?.toLowerCase().includes(searchString) ||
                rtoDisplayCard?.toLowerCase().includes(searchString) ||
                StateandRTO?.toLowerCase().includes(searchString) ||
                verificationHistory?.toLowerCase().includes(searchString) ||
                serviceCity?.toLowerCase().includes(searchString) ||
                ProfileStatus?.toLocaleLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([
        'id',
        'vehRegNumber',
        'vehRTONumber',
        'vehChasisNumber',
        'vehCategory',
        'seatCapacity',
        'bootSpace',
        'loadCapacity',
        'bodyDimension',
        'vehBrandName',
        'vehType',
        'vehBrandModel',
        'vehColor',
        'vehFuelType',
        'vehicleRegistrationDate',
        'vehicleManufacturingDate',
        'vehicleAge',
        'loanBanker',
        'loanAccNumber',
        'emiAmt',
        'emiDate',
        'currLocation',
        'approvedAt',
        'approvedBy',
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy',
    ]);

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

    const columns: DataTableColumn<ServiceProviderData>[] = [
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
        { accessor: 'serviceProviderType', title: 'Driver Type', sortable: true, hidden: hiddenColumns.includes('serviceProviderType') },
        { accessor: 'channelPartnerType', title: 'Distributor', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'TravelAgency', title: 'Travel Agency', sortable: true, hidden: hiddenColumns.includes('TravelAgency') },
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
        { accessor: 'password', title: 'Password', sortable: true, hidden: hiddenColumns.includes('password') },
        { accessor: 'permanentAddress', title: 'Permanent Add', sortable: true, hidden: hiddenColumns.includes('permanentAddress') },
        { accessor: 'presentAddress', title: 'Present Add', sortable: true, hidden: hiddenColumns.includes('presentAddress') },
        { accessor: 'isAvailable', title: 'Is Available', sortable: true, hidden: hiddenColumns.includes('isAvailable') },
        { accessor: 'badgeNumber', title: 'Badge Number', sortable: true, hidden: hiddenColumns.includes('badgeNumber') },
        { accessor: 'badgeValidity', title: 'Badge Validity', sortable: true, hidden: hiddenColumns.includes('badgeValidity') },
        { accessor: 'emergencyContact', title: 'Emergency Contact', sortable: true, hidden: hiddenColumns.includes('emergencyContact') },
        { accessor: 'driverStatus', title: 'Driver Status', sortable: true, hidden: hiddenColumns.includes('driverStatus') },
        { accessor: 'registerAddress', title: 'Register Address', sortable: true, hidden: hiddenColumns.includes('registerAddress') },
        { accessor: 'driverLocation', title: 'Driver Location', sortable: true, hidden: hiddenColumns.includes('driverLocation') },
        { accessor: 'driverKey', title: 'Driver Key', sortable: true, hidden: hiddenColumns.includes('driverKey') },
        { accessor: 'rtoDisplayCard', title: 'RTO Display Card', sortable: true, hidden: hiddenColumns.includes('rtoDisplayCard') },
        { accessor: 'StateandRTO', title: 'State and RTO', sortable: true, hidden: hiddenColumns.includes('StateandRTO') },
        { accessor: 'verificationHistory', title: 'Verification History', sortable: true, hidden: hiddenColumns.includes('verificationHistory') },
        { accessor: 'serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('serviceCity') },
        { accessor: 'ProfileStatus', title: 'Profile Status', sortable: true, hidden: hiddenColumns.includes('ProfileStatus') },

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
        { accessor: 'vehicleRegistrationDate', title: 'Vehicle Registration Date', sortable: true, hidden: hiddenColumns.includes('vehicleRegistrationDate') },
        { accessor: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', sortable: true, hidden: hiddenColumns.includes('vehicleManufacturingDate') },
        { accessor: 'vehicleAge', title: 'Vehicle Age', sortable: true, hidden: hiddenColumns.includes('vehicleAge') },
        { accessor: 'loanBanker', title: 'Loan Banker', sortable: true, hidden: hiddenColumns.includes('loanBanker') },
        { accessor: 'loanAccNumber', title: 'Loan Acc Number', sortable: true, hidden: hiddenColumns.includes('loanAccNumber') },
        { accessor: 'emiAmt', title: 'EMI Amt', sortable: true, hidden: hiddenColumns.includes('emiAmt') },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true, hidden: hiddenColumns.includes('emiDate') },
        { accessor: 'currLocation', title: 'Curr Location', sortable: true, hidden: hiddenColumns.includes('currLocation') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: ServiceProviderData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: ServiceProviderData[] = [];
        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }
        setSelectedRecords(updatedSelectedRecords);
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // add vehicle ---------->>
    const [AddVehicle, setAddVehicle] = useState(false);
    const [VehicleData, setAddedVehicleData] = useState<any[]>([]);
    const [addedVehicleDataType, setVehicleDataType] = useState<any>();
    // add vehicle table columns
    const vehicleColumns: DataTableColumn<any>[] = [
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
    ];

    // popup add vehicle
    const handleAddVehicle = (selectedTeam: any[], id: string) => {
        successAlert('Vehicle Added Succesfully');
        setAddedVehicleData(selectedTeam);
        setVehicleDataType(id);
    };

    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            const confirmDelete = window.confirm('Do you really want to delete this Driver?');
        } else if (selectedOption === 'uploadDocument' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/ServiceProvider/EditServiceProvider/1`;
            navigate(editUrl);
        } else if (selectedOption === 'updateProfileStatus' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else if (selectedOption === 'assignVehicle' && selectedRecords.length === 1) {
            setAddVehicle(true);
        } else if (selectedOption === 'purchaseSubscription' && selectedRecords.length === 1) {
            setModal4(true);
        }
    };

    const [modal4, setModal4] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<any[]>([]);
    const [addedSubscriptionType, setAddedSubscriptionType] = useState<any>();

    const subscriptionColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'planName', title: 'Plan Name', sortable: true },
        { accessor: 'planDetails', title: 'Plan Details', sortable: true },
        { accessor: 'planDuration', title: 'Plan Duration', sortable: true },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'planDescription', title: 'Plan Description', sortable: true },
        { accessor: 'planDistance', title: 'Plan Distance', sortable: true },
        { accessor: 'planLiveStartTime', title: 'Plan Live Start Time', sortable: true },
        { accessor: 'planLiveEndTime', title: 'Plan Live End Time', sortable: true },
        { accessor: 'ProfileStatus', title: 'ProfileStatus', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
        { accessor: 'CGST', title: 'CGST', sortable: true },
        { accessor: 'SGST', title: 'SGST', sortable: true },
        { accessor: 'PlanAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'ProcessingFee', title: 'Processing Fee', sortable: true },
        { accessor: 'CHPartCommission', title: 'CHPart Commission', sortable: true },
        { accessor: 'PlatformFee', title: 'Platform Fee', sortable: true },
    ];

    const handleAddSubscription = (selectedSub: any[], id: string) => {
        successAlert('Subscription Added Successfully');
        setSelectedSubscription(selectedSub);
        setAddedSubscriptionType(id);
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
    ];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}
            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* {!tabs && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <Link to="/BusinessModule/ServiceProvider/CreateServiceProvider" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                                Create Driver
                            </Link>
                        </div>
                    )} */}
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                    </div>
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
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
                                                        checked={!hiddenColumns.includes(col.accessor)}
                                                        className="form-checkbox"
                                                        defaultValue={col.accessor}
                                                        onChange={() => toggleColumnVisibility(col.accessor)}
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

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {userManagementPage && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                <option value="uploadDocument">Upload Documents</option>
                                <option value="assignVehicle">Assign Vehicle</option>
                                <option value="purchaseSubscription">Purchase Subscription</option>
                                <option value="updateProfileStatus">Update ProfileStatus</option>
                                <option value="export">Export</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={ServiceProviderData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={(selectedRows) => setSelectedRecords(selectedRows)}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                        // onRowClick={(row) => handleRowClick(row)}
                    />
                </div>
            </div>
            <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateProfileStatus} />
            <CommonPopUp title={'Assign Vehicles'} columns={vehicleColumns} data={staticVehicleProfileData} event={AddVehicle} closeModal={() => setAddVehicle(false)} onSubmit={handleAddVehicle} />
            <CommonPopUp
                title={'Purchase Subscription'}
                columns={subscriptionColumns}
                data={staticSubscriptionData}
                event={modal4}
                closeModal={() => setModal4(false)}
                onSubmit={handleAddSubscription}
            />
        </>
    );
};

export default ViewServiceProvider;
