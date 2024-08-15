import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useSelector } from 'react-redux';
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
import { staticVehicleProfileData } from '../VehicleProfile/ViewVehicleProfile';
import { staticServiceProviderData } from '../ServiceProvider/ViewServiceProvider';
import { staticCouponMasterData } from '@/pages/PromotionModule/CouponMaster/ViewCouponMaster';
import { staticDistributorData } from '@/pages/AdminModule/Distributor/ViewDistributor';
import { IoSettingsOutline } from 'react-icons/io5';
interface FleetOwnerData {
    id: string;
    companyType: string;
    distributor: string;
    TravelAgencyType: string;
    TravelAgencyName: string;
    agencyID: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    // fatherName: string;
    mobileNumber: string;
    altMobileNumber: string;
    country: string;
    state: string;
    city: string;
    regAddress: string;
    commAddress: string;
    fk_serviceCity: string;
    companyName: string;
    ProfileStatus: string;
    walletAmount: string;
    walletStatus: string;
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
}

export const staticFleetOwnerData = [
    {
        id: '1',
        companyType: 'Partnership',
        distributor: 'Finex distributor',
        TravelAgencyName: 'Remuya Travel Agency',
        TravelAgencyType: 'Owner',
        agencyID: 'Agency234',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        email: 'john@example.com',
        dob: '1990-01-01',
        gender: 'Male',
        fatherName: 'Michael Doe',
        mobileNumber: '1234567890',
        altMobileNumber: '9876543210',
        country: 'India',
        state: 'Kerala',
        city: 'Kochi',
        regAddress: '123 Reg Street',
        commAddress: '456 Comm Street',
        fk_serviceCity: 'Kochi',
        companyName: 'ABC Company',
        ProfileStatus: 'Approved',
        bankName: 'ABC Bank',
        accountHolderName: 'John Doe',
        accountNumber: '1234567890',
        ifscCode: 'ABCD0123456',
        branchName: 'Main Branch',
        gst: '3214569JHSI',
        accountType: 'Savings',
        walletAmount: '100',
        walletStatus: 'active',
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
        numberOfVehicle: '10',
        numberOfDriver: '5',
        activeDriver: '6',
        inactiveDriver: '2',
        activeVehicle: '8',
        inactiveVehicle: '3',
        Password: 'dummy_password',
        uniqueId: '123456789',
        vehicleNumber: 'ABC123',
        driverMobileNumber: '1234567890',
        driverName: 'John Doe',
        driverPassword: 'driver_password',
        referralCode: 'REF123',
        referredBy: 'Yash',
        distributorCode: 'DIST456',
        ownerAddress: '123 Main Street',
    },
    {
        id: '2',
        companyType: 'Privet Limited',
        distributor: 'Finex distributor',
        TravelAgencyName: 'ortiz Travel Agency',
        TravelAgencyType: 'Owner',
        agencyID: 'Agency984',
        firstName: 'Jane',
        middleName: 'Ella',
        lastName: 'Doe',
        email: 'jane@example.com',
        dob: '1988-03-15',
        gender: 'Female',
        fatherName: 'Robert Doe',
        mobileNumber: '5551237890',
        altMobileNumber: '5559873210',
        country: 'India',
        state: 'Karnataka',
        city: 'Bangluru',
        regAddress: '789 Reg Street',
        commAddress: '012 Comm Street',
        fk_serviceCity: 'Bangluru',
        companyName: 'XYZ Corporation',
        ProfileStatus: 'Pending',
        bankName: 'ABC Bank',
        accountHolderName: 'Jane',
        accountNumber: '1234567890',
        ifscCode: 'ABCD0123456',
        branchName: 'Main Branch',
        gst: '3214569JHSI',
        accountType: 'Savings',
        walletAmount: '100',
        walletStatus: 'active',
        numberOfVehicle: '5',
        numberOfDriver: '3',
        activeDriver: '6',
        inactiveDriver: '2',
        activeVehicle: '8',
        inactiveVehicle: '3',
        Password: 'pass123',
        uniqueId: '987654321',
        vehicleNumber: 'XYZ789',
        driverMobileNumber: '0987654321',
        driverName: 'Jane Smith',
        driverPassword: 'password123',
        referralCode: 'REF456',
        referredBy: 'Sidhu',
        distributorCode: 'DIST789',
        ownerAddress: '456 Elm Street',
    },
    {
        id: '3',
        companyType: 'NGO limited',
        distributor: 'doglix distributor',
        TravelAgencyName: 'shanthi Travel Agency',
        TravelAgencyType: 'Owner com Driver',
        agencyID: 'Agency123',
        firstName: 'Sam',
        middleName: 'William',
        lastName: 'Brown',
        email: 'sam@example.com',
        dob: '1995-07-20',
        gender: 'Male',
        fatherName: 'David Brown',
        mobileNumber: '9998887776',
        altMobileNumber: '1112223333',
        country: 'India',
        state: 'TamilNadu',
        city: 'Chennai',
        regAddress: '246 Reg Street',
        commAddress: '135 Comm Street',
        fk_serviceCity: 'Chennai',
        companyName: 'PQR Enterprises',
        ProfileStatus: 'Approved',
        bankName: 'ABC Bank',
        accountHolderName: 'Sam',
        accountNumber: '1234567890',
        ifscCode: 'ABCD0123456',
        branchName: 'Main Branch',
        gst: '3214569JHSI',
        accountType: 'Savings',
        walletAmount: '100',
        walletStatus: 'active',
        numberOfVehicle: '15',
        numberOfDriver: '8',
        activeDriver: '6',
        inactiveDriver: '2',
        activeVehicle: '8',
        inactiveVehicle: '3',
        Password: 'secure_pass',
        uniqueId: '543216789',
        vehicleNumber: 'DEF456',
        driverMobileNumber: '9876543210',
        driverName: 'Alice Johnson',
        driverPassword: 'pass_secure',
        referralCode: 'REF789',
        referredBy: 'Fayiz',
        distributorCode: 'DIST012',
        ownerAddress: '789 Oak Avenue',
    },
];

