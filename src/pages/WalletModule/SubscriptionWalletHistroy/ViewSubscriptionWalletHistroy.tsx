import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { errorAlert, successAlert } from '@/utils/Toast';
import PurchaseSubscriptionModal from '@/components/Models/PurchaseSubscriptionModal';
import { downloadExcel } from '@/utils/Excel';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';

interface SubscriptionHistoryData {
    id: string;
    planId: string;
    purchasedBy: string;
    purchasedByRolesId: string;
    driverId: string;
    vehicleId: string;
    planStatus: string;
    startDate: string;
    endDate: string;
    walletHistoryId: string;
    archive: string;
    planName: string;
    planDetails: string;
    planAmount: string;
    planDuration: string;
    planDistance: string;
    serviceAvailableCity: string;
    amount: string;
    userId: string;
    paymentStatus: string;
    walletMaster: string;
    paidToReference: string;
    paidByReference: string;
    transactionStatus: string;
    pgTransactionId: string;
    driverType: string;
    mobileNumber: string;
    firstName: string;
    middleName: string;
    gender: string;
    emailAddress: string;
    city: string;
    driverLocation: string;
    promocode: string;
    discountType: string;
    validityStart: string;
    validityEnd: string;
    usage: number;
    usageLimit: number;
    perUserUsageLimit: number;

    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    purpose: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    transactionMode: string;
    walletStatus: string;
    appTransactionId: string;
    platformTransactionId: string;
    bankVerification: string;
    bankLabel: string;
    walletTransactionId: string;
    virtualTransactionId: string;
    dateTime: string;
    distributorName: string;
    walletProfileStatus: string;
    walletIdFromUser: string;
    walletIdToUser: string;
    source: string;
}

