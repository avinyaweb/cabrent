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
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface ServiceCityData {
    id: string;
    country: string;
    state: string;
    city: string;
    dailyReqRadius: string;
    rentalReqRadius: string;
    outstationReqRadius: string;
    cityCentreLat: string;
    cityCentreLong: string;
    cityBoundary: string;
    archive: string;
}

// Define static data
export const staticServiceCityData: ServiceCityData[] = [
    {
        id: '1',
        country: 'India',
        state: 'Jharkhand',
        city: 'Jamshedpur',
        dailyReqRadius: '10',
        rentalReqRadius: '8',
        outstationReqRadius: '12',
        cityCentreLat: '20',
        cityCentreLong: '12',
        cityBoundary: '200',
        archive: 'PENDING',
    },
    {
        id: '2',
        country: 'India',
        state: 'Karnataka',
        city: 'Bengaluru',
        dailyReqRadius: '10',
        rentalReqRadius: '8',
        outstationReqRadius: '12',
        cityCentreLat: '20',
        cityCentreLong: '12',
        cityBoundary: '200',
        archive: 'APPROVED',
    },
    {
        id: '3',
        country: 'India',
        state: 'Sikkim',
        city: 'Gangtok',
        dailyReqRadius: '10',
        rentalReqRadius: '8',
        outstationReqRadius: '12',
        cityCentreLat: '20',
        cityCentreLong: '12',
        cityBoundary: '200',
        archive: 'PENDING',
    },
];

const ViewServiceCity = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Service City'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [serviceCityData, setServiceCityData] = useState<ServiceCityData[]>(staticServiceCityData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ServiceCityData[]>([]);
    const [recordsData, setRecordsData] = useState<ServiceCityData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<ServiceCityData[]>([]);
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

    // handle date sort
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View Admin Teams'));

    //     const fetchAdminTeamsData = async () => {
    //         try {
    //             const { data } = await getAllServiceCityData();
    //             if (data?.SeriviceCities) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.SeriviceCities.map(({
    //                     _id: id,
    //                     ...rest
    //                 }) => ({
    //                     id,
    //                     ...rest
    //                 }))
    //                 setServiceCityData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminTeamsData();
    // }, [dispatch]);

    useEffect(() => {
        if (serviceCityData.length > 0) {
            const sortedData = serviceCityData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ServiceCityData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [serviceCityData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                country = '',
                state = '',
                city = '',
                dailyReqRadius = '',
                rentalReqRadius = '',
                outstationReqRadius = '',
                cityCentreLat = '',
                cityCentreLong = '',
                cityBoundary = '',
                archive = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                country?.toLowerCase().includes(searchString) ||
                state?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                dailyReqRadius?.toLowerCase().includes(searchString) ||
                rentalReqRadius?.toLowerCase().includes(searchString) ||
                outstationReqRadius?.toLowerCase().includes(searchString) ||
                cityCentreLat?.toLowerCase().includes(searchString) ||
                cityCentreLong?.toLowerCase().includes(searchString) ||
                cityBoundary?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<ServiceCityData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/TripModule/TripSettings/ServiceCity/EditServiceCity/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy>
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/TripModule/TripSettings/ServiceCity/ViewSpecificServiceCity/${rowData.id}`;
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
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'dailyReqRadius', title: 'Daily Req Radius', sortable: true, hidden: hiddenColumns.includes('dailyReqRadius') },
        { accessor: 'rentalReqRadius', title: 'Rental Req Radius', sortable: true, hidden: hiddenColumns.includes('rentalReqRadius') },
        { accessor: 'outstationReqRadius', title: 'Outstation Req Radius', sortable: true, hidden: hiddenColumns.includes('outstationReqRadius') },
        { accessor: 'cityCentreLat', title: 'City Centre Lat', sortable: true, hidden: hiddenColumns.includes('cityCentreLat') },
        { accessor: 'cityCentreLong', title: 'City Centre Long', sortable: true, hidden: hiddenColumns.includes('cityCentreLong') },
        { accessor: 'cityBoundary', title: 'City Boundary', sortable: true, hidden: hiddenColumns.includes('cityBoundary') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
    ];

    const sortedData = recordsData;

    const handleRowClick = (row: ServiceCityData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: ServiceCityData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/AdminTeams/ViewSpecificAdminTeams/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/AdminTeams/EditAdminTeams/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete') {
            const confirmDelete = window.confirm('Do you really want to suspend this Service City?');
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
            label: 'Service City',
            to: '/UtilityModule/ServiceCity/ViewServiceCity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/ServiceCity/ViewServiceCity' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TripModule/TripSettings/ServiceCity/CreateServiceCity" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Service City
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
                        <input type="text" className="form-input w-full sm:w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={serviceCityData.length}
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

export default ViewServiceCity;