const ViewPendingFleetOwner = ({ tabs, userManagementPage = true }: any) => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // All states.
    const [FleetOwnerData, setFleetOwnerData] = useState<FleetOwnerData[]>(staticFleetOwnerData);
    const [modal3, setmodal3] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<FleetOwnerData[]>([]);
    const [recordsData, setRecordsData] = useState<FleetOwnerData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<FleetOwnerData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    //handle date sorting
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View Fleet Owner'));

    //     const fetchFleetOwnerData = async () => {
    //         try {
    //             const { data } = await getAllFleetOwnerData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 //setFleetOwnerData(newData);
    //                 setFleetOwnerData(staticFleetOwnerData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching fleet owner data:', error.message);
    //         }
    //     };
    //     fetchFleetOwnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (FleetOwnerData.length > 0) {
            const sortedData = FleetOwnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof FleetOwnerData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [FleetOwnerData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                companyType = '',
                distributor = '',
                TravelAgencyType = '',
                agencyID = '',
                TravelAgencyName = '',
                firstName = '',
                middleName = '',
                lastName = '',
                email = '',
                dob = '',
                gender = '',
                // fatherName = '',
                mobileNumber = '',
                altMobileNumber = '',
                country = '',
                state = '',
                city = '',
                regAddress = '',
                commAddress = '',
                companyName = '',
                fk_serviceCity = '',
                ProfileStatus = '',
                walletAmount = '',
                walletStatus = '',
                numberOfVehicle = ' ',
                numberOfDriver = ' ',
                activeDriver = ' ',
                inactiveDriver = ' ',
                activeVehicle = ' ',
                inactiveVehicle = ' ',
                Password = ' ',
                uniqueId = ' ',
                vehicleNumber = ' ',
                driverMobileNumber = ' ',
                driverName = ' ',
                driverPassword = ' ',
                referralCode = ' ',
                referredBy = ' ',
                distributorCode = ' ',
                ownerAddress = ' ',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                companyType?.toLowerCase().includes(searchString) ||
                companyName?.toLowerCase().includes(searchString) ||
                distributor?.toLowerCase().includes(searchString) ||
                TravelAgencyType?.toLowerCase().includes(searchString) ||
                agencyID?.toLowerCase().includes(searchString) ||
                TravelAgencyName?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                dob?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                // fatherName?.toLowerCase().includes(searchString) ||
                mobileNumber?.toLowerCase().includes(searchString) ||
                altMobileNumber?.toLowerCase().includes(searchString) ||
                country?.toLowerCase().includes(searchString) ||
                state?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                regAddress?.toLowerCase().includes(searchString) ||
                commAddress?.toLowerCase().includes(searchString) ||
                companyName?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                ProfileStatus?.toLocaleLowerCase().includes(searchString) ||
                walletAmount?.toLowerCase().includes(searchString) ||
                walletStatus?.toLowerCase().includes(searchString) ||
                numberOfVehicle.toLowerCase().includes(searchString) ||
                numberOfDriver.toLowerCase().includes(searchString) ||
                activeDriver.toLowerCase().includes(searchString) ||
                inactiveDriver.toLowerCase().includes(searchString) ||
                activeVehicle.toLowerCase().includes(searchString) ||
                inactiveVehicle.toLowerCase().includes(searchString) ||
                Password.toLowerCase().includes(searchString) ||
                uniqueId.toLowerCase().includes(searchString) ||
                vehicleNumber.toLowerCase().includes(searchString) ||
                driverMobileNumber.toLowerCase().includes(searchString) ||
                driverName.toLowerCase().includes(searchString) ||
                driverPassword.toLowerCase().includes(searchString) ||
                referralCode.toLowerCase().includes(searchString) ||
                referredBy.toLowerCase().includes(searchString) ||
                distributorCode.toLowerCase().includes(searchString) ||
                ownerAddress.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([
        'id',
        'walletAmount',
        'walletStatus',
        'bankName',
        'accountHolderName',
        'accountNumber',
        'ifscCode',
        'branchName',
        'accountType',
        'gst',
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
    const columns: DataTableColumn<FleetOwnerData>[] = [
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
                                if (rowData?.id) {
                                    const editUrl = `/BusinessModule/FleetOwner/EditFleetOwner/${rowData.id}`;
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
                                if (rowData?.id) {
                                    const viewUrl = `/BusinessModule/FleetOwner/ViewSpecificFleetOwner/${rowData.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IconEye />
                        </button>
                    </Tippy>
                    <Tippy content="Settings">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData?.id) {
                                    const viewUrl = `/BusinessModule/FleetOwner/TravelAgencySettings/TravelAgencySettingsModule/${rowData?.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IoSettingsOutline className="text-lg mx-3" />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'agencyID', title: 'Agency ID', sortable: true, hidden: hiddenColumns.includes('agencyID') },
        { accessor: 'companyType', title: 'Company Type', sortable: true, hidden: hiddenColumns.includes('companyType') },
        { accessor: 'distributor', title: 'Distributor Name', sortable: true, hidden: hiddenColumns.includes('distributor') },
        { accessor: 'walletAmount', title: 'Wallet Amount', sortable: true, hidden: hiddenColumns.includes('walletAmount') },
        { accessor: 'TravelAgencyType', title: 'Travel agency type', sortable: true, hidden: hiddenColumns.includes('TravelAgency') },
        { accessor: 'TravelAgencyName', title: 'Travel Agency Name', sortable: true, hidden: hiddenColumns.includes('CompanyBusinessName') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'dob', title: 'DOB', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true, hidden: hiddenColumns.includes('mobileNumber') },
        { accessor: 'altMobileNumber', title: 'Alt Mobile Number', sortable: true, hidden: hiddenColumns.includes('altMobileNumber') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'regAddress', title: 'Reg Address', sortable: true, hidden: hiddenColumns.includes('regAddress') },
        { accessor: 'commAddress', title: 'Comm Address', sortable: true, hidden: hiddenColumns.includes('commAddress') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'ProfileStatus', title: 'Travel Agency Status', sortable: true, hidden: hiddenColumns.includes('ProfileStatus') },
        { accessor: 'bankName', title: 'Bank Name', sortable: true, hidden: hiddenColumns.includes('bankName') },
        { accessor: 'accountHolderName', title: 'Account Holder Name', sortable: true, hidden: hiddenColumns.includes('accountHolderName') },
        { accessor: 'accountNumber', title: 'Account Number', sortable: true, hidden: hiddenColumns.includes('accountNumber') },
        { accessor: 'ifscCode', title: 'IFSE Code', sortable: true, hidden: hiddenColumns.includes('ifscCode') },
        { accessor: 'branchName', title: 'Branch Name', sortable: true, hidden: hiddenColumns.includes('branchName') },
        { accessor: 'accountType', title: 'Account Type', sortable: true, hidden: hiddenColumns.includes('accountType') },
        { accessor: 'gst', title: 'GST', sortable: true, hidden: hiddenColumns.includes('gst') },
        { accessor: 'walletStatus', title: 'Wallet Status', sortable: true, hidden: hiddenColumns.includes('walletStatus') },
        { accessor: 'numberOfVehicle', title: 'Number of Vehicle', sortable: true, hidden: hiddenColumns.includes('numberOfVehicle') },
        { accessor: 'numberOfDriver', title: 'Number of Driver', sortable: true, hidden: hiddenColumns.includes('numberOfDriver') },
        { accessor: 'activeDriver', title: 'Active Driver', sortable: true, hidden: hiddenColumns.includes('activeDriver') },
        { accessor: 'inactiveDriver', title: 'Inactive Driver', sortable: true, hidden: hiddenColumns.includes('inactiveDriver') },
        { accessor: 'activeVehicle', title: 'Active Vehicle', sortable: true, hidden: hiddenColumns.includes('activeVehicle') },
        { accessor: 'inactiveVehicle', title: 'Inactive Vehicle', sortable: true, hidden: hiddenColumns.includes('inactiveVehicle') },
        { accessor: 'vehicleNumber', title: 'Vehicle Number', sortable: true, hidden: hiddenColumns.includes('vehicleNumber') },
        { accessor: 'driverMobileNumber', title: 'Driver Mobile Number', sortable: true, hidden: hiddenColumns.includes('driverMobileNumber') },
        { accessor: 'driverName', title: 'Driver Name', sortable: true, hidden: hiddenColumns.includes('driverName') },
        // { accessor: 'driverPassword', title: 'Driver Password', sortable: true, hidden: hiddenColumns.includes('driverPassword') },
        { accessor: 'referralCode', title: 'Referral Code', sortable: true, hidden: hiddenColumns.includes('referralCode') },
        { accessor: 'referredBy', title: 'Referred By', sortable: true, hidden: hiddenColumns.includes('referredBy') },
        { accessor: 'distributorCode', title: 'Distributor ID', sortable: true, hidden: hiddenColumns.includes('distributorCode') },
        { accessor: 'ownerAddress', title: 'Owner Address', sortable: true, hidden: hiddenColumns.includes('ownerAddress') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: FleetOwnerData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: FleetOwnerData[] = [];
        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }
        setSelectedRecords(updatedSelectedRecords);
        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // add update ProfileStatus
    const handleAddUpdateProfileStatus = (selectedProfileStatus: any[], id: string) => {
        successAlert('ProfileStatus Updated Succesfully');
        // handle update ProfileStatus
    };

    // add vehicle ---------->>
    const [AddVehicle, setAddVehicle] = useState(false);
    const [VehicleData, setAddedVehicleData] = useState<any[]>([]);
    const [addedVehicleDataType, setVehicleDataType] = useState<any>();
    // add vehicle table columns
    const vehicleColumns: DataTableColumn<any>[] = [
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true },
        { accessor: 'distributor', title: 'Channel Partner Type', sortable: true },
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

    // add Driver ---------->>
    const [AddDriver, setAddDriver] = useState(false);
    const [DriverData, setAddedDriverData] = useState<any[]>([]);
    const [addedDriverDataType, setDriverDataType] = useState<any>();
    // add Driver table columns
    const DriverColumns: DataTableColumn<any>[] = [
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true },
        { accessor: 'distributor', title: 'Channel Partner Type', sortable: true },
        { accessor: 'TravelAgency', title: 'Travel Agency', sortable: true },
        { accessor: 'firstName', title: 'First Name', sortable: true },
        { accessor: 'middleName', title: 'Middle Name', sortable: true },
        { accessor: 'lastName', title: 'Last Name', sortable: true },
        { accessor: 'email', title: 'Email', sortable: true },
        { accessor: 'dob', title: 'DOB', sortable: true },
        { accessor: 'gender', title: 'Gender', sortable: true },
        { accessor: 'fatherName', title: 'Father Name', sortable: true },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true },
        { accessor: 'altMobileNumber', title: 'Alt Mobile Number', sortable: true },
        { accessor: 'country', title: 'Country', sortable: true },
        { accessor: 'state', title: 'State', sortable: true },
        { accessor: 'city', title: 'City', sortable: true },
        { accessor: 'dlNumber', title: 'DL Number', sortable: true },
        { accessor: 'dlValidity', title: 'DL Validity', sortable: true },
        { accessor: 'policeVerNumber', title: 'Police Verify No', sortable: true },
        { accessor: 'batchNumber', title: 'Batch No', sortable: true },
        { accessor: 'batchValidity', title: 'Batch Validity', sortable: true },
        { accessor: 'password', title: 'Password', sortable: true },
        { accessor: 'permanentAddress', title: 'Permanent Add', sortable: true },
        { accessor: 'presentAddress', title: 'Present Add', sortable: true },
        { accessor: 'isAvailable', title: 'Is Available', sortable: true },
        { accessor: 'badgeNumber', title: 'Badge Number', sortable: true },
        { accessor: 'badgeValidity', title: 'Badge Validity', sortable: true },
        { accessor: 'emergencyContact', title: 'Emergency Contact', sortable: true },
        { accessor: 'driverStatus', title: 'Driver Status', sortable: true },
        { accessor: 'registerAddress', title: 'Register Address', sortable: true },
        { accessor: 'driverLocation', title: 'Driver Location', sortable: true },
        { accessor: 'driverKey', title: 'Driver Key', sortable: true },
        { accessor: 'rtoDisplayCard', title: 'RTO Display Card', sortable: true },
        { accessor: 'StateandRTO', title: 'State and RTO', sortable: true },
        { accessor: 'verificationHistory', title: 'Verification History', sortable: true },
        { accessor: 'serviceCity', title: 'Service City', sortable: true },
    ];

    // popup add Driver
    const handleAddDriver = (selectedTeam: any[], id: string) => {
        successAlert('Driver Added Succesfully');
        setAddedDriverData(selectedTeam);
        setDriverDataType(id);
    };

    // add Driver ---------->>
    const [AddCoupon, setAddCoupon] = useState(false);
    const [CouponData, setAddedCouponData] = useState<any[]>([]);
    const [addedCouponDataType, setCouponDataType] = useState<any>();
    // add Driver table columns
    const CouponColumns: DataTableColumn<any>[] = [
        { accessor: 'couponCode', title: 'Coupon Code', sortable: true },
        { accessor: 'couponName', title: 'Coupon Name', sortable: true },
        { accessor: 'couponDesc', title: 'Coupon Description', sortable: true },
        { accessor: 'usage', title: 'Usage', sortable: true },
        { accessor: 'amount', title: 'Amount', sortable: true },
        { accessor: 'benefit', title: 'Benefit', sortable: true },
    ];

    // popup add Driver
    const handleAddCoupon = (selectedTeam: any[], id: string) => {
        successAlert('Coupon Added Succesfully');
        setAddedCouponData(selectedTeam);
        setCouponDataType(id);
    };

    //assign distributor

    const [AddDistributor, setAddDistributor] = useState(false);
    const [DistributorData, setAddedDistributorData] = useState<any[]>([]);
    const [addedDistributorDataType, setDistributorDataType] = useState<any>();

    // add Driver table columns
    const DistributorColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'firstName', title: 'First Name', sortable: true },
        { accessor: 'middleName', title: 'Middle Name', sortable: true },
        { accessor: 'lastName', title: 'Last Name', sortable: true },
        { accessor: 'dob', title: 'DOB', sortable: true },
        { accessor: 'email', title: 'Email', sortable: true },
        { accessor: 'gender', title: 'Gender', sortable: true },
        { accessor: 'fk_roletype', title: 'Role Type', sortable: true },
        { accessor: 'bussinessName', title: 'Bussiness Name', sortable: true },
        { accessor: 'distributor', title: 'Channel Partner Type', sortable: true },
        { accessor: 'companyRegistrationNumber', title: 'Company Registration Number', sortable: true },
        { accessor: 'totalSpend', title: 'Total Spend', sortable: true },
        { accessor: 'totalEarned', title: 'Total Earned', sortable: true },
        { accessor: 'accountHolderName', title: 'Account Holder Name', sortable: true },
        { accessor: 'accountNumber', title: 'Account Number', sortable: true },
        { accessor: 'branchName', title: 'Branch Name', sortable: true },
        { accessor: 'ifscCode', title: 'IFSC Code', sortable: true },
        { accessor: 'accountType', title: 'Account Type', sortable: true },
        { accessor: 'mobile', title: 'Mobile', sortable: true },
        { accessor: 'altMobile', title: 'Alt Mobile', sortable: true },
        { accessor: 'fk_country', title: 'Country', sortable: true },
        { accessor: 'fk_stateOrProvinces', title: 'State', sortable: true },
        { accessor: 'fk_city', title: 'City', sortable: true },
        { accessor: 'aadhar', title: 'Aadhar', sortable: true },
        { accessor: 'registrationOfficeAddress', title: 'R.O Address', sortable: true },
        { accessor: 'communicationOfficeAddress', title: 'C.O Address', sortable: true },
        { accessor: 'subscriptionCommisionAmountType', title: 'S.C Amount Type', sortable: true },
        { accessor: 'subscriptionCommisionAmountValue', title: 'S.C Amount Value', sortable: true },
        { accessor: 'tripsCommisionAmountType', title: 'T.C Amount Type', sortable: true },
        { accessor: 'tripsCommisionAmountValue', title: 'T.C Amount Value', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'createdAt', title: 'CreatedAt', sortable: true },
        { accessor: 'updatedAt', title: 'UpdatedAt', sortable: true },
    ];

    // popup add Driver
    const handleAddDistributor = (selectedTeam: any[], id: string) => {
        successAlert('Distributor Added Succesfully');
        setAddedDistributorData(selectedTeam);
        setDistributorDataType(id);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/FleetOwner/EditFleetOwner/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            const confirmDelete = window.confirm('Do you really want to delete this Travel Agency?');
        } else if (selectedOption === 'uploadDocument' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/FleetOwner/EditFleetOwner/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'addMoneyToWallet') {
            const editUrl = `/TransactionModule/WalletMaster/EditWalletMaster/1`;
            navigate(editUrl);
        } else if (selectedOption === 'addVehicle') {
            setAddVehicle(true);
        } else if (selectedOption === 'addDriver') {
            setAddDriver(true);
        } else if (selectedOption === 'addCoupon') {
            setAddCoupon(true);
        } else if (selectedOption === 'updateBankAccountDetails') {
            const editUrl = `/TransactionModule/BankAccount/EditBankAccount/1`;
            navigate(editUrl);
        } else if (selectedOption === 'updateProfileStatus' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else if (selectedOption === 'assignDistributor') {
            setAddDistributor(true);
        }
    };

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
            label: 'Pending Travel Agency',
            to: '/BusinessModule/FleetOwner/ViewPendingFleetOwner',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/FleetOwner/ViewPendingFleetOwner' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}
            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
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
                                {tabs && <option value="addTravelAgency">Add Travel Agency</option>}
                                {tabs && <option value="removeTravelAgency">Remove Travel Agency</option>}
                                <option value="uploadDocument">Upload Document</option>
                                <option value="addVehicle">Add Vehicle</option>
                                <option value="addDriver">Add Driver</option>
                                <option value="assignDistributor">Assign/update Distributor</option>
                                <option value="addMoneyToWallet">Add Money to Wallet</option>
                                <option value="updateBankAccountDetails">Update Bank Account Details</option>
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
                        totalRecords={FleetOwnerData.length}
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
            <CommonPopUp title={'Add Vehicles'} columns={vehicleColumns} data={staticVehicleProfileData} event={AddVehicle} closeModal={() => setAddVehicle(false)} onSubmit={handleAddVehicle} />
            <CommonPopUp title={'Add Driver'} columns={DriverColumns} data={staticServiceProviderData} event={AddDriver} closeModal={() => setAddDriver(false)} onSubmit={handleAddDriver} />
            <CommonPopUp title={'Add Coupom'} columns={CouponColumns} data={staticCouponMasterData} event={AddCoupon} closeModal={() => setAddCoupon(false)} onSubmit={handleAddCoupon} />
            <CommonPopUp
                title={'Assign/Update Distributor'}
                columns={DistributorColumns}
                data={staticDistributorData}
                event={AddDistributor}
                closeModal={() => setAddDistributor(false)}
                onSubmit={handleAddDistributor}
            />
            <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateProfileStatus} />
        </>
    );
};

export default ViewPendingFleetOwner;