export const staticSubscriptionWalletHistoryData = [
    {
        id: '1',
        planId: 'driverDamaka',
        purchasedBy: 'John Doe',
        purchasedByRolesId: 'R001',
        driverId: 'D001',
        vehicleId: 'KL-COCH-23',
        planStatus: 'Active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        walletHistoryId: 'W001',
        archive: 'false',
        planName: 'Gold Plan',
        planDetails: 'Unlimited rides within the city',
        planAmount: '$100',
        planDuration: '1 year',
        planDistance: 'Unlimited',
        serviceAvailableCity: 'New York',
        amount: '$100',
        userId: 'Travel agency',
        paymentStatus: 'Failed',
        walletMaster: 'WM001',
        paidToReference: 'Johns Wallet',
        paidByReference: 'Credit Card',
        transactionStatus: 'Success',
        pgTransactionId: 'PG001',
        driverType: 'Full-time',
        mobileNumber: '123-456-7890',
        firstName: 'John',
        middleName: 'raj',
        gender: 'Male',
        emailAddress: 'john.doe@example.com',
        city: 'New York',
        driverLocation: 'Central Park',
        promocode: 'SUMMER50',
        discountType: 'Percentage',
        validityStart: '2024-01-01',
        validityEnd: '2025-01-01',
        usage: 10,
        usageLimit: 100,
        perUserUsageLimit: 5,

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

        fromUser: 'UserA',
        toUser: 'UserB',
        toUserPhoneNumber: '12345234523',
        purpose: 'Payment for services',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC001',
        bankAccountIFSCTo: 'IFSC002',
        transactionMode: 'Online',
        walletStatus: 'Completed',
        appTransactionId: 'APP123456',
        platformTransactionId: 'PLT123456',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123456',
        virtualTransactionId: 'VT123456',
        dateTime: '2024-05-20T12:00:00Z',
        distributorName: 'manu privet limted',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID123',
        walletIdToUser: 'WID456',
        source: 'Mobile App',
    },
    {
        id: '2',
        planId: 'driverDamaka',
        purchasedBy: 'Alice Smith',
        purchasedByRolesId: 'R002',
        driverId: 'D002',
        vehicleId: 'KA-BNGLR-543',
        planStatus: 'Expire',
        startDate: '2024-02-15',
        endDate: '2024-11-30',
        walletHistoryId: 'W002',
        archive: 'true',
        planName: 'Silver Plan',
        planDetails: 'Limited rides within the city',
        planAmount: '$50',
        planDuration: '10 months',
        planDistance: '500 km',
        serviceAvailableCity: 'Los Angeles',
        amount: '$50',
        userId: 'Travel agency',
        paymentStatus: 'Sucsess',
        walletMaster: 'WM002',
        paidToReference: 'Alices Wallet',
        paidByReference: 'PayPal',
        transactionStatus: 'Success',
        pgTransactionId: 'PG002',
        driverType: 'Part-time',
        mobileNumber: '987-654-3210',
        firstName: 'Alice',
        middleName: 'Marie',
        gender: 'Female',
        emailAddress: 'alice.smith@example.com',
        city: 'Los Angeles',
        driverLocation: 'Santa Monica',
        promocode: 'FALL25',
        discountType: 'Fixed Amount',
        validityStart: '2024-02-15',
        validityEnd: '2025-02-15',
        usage: 5,
        usageLimit: 50,
        perUserUsageLimit: 2,

        fromUser: 'UserA',
        toUser: 'UserB',
        toUserPhoneNumber: '12345234523',
        purpose: 'Payment for services',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC001',
        bankAccountIFSCTo: 'IFSC002',
        transactionMode: 'Online',
        walletStatus: 'Completed',
        appTransactionId: 'APP123456',
        platformTransactionId: 'PLT123456',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123456',
        virtualTransactionId: 'VT123456',
        dateTime: '2024-05-20T12:00:00Z',
        distributorName: 'manu privet limted',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID123',
        walletIdToUser: 'WID456',
        source: 'Mobile App',
    },
    {
        id: '3',
        planId: 'driverGold',
        purchasedBy: 'Bob Johnson',
        purchasedByRolesId: 'R003',
        driverId: 'D003',
        vehicleId: 'MH-MUMB-324',
        planStatus: 'Upcoming',
        startDate: '2024-03-20',
        endDate: '2024-10-15',
        walletHistoryId: 'W003',
        archive: 'false',
        planName: 'Bronze Plan',
        planDetails: 'Limited rides within downtown area',
        planAmount: '$30',
        planDuration: '6 months',
        planDistance: '200 km',
        serviceAvailableCity: 'Chicago',
        amount: '$30',
        userId: 'Travel agency',
        paymentStatus: 'Failed',
        walletMaster: 'WM003',
        paidToReference: 'Bobs Wallet',
        paidByReference: 'Bank Transfer',
        transactionStatus: 'Pending',
        pgTransactionId: 'PG003',
        driverType: 'Full-time',
        mobileNumber: '555-555-5555',
        firstName: 'Bob',
        middleName: 'James',
        gender: 'Male',
        emailAddress: 'bob.johnson@example.com',
        city: 'Chicago',
        driverLocation: 'Downtown Loop',
        promocode: 'WINTER10',
        discountType: 'Percentage',
        validityStart: '2024-03-20',
        validityEnd: '2024-12-31',
        usage: 0,
        usageLimit: 20,
        perUserUsageLimit: 10,

        fromUser: 'UserA',
        toUser: 'UserB',
        toUserPhoneNumber: '12345234523',
        purpose: 'Payment for services',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC001',
        bankAccountIFSCTo: 'IFSC002',
        transactionMode: 'Online',
        walletStatus: 'Completed',
        appTransactionId: 'APP123456',
        platformTransactionId: 'PLT123456',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123456',
        virtualTransactionId: 'VT123456',
        dateTime: '2024-05-20T12:00:00Z',
        distributorName: 'manu privet limted',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID123',
        walletIdToUser: 'WID456',
        source: 'Mobile App',
    },
];

