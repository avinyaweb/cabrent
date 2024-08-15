import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
// import { getAllStateData } from '@/services/UtilityServices/StateService';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { downloadExcel } from '@/utils/Excel';

interface StateData {
    id: string;
    TripNo: string;
    Driver: string;
    Code: string;
    TripDate: string;
    GrassTotal: string;
    RoundOff: string;
    TotalFare: number;
    LeadCharge: number;
    PlatformFees: number;
    CompanyCommission: number;
    PromoAmount: number;
    GatewayCharge: number;
    DriverEarned: number;
    GST: string;
    DeductedFare: string;
    RideStatus: string;
    PaymentMethod: string;
}

// Define static data
const staticData: StateData[] = [
    {
        id: '1',
        TripNo: 'ABC123',
        Driver: 'John Doe',
        Code: '12345',
        TripDate: '2022-12-31',
        GrassTotal: '1000',
        RoundOff: '10',
        TotalFare: 1010,
        LeadCharge: 50,
        PlatformFees: 20,
        CompanyCommission: 100,
        PromoAmount: 0,
        GatewayCharge: 5,
        DriverEarned: 835,
        GST: '18%',
        DeductedFare: '50',
        RideStatus: 'Completed',
        PaymentMethod: 'Credit Card',
    },
    {
        id: '2',
        TripNo: 'XYZ789',
        Driver: 'Jane Smith',
        Code: '54321',
        TripDate: '2023-01-15',
        GrassTotal: '800',
        RoundOff: '5',
        TotalFare: 805,
        LeadCharge: 40,
        PlatformFees: 15,
        CompanyCommission: 80,
        PromoAmount: 10,
        GatewayCharge: 3,
        DriverEarned: 657,
        GST: '15%',
        DeductedFare: '40',
        RideStatus: 'Cancelled',
        PaymentMethod: 'PayPal',
    },
];

const ViewTripPayments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View State'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [allStateData, setAllStateData] = useState<StateData[]>(staticData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<StateData[]>([]);
    const [recordsData, setRecordsData] = useState<StateData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<StateData[]>([]);
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
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View All States'));

    //     const fetchAdminStatesData = async () => {
    //         try {
    //             const { data } = await getAllStateData();
    //             if (data?.States) {
    //                 const newData = data.States.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setAllStateData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminStatesData();
    // }, [dispatch]);

    useEffect(() => {
        if (allStateData.length > 0) {
            const sortedData = allStateData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof StateData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [allStateData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', TripNo = '', Driver = '', Code = '', TripDate = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                TripNo?.toLowerCase().includes(searchString) ||
                Driver?.toLowerCase().includes(searchString) ||
                Code?.toLowerCase().includes(searchString) ||
                TripDate?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<StateData>[] = [
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
                                    const viewUrl = `/ReportsModule/TripPayments/ViewSpecificTripPayments/${rowData.id}`;
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
        { accessor: 'TripNo', title: 'Trip Number', sortable: true, hidden: hiddenColumns.includes('TripNo') },
        { accessor: 'Driver', title: 'Driver', sortable: true, hidden: hiddenColumns.includes('Driver') },
        { accessor: 'Code', title: 'Code', sortable: true, hidden: hiddenColumns.includes('Code') },
        { accessor: 'TripDate', title: 'Trip Date', sortable: true, hidden: hiddenColumns.includes('TripDate') },
        { accessor: 'GrassTotal', title: 'Grass Total', sortable: true, hidden: hiddenColumns.includes('GrassTotal') },
        { accessor: 'RoundOff', title: 'Round Off', sortable: true, hidden: hiddenColumns.includes('RoundOff') },
        { accessor: 'TotalFare', title: 'Total Fare', sortable: true, hidden: hiddenColumns.includes('TotalFare') },
        { accessor: 'LeadCharge', title: 'Lead Charge', sortable: true, hidden: hiddenColumns.includes('LeadCharge') },
        { accessor: 'PlatformFees', title: 'Platform Fees', sortable: true, hidden: hiddenColumns.includes('PlatformFees') },
        { accessor: 'CompanyCommission', title: 'Company Commission', sortable: true, hidden: hiddenColumns.includes('CompanyCommission') },
        { accessor: 'PromoAmount', title: 'Promo Amount', sortable: true, hidden: hiddenColumns.includes('PromoAmount') },
        { accessor: 'GatewayCharge', title: 'Gateway Charge', sortable: true, hidden: hiddenColumns.includes('GatewayCharge') },
        { accessor: 'DriverEarned', title: 'Driver Earned', sortable: true, hidden: hiddenColumns.includes('DriverEarned') },
        { accessor: 'GST', title: 'GST', sortable: true, hidden: hiddenColumns.includes('GST') },
        { accessor: 'DeductedFare', title: 'Deducted Fare', sortable: true, hidden: hiddenColumns.includes('DeductedFare') },
        { accessor: 'RideStatus', title: 'Ride Status', sortable: true, hidden: hiddenColumns.includes('RideStatus') },
        { accessor: 'PaymentMethod', title: 'Payment Method', sortable: true, hidden: hiddenColumns.includes('PaymentMethod') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: StateData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: StateData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/UtilityModule/State/ViewSpecificState/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `UtilityModule/State/EditState/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'viewApp offered Money History');
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
            label: 'Trip payment',
            to: 'ReportsModule/TripPayments/ViewTripPayments',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === 'ReportsModule/TripPayments/ViewTripPayments' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <div className="dropdown">
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
                            <option value="export">Export</option>
                        </select>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full sm:w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={allStateData.length}
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

export default ViewTripPayments;
