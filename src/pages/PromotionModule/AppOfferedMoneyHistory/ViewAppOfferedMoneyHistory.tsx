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
import toast from 'react-hot-toast';
import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

interface AppOfferedMoneyHistoryData {
    id: string;
    fk_applicationOfferedMoney: string;
    fk_couponHistoryId: string;
    fk_bonusHistoryId: string;
    fk_refferalHistoryId: string;
    fk_promocodeHistoryId: string;
    amount: string;
    paymentType: string;
    paidToRefrence: string;
    paidToRefrenceType: string;
    paidByRefrence: string;
    paidByRefrenceType: string;
    transactionStatus: string;
    transactionMode: string;
    archive: string;
    bonusId: string;
    userId: string;
    couponId: string;
    driverId: string;
    invitedBy: string;
    invitedToType: string;
    referralHistoryStatus: string;
    referralMaster: string;
    invitedByUser: string;
    invitedToUser: string;
    promocodeId: string;
    promocodeStatus: string;
    bankName: string;
    UserName: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticAppOfferedMoneyHistoryData = [
    {
        id: '1',
        fk_applicationOfferedMoney: '1000.00',
        fk_couponHistoryId: 'coupon123',
        fk_bonusHistoryId: 'bonus456',
        fk_refferalHistoryId: 'referral789',
        fk_promocodeHistoryId: 'promo987',
        amount: '500.00',
        paymentType: 'Subscription',
        paidToRefrence: 'user123',
        paidToRefrenceType: 'TRIP',
        paidByRefrence: 'merchant456',
        paidByRefrenceType: 'CARRENT ACCOUNT',
        transactionStatus: 'Completed',
        transactionMode: 'LINK',
        archive: 'APPROVED',
        approvedBy: 'ManagerXYZ',
        approvedAt: '2024-01-06T12:30:00Z',
        createdBy: 'Admin789',
        createdAt: '2024-01-05T10:45:00Z',
        updatedBy: 'Admin789',
        updatedAt: '2024-01-06T14:15:00Z',
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
        bonusId: '789',
        userId: 'user789',
        couponId: 'coupon789',
        driverId: 'driver789',
        invitedBy: 'John Doe',
        invitedToType: 'Driver',
        referralHistoryStatus: 'Pending',
        referralMaster: 'master123',
        invitedByUser: 'johndoe@example.com',
        invitedToUser: 'jsmith@example.com',
        promocodeId: 'promo789',
        promocodeStatus: 'Active',
        bankName: 'ABC Bank',
        UserName: 'Alice',
    },
    {
        id: '2',
        fk_applicationOfferedMoney: '1500.00',
        fk_couponHistoryId: 'coupon789',
        fk_bonusHistoryId: 'bonus012',
        fk_refferalHistoryId: 'referral345',
        fk_promocodeHistoryId: 'promo654',
        amount: '750.00',
        paymentType: 'Pomocode',
        paidToRefrence: 'vendor789',
        paidToRefrenceType: 'CARRENT ACCOUNT',
        paidByRefrence: 'user567',
        paidByRefrenceType: 'USER ACCOUNT',
        transactionStatus: 'Pending',
        transactionMode: 'QR',
        archive: 'PENDING',
        approvedBy: 'ManagerABC',
        approvedAt: '2024-01-07T09:00:00Z',
        createdBy: 'Admin999',
        createdAt: '2024-01-06T11:20:00Z',
        updatedBy: 'Admin999',
        updatedAt: '2024-01-07T10:30:00Z',
        bonusId: '890',
        userId: 'user890',
        couponId: 'coupon890',
        driverId: 'driver890',
        invitedBy: 'Jane Smith',
        invitedToType: 'Driver',
        referralHistoryStatus: 'Approved',
        referralMaster: 'master456',
        invitedByUser: 'janesmith@example.com',
        invitedToUser: 'johndoe@example.com',
        promocodeId: 'promo890',
        promocodeStatus: 'Inactive',
        bankName: 'XYZ Bank',
        UserName: 'Bob',
    },
];

const ViewAppOfferedMoneyHistory = () => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [modal3, setModal3] = useState(false);
    const [ChannelPartnerData, setChannelPartnerData] = useState<AppOfferedMoneyHistoryData[]>(staticAppOfferedMoneyHistoryData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AppOfferedMoneyHistoryData[]>([]);
    const [recordsData, setRecordsData] = useState<AppOfferedMoneyHistoryData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<AppOfferedMoneyHistoryData[]>([]);
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
    //     dispatch(setPageTitle('View Application Offered Money History'));

    //     const fetchChannelPartnerData = async () => {
    //         try {
    //             const { data } = await getChannelPartnerData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 //setChannelPartnerData(newData);
    //                 setChannelPartnerData(staticAppOfferedMoneyHistoryData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching Application Offered Money data:', error.message);
    //         }
    //     };
    //     fetchChannelPartnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AppOfferedMoneyHistoryData;
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
                fk_applicationOfferedMoney = '',
                fk_couponHistoryId = '',
                fk_bonusHistoryId = '',
                fk_refferalHistoryId = '',
                fk_promocodeHistoryId = '',
                amount = '',
                paymentType = '',
                paidToRefrence = '',
                paidToRefrenceType = '',
                paidByRefrence = '',
                paidByRefrenceType = '',
                transactionStatus = '',
                transactionMode = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                bonusId = '',
                userId = '',
                couponId = '',
                driverId = '',
                invitedBy = '',
                invitedToType = '',
                referralHistoryStatus = '',
                referralMaster = '',
                invitedByUser = '',
                invitedToUser = '',
                promocodeId = '',
                promocodeStatus = '',
                bankName = '',
                UserName = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_applicationOfferedMoney?.toLowerCase().includes(searchString) ||
                fk_couponHistoryId?.toLowerCase().includes(searchString) ||
                fk_bonusHistoryId?.toLowerCase().includes(searchString) ||
                fk_refferalHistoryId?.toLowerCase().includes(searchString) ||
                fk_promocodeHistoryId?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                paymentType?.toLowerCase().includes(searchString) ||
                paidToRefrence?.toLowerCase().includes(searchString) ||
                paidToRefrenceType?.toLowerCase().includes(searchString) ||
                paidByRefrence?.toLowerCase().includes(searchString) ||
                paidByRefrenceType?.toLowerCase().includes(searchString) ||
                transactionStatus?.toLowerCase().includes(searchString) ||
                transactionMode?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLocaleLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                bonusId?.toLowerCase().includes(searchString) ||
                userId?.toLowerCase().includes(searchString) ||
                couponId?.toLowerCase().includes(searchString) ||
                driverId?.toLowerCase().includes(searchString) ||
                invitedBy?.toLowerCase().includes(searchString) ||
                invitedToType?.toLowerCase().includes(searchString) ||
                referralHistoryStatus?.toLowerCase().includes(searchString) ||
                referralMaster?.toLowerCase().includes(searchString) ||
                invitedByUser?.toLowerCase().includes(searchString) ||
                invitedToUser?.toLowerCase().includes(searchString) ||
                promocodeId?.toLowerCase().includes(searchString) ||
                promocodeStatus?.toLowerCase().includes(searchString) ||
                bankName?.toLowerCase().includes(searchString) ||
                UserName?.toLowerCase().includes(searchString)
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

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    // for adjust the date
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    const columns: DataTableColumn<AppOfferedMoneyHistoryData>[] = [
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
                                    const editUrl = `/TransactionModule/AppOfferedMoneyHistory/EditAppOfferedMoneyHistory/${rowData.id}`;
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
                                    const viewUrl = `/PromotionModule/AppOfferedMoneyHistory/ViewSpecificAppOfferedMoneyHistory/1`;
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
        { accessor: 'fk_applicationOfferedMoney', title: 'Application Offered Money', sortable: true, hidden: hiddenColumns.includes('fk_applicationOfferedMoney') },
        { accessor: 'fk_couponHistoryId', title: 'Coupon master', sortable: true, hidden: hiddenColumns.includes('fk_couponHistoryId') },
        { accessor: 'fk_bonusHistoryId', title: 'Bonus master', sortable: true, hidden: hiddenColumns.includes('fk_bonusHistoryId') },
        { accessor: 'fk_refferalHistoryId', title: 'Refferal master', sortable: true, hidden: hiddenColumns.includes('fk_refferalHistoryId') },
        { accessor: 'fk_promocodeHistoryId', title: 'Promocode master', sortable: true, hidden: hiddenColumns.includes('fk_promocodeHistoryId') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'paymentType', title: 'Payment Type', sortable: true, hidden: hiddenColumns.includes('paymentType') },
        { accessor: 'paidToRefrence', title: 'Paid To Refrence', sortable: true, hidden: hiddenColumns.includes('paidToRefrence') },
        { accessor: 'paidToRefrenceType', title: 'Paid To Refrence Type', sortable: true, hidden: hiddenColumns.includes('paidToRefrenceType') },
        { accessor: 'paidByRefrence', title: 'Paid By Refrence', sortable: true, hidden: hiddenColumns.includes('paidByRefrence') },
        { accessor: 'paidByRefrenceType', title: 'Paid By Refrence Type', sortable: true, hidden: hiddenColumns.includes('paidByRefrenceType') },
        { accessor: 'transactionStatus', title: 'Transaction Status', sortable: true, hidden: hiddenColumns.includes('transactionStatus') },
        { accessor: 'transactionMode', title: 'Transaction Mode', sortable: true, hidden: hiddenColumns.includes('transactionMode') },
        { accessor: 'archive', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        // { accessor: 'bonusId', title: 'Bonus ID', sortable: true, hidden: hiddenColumns.includes('bonusId') },
        { accessor: 'userId', title: 'User ID', sortable: true, hidden: hiddenColumns.includes('userId') },
        // { accessor: 'couponId', title: 'Coupon ID', sortable: true, hidden: hiddenColumns.includes('couponId') },
        { accessor: 'driverId', title: 'Driver ID', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'invitedBy', title: 'Invited By', sortable: true, hidden: hiddenColumns.includes('invitedBy') },
        { accessor: 'invitedToType', title: 'Invited To Type', sortable: true, hidden: hiddenColumns.includes('invitedToType') },
        { accessor: 'referralHistoryStatus', title: 'Referral History Status', sortable: true, hidden: hiddenColumns.includes('referralHistoryStatus') },
        // { accessor: 'referralMaster', title: 'Referral Master', sortable: true, hidden: hiddenColumns.includes('referralMaster') },
        { accessor: 'invitedByUser', title: 'Invited By User', sortable: true, hidden: hiddenColumns.includes('invitedByUser') },
        { accessor: 'invitedToUser', title: 'Invited To User', sortable: true, hidden: hiddenColumns.includes('invitedToUser') },
        // { accessor: 'promocodeId', title: 'Promocode ID', sortable: true, hidden: hiddenColumns.includes('promocodeId') },
        { accessor: 'promocodeStatus', title: 'Promocode Status', sortable: true, hidden: hiddenColumns.includes('promocodeStatus') },
        { accessor: 'bankName', title: 'Bank Name', sortable: true, hidden: hiddenColumns.includes('bankName') },
        { accessor: 'UserName', title: 'User Name', sortable: true, hidden: hiddenColumns.includes('UserName') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: AppOfferedMoneyHistoryData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: AppOfferedMoneyHistoryData[] = [];

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
            const editUrl = `/TransactionModule/AppOfferedMoneyHistory/EditAppOfferedMoneyHistory/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setModal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'viewApp offered Money History');
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
            label: 'Application Offered Money History',
            to: '/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TransactionModule/AppOfferedMoneyHistory/CreateAppOfferedMoneyHistory" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create App. Offered Money History
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
                <UpdateArchivePopUp event={modal3} closeModal={() => setModal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewAppOfferedMoneyHistory;
