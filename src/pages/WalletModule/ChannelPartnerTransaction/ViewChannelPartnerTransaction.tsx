import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
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

interface ChannelPartnerTransactionData {
    id: string;
    amount: string;
    fk_userid: string;
    transactionMode: string;
    status: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    purposeOfTransaction: string;
    creditAndDebit: string;
    paymentModule: string;
    paymentStatus: string;
    coupon: string;
    thirdParty: string;
}

export const staticChannelPartnerTransactionData = [
    {
        id: '1',
        amount: '100.00',
        fk_userid: 'user123',
        transactionMode: 'QR',
        status: 'PENDING',
        approvedBy: 'AdminXYZ',
        approvedAt: '2024-01-06T12:00:00Z',
        createdBy: 'Admin123',
        createdAt: '2024-01-05T09:30:00Z',
        updatedBy: 'Admin123',
        updatedAt: '2024-01-06T13:45:00Z',
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

        purposeOfTransaction: 'Purchase subscription',
        creditAndDebit: 'true',
        paymentModule: 'PayPal',
        paymentStatus: 'Failed',
        coupon: 'DISCOUNT10',
        thirdParty: 'Channel partner',
    },
    {
        id: '2',
        amount: '250.50',
        fk_userid: 'user456',
        transactionMode: 'LINK',
        status: 'HOLD',
        approvedBy: 'AdminABC',
        approvedAt: '2024-01-07T10:15:00Z',
        createdBy: 'Admin456',
        createdAt: '2024-01-06T14:00:00Z',
        updatedBy: 'Admin456',
        updatedAt: '2024-01-07T11:30:00Z',
        purposeOfTransaction: 'Purchase subscription',
        creditAndDebit: 'true',
        paymentModule: 'gpay',
        paymentStatus: 'Sucscess',
        coupon: 'DISCOUNT10',
        thirdParty: 'distributor',
    },
];

interface ViewChannelPartnerTransactionProps {
    tabs: any; // Adjust the type of tabs according to your requirements
    // Add other props if needed
}

const ViewChannelPartnerTransaction: React.FC<ViewChannelPartnerTransactionProps> = ({ tabs }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal3, setmodal3] = useState(false);
    const [ChannelPartnerTransactionData, setChannelPartnerTransactionData] = useState<ChannelPartnerTransactionData[]>(staticChannelPartnerTransactionData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ChannelPartnerTransactionData[]>([]);
    const [recordsData, setRecordsData] = useState<ChannelPartnerTransactionData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<ChannelPartnerTransactionData[]>([]);
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
    //   dispatch(setPageTitle('View PG Transactions'));

    //   const fetchChannelPartnerTransactionData = async () => {
    //     try {
    //       const { data } = await getChannelPartnerTransactionData();
    //       if (data?.ChannelPartners) {
    //         // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //         const newData = data.ChannelPartners.map(({
    //           _id: id,
    //           ...rest
    //         }) => ({
    //           id,
    //           ...rest
    //         }))
    //         //setChannelPartnerTransactionData(newData);
    //         setChannelPartnerTransactionData(staticChannelPartnerTransactionData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching pg transactions data:', error.message);
    //     }
    //   };
    //   fetchChannelPartnerTransactionData();
    // }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerTransactionData.length > 0) {
            const sortedData = ChannelPartnerTransactionData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ChannelPartnerTransactionData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ChannelPartnerTransactionData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                amount = '',
                fk_userid = '',
                transactionMode = '',
                status = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                purposeOfTransaction = '',
                creditAndDebit = ' ',
                paymentModule = '',
                paymentStatus = '',
                coupon = '',
                thirdParty = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                fk_userid?.toLowerCase().includes(searchString) ||
                transactionMode?.toLowerCase().includes(searchString) ||
                status?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                purposeOfTransaction.toLowerCase().includes(searchString) ||
                creditAndDebit.toLowerCase().includes(searchString) ||
                paymentModule.toLowerCase().includes(searchString) ||
                paymentStatus.toLowerCase().includes(searchString) ||
                coupon.toLowerCase().includes(searchString) ||
                thirdParty.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<ChannelPartnerTransactionData>[] = [
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
                                if (rowData && rowData.id) {
                                    const viewUrl = `/WalletModule/ChannelPartnerTransaction/ViewSpecificChannelPartnerTransaction/1`;
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
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'fk_userid', title: 'User Name', sortable: true, hidden: hiddenColumns.includes('fk_userid') },
        { accessor: 'transactionMode', title: 'Transaction Mode', sortable: true, hidden: hiddenColumns.includes('transactionMode') },
        { accessor: 'status', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        { accessor: 'purposeOfTransaction', title: 'Purpose Of Transaction', sortable: true, hidden: hiddenColumns.includes('purposeOfTransaction') },
        { accessor: 'creditAndDebit', title: 'Credit', sortable: true, hidden: hiddenColumns.includes('creditAndDebit') },

        { accessor: 'paymentModule', title: 'Payment Module', sortable: true, hidden: hiddenColumns.includes('paymentModule') },
        { accessor: 'paymentStatus', title: 'Payment Status', sortable: true, hidden: hiddenColumns.includes('paymentStatus') },
        { accessor: 'coupon', title: 'Coupon', sortable: true, hidden: hiddenColumns.includes('coupon') },
        { accessor: 'thirdParty', title: 'Third Party', sortable: true, hidden: hiddenColumns.includes('thirdParty') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: ChannelPartnerTransactionData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: ChannelPartnerTransactionData[] = [];

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
            const editUrl = `/TransactionModule/TripTransaction/EditTripTransaction/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete') {
            const confirmDelete = window.confirm('Do you really want to delete this ticket?');
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'PG Transaction');
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
            label: 'ChannelPartner Transaction',
            to: '/TransactionModule/TripTransaction/ViewChannelPartnerTransaction',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TransactionModule/TripTransaction/ViewChannelPartnerTransaction' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TransactionModule/TripTransaction/CreateTripTransaction" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create PG Transactions
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
                        totalRecords={ChannelPartnerTransactionData.length}
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

export default ViewChannelPartnerTransaction;
