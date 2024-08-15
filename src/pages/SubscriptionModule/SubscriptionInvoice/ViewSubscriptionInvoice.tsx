import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import toast from 'react-hot-toast';
import '@react-pdf-viewer/core/lib/styles/index.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

interface TabsType {
    id: string;
    title: string;
}

interface SubscriptionInvoiceData {
    id: string;
    subHistoryId: string;
    amount: string;
    paymentStatus: string;
    fk_serviceCity: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    planName: string;
    planDetails: string;
    planDuration: string;
    planAmount: string;
    planDescription: string;
    planDistance: string;
    city: string;
    planLiveStartTime: string;
    planLiveEndTime: string;
    subscriptionAmtDistribution: string;
    planId: string;
    purchasedBy: string;
    purchasedByRolesId: string;
    driverId: string;
    vehicleId: string;
    planStatus: string;
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    couponHistoryId: string;
    walletHistoryId: string;
    transactionHistoryId: string;
    paymentType: string;
    transactionStatus: string;
    updatedHistory: any[];
}

export const staticSubscriptionInvoiceData: SubscriptionInvoiceData[] = [
    {
        id: '1',
        subHistoryId: 'SH001',
        amount: '50',
        paymentStatus: 'Success',
        fk_serviceCity: 'New York',
        approvedBy: 'Admin',
        approvedAt: '2023-12-01T08:00:00Z',
        createdBy: 'User001',
        createdAt: '2023-12-01T08:15:00Z',
        updatedBy: 'User002',
        updatedAt: '2023-12-01T08:30:00Z',
        planName: 'Basic Plan',
        planDetails: 'Includes basic features',
        planDuration: '1 month',
        planAmount: '50',
        planDescription: 'Entry-level subscription',
        planDistance: 'Unlimited',
        city: 'New York',
        planLiveStartTime: '2023-12-01T09:00:00Z',
        planLiveEndTime: '2023-12-01T17:00:00Z',
        subscriptionAmtDistribution: '50-50',
        planId: 'P001',
        purchasedBy: 'User001',
        purchasedByRolesId: 'R001',
        driverId: 'D001',
        vehicleId: 'V001',
        planStatus: 'Active',
        subscriptionStartDate: '2023-12-01T00:00:00Z',
        subscriptionEndDate: '2024-01-01T00:00:00Z',
        couponHistoryId: 'C001',
        walletHistoryId: 'W001',
        transactionHistoryId: 'T001',
        paymentType: 'Credit Card',
        transactionStatus: 'Success',
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
        subHistoryId: 'SH002',
        amount: '75',
        paymentStatus: 'Pending',
        fk_serviceCity: 'Los Angeles',
        approvedBy: 'Manager',
        approvedAt: '2023-12-02T10:00:00Z',
        createdBy: 'User003',
        createdAt: '2023-12-02T10:15:00Z',
        updatedBy: 'User004',
        updatedAt: '2023-12-02T10:30:00Z',
        planName: 'Premium Plan',
        planDetails: 'Includes advanced features',
        planDuration: '3 months',
        planAmount: '225',
        planDescription: 'High-tier subscription',
        planDistance: 'Unlimited',
        city: 'Los Angeles',
        planLiveStartTime: '2023-12-02T09:00:00Z',
        planLiveEndTime: '2024-03-02T17:00:00Z',
        subscriptionAmtDistribution: '70-30',
        planId: 'P002',
        purchasedBy: 'User003',
        purchasedByRolesId: 'R002',
        driverId: 'D002',
        vehicleId: 'V002',
        planStatus: 'Pending Activation',
        subscriptionStartDate: '2023-12-02T00:00:00Z',
        subscriptionEndDate: '2024-03-02T00:00:00Z',
        couponHistoryId: 'C002',
        walletHistoryId: 'W002',
        transactionHistoryId: 'T002',
        paymentType: 'PayPal',
        transactionStatus: 'Pending',

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
        id: '3',
        subHistoryId: 'SH003',
        amount: '100',
        paymentStatus: 'Failed',
        fk_serviceCity: 'San Francisco',
        approvedBy: 'Supervisor',
        approvedAt: '2023-12-03T12:00:00Z',
        createdBy: 'User005',
        createdAt: '2023-12-03T12:15:00Z',
        updatedBy: 'User006',
        updatedAt: '2023-12-03T12:30:00Z',
        planName: 'Standard Plan',
        planDetails: 'Includes moderate features',
        planDuration: '1 year',
        planAmount: '1200',
        planDescription: 'Mid-level subscription',
        planDistance: 'Limited',
        city: 'San Francisco',
        planLiveStartTime: '2023-12-03T10:00:00Z',
        planLiveEndTime: '2024-12-03T18:00:00Z',
        subscriptionAmtDistribution: '60-40',
        planId: 'P003',
        purchasedBy: 'User005',
        purchasedByRolesId: 'R003',
        driverId: 'D003',
        vehicleId: 'V003',
        planStatus: 'Inactive',
        subscriptionStartDate: '2023-12-03T00:00:00Z',
        subscriptionEndDate: '2024-12-03T00:00:00Z',
        couponHistoryId: 'C003',
        walletHistoryId: 'W003',
        transactionHistoryId: 'T003',
        paymentType: 'Bank Transfer',
        transactionStatus: 'Failed',

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
];

interface InvoiceViewPage {
    tabs: boolean;
}

const ViewSubscriptionInvoice: React.FC<InvoiceViewPage> = ({ tabs }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    // for adjust the date
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    const [ChannelPartnerData, setChannelPartnerData] = useState<SubscriptionInvoiceData[]>(staticSubscriptionInvoiceData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SubscriptionInvoiceData[]>([]);
    const [recordsData, setRecordsData] = useState<SubscriptionInvoiceData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<SubscriptionInvoiceData[]>([]);
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
        dispatch(setPageTitle('View Subscription Invoice'));

        const fetchChannelPartnerData = async () => {
            try {
                const { data } = await getChannelPartnerData();
                if (data?.ChannelPartners) {
                    const staticSubscriptionInvoiceData = data.ChannelPartners.map(({ _id }: { _id: string }, ...rest: any) => ({
                        id: _id,
                        ...rest,
                    }));
                    setChannelPartnerData(staticSubscriptionInvoiceData);
                }
            } catch (error: any) {
                console.error('Error fetching subscription invoice data:', error.message);
            }
        };
        fetchChannelPartnerData();
    }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof SubscriptionInvoiceData;
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
                subHistoryId = '',
                amount = '',
                paymentStatus = '',
                fk_serviceCity = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                planName = '',
                planDetails = '',
                planDuration = '',
                planAmount = '',
                planDescription = '',
                planDistance = '',
                city = '',
                planLiveStartTime = '',
                planLiveEndTime = '',
                subscriptionAmtDistribution = '',
                planId = '',
                purchasedBy = '',
                purchasedByRolesId = '',
                driverId = '',
                vehicleId = '',
                planStatus = '',
                subscriptionStartDate = '',
                subscriptionEndDate = '',
                couponHistoryId = '',
                walletHistoryId = '',
                transactionHistoryId = '',
                paymentType = '',
                transactionStatus = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                subHistoryId?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                paymentStatus?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                planName?.toLowerCase().includes(searchString) ||
                planDetails?.toLowerCase().includes(searchString) ||
                planDuration?.toLowerCase().includes(searchString) ||
                planAmount?.toLowerCase().includes(searchString) ||
                planDescription?.toLowerCase().includes(searchString) ||
                planDistance?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                planLiveStartTime?.toLowerCase().includes(searchString) ||
                planLiveEndTime?.toLowerCase().includes(searchString) ||
                subscriptionAmtDistribution?.toLowerCase().includes(searchString) ||
                planId?.toLowerCase().includes(searchString) ||
                purchasedBy?.toLowerCase().includes(searchString) ||
                purchasedByRolesId?.toLowerCase().includes(searchString) ||
                driverId?.toLowerCase().includes(searchString) ||
                vehicleId?.toLowerCase().includes(searchString) ||
                planStatus?.toLowerCase().includes(searchString) ||
                subscriptionStartDate?.toLowerCase().includes(searchString) ||
                subscriptionEndDate?.toLowerCase().includes(searchString) ||
                couponHistoryId?.toLowerCase().includes(searchString) ||
                walletHistoryId?.toLowerCase().includes(searchString) ||
                transactionHistoryId?.toLowerCase().includes(searchString) ||
                paymentType?.toLowerCase().includes(searchString) ||
                transactionStatus?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<SubscriptionInvoiceData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData?.id) {
                                    const viewUrl = `/SubscriptionModule/SubscriptionInvoice/ViewSpecificSubscriptionInvoice/${rowData.id}`;
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
        { accessor: 'subHistoryId', title: 'Sub History Id', sortable: true, hidden: hiddenColumns.includes('subHistoryId') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'paymentStatus', title: 'Payment Status', sortable: true, hidden: hiddenColumns.includes('paymentStatus') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        { accessor: 'planName', title: 'Plan Name', sortable: true, hidden: hiddenColumns.includes('planName') },
        { accessor: 'planDetails', title: 'Plan Details', sortable: true, hidden: hiddenColumns.includes('planDetails') },
        { accessor: 'planDuration', title: 'Plan Duration', sortable: true, hidden: hiddenColumns.includes('planDuration') },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true, hidden: hiddenColumns.includes('planAmount') },
        { accessor: 'planDescription', title: 'Plan Description', sortable: true, hidden: hiddenColumns.includes('planDescription') },
        { accessor: 'planDistance', title: 'Plan Distance', sortable: true, hidden: hiddenColumns.includes('planDistance') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'planLiveStartTime', title: 'Plan Live Start Time', sortable: true, hidden: hiddenColumns.includes('planLiveStartTime') },
        { accessor: 'planLiveEndTime', title: 'Plan Live End Time', sortable: true, hidden: hiddenColumns.includes('planLiveEndTime') },
        { accessor: 'subscriptionAmtDistribution', title: 'Subscription Amount Distribution', sortable: true, hidden: hiddenColumns.includes('subscriptionAmtDistribution') },
        { accessor: 'planId', title: 'Plan ID', sortable: true, hidden: hiddenColumns.includes('planId') },
        { accessor: 'purchasedBy', title: 'Purchased By', sortable: true, hidden: hiddenColumns.includes('purchasedBy') },
        { accessor: 'purchasedByRolesId', title: 'Purchased By Roles ID', sortable: true, hidden: hiddenColumns.includes('purchasedByRolesId') },
        { accessor: 'driverId', title: 'Driver ID', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'vehicleId', title: 'Vehicle ID', sortable: true, hidden: hiddenColumns.includes('vehicleId') },
        { accessor: 'planStatus', title: 'Plan Status', sortable: true, hidden: hiddenColumns.includes('planStatus') },
        { accessor: 'subscriptionStartDate', title: 'Subscription Start Date', sortable: true, hidden: hiddenColumns.includes('subscriptionStartDate') },
        { accessor: 'subscriptionEndDate', title: 'Subscription End Date', sortable: true, hidden: hiddenColumns.includes('subscriptionEndDate') },
        { accessor: 'couponHistoryId', title: 'Coupon History ID', sortable: true, hidden: hiddenColumns.includes('couponHistoryId') },
        { accessor: 'walletHistoryId', title: 'Wallet History ID', sortable: true, hidden: hiddenColumns.includes('walletHistoryId') },
        { accessor: 'transactionHistoryId', title: 'Transaction History ID', sortable: true, hidden: hiddenColumns.includes('transactionHistoryId') },
        { accessor: 'paymentType', title: 'Payment Type', sortable: true, hidden: hiddenColumns.includes('paymentType') },
        { accessor: 'transactionStatus', title: 'Transaction Status', sortable: true, hidden: hiddenColumns.includes('transactionStatus') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: SubscriptionInvoiceData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: SubscriptionInvoiceData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/SubscriptionModule/SubscriptionInvoice/ViewSpecificSubscriptionInvoice/1`);
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Subscription Invoice',
            to: '/SubscriptionModule/SubscriptionInvoice/ViewSubscriptionInvoice',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/SubscriptionInvoice/ViewSubscriptionInvoice' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleSelectExport = (selectedOption: string) => {
        if (selectedOption === 'export' && selectedRecords.length >= 1) {
            const confirmExport = window.confirm('Do you really want Export?');
            if (confirmExport) {
                // Create a new instance of jsPDF
                const pdf = new jsPDF();

                // Set font properties
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(12);

                // Set up the content for the PDF as a table
                const tableData = selectedRecords.map((record, index) => [
                    index + 1,
                    record.amount,
                    record.paymentStatus,
                    record.fk_serviceCity,
                    record.approvedBy,
                    record.createdBy,
                    record.updatedBy,
                ]);

                const tableColumns = [
                    { header: 'No.', dataKey: 'no' },
                    { header: 'Amount', dataKey: 'amount' },
                    { header: 'Payment Status', dataKey: 'paymentStatus' },
                    { header: 'Service City', dataKey: 'fk_serviceCity' },
                    { header: 'Approved By', dataKey: 'approvedBy' },
                    { header: 'Created By', dataKey: 'createdBy' },
                    { header: 'Updated By', dataKey: 'updatedBy' },
                ];

                // Add the table to the PDF
                pdf.autoTable({
                    head: [tableColumns.map((column) => column.header)],
                    body: tableData,
                    startY: 10,
                });

                // Save the PDF as a file
                pdf.save('invoice.pdf');
            }
        } else {
            toast.error('Please Select from Table.');
        }
    };

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
                        <input type="text" className="form-input w-full sm:w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectExport(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            {/* <option value="updatearchive">Update Archive</option> */}
                            <option value="export">Export</option>
                            <option value="export">Download</option>
                            <option value="export">Share To Customer</option>
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
                        onRowClick={(row) => handleRowClick(row)}
                    />
                </div>
            </div>
        </>
    );
};

export default ViewSubscriptionInvoice;
