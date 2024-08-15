import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

import { staticFleetOwnerData } from '@/pages/BusinessModule/FleetOwner/ViewFleetOwner';
import { staticServiceProviderData } from '@/pages/BusinessModule/ServiceProvider/ViewServiceProvider';
import { staticVehicleProfileData } from '@/pages/BusinessModule/VehicleProfile/ViewVehicleProfile';
import { staticSubscriptionData } from '@/pages/SubscriptionModule/Subscription/ViewSubscription';
import CreateCouponModal from '@/components/Models/CreateCouponModal';

interface ViewChannelPartnerModuleProps {
    tabs: boolean;
    userManagementPage: any;
}

interface ChannelPartnerData {
    id: string;
    bussinessName: string;
    channelPartnerType: string;
    mobile: string;
    firstName: string;
    email: string;
    archive: string;
    createdAt: string;
    updatedAt: string;
}
export const staticChannelPData = [
    {
        id: '1',
        firstName: 'Michael',
        middleName: 'Michael',
        lastName: 'Clark',
        dob: '1993-02-10',
        gender: 'MALE',
        email: 'michael.clark@example.com',
        fk_roletype: 'channel_partner',
        bussinessName: 'LMN Solutions',
        channelPartnerType: 'MANAGER',
        password: 'password789',
        companyRegistrationNumber: '5678901234',
        totalSpend: '$1235.02',
        totalEarned: '$5000.00',
        accountHolderName: 'Michael Clark',
        accountNumber: '567890123',
        branchName: 'Chicago Branch',
        ifscCode: 'IFSC789',
        accountType: 'SAVINGS',
        channelPartnerApis: 'ABCDEFG1234',
        profileImage: 'profile_image_url3.jpg',
        mobile: '999-999-9999',
        altMobile: '999-999-9999',
        fk_country: 'USA',
        fk_stateOrProvinces: 'Illinois',
        fk_city: 'Chicago',
        aadhar: '567890123456',
        registrationOfficeAddress: '101 Pine St, Suite 301',
        communicationOfficeAddress: '202 Elm St, Floor 2',
        approvedBy: 3,
        approvedTime: '2024-04-03T08:00:00Z',
        subscriptionCommisionAmountType: 'Percentage',
        subscriptionCommisionAmountValue: 8,
        tripsCommisionAmountType: 'Fixed',
        tripsCommisionAmountValue: 150,
        verificationHistory: [],
        archive: 'PENDING',
        createdBy: 3,
        updatedBy: 3,
        createdAt: '2024-04-03T08:00:00Z',
        updatedAt: '2024-04-03T08:00:00Z',
    },
    {
        id: '2',
        firstName: 'Jane',
        middleName: 'Elizabeth',
        lastName: 'Johnson',
        dob: '1985-08-20',
        gender: 'FEMALE',
        email: 'jane.johnson@example.com',
        fk_roletype: 'channel_partner',
        bussinessName: 'XYZ Corporation',
        channelPartnerType: 'PROPIETOR',
        password: 'password456',
        companyRegistrationNumber: '0987654321',
        totalSpend: '$3214.07',
        totalEarned: '$5000.00',
        accountHolderName: 'Jane Johnson',
        accountNumber: '987654321',
        branchName: 'Los Angeles Branch',
        ifscCode: 'IFSC456',
        accountType: 'CURRENT',
        channelPartnerApis: 'ABCDEFG1234',
        profileImage: 'profile_image_url2.jpg',
        mobile: '555-555-5555',
        altMobile: '111-222-3333',
        fk_country: 'USA',
        fk_stateOrProvinces: 'California',
        fk_city: 'Los Angeles',
        aadhar: '987654321098',
        registrationOfficeAddress: '456 Oak St, Suite 201',
        communicationOfficeAddress: '789 Maple Ave, Floor 3',
        approvedBy: 2,
        approvedTime: '2024-04-02T10:00:00Z',
        subscriptionCommisionAmountType: 'Fixed',
        subscriptionCommisionAmountValue: 200,
        tripsCommisionAmountType: 'Percentage',
        tripsCommisionAmountValue: 12,
        verificationHistory: [],
        archive: 'PENDING',
        createdBy: 2,
        updatedBy: 2,
        createdAt: '2024-04-02T10:00:00Z',
        updatedAt: '2024-04-02T10:00:00Z',
    },
    {
        id: '3',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        dob: '1990-05-15',
        gender: 'MALE',
        email: 'john.doe@example.com',
        fk_roletype: 'channel_partner',
        bussinessName: 'ABC Enterprises',
        channelPartnerType: 'CEO',
        password: 'password123',
        companyRegistrationNumber: '1234567890',
        totalSpend: '$2021.09',
        totalEarned: '$5000.00',
        accountHolderName: 'John Doe',
        accountNumber: '123456789',
        branchName: 'New York Branch',
        ifscCode: 'IFSC123',
        accountType: 'SAVINGS',
        channelPartnerApis: 'ABCDEFG1234',
        profileImage: 'profile_image_url.jpg',
        mobile: '123-456-7890',
        altMobile: '987-654-3210',
        fk_country: 'USA',
        fk_stateOrProvinces: 'New York',
        fk_city: 'New York City',
        aadhar: '123456789012',
        registrationOfficeAddress: '123 Main St, Suite 101',
        communicationOfficeAddress: '456 Broadway, Floor 5',
        approvedBy: 1,
        approvedTime: '2024-04-01T12:00:00Z',
        subscriptionCommisionAmountType: 'Percentage',
        subscriptionCommisionAmountValue: 10,
        tripsCommisionAmountType: 'Fixed',
        tripsCommisionAmountValue: 100,
        verificationHistory: [],
        archive: 'PENDING',
        createdBy: 1,
        updatedBy: 1,
        createdAt: '2024-04-01T12:00:00Z',
        updatedAt: '2024-04-01T12:00:00Z',
    },
];