const ViewSubscriptionWalletHistroy = ({ tabs }: any) => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [Subs_HistoryData, setSubs_HistoryData] = useState<SubscriptionHistoryData[]>(staticSubscriptionWalletHistoryData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SubscriptionHistoryData[]>([]);
    const [recordsData, setRecordsData] = useState<SubscriptionHistoryData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<SubscriptionHistoryData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // add update ProfileStatus
    const handleAddUpdateProfileStatus = (selectedProfileStatus: any[], id: string) => {
        successAlert('ProfileStatus Updated Succesfully');
        // handle update ProfileStatus
    };

    // date vise sorting. Will use in future
    // useEffect(() => {
    //   const fetchAdminData = async () => {
    //     try {
    //       const { data } = await getAdminData();
    //       if (data?.admins) {
    //         const filteredData = data.admins.filter((item: AdminData) => {
    //           if (!selectedDateRange) return true;
    //           const createdAtTimestamp = new Date(item.createdAt).getTime();
    //           const startDate = selectedDateRange[0]?.getTime() || 0;
    //           const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
    //           return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
    //         });
    //         setAdminData(filteredData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching admin data:', error.message);
    //     }
    //   };
    //   fetchAdminData();
    // }, [selectedDateRange]);

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
    //     dispatch(setPageTitle('View Service Provider'));

    //     const fetchSubs_HistoryData = async () => {
    //         try {
    //             const { data } = await getSubs_HistoryData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 //setSubs_HistoryData(newData);
    //                 setSubs_HistoryData(staticSubscriptionWalletHistoryData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching service provider data:', error.message);
    //         }
    //     };
    //     fetchSubs_HistoryData();
    // }, [dispatch]);

    useEffect(() => {
        if (Subs_HistoryData.length > 0) {
            const sortedData = Subs_HistoryData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof SubscriptionHistoryData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [Subs_HistoryData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                planId = '',
                purchasedBy = '',
                purchasedByRolesId = '',
                driverId = '',
                vehicleId = '',
                planStatus = '',
                startDate = '',
                endDate = '',
                walletHistoryId = '',
                archive = '',
                planName = '',
                planDetails = '',
                planAmount = '',
                planDuration = '',
                planDistance = '',
                serviceAvailableCity = '',
                amount = '',
                userId = '',
                paymentStatus = '',
                walletMaster = '',
                paidToReference = '',
                paidByReference = '',
                transactionStatus = '',
                pgTransactionId = '',
                driverType = '',
                mobileNumber = '',
                firstName = '',
                middleName = '',
                gender = '',
                emailAddress = '',
                city = '',
                driverLocation = '',
                promocode = '',
                discountType = '',
                validityStart = '',
                validityEnd = '',
                usage = '',
                usageLimit = '',
                perUserUsageLimit = '',

                fromUser = '',
                toUser = '',
                toUserPhoneNumber = '',

                purpose = '',

                walletType = '',
                bankAccountIFSCFrom = '',
                bankAccountIFSCTo = '',

                transactionMode = '',
                walletStatus = '',
                appTransactionId = '',
                platformTransactionId = '',
                bankVerification = '',
                bankLabel = '',
                walletTransactionId = '',
                virtualTransactionId = '',

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
                planId?.toLowerCase().includes(searchString) ||
                purchasedBy?.toLowerCase().includes(searchString) ||
                purchasedByRolesId?.toLowerCase().includes(searchString) ||
                driverId?.toLowerCase().includes(searchString) ||
                vehicleId?.toLowerCase().includes(searchString) ||
                planStatus?.toLowerCase().includes(searchString) ||
                startDate?.toLowerCase().includes(searchString) ||
                endDate?.toLowerCase().includes(searchString) ||
                walletHistoryId?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                planName?.toLowerCase().includes(searchString) ||
                planDetails?.toLowerCase().includes(searchString) ||
                planAmount?.toLowerCase().includes(searchString) ||
                planDuration?.toLowerCase().includes(searchString) ||
                planDistance?.toLowerCase().includes(searchString) ||
                serviceAvailableCity?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                userId?.toLowerCase().includes(searchString) ||
                paymentStatus?.toLowerCase().includes(searchString) ||
                walletMaster?.toLowerCase().includes(searchString) ||
                paidToReference?.toLowerCase().includes(searchString) ||
                paidByReference?.toLowerCase().includes(searchString) ||
                transactionStatus?.toLowerCase().includes(searchString) ||
                pgTransactionId?.toLowerCase().includes(searchString) ||
                driverType?.toLowerCase().includes(searchString) ||
                mobileNumber?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                emailAddress?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                driverLocation?.toLowerCase().includes(searchString) ||
                promocode?.toLowerCase().includes(searchString) ||
                discountType?.toLowerCase().includes(searchString) ||
                validityStart?.toLowerCase().includes(searchString) ||
                validityEnd?.toLowerCase().includes(searchString) ||
                usage?.toString().includes(searchString) ||
                usageLimit?.toString().includes(searchString) ||
                perUserUsageLimit?.toString().includes(searchString) ||
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
                source.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<SubscriptionHistoryData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    {/* <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/SubscriptionModule/SubscriptionHistory/EditSubscriptionHistory/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy> */}
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/WalletModule/SubscriptionWalletHistroy/ViewSpecificSubscriptionWalletHistroy/1`;
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
        { accessor: 'planName', title: 'Plan Name', sortable: true, hidden: hiddenColumns.includes('planName') },
        { accessor: 'planDetails', title: 'Plan Details', sortable: true, hidden: hiddenColumns.includes('planDetails') },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true, hidden: hiddenColumns.includes('planAmount') },
        { accessor: 'planDuration', title: 'Remaining Days', sortable: true, hidden: hiddenColumns.includes('planDuration') },
        { accessor: 'planDistance', title: 'Coupon Amount', sortable: true, hidden: hiddenColumns.includes('planDistance') },
        { accessor: 'serviceAvailableCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('serviceAvailableCity') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'userId', title: 'User', sortable: true, hidden: hiddenColumns.includes('userId') },
        { accessor: 'paymentStatus', title: 'Payment Status', sortable: true, hidden: hiddenColumns.includes('paymentStatus') },
        { accessor: 'walletMaster', title: 'Wallet Amount', sortable: true, hidden: hiddenColumns.includes('walletMaster') },
        // { accessor: 'paidToReference', title: 'Paid To Reference', sortable: true, hidden: hiddenColumns.includes('paidToReference') },
        // { accessor: 'paidByReference', title: 'Paid By Reference', sortable: true, hidden: hiddenColumns.includes('paidByReference') },
        // { accessor: 'transactionStatus', title: 'Transaction Status', sortable: true, hidden: hiddenColumns.includes('transactionStatus') },
        { accessor: 'pgTransactionId', title: 'PG Transaction ID', sortable: true, hidden: hiddenColumns.includes('pgTransactionId') },
        { accessor: 'driverType', title: 'Driver id', sortable: true, hidden: hiddenColumns.includes('driverType') },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true, hidden: hiddenColumns.includes('mobileNumber') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'emailAddress', title: 'Email Address', sortable: true, hidden: hiddenColumns.includes('emailAddress') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'driverLocation', title: 'Driver Location', sortable: true, hidden: hiddenColumns.includes('driverLocation') },
        // { accessor: 'promocode', title: 'Promocode', sortable: true, hidden: hiddenColumns.includes('promocode') },
        { accessor: 'discountType', title: 'Discount Type', sortable: true, hidden: hiddenColumns.includes('discountType') },
        { accessor: 'validityStart', title: 'Validity Start', sortable: true, hidden: hiddenColumns.includes('validityStart') },
        { accessor: 'validityEnd', title: 'Validity End', sortable: true, hidden: hiddenColumns.includes('validityEnd') },
        { accessor: 'usage', title: 'Usage', sortable: true, hidden: hiddenColumns.includes('usage') },
        { accessor: 'usageLimit', title: 'Usage Limit', sortable: true, hidden: hiddenColumns.includes('usageLimit') },
        { accessor: 'perUserUsageLimit', title: 'Per User Usage Limit', sortable: true, hidden: hiddenColumns.includes('perUserUsageLimit') },

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
    ];

    const [modal3, setmodal3] = useState(false);

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: SubscriptionHistoryData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: SubscriptionHistoryData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    const [UpdateArchive, setUpdateArchive] = useState(false);
    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/SubscriptionModule/SubscriptionHistory/EditSubscriptionHistory/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'removeSubscription' && selectedRecords.length === 1) {
            const confirmDelete = window.confirm('Do you really want to delete this Subscription History?');
            errorAlert('Deleted Subsciption');
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
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

    // purchase Subscription -------->>>
    const [modal1, setModal1] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState<any[]>([]);
    // handle subscription pop-up
    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setSubscriptionData(selectedServiceCity);
        if (userID === 'subscriptionAdded') {
            successAlert('Subscription Added Succesfully');
        } else {
            errorAlert('Subscription Not Added');
        }
    };

    const navItems = !tabs
        ? [
              {
                  label: 'Home',
                  to: '/',
                  className: '',
              },
              {
                  label: 'Subscription History',
                  to: '/SubscriptionModule/SubscriptionHistory/ViewSubscriptionWalletHistroy',
                  className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                      currentPath === '/SubscriptionModule/SubscriptionHistory/ViewSubscriptionWalletHistroy' ? 'text-blue-600' : ''
                  }`,
              },
          ]
        : [];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
            <Link to="/subscriptionModule/subscriptionHistory/createSubscriptionHistory" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
              Create Subscription History
            </Link>
          </div> */}

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

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
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="Action">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            {/* <option value="removeSubscription">Remove Subscription</option> */}
                            <option value="updatePaymentDetails">Update Payment Details</option>
                            <option value="updateArchive">Update Archive</option>
                            <option value="export">Export</option>
                        </select>
                    </div>
                    {/* {tabs && (
                        <div className="lg:w-14 sm:w-full mb-4 sm:mb-0">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName=" btn dropdown-toggle !flex shadow-none border-none  hover:bg-gray-200"
                                    button={
                                        <>
                                            <BsThreeDotsVertical className="text-center text-lg " />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[170px] rounded-xl font-bold bg-blue-200">
                                        <li>
                                            <button type="button" onClick={() => setModal1(true)}>
                                                Purchs Sbscription
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    )} */}
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={Subs_HistoryData.length}
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
                <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateProfileStatus} />
                <PurchaseSubscriptionModal event={modal1} closeModal={() => setModal1(false)} onAddSubscription={handleAddServiceCitySubmit} />
            </div>
        </>
    );
};

export default ViewSubscriptionWalletHistroy;
