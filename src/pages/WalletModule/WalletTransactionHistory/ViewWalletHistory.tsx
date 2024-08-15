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
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';
import toast from 'react-hot-toast';

interface WalletHistoryData {
    id: string;
    fk_walletMaster: string;
    paidToReference: string;
    paidByReference: string;
    transactionStatus: string;
    fk_pgTransactionId: string;
    paymentType: string;
    transactionMode: string;
    archive: string;
    amount: string;
    status: string;
    fk_userid: string;
    paidToRefrenceType: string;
    paidByRefrenceType: string;
    transactionAmount: string;
    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    userId: string;
    purpose: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    pgTransactionId: string;
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
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticWalletHistoryData = [
    {
        id: '1',
        fk_walletMaster: 'Wallet123',
        paidToReference: 'RecipientABC',
        paidByReference: 'PayerXYZ',
        transactionStatus: 'Completed',
        fk_pgTransactionId: 'PG-789',
        paymentType: 'Subscription',
        transactionMode: 'QR',
        archive: 'APPROVED',
        paidToRefrenceType: 'BANK',
        paidByRefrenceType: 'WALLET',
        transactionAmount: '150.00',
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
        status: 'Pending',
        fk_userid: 'shahul',
        approvedBy: 'ManagerABC',
        approvedAt: '2024-01-07T10:15:00Z',
        createdBy: 'Admin456',
        createdAt: '2024-01-06T14:00:00Z',
        updatedBy: 'Admin456',
        updatedAt: '2024-01-07T11:30:00Z',
    },
    {
        id: '2',
        fk_walletMaster: 'Wallet456',
        paidToReference: 'RecipientXYZ',
        paidByReference: 'PayerABC',
        transactionStatus: 'Pending',
        fk_pgTransactionId: 'PG-456',
        paymentType: 'One-Time',
        transactionMode: 'Card',
        archive: 'PENDING',
        paidToRefrenceType: 'WALLET',
        paidByRefrenceType: 'BANK',
        transactionAmount: '200.00',
        fromUser: 'UserC',
        toUser: 'UserD',
        toUserPhoneNumber: '9876543210',
        userId: 'U456',
        purpose: 'Purchase of goods',
        amount: '150.00',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC003',
        bankAccountIFSCTo: 'IFSC004',
        pgTransactionId: 'PG654321',
        walletStatus: 'Pending',
        appTransactionId: 'APP654321',
        platformTransactionId: 'PLT654321',
        bankVerification: 'Pending',
        bankLabel: 'No',
        walletTransactionId: 'WT654321',
        virtualTransactionId: 'VT654321',
        paymentStatus: 'Pending',
        dateTime: '2024-05-21T10:00:00Z',
        distributorName: 'global solutions ltd',
        walletProfileStatus: 'Pending',
        walletIdFromUser: 'WID789',
        walletIdToUser: 'WID012',
        source: 'Web App',
        status: 'Pending',
        fk_userid: 'alice',
        approvedBy: 'ManagerXYZ',
        approvedAt: '2024-02-07T10:15:00Z',
        createdBy: 'Admin123',
        createdAt: '2024-02-06T14:00:00Z',
        updatedBy: 'Admin123',
        updatedAt: '2024-02-07T11:30:00Z',
    },
    {
        id: '3',
        fk_walletMaster: 'Wallet789',
        paidToReference: 'RecipientLMN',
        paidByReference: 'PayerDEF',
        transactionStatus: 'Rejected',
        fk_pgTransactionId: 'PG-123',
        paymentType: 'Recurring',
        transactionMode: 'Bank Transfer',
        archive: 'REJECTED',
        paidToRefrenceType: 'BANK',
        paidByRefrenceType: 'WALLET',
        transactionAmount: '300.00',
        fromUser: 'UserE',
        toUser: 'UserF',
        toUserPhoneNumber: '1122334455',
        userId: 'U789',
        purpose: 'Subscription fee',
        amount: '250.00',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC005',
        bankAccountIFSCTo: 'IFSC006',
        pgTransactionId: 'PG789123',
        walletStatus: 'Rejected',
        appTransactionId: 'APP789123',
        platformTransactionId: 'PLT789123',
        bankVerification: 'Rejected',
        bankLabel: 'No',
        walletTransactionId: 'WT789123',
        virtualTransactionId: 'VT789123',
        paymentStatus: 'Failed',
        dateTime: '2024-05-22T08:00:00Z',
        distributorName: 'alpha corp',
        walletProfileStatus: 'Inactive',
        walletIdFromUser: 'WID345',
        walletIdToUser: 'WID678',
        source: 'Mobile App',
        status: 'Rejected',
        fk_userid: 'bob',
        approvedBy: 'ManagerDEF',
        approvedAt: '2024-03-07T10:15:00Z',
        createdBy: 'Admin789',
        createdAt: '2024-03-06T14:00:00Z',
        updatedBy: 'Admin789',
        updatedAt: '2024-03-07T11:30:00Z',
    },
    {
        id: '4',
        fk_walletMaster: 'Wallet321',
        paidToReference: 'RecipientOPQ',
        paidByReference: 'PayerGHI',
        transactionStatus: 'Completed',
        fk_pgTransactionId: 'PG-012',
        paymentType: 'One-Time',
        transactionMode: 'UPI',
        archive: 'APPROVED',
        paidToRefrenceType: 'WALLET',
        paidByRefrenceType: 'BANK',
        transactionAmount: '500.00',
        fromUser: 'UserG',
        toUser: 'UserH',
        toUserPhoneNumber: '9988776655',
        userId: 'U321',
        purpose: 'Service payment',
        amount: '450.00',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC007',
        bankAccountIFSCTo: 'IFSC008',
        pgTransactionId: 'PG123789',
        walletStatus: 'Completed',
        appTransactionId: 'APP123789',
        platformTransactionId: 'PLT123789',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123789',
        virtualTransactionId: 'VT123789',
        paymentStatus: 'Success',
        dateTime: '2024-05-23T09:00:00Z',
        distributorName: 'omega inc',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID901',
        walletIdToUser: 'WID234',
        source: 'Mobile App',
        status: 'Approved',
        fk_userid: 'charlie',
        approvedBy: 'ManagerGHI',
        approvedAt: '2024-04-07T10:15:00Z',
        createdBy: 'Admin456',
        createdAt: '2024-04-06T14:00:00Z',
        updatedBy: 'Admin456',
        updatedAt: '2024-04-07T11:30:00Z',
    },
];

interface ViewWalletHis {
    tabs: boolean;
}

const ViewWalletHistory: React.FC<ViewWalletHis> = ({ tabs }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal3, setmodal3] = useState(false);
    const [ChannelPartnerData, setChannelPartnerData] = useState<WalletHistoryData[]>(staticWalletHistoryData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<WalletHistoryData[]>([]);
    const [recordsData, setRecordsData] = useState<WalletHistoryData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<WalletHistoryData[]>([]);
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
    // useEffect(() => {
    //   dispatch(setPageTitle('View Wallet History'));

    //   const fetchChannelPartnerData = async () => {
    //     try {
    //       const { data } = await getChannelPartnerData();
    //       if (data?.ChannelPartners) {
    //         // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //         const newData = data.ChannelPartners.map(({
    //           _id: id,
    //           ...rest
    //         }) => ({
    //           id,
    //           ...rest
    //         }))
    //         //setChannelPartnerData(newData);
    //         setChannelPartnerData(staticWalletHistoryData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching wallet history data:', error.message);
    //     }
    //   };
    //   fetchChannelPartnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof WalletHistoryData;
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
            const {
                id = '',
                fk_walletMaster = '',
                paidToReference = '',
                paidByReference = '',
                transactionStatus = '',
                fk_pgTransactionId = '',
                paymentType = '',
                transactionMode = '',
                paidToRefrenceType = '',
                paidByRefrenceType = '',
                transactionAmount = '',
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
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                status = '',
                fk_userid = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : '';

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_walletMaster?.toLowerCase().includes(searchString) ||
                paidToReference?.toLowerCase().includes(searchString) ||
                paidByReference?.toLowerCase().includes(searchString) ||
                transactionStatus?.toLowerCase().includes(searchString) ||
                fk_pgTransactionId?.toLowerCase().includes(searchString) ||
                paymentType?.toLowerCase().includes(searchString) ||
                transactionMode?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                paidToRefrenceType?.toLowerCase().includes(searchString) ||
                paidByRefrenceType?.toLowerCase().includes(searchString) ||
                transactionAmount?.toLowerCase().includes(searchString) ||
                fromUser?.toLowerCase().includes(searchString) ||
                toUser?.toLowerCase().includes(searchString) ||
                toUserPhoneNumber?.toLowerCase().includes(searchString) ||
                userId?.toLowerCase().includes(searchString) ||
                purpose?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                walletType?.toLowerCase().includes(searchString) ||
                bankAccountIFSCFrom?.toLowerCase().includes(searchString) ||
                bankAccountIFSCTo?.toLowerCase().includes(searchString) ||
                pgTransactionId?.toLowerCase().includes(searchString) ||
                walletStatus?.toLowerCase().includes(searchString) ||
                appTransactionId?.toLowerCase().includes(searchString) ||
                platformTransactionId?.toLowerCase().includes(searchString) ||
                bankVerification?.toLowerCase().includes(searchString) ||
                bankLabel?.toLowerCase().includes(searchString) ||
                walletTransactionId?.toLowerCase().includes(searchString) ||
                virtualTransactionId?.toLowerCase().includes(searchString) ||
                paymentStatus?.toLowerCase().includes(searchString) ||
                dateTime?.toLowerCase().includes(searchString) ||
                distributorName?.toLowerCase().includes(searchString) ||
                walletProfileStatus?.toLowerCase().includes(searchString) ||
                walletIdFromUser?.toLowerCase().includes(searchString) ||
                walletIdToUser?.toLowerCase().includes(searchString) ||
                source?.toLowerCase().includes(searchString) ||
                status?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                fk_userid?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<WalletHistoryData>[] = [
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
                                    const editUrl = `/TransactionModule/WalletHistory/EditWalletHistory/${rowData.id}`;
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
                                if (rowData?.id) {
                                    const viewUrl = `/WalletModule/WalletTransactionHistory/ViewSpecificWalletHistory/1`;
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
        { accessor: 'fk_walletMaster', title: 'Wallet Master', sortable: true, hidden: hiddenColumns.includes('fk_walletMaster') },
        { accessor: 'paidToReference', title: 'Paid To Reference', sortable: true, hidden: hiddenColumns.includes('paidToReference') },
        { accessor: 'paidByReference', title: 'Paid By Reference', sortable: true, hidden: hiddenColumns.includes('paidByReference') },
        { accessor: 'transactionStatus', title: 'Transaction Status', sortable: true, hidden: hiddenColumns.includes('transactionStatus') },
        { accessor: 'fk_pgTransactionId', title: 'PG Transaction', sortable: true, hidden: hiddenColumns.includes('fk_pgTransactionId') },
        { accessor: 'paymentType', title: 'Payment Type', sortable: true, hidden: hiddenColumns.includes('paymentType') },
        { accessor: 'transactionMode', title: 'Transaction Mode', sortable: true, hidden: hiddenColumns.includes('transactionMode') },
        { accessor: 'archive', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'paidToRefrenceType', title: 'Paid To Reference Type', sortable: true, hidden: hiddenColumns.includes('paidToRefrenceType') },
        { accessor: 'paidByRefrenceType', title: 'Paid By Reference Type', sortable: true, hidden: hiddenColumns.includes('paidByRefrenceType') },
        { accessor: 'transactionAmount', title: 'Transaction Amount', sortable: true, hidden: hiddenColumns.includes('transactionAmount') },
        // Add the new fields
        { accessor: 'fromUser', title: 'From User', sortable: true, hidden: hiddenColumns.includes('fromUser') },
        { accessor: 'toUser', title: 'To User', sortable: true, hidden: hiddenColumns.includes('toUser') },
        { accessor: 'toUserPhoneNumber', title: 'To User Phone Number', sortable: true, hidden: hiddenColumns.includes('toUserPhoneNumber') },
        { accessor: 'userId', title: 'User ID', sortable: true, hidden: hiddenColumns.includes('userId') },
        { accessor: 'purpose', title: 'Purpose', sortable: true, hidden: hiddenColumns.includes('purpose') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'walletType', title: 'Wallet Type', sortable: true, hidden: hiddenColumns.includes('walletType') },
        { accessor: 'bankAccountIFSCFrom', title: 'Bank Account IFSC From', sortable: true, hidden: hiddenColumns.includes('bankAccountIFSCFrom') },
        { accessor: 'bankAccountIFSCTo', title: 'Bank Account IFSC To', sortable: true, hidden: hiddenColumns.includes('bankAccountIFSCTo') },
        { accessor: 'pgTransactionId', title: 'PG Transaction ID', sortable: true, hidden: hiddenColumns.includes('pgTransactionId') },
        { accessor: 'walletStatus', title: 'Wallet Status', sortable: true, hidden: hiddenColumns.includes('walletStatus') },
        { accessor: 'appTransactionId', title: 'App Transaction ID', sortable: true, hidden: hiddenColumns.includes('appTransactionId') },
        { accessor: 'platformTransactionId', title: 'Platform Transaction ID', sortable: true, hidden: hiddenColumns.includes('platformTransactionId') },
        { accessor: 'bankVerification', title: 'Bank Verification', sortable: true, hidden: hiddenColumns.includes('bankVerification') },
        { accessor: 'bankLabel', title: 'Bank Label', sortable: true, hidden: hiddenColumns.includes('bankLabel') },
        { accessor: 'walletTransactionId', title: 'Wallet Transaction ID', sortable: true, hidden: hiddenColumns.includes('walletTransactionId') },
        { accessor: 'virtualTransactionId', title: 'Virtual Transaction ID', sortable: true, hidden: hiddenColumns.includes('virtualTransactionId') },
        { accessor: 'paymentStatus', title: 'Payment Status', sortable: true, hidden: hiddenColumns.includes('paymentStatus') },
        { accessor: 'dateTime', title: 'Date Time', sortable: true, hidden: hiddenColumns.includes('dateTime') },
        { accessor: 'distributorName', title: 'Distributor Name', sortable: true, hidden: hiddenColumns.includes('distributorName') },
        { accessor: 'walletProfileStatus', title: 'Wallet Profile Status', sortable: true, hidden: hiddenColumns.includes('walletProfileStatus') },
        { accessor: 'walletIdFromUser', title: 'Wallet ID From User', sortable: true, hidden: hiddenColumns.includes('walletIdFromUser') },
        { accessor: 'walletIdToUser', title: 'Wallet ID To User', sortable: true, hidden: hiddenColumns.includes('walletIdToUser') },
        { accessor: 'source', title: 'Source', sortable: true, hidden: hiddenColumns.includes('source') },
        { accessor: 'status', title: 'Status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'fk_userid', title: 'User Name', sortable: true, hidden: hiddenColumns.includes('fk_userid') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: WalletHistoryData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: WalletHistoryData[] = [];

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
            const editUrl = `/TransactionModule/WalletHistory/EditWalletHistory/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Wallet History');
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
            label: 'Wallet History',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // date vise sorting.
    // useEffect(() => {
    //     const fetchAdminData = async () => {
    //         try {
    //             const { data } = await getAllAdminRoles();
    //             if (data?.Archives) {
    //                 const filteredData = data.Archives.filter((item: MoneyRequestData) => {
    //                     if (!selectedDateRange) return true;
    //                     const createdAtTimestamp = new Date(item.createdAt).getTime();
    //                     const startDate = selectedDateRange[0]?.getTime() || 0;
    //                     const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
    //                     return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
    //                 });
    //                 setMoneyRequestData(filteredData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminData();
    // }, [selectedDateRange]);

    // const handleDateChange = (date: Date | null) => {
    //   setSelectedDateRange(date);
    // };

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
            <Link to="/transactionModule/walletHistory/createWalletHistory" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
              Create Wallet History
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
                            <option value="edit">Update Transaction</option>
                            <option value="edit">Edit</option>
                            <option value="updateArchive">Update Profile Status</option>
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
                <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewWalletHistory;