const ViewChannelPartner: React.FC<ViewChannelPartnerModuleProps> = ({ tabs, userManagementPage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Channel Partner'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ChannelPartnerData, setChannelPartnerData] = useState<ChannelPartnerData[]>(staticChannelPData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ChannelPartnerData[]>([]);
    const [recordsData, setRecordsData] = useState<ChannelPartnerData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<ChannelPartnerData[]>([]);
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

    // Dynamic Data
    useEffect(() => {
        dispatch(setPageTitle('View Channel Partner'));

        const fetchChannelPartnerData = async () => {
            try {
                const { data } = await getChannelPartnerData();
                if (data?.ChannelPartners) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.ChannelPartners.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
                        id,
                        ...rest,
                    }));
                    setChannelPartnerData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchChannelPartnerData();
    }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ChannelPartnerData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ChannelPartnerData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', bussinessName = '', channelPartnerType = '', mobile = '', firstName = '', email = '', archive = '', createdAt = '', updatedAt = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                bussinessName?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                mobile?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<ChannelPartnerData>[] = [
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
                                    const editUrl = `/AdminModule/ChannelPartner/EditChannelPartner/${rowData.id}`;
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
                                    const viewUrl = `/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${rowData.id}`;
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
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'dob', title: 'DOB', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'fk_roletype', title: 'Role Type', sortable: true, hidden: hiddenColumns.includes('fk_roletype') },
        { accessor: 'bussinessName', title: 'Bussiness Name', sortable: true, hidden: hiddenColumns.includes('bussinessName') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'companyRegistrationNumber', title: 'Company Registration Number', sortable: true, hidden: hiddenColumns.includes('companyRegistrationNumber') },
        { accessor: 'totalSpend', title: 'Total Spend', sortable: true, hidden: hiddenColumns.includes('totalSpend') },
        { accessor: 'totalEarned', title: 'Total Earned', sortable: true, hidden: hiddenColumns.includes('totalEarned') },
        { accessor: 'accountHolderName', title: 'Account Holder Name', sortable: true, hidden: hiddenColumns.includes('accountHolderName') },
        { accessor: 'accountNumber', title: 'Account Number', sortable: true, hidden: hiddenColumns.includes('accountNumber') },
        { accessor: 'branchName', title: 'Branch Name', sortable: true, hidden: hiddenColumns.includes('branchName') },
        { accessor: 'ifscCode', title: 'IFSC Code', sortable: true, hidden: hiddenColumns.includes('ifscCode') },
        { accessor: 'accountType', title: 'Account Type', sortable: true, hidden: hiddenColumns.includes('accountType') },
        { accessor: 'mobile', title: 'Mobile', sortable: true, hidden: hiddenColumns.includes('mobile') },
        { accessor: 'altMobile', title: 'Alt Mobile', sortable: true, hidden: hiddenColumns.includes('altMobile') },
        { accessor: 'fk_country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('fk_country') },
        { accessor: 'fk_stateOrProvinces', title: 'State', sortable: true, hidden: hiddenColumns.includes('fk_stateOrProvinces') },
        { accessor: 'fk_city', title: 'City', sortable: true, hidden: hiddenColumns.includes('fk_city') },
        { accessor: 'aadhar', title: 'Aadhar', sortable: true, hidden: hiddenColumns.includes('aadhar') },
        { accessor: 'registrationOfficeAddress', title: 'R.O Address', sortable: true, hidden: hiddenColumns.includes('registrationOfficeAddress') },
        { accessor: 'communicationOfficeAddress', title: 'C.O Address', sortable: true, hidden: hiddenColumns.includes('communicationOfficeAddress') },
        { accessor: 'subscriptionCommisionAmountType', title: 'S.C Amount Type', sortable: true, hidden: hiddenColumns.includes('subscriptionCommisionAmountType') },
        { accessor: 'subscriptionCommisionAmountValue', title: 'S.C Amount Value', sortable: true, hidden: hiddenColumns.includes('subscriptionCommisionAmountValue') },
        { accessor: 'tripsCommisionAmountType', title: 'T.C Amount Type', sortable: true, hidden: hiddenColumns.includes('tripsCommisionAmountType') },
        { accessor: 'tripsCommisionAmountValue', title: 'T.C Amount Value', sortable: true, hidden: hiddenColumns.includes('tripsCommisionAmountValue') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'createdAt', title: 'CreatedAt', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedAt', title: 'UpdatedAt', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: ChannelPartnerData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: ChannelPartnerData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    const [modal3, setmodal3] = useState(false);

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    //MODAL 4,5,6
    //ADD TRAVEL AGENCY

    const [modal4, setModal4] = useState(false);
    const [selectedAssignedTravelAgency, setSelectedAssignedTravelAgency] = useState<any[]>([]);
    const [addedAssignedTravelAgencyType, setAddedAssignedTravelAgencyType] = useState<any>();

    const assignedTravelAgencyColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'companyType', title: 'Company Type', sortable: true },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true },
        { accessor: 'walletAmount', title: 'Wallet Amount', sortable: true },
        { accessor: 'walletStatus', title: 'Wallet Status', sortable: true },
        { accessor: 'TravelAgency', title: 'Travel Agency', sortable: true },
        { accessor: 'CompanyBusinessName', title: 'Company Business Name', sortable: true },
        { accessor: 'firstName', title: 'First Name', sortable: true },
        { accessor: 'middleName', title: 'Middle Name', sortable: true },
        { accessor: 'lastName', title: 'Last Name', sortable: true },
        { accessor: 'email', title: 'Email', sortable: true },
        { accessor: 'dob', title: 'DOB', sortable: true },
        { accessor: 'gender', title: 'Gender', sortable: true },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true },
        { accessor: 'altMobileNumber', title: 'Alt Mobile Number', sortable: true },
        { accessor: 'country', title: 'Country', sortable: true },
        { accessor: 'state', title: 'State', sortable: true },
        { accessor: 'city', title: 'City', sortable: true },
        { accessor: 'regAddress', title: 'Reg Address', sortable: true },
        { accessor: 'commAddress', title: 'Comm Address', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'bankName', title: 'Bank Name', sortable: true },
        { accessor: 'accountHolderName', title: 'Account Holder Name', sortable: true },
        { accessor: 'accountNumber', title: 'Account Number', sortable: true },
        { accessor: 'ifscCode', title: 'IFSE Code', sortable: true },
        { accessor: 'branchName', title: 'Branch Name', sortable: true },
        { accessor: 'accountType', title: 'Account Type', sortable: true },
        { accessor: 'gst', title: 'GST', sortable: true },
    ];

    const handleAddAssignedTravelAgency = (selectedTravelAgency: any[], id: string) => {
        successAlert('Travel Agency Assigned Successfully');
        setSelectedAssignedTravelAgency(selectedTravelAgency);
        setAddedAssignedTravelAgencyType(id);
    };

    //ADD VEHICLE

    const [modal5, setVehicleModal] = useState(false);
    const [selectedAssignedVehicle, setSelectedAssignedVehicle] = useState<any[]>([]);
    const [addedAssignedVehicleType, setAddedAssignedVehicleType] = useState<any>();

    const assignedVehicleColumns: DataTableColumn<any>[] = [
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

    const handleAddAssignedVehicle = (selectedVehicle: any[], id: string) => {
        successAlert('Vehicle Assigned Successfully');
        setSelectedAssignedVehicle(selectedVehicle);
        setAddedAssignedVehicleType(id);
    };

    //ADD DRIVER

    const [modal6, setDriverModal] = useState(false);
    const [selectedAssignedDriver, setSelectedAssignedDriver] = useState<any[]>([]);
    const [addedAssignedDriverType, setAddedAssignedDriverType] = useState<any>();

    const assignedDriverColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true },
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
        { accessor: 'archive', title: 'Archive', sortable: true },
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
        { accessor: 'vehicleRegistrationDate', title: 'Vehicle Registration Date', sortable: true },
        { accessor: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', sortable: true },
        { accessor: 'vehicleAge', title: 'Vehicle Age', sortable: true },
        { accessor: 'loanBanker', title: 'Loan Banker', sortable: true },
        { accessor: 'loanAccNumber', title: 'Loan Acc Number', sortable: true },
        { accessor: 'emiAmt', title: 'EMI Amt', sortable: true },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true },
        { accessor: 'currLocation', title: 'Curr Location', sortable: true },
    ];

    const handleAddAssignedDriver = (selectedDriver: any[], id: string) => {
        successAlert('Driver Assigned Successfully');
        setSelectedAssignedDriver(selectedDriver);
        setAddedAssignedDriverType(id);
    };

    //BUY SUBSCRIPTION

    const [modal7, setSubscriptionModal] = useState(false);
    const [selectedAssignedSubscription, setSelectedAssignedSubscription] = useState<any[]>([]);
    const [addedAssignedSubscriptionType, setAddedAssignedSubscriptionType] = useState<any>();

    const assignedSubscriptionColumns: DataTableColumn<any>[] = [
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
        { accessor: 'archive', title: 'Archive', sortable: true },
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

    const handleAddAssignedSubscription = (selectedSubscription: any[], id: string) => {
        successAlert('Subscription Assigned Successfully');
        setSelectedAssignedSubscription(selectedSubscription);
        setAddedAssignedSubscriptionType(id);
    };

    //create coupon popup -- future code -->>
    // const [modal8, setModal8] = useState(false);
    // const [CreateCoupon, setCreateCoupon] = useState<any[]>([]);
    // const [couponType, setCouponType] = useState<any>();

    // const handlecreateCoupon = (CouponData: any[], id: string) => {
    //     successAlert('Coupon Created Successfully');
    //     setCreateCoupon(CouponData);
    //     setCouponType(id);
    // };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/ChannelPartner/EditChannelPartner/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else if (selectedOption === 'uploadDocument' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/ChannelPartner/EditChannelPartner/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'addrider' && selectedRecords.length === 1) {
            const editUrl = `/RiderModule/RiderUsers/ViewRiderUsers`;
            navigate(editUrl);
        } else if (selectedOption === 'buySubscription') {
            setSubscriptionModal(true);
        }
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    return (
        <>
            {!tabs && (
                <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                    <li className="">
                        <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                            Home
                        </Link>
                    </li>
                    <li
                        className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                            currentPath === '/AdminModule/ChannelPartner/ViewChannelPartner' ? 'text-blue-600' : ''
                        }`}
                    >
                        Channel Partner
                    </li>
                </ol>
            )}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {!tabs && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <Link to="/AdminModule/ChannelPartner/CreateChannelPartner" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                                <span className="text-[13px] ">Create Channel Partner</span>
                            </Link>
                        </div>
                    )}

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
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

                    {!userManagementPage && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                <option value="uploadDocument">Upload documents</option>
                                <option value="buySubscription">Buy Subscription</option>
                                <option value="updateArchive">Update Archive</option>
                                <option value="addrider">Add Rider</option>
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
                        totalRecords={ChannelPartnerData.length}
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
                <CommonPopUp
                    title={'Assign Travel Agency'}
                    columns={assignedTravelAgencyColumns}
                    data={staticFleetOwnerData}
                    event={modal4}
                    closeModal={() => setModal4(false)}
                    onSubmit={handleAddAssignedTravelAgency}
                />

                <CommonPopUp
                    title={'Assign Driver'}
                    columns={assignedDriverColumns}
                    data={staticServiceProviderData}
                    event={modal6}
                    closeModal={() => setDriverModal(false)}
                    onSubmit={handleAddAssignedDriver}
                />

                <CommonPopUp
                    title={'Assign Subscription'}
                    columns={assignedSubscriptionColumns}
                    data={staticSubscriptionData}
                    event={modal7}
                    closeModal={() => setSubscriptionModal(false)}
                    onSubmit={handleAddAssignedSubscription}
                />

                <CommonPopUp
                    title={'Assign Vehicle'}
                    columns={assignedVehicleColumns}
                    data={staticVehicleProfileData}
                    event={modal5}
                    closeModal={() => setVehicleModal(false)}
                    onSubmit={handleAddAssignedVehicle}
                />

                {/* future code ---> */}
                {/* <CreateCouponModal event={modal8} closeModal={() => setModal8(false)} onSubmit={handlecreateCoupon} /> */}

                <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewChannelPartner;
