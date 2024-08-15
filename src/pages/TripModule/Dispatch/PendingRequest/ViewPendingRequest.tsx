import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface TripsData {
    id: string;
    tripType: string;
    tripNo: string;
    date: string;
    riderId: string;
    fare: string;
    vehicleType: string;
    tripStatus: string;
    via: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticTripsData = [
    {
        id: '1',
        tripType: 'Daily',
        tripNo: 'TRP002',
        date: '2024-05-15',
        driverId: 'DRV002',
        riderId: 'RD002',
        fare: '65.00',
        vehicleType: 'SUV',
        tripStatus: 'Cancelled',
        via: 'Cash',
        archive: 'No',
        approvedBy: 'Admin002',
        approvedAt: '2024-05-16T09:45:00',
        createdBy: 'User002',
        createdAt: '2024-05-15T11:30:00',
        updatedBy: 'User003',
        updatedAt: '2024-05-15T13:45:00',
    },
    {
        id: '2',
        tripType: 'Daily',
        tripNo: 'TRP003',
        date: '2024-05-16',
        driverId: 'DRV003',
        riderId: 'RD003',
        fare: '40.00',
        vehicleType: 'Hatchback',
        tripStatus: 'Completed',
        via: 'Cash',
        archive: 'No',
        approvedBy: 'Admin003',
        approvedAt: '2024-05-17T10:15:00',
        createdBy: 'User003',
        createdAt: '2024-05-16T09:00:00',
        updatedBy: 'User001',
        updatedAt: '2024-05-16T11:20:00',
    },
    {
        id: '3',
        tripType: 'Out Station',
        tripNo: 'TRP004',
        date: '2024-05-17',
        driverId: 'DRV004',
        riderId: 'RD004',
        fare: '25.00',
        vehicleType: 'Sedan',
        tripStatus: 'Pending',
        via: 'UPI',
        archive: 'No',
        approvedBy: 'Admin004',
        approvedAt: '2024-05-18T08:00:00',
        createdBy: 'User004',
        createdAt: '2024-05-17T07:45:00',
        updatedBy: 'User002',
        updatedAt: '2024-05-17T09:30:00',
    },
];

const ViewPendingRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [PastTripsData, setPastTripsData] = useState<TripsData[]>(staticTripsData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<TripsData[]>([]);
    const [recordsData, setRecordsData] = useState<TripsData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<TripsData[]>([]);
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
        dispatch(setPageTitle('View Trips'));
        // future code --->>>
        // const fetchPastTripsData = async () => {
        //     try {
        //         const { data } = await getPastTripsData();
        //         if (data?.PastTripss) {
        //             // pk-note: ask backend developer to change the accessor _id:id, remove the following later
        //             const newData = data.PastTripss.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
        //                 id,
        //                 ...rest,
        //             }));
        //             //setPastTripsData(newData);
        //             setPastTripsData(staticTripsData);
        //         }
        //     } catch (error: any) {
        //         console.error('Error fetching Trips data:', error.message);
        //     }
        // };
        // fetchPastTripsData();
    }, [dispatch]);

    useEffect(() => {
        if (PastTripsData.length > 0) {
            const sortedData = PastTripsData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof TripsData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [PastTripsData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                tripType = '',
                tripNo = '',
                date = '',
                riderId = '',
                fare = '',
                vehicleType = '',
                tripStatus = '',
                via = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                tripStatus?.toLowerCase().includes(searchString) ||
                tripType?.toLowerCase().includes(searchString) ||
                tripNo?.toLowerCase().includes(searchString) ||
                date?.toLowerCase().includes(searchString) ||
                riderId?.toLowerCase().includes(searchString) ||
                fare?.toLowerCase().includes(searchString) ||
                vehicleType?.toLowerCase().includes(searchString) ||
                tripStatus?.toLowerCase().includes(searchString) ||
                via?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<TripsData>[] = [
        // {
        //     accessor: 'actions',
        //     title: 'Actions',
        //     // eslint-disable-next-line react/display-name
        //     render: (rowData) => (
        //         <div className="flex items-center">
        //             {/* <Tippy content="Edit">
        //                 <button
        //                     type="button"
        //                     className="mr-4"
        //                     onClick={() => {
        //                         if (rowData && rowData.id) {
        //                             const editUrl = `/TripModule/Trips/EditTrips/${rowData.id}`;
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
        //                         if (rowData && rowData.id) {
        //                             const viewUrl = `/TripModule/Trips/ViewSpecificTrips/${rowData.id}`;
        //                             navigate(viewUrl);
        //                         }
        //                     }}
        //                 >
        //                     <IconEye />
        //                 </button>
        //             </Tippy> */}
        //         </div>
        //     ),
        // },
        { accessor: 'id', title: 'id', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'tripType', title: 'Trip Type', sortable: true, hidden: hiddenColumns.includes('tripType') },
        { accessor: 'tripNo', title: 'Trip No', sortable: true, hidden: hiddenColumns.includes('tripNo') },
        { accessor: 'date', title: 'Date', sortable: true, hidden: hiddenColumns.includes('date') },
        { accessor: 'riderId', title: 'Dider Id', sortable: true, hidden: hiddenColumns.includes('riderId') },
        { accessor: 'fare', title: 'Fare', sortable: true, hidden: hiddenColumns.includes('fare') },
        { accessor: 'vehicleType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('vehicleType') },
        { accessor: 'tripStatus', title: 'Trip Status', sortable: true, hidden: hiddenColumns.includes('tripStatus') },
        { accessor: 'via', title: 'Via', sortable: true, hidden: hiddenColumns.includes('via') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: TripsData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: TripsData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/PastTrips/ViewSpecificPastTrips/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/TripModule/Trips/EditTrips/${selectedRecords[0].id}`;
            navigate(editUrl);
        }
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
            label: 'Pending Request',
            to: '/TripModule/Dispatch/PendingRequest/ViewPendingRequest',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/Trips/ViewTrips' ? 'text-blue-600' : ''
            }`,
        },
    ];
    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TripModule/Trips/CreateTrips" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Trips
                        </Link>
                    </div> */}

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
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="export">Export</option>
                        </select>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={PastTripsData.length}
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
        </>
    );
};

export default ViewPendingRequest;
