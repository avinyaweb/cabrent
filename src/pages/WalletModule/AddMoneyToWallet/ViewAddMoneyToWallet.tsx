import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface AddMoneyToWalletData {
    id: string;
    TransactionID: string;
    DriverName: string;
    Amount: string;
    PaymentType: string;
    Description: string;
    PaymentDate: string;
}

// Define static data
const staticAddMoneyToWalletData: AddMoneyToWalletData[] = [
    {
        id: '1',
        TransactionID: 'T12345',
        DriverName: 'John Doe',
        Amount: '50.00',
        PaymentType: 'Credit Card',
        Description: 'Add money to wallet for ride',
        PaymentDate: '2024-05-13',
    },
    {
        id: '2',
        TransactionID: 'T67890',
        DriverName: 'Jane Doe',
        Amount: '75.00',
        PaymentType: 'Debit Card',
        Description: 'Payment for completed ride',
        PaymentDate: '2024-05-12',
    },
    {
        id: '3',
        TransactionID: 'T24680',
        DriverName: 'Alice Smith',
        Amount: '60.00',
        PaymentType: 'UPI',
        Description: 'Add money for upcoming ride',
        PaymentDate: '2024-05-15',
    },
];

const ViewAddMoneyToWallet = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Wallet'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [AddMoneyToWalletData, setAddMoneyToWalletData] = useState<AddMoneyToWalletData[]>(staticAddMoneyToWalletData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AddMoneyToWalletData[]>([]);
    const [recordsData, setRecordsData] = useState<AddMoneyToWalletData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<AddMoneyToWalletData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
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

    // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View Admin Teams'));

    //     const fetchAddMoneyToWalletData = async () => {
    //         try {
    //             const { data } = await getAllCountries();
    //             if (data?.Countries) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.Countries.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setAddMoneyToWalletData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAddMoneyToWalletData();
    // }, [dispatch]);

    useEffect(() => {
        if (AddMoneyToWalletData.length > 0) {
            const sortedData = AddMoneyToWalletData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AddMoneyToWalletData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [AddMoneyToWalletData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', TransactionID = '', DriverName = '', Amount = '', PaymentType = '', Description = '', PaymentDate = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                TransactionID?.toLowerCase().includes(searchString) ||
                DriverName?.toLowerCase().includes(searchString) ||
                Amount?.toLowerCase().includes(searchString) ||
                PaymentType?.toLowerCase().includes(searchString) ||
                Description?.toLowerCase().includes(searchString) ||
                PaymentDate?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<AddMoneyToWalletData>[] = [
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
                                    const viewUrl = `/WalletModule/AddMoneyToWallet/ViewSpecificAddMoneyToWallet/1`;
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
        { accessor: 'id', title: 'id', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'TransactionID', title: 'Transaction ID', sortable: true, hidden: hiddenColumns.includes('TransactionID') },
        { accessor: 'DriverName', title: 'Driver Name', sortable: true, hidden: hiddenColumns.includes('DriverName') },
        { accessor: 'Amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('Amount') },
        { accessor: 'PaymentType', title: 'Payment Type', sortable: true, hidden: hiddenColumns.includes('PaymentType') },
        { accessor: 'Description', title: 'Description', sortable: true, hidden: hiddenColumns.includes('Description') },
        { accessor: 'PaymentDate', title: 'Payment Date', sortable: true, hidden: hiddenColumns.includes('PaymentDate') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: AddMoneyToWalletData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: AddMoneyToWalletData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(``);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = ``;
            navigate(editUrl);
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
            label: 'Add Money to Wallet ',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === 'WalletModule/AddMoneyToWallet/ViewAddMoneyToWalletPage' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/WalletModule/AddMoneyToWallet/AddMoneyToWalletPage" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Add money to Wallet
                        </Link>
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
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={AddMoneyToWalletData.length}
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
                        //onRowClick={(row) => handleRowClick(row)}
                    />
                </div>
            </div>
        </>
    );
};

export default ViewAddMoneyToWallet;
