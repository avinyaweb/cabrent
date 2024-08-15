import React, { useState, useEffect } from 'react';
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
import toast from 'react-hot-toast';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

interface BankAccountData {
    id: string;
    bankName: string;
    fk_userId: string;
    userType: string;
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
    fullName: string;
    licenseNumber: string;
    vehicleNumber: string;
    contactNumber: string;
    email: string;
    address: string;
    dob: string;
    gender: string;
    serviceProviderType: string;
    channelPartnerType: string;
    TravelAgency: string;
    firstName: string;
    middleName: string;
    lastName: string;
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
    fk_serviceCity: string;
    remark: string;
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
export const staticBankAccountData = [
    {
        id: '1',
        bankName: 'ABC Bank',
        fk_userId: 'user123',
        userType: 'Driver',
        accountHolderName: 'John Doe',
        accountNumber: '1234567890',
        ifscCode: 'ABCD0123456',
        branchName: 'Main Branch',
        panNumber: '3214569JHSI',
        voterId: '3214569JHSI',
        aadhar: '3214569JHSI',
        gst: '3214569JHSI',
        accountType: 'Savings',
        verificationHistory: 'Verified',
        archive: 'HOLD',
        approvedBy: 'Admin',
        approvedAt: '2023-12-31',
        createdBy: 'Jane Smith',
        createdAt: '2023-12-01',
        updatedBy: 'Jane Smith',
        updatedAt: '2023-12-15',
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
        // Additional fields
        fullName: 'Alice Johnson',
        licenseNumber: 'XYZ789',
        vehicleNumber: 'ABC456',
        contactNumber: '9876543210',
        email: 'alice.johnson@example.com',
        address: '456 Oak St, City, Country',
        dob: '1995-05-15',
        gender: 'Female',
        serviceProviderType: 'ServiceTypeA',
        channelPartnerType: 'ChannelTypeB',
        TravelAgency: 'AgencyY',
        firstName: 'Alice',
        middleName: 'Marie',
        lastName: 'Johnson',
        fatherName: 'John Johnson',
        mobileNumber: '9876543210',
        altMobileNumber: '1234567890',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        dlNumber: 'DL654321',
        dlValidity: '2024-05-01',
        policeVerNumber: 'PV987',
        batchNumber: 'B456',
        batchValidity: '2024-12-31',
        password: 'securePassword',
        permanentAddress: '789 Maple St, City, Country',
        presentAddress: '321 Elm St, City, Country',
        fk_serviceCity: 'New York',
        remark: 'Lorem ipsum dolor sit amet',
        bankVerify: 'Yes',
        pgLabel: 'No',
        pgVerify: 'Yes',

        fromUser: 'UserA',
        toUser: 'UserB',
        toUserPhoneNumber: '12345234523',
        userId: 'U123',
        purpose: 'Payment for services',
        amount: '100.00',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC001',
        bankAccountIFSCTo: 'IFSC002',
        pgTransactionId: 'PG123456',
        transactionMode: 'Online',
        walletStatus: 'Completed',
        appTransactionId: 'APP123456',
        platformTransactionId: 'PLT123456',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123456',
        virtualTransactionId: 'VT123456',
        paymentStatus: 'Success',
        dateTime: '2024-05-20T12:00:00Z',
        distributorName: 'manu privet limted',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID123',
        walletIdToUser: 'WID456',
        source: 'Mobile App',
    },
    {
        id: '2',
        bankName: 'XYZ Bank',
        fk_userId: 'user456',
        userType: 'Travel Agancy',
        accountHolderName: 'Alice Johnson',
        accountNumber: '0987654321',
        ifscCode: 'WXYZ0987654',
        branchName: 'Downtown Branch',
        panNumber: '3214569JHSI',
        voterId: '3214569JHSI',
        aadhar: '3214569JHSI',
        gst: '3214569JHSI',
        accountType: 'Checking',
        verificationHistory: 'Pending',
        archive: 'APPROVED',
        approvedBy: 'Admin',
        approvedAt: '2023-12-31',
        createdBy: 'Jane Smith',
        createdAt: '2023-12-01',
        updatedBy: 'Jane Smith',
        updatedAt: '2023-12-15',
        // Additional fields
        fullName: 'Bob Brown',
        licenseNumber: 'XYZ987',
        vehicleNumber: 'PQR123',
        contactNumber: '1234567890',
        email: 'bob.brown@example.com',
        address: '789 Elm St, City, Country',
        dob: '1988-09-20',
        gender: 'Male',
        serviceProviderType: 'ServiceTypeB',
        channelPartnerType: 'ChannelTypeA',
        TravelAgency: 'AgencyZ',
        firstName: 'Bob',
        middleName: 'Adam',
        lastName: 'Brown',
        fatherName: 'Adam Brown',
        mobileNumber: '1234567890',
        altMobileNumber: '9876543210',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        dlNumber: 'DL987654',
        dlValidity: '2025-01-01',
        policeVerNumber: 'PV123',
        batchNumber: 'B789',
        batchValidity: '2024-12-31',
        password: 'securePassword123',
        permanentAddress: '456 Park Ave, City, Country',
        presentAddress: '123 Main St, City, Country',
        fk_serviceCity: 'New York',
        remark: 'Lorem ipsum dolor sit amet',
        bankVerify: 'Yes',
        pgLabel: 'No',
        pgVerify: 'Yes',

        fromUser: 'UserA',
        toUser: 'UserB',
        toUserPhoneNumber: '12345234523',
        userId: 'U123',
        purpose: 'Payment for services',
        amount: '100.00',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC001',
        bankAccountIFSCTo: 'IFSC002',
        pgTransactionId: 'PG123456',
        transactionMode: 'Online',
        walletStatus: 'Completed',
        appTransactionId: 'APP123456',
        platformTransactionId: 'PLT123456',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123456',
        virtualTransactionId: 'VT123456',
        paymentStatus: 'Success',
        dateTime: '2024-05-20T12:00:00Z',
        distributorName: 'manu privet limted',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID123',
        walletIdToUser: 'WID456',
        source: 'Mobile App',
    },
];

const ViewBankAccount = () => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal3, setModal3] = useState(false);
    const [BankAccountData, setBankAccountData] = useState<BankAccountData[]>(staticBankAccountData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<BankAccountData[]>([]);
    const [recordsData, setRecordsData] = useState<BankAccountData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<BankAccountData[]>([]);
    const [search, setSearch] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
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

    // date sorting
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View Bank Account'));

    //     const fetchBankAccountData = async () => {
    //         try {
    //             const { data } = await getBankAccountData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 //setBankAccountData(newData);
    //                 setBankAccountData(staticBankAccountData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching Bank Account data:', error.message);
    //         }
    //     };
    //     fetchBankAccountData();
    // }, [dispatch]);

    useEffect(() => {
        if (BankAccountData.length > 0) {
            const sortedData = BankAccountData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof BankAccountData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [BankAccountData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                bankName = '',
                fk_userId = '',
                userType = '',
                accountHolderName = '',
                accountNumber = '',
                ifscCode = '',
                branchName = '',
                panNumber = '',
                voterId = '',
                aadhar = '',
                gst = '',
                accountType = '',
                verificationHistory = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                fullName = '',
                licenseNumber = '',
                vehicleNumber = '',
                contactNumber = '',
                email = '',
                address = '',
                dob = '',
                gender = '',
                serviceProviderType = '',
                channelPartnerType = '',
                TravelAgency = '',
                firstName = '',
                middleName = '',
                lastName = '',
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
                fk_serviceCity = '',
                remark = '',
                bankVerify = '',
                pgLabel = '',
                pgVerify = '',

                fromUser = '',
                toUser = '',
                toUserPhoneNumber = '',
                userId = '',
                purpose = '',
                amount = '',
                walletType = '',
                bankAccountIFSCFrom = '',
                bankAccountIFSCTo = '',
                pgTransactionId = '',
                transactionMode = '',
                walletStatus = '',
                appTransactionId = '',
                platformTransactionId = '',
                bankVerification = '',
                bankLabel = '',
                walletTransactionId = '',
                virtualTransactionId = '',
                paymentStatus = '',
                dateTime = '',
                distributorName = '',
                walletProfileStatus = '',
                walletIdFromUser = '',
                walletIdToUser = '',
                source = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                bankName?.toLowerCase().includes(searchString) ||
                fk_userId?.toLowerCase().includes(searchString) ||
                userType?.toLowerCase().includes(searchString) ||
                accountHolderName?.toLowerCase().includes(searchString) ||
                accountNumber?.toLowerCase().includes(searchString) ||
                ifscCode?.toLowerCase().includes(searchString) ||
                branchName?.toLowerCase().includes(searchString) ||
                panNumber?.toLowerCase().includes(searchString) ||
                voterId?.toLowerCase().includes(searchString) ||
                aadhar?.toLowerCase().includes(searchString) ||
                gst?.toLowerCase().includes(searchString) ||
                accountType?.toLowerCase().includes(searchString) ||
                verificationHistory?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                fullName?.toLowerCase().includes(searchString) ||
                licenseNumber?.toLowerCase().includes(searchString) ||
                vehicleNumber?.toLowerCase().includes(searchString) ||
                contactNumber?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                address?.toLowerCase().includes(searchString) ||
                dob?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                serviceProviderType?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                TravelAgency?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
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
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                fromUser.toLowerCase().includes(searchString) ||
                toUser.toLowerCase().includes(searchString) ||
                toUserPhoneNumber.toLowerCase().includes(searchString) ||
                userId.toLowerCase().includes(searchString) ||
                purpose.toLowerCase().includes(searchString) ||
                amount.toLowerCase().includes(searchString) ||
                walletType.toLowerCase().includes(searchString) ||
                bankAccountIFSCFrom.toLowerCase().includes(searchString) ||
                bankAccountIFSCTo.toLowerCase().includes(searchString) ||
                pgTransactionId.toLowerCase().includes(searchString) ||
                transactionMode.toLowerCase().includes(searchString) ||
                walletStatus.toLowerCase().includes(searchString) ||
                appTransactionId.toLowerCase().includes(searchString) ||
                platformTransactionId.toLowerCase().includes(searchString) ||
                bankVerification.toLowerCase().includes(searchString) ||
                bankLabel.toLowerCase().includes(searchString) ||
                walletTransactionId.toLowerCase().includes(searchString) ||
                virtualTransactionId.toLowerCase().includes(searchString) ||
                paymentStatus.toLowerCase().includes(searchString) ||
                dateTime.toLowerCase().includes(searchString) ||
                distributorName.toLowerCase().includes(searchString) ||
                walletProfileStatus.toLowerCase().includes(searchString) ||
                walletIdFromUser.toLowerCase().includes(searchString) ||
                walletIdToUser.toLowerCase().includes(searchString) ||
                source.toLowerCase().includes(searchString) ||
                remark?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id']);

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

    const columns: DataTableColumn<BankAccountData>[] = [
        // {
        //     accessor: 'actions',
        //     title: 'Actions',

        //     render: (rowData) => (
        //         <div className="flex items-center">
        //             <Tippy content="Edit">
        //                 <button
        //                     type="button"
        //                     className="mr-4"
        //                     onClick={() => {
        //                         if (rowData?.id) {
        //                             const editUrl = `/TransactionModule/BankAccount/EditBankAccount/${rowData.id}`;
        //                             navigate(editUrl); // Navigate to the edit page URL
        //                         }
        //                     }}
        //                 >
        //                     <IconEdit />
        //                 </button>
        //             </Tippy>
        //             <Tippy content="View Specific">
        //                 <button
        //                     type="button"
        //                     onClick={() => {
        //                         if (rowData?.id) {
        //                             const viewUrl = `/WalletModule/BankAccountDetails/ViewSpecificBankAccount/${rowData.id}`;
        //                             navigate(viewUrl);
        //                         }
        //                     }}
        //                 >
        //                     <IconEye />
        //                 </button>
        //             </Tippy>
        //         </div>
        //     ),
        // },
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'bankName', title: 'Bank Name', sortable: true, hidden: hiddenColumns.includes('bankName') },
        { accessor: 'fk_userId', title: 'User', sortable: true, hidden: hiddenColumns.includes('fk_userId') },
        { accessor: 'userType', title: 'User Type', sortable: true, hidden: hiddenColumns.includes('userType') },
        { accessor: 'accountHolderName', title: 'Account Holder Name', sortable: true, hidden: hiddenColumns.includes('accountHolderName') },
        { accessor: 'accountNumber', title: 'Account Number', sortable: true, hidden: hiddenColumns.includes('accountNumber') },
        { accessor: 'ifscCode', title: 'IFSE Code', sortable: true, hidden: hiddenColumns.includes('ifscCode') },
        { accessor: 'branchName', title: 'Branch Name', sortable: true, hidden: hiddenColumns.includes('branchName') },
        { accessor: 'panNumber', title: 'PAN Number', sortable: true, hidden: hiddenColumns.includes('panNumber') },
        { accessor: 'voterId', title: 'Voter ID', sortable: true, hidden: hiddenColumns.includes('voterId') },
        { accessor: 'aadhar', title: 'Aadhar', sortable: true, hidden: hiddenColumns.includes('aadhar') },
        { accessor: 'gst', title: 'GST', sortable: true, hidden: hiddenColumns.includes('gst') },
        { accessor: 'accountType', title: 'Account Type', sortable: true, hidden: hiddenColumns.includes('accountType') },
        { accessor: 'verificationHistory', title: 'Verification History', sortable: true, hidden: hiddenColumns.includes('verificationHistory') },
        { accessor: 'archive', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },

        { accessor: 'fromUser', title: 'From User', sortable: true, hidden: hiddenColumns.includes('fromUser') },
        { accessor: 'toUser', title: 'To User', sortable: true, hidden: hiddenColumns.includes('toUser') },
        { accessor: 'toUserPhoneNumber', title: 'To User Phone Number', sortable: true, hidden: hiddenColumns.includes('toUserPhoneNumber') },
        { accessor: 'userId', title: 'User ID', sortable: true, hidden: hiddenColumns.includes('userId') },
        { accessor: 'purpose', title: 'Purpose', sortable: true, hidden: hiddenColumns.includes('purpose') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'walletType', title: 'Wallet Type', sortable: true, hidden: hiddenColumns.includes('walletType') },
        { accessor: 'bankAccountIFSCFrom', title: 'Bank Account IFSC (From)', sortable: true, hidden: hiddenColumns.includes('bankAccountIFSCFrom') },
        { accessor: 'bankAccountIFSCTo', title: 'Bank Account IFSC (To)', sortable: true, hidden: hiddenColumns.includes('bankAccountIFSCTo') },
        { accessor: 'pgTransactionId', title: 'PG Transaction ID', sortable: true, hidden: hiddenColumns.includes('pgTransactionId') },
        { accessor: 'transactionMode', title: 'Transaction Mode', sortable: true, hidden: hiddenColumns.includes('transactionMode') },
        { accessor: 'walletStatus', title: 'Wallet Status', sortable: true, hidden: hiddenColumns.includes('walletStatus') },
        { accessor: 'appTransactionId', title: 'App Transaction ID', sortable: true, hidden: hiddenColumns.includes('appTransactionId') },
        { accessor: 'platformTransactionId', title: 'Platform Transaction ID', sortable: true, hidden: hiddenColumns.includes('platformTransactionId') },
        { accessor: 'bankVerification', title: 'Bank Verification', sortable: true, hidden: hiddenColumns.includes('bankVerification') },
        { accessor: 'bankLabel', title: 'Bank Label', sortable: true, hidden: hiddenColumns.includes('bankLabel') },
        { accessor: 'walletTransactionId', title: 'Wallet Transaction ID', sortable: true, hidden: hiddenColumns.includes('walletTransactionId') },
        { accessor: 'virtualTransactionId', title: 'Virtual Transaction ID', sortable: true, hidden: hiddenColumns.includes('virtualTransactionId') },
        { accessor: 'paymentStatus', title: 'Payment Status', sortable: true, hidden: hiddenColumns.includes('paymentStatus') },
        { accessor: 'dateTime', title: 'Date and Time', sortable: true, hidden: hiddenColumns.includes('dateTime') },
        { accessor: 'distributorName', title: 'Distribution Name', sortable: true, hidden: hiddenColumns.includes('distributorName') },
        { accessor: 'walletProfileStatus', title: 'Wallet Profile Status', sortable: true, hidden: hiddenColumns.includes('walletProfileStatus') },
        { accessor: 'walletIdFromUser', title: 'Wallet ID (From User)', sortable: true, hidden: hiddenColumns.includes('walletIdFromUser') },
        { accessor: 'walletIdToUser', title: 'Wallet ID (To User)', sortable: true, hidden: hiddenColumns.includes('walletIdToUser') },
        { accessor: 'source', title: 'Source', sortable: true, hidden: hiddenColumns.includes('source') },

        // { accessor: 'fullName', title: 'Full Name', sortable: true, hidden: hiddenColumns.includes('fullName') },
        // { accessor: 'licenseNumber', title: 'License Number', sortable: true, hidden: hiddenColumns.includes('licenseNumber') },
        // { accessor: 'vehicleNumber', title: 'Vehicle Number', sortable: true, hidden: hiddenColumns.includes('vehicleNumber') },
        // { accessor: 'contactNumber', title: 'Contact Number', sortable: true, hidden: hiddenColumns.includes('contactNumber') },
        // { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        // { accessor: 'address', title: 'Address', sortable: true, hidden: hiddenColumns.includes('address') },
        // { accessor: 'dob', title: 'Date of Birth', sortable: true, hidden: hiddenColumns.includes('dob') },
        // { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        // { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true, hidden: hiddenColumns.includes('serviceProviderType') },
        // { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        // { accessor: 'TravelAgency', title: 'Travel Agency', sortable: true, hidden: hiddenColumns.includes('TravelAgency') },
        // { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        // { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        // { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        // { accessor: 'fatherName', title: "Father's Name", sortable: true, hidden: hiddenColumns.includes('fatherName') },
        // { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true, hidden: hiddenColumns.includes('mobileNumber') },
        // { accessor: 'altMobileNumber', title: 'Alternate Mobile Number', sortable: true, hidden: hiddenColumns.includes('altMobileNumber') },
        // { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        // { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        // { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        // { accessor: 'dlNumber', title: "Driver's License Number", sortable: true, hidden: hiddenColumns.includes('dlNumber') },
        // { accessor: 'dlValidity', title: "Driver's License Validity", sortable: true, hidden: hiddenColumns.includes('dlValidity') },
        // { accessor: 'policeVerNumber', title: 'Police Verification Number', sortable: true, hidden: hiddenColumns.includes('policeVerNumber') },
        // { accessor: 'batchNumber', title: 'Batch Number', sortable: true, hidden: hiddenColumns.includes('batchNumber') },
        // { accessor: 'batchValidity', title: 'Batch Validity', sortable: true, hidden: hiddenColumns.includes('batchValidity') },
        // { accessor: 'password', title: 'Password', sortable: true, hidden: hiddenColumns.includes('password') },
        // { accessor: 'permanentAddress', title: 'Permanent Address', sortable: true, hidden: hiddenColumns.includes('permanentAddress') },
        // { accessor: 'presentAddress', title: 'Present Address', sortable: true, hidden: hiddenColumns.includes('presentAddress') },
        // { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        // { accessor: 'remark', title: 'Remark', sortable: true, hidden: hiddenColumns.includes('remark') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: BankAccountData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: BankAccountData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/TransactionModule/BankAccount/EditBankAccount/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete') {
            const confirmDelete = window.confirm('Do you really want to delete this ticket?');
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setModal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else {
            toast.error('Please Select from Table.');
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

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Bank Account',
            to: '/TransactionModule/BankAccount/ViewBankAccount',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/BankAccount/ViewBankAccount' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/WalletModule/BankAccountDetails/CreateBankAccount" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Bank Account
                        </Link>
                    </div> */}

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

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer w-full" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            {/* <option value="edit">Upload Documents</option>
                            <option value="edit">Edit</option>
                            <option value="updateArchive">Update Archive</option> */}
                            <option value="export">Export</option>
                        </select>
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={BankAccountData.length}
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

                <UpdateArchivePopUp event={modal3} closeModal={() => setModal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewBankAccount;
