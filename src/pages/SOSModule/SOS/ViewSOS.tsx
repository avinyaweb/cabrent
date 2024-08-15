import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface SOSData {
    id: string;
    Rider: string;
    Driver: string;
    TravelAgency: string;
    VehicleNo: string;
    Distributor: string;
    ServiceCity: string;
    Status: string;
}

// Define static data
const staticSOSData: SOSData[] = [
    {
        id: '1',
        Rider: 'Akshay',
        Driver: 'Dinesh',
        TravelAgency: 'Kiran Motors',
        VehicleNo: 'KA-51-3254',
        Distributor: 'South Indian Travels',
        ServiceCity: 'Bangalore',
        Status: 'PENDING',
    },
    {
        id: '2',
        Rider: 'Rajesh',
        Driver: 'Vijay',
        TravelAgency: 'Amar Travels',
        VehicleNo: 'MH-12-8743',
        Distributor: 'Western India Travels',
        ServiceCity: 'Pune',
        Status: 'COMPLETED',
    },
    {
        id: '3',
        Rider: 'Sneha',
        Driver: 'Rahul',
        TravelAgency: 'Ganesh Tours',
        VehicleNo: 'TN-07-6253',
        Distributor: 'Southern Travels',
        ServiceCity: 'Chennai',
        Status: 'IN PROGRESS',
    },
];

const ViewSOS = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View SOS'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [SOSData, setSOSData] = useState<SOSData[]>(staticSOSData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SOSData[]>([]);
    const [recordsData, setRecordsData] = useState<SOSData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<SOSData[]>([]);
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

    //     const fetchSOSData = async () => {
    //         try {
    //             const { data } = await getAllCountries();
    //             if (data?.Countries) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.Countries.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setSOSData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchSOSData();
    // }, [dispatch]);

    useEffect(() => {
        if (SOSData.length > 0) {
            const sortedData = SOSData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof SOSData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [SOSData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', Rider = '', Driver = '', TravelAgency = '', VehicleNo = '', Distributor = '', ServiceCity = '', Status = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                Rider?.toLowerCase().includes(Rider) ||
                Driver?.toLowerCase().includes(Driver) ||
                TravelAgency?.toLowerCase().includes(TravelAgency) ||
                VehicleNo?.toLowerCase().includes(VehicleNo) ||
                Distributor?.toLowerCase().includes(Distributor) ||
                ServiceCity?.toLowerCase().includes(ServiceCity) ||
                Status?.toLowerCase().includes(Status)
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

    const columns: DataTableColumn<SOSData>[] = [
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
                                    const editUrl = `/SOSModule/SOS/ViewSpecificSOS/${rowData.id}`;
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
                                    const viewUrl = `/SOSModule/SOS/ViewSpecificSOS/${rowData.id}`;
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
        { accessor: 'Rider', title: 'Rider', sortable: true, hidden: hiddenColumns.includes('Rider') },
        { accessor: 'Driver', title: 'Driver', sortable: true, hidden: hiddenColumns.includes('Driver') },
        { accessor: 'TravelAgency', title: 'TravelAgency', sortable: true, hidden: hiddenColumns.includes('TravelAgency') },
        { accessor: 'VehicleNo', title: 'VehicleNo', sortable: true, hidden: hiddenColumns.includes('VehicleNo') },
        { accessor: 'Distributor', title: 'Distributor', sortable: true, hidden: hiddenColumns.includes('Distributor') },
        { accessor: 'ServiceCity', title: 'ServiceCity', sortable: true, hidden: hiddenColumns.includes('ServiceCity') },
        { accessor: 'Status', title: 'Status', sortable: true, hidden: hiddenColumns.includes('Status') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: SOSData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: SOSData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/SOSModule/SOS/ViewSpecificSOS/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/SOSModule/SOS/ViewSpecificSOS/${selectedRecords[0].id}`;
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
            label: 'SOS',
            to: '/SOSModule/SOS/ViewSOS',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SOSModule/SOS/ViewSOS' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

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
                        totalRecords={SOSData.length}
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

export default ViewSOS;
