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
import { getAllState, getAllCountry } from '@/services/RolesService';

interface CityData {
    id: string;
    fk_stateOrProvince: string;
    cityName: string;
    archive: string;
    fk_country: string;
}

const staticCityData: CityData[] = [
    {
        id: '1',
        fk_stateOrProvince: 'Maharashtra', // Assuming 'Maharashtra' is the state or province
        cityName: 'Mumbai',
        archive: 'ACTIVE',
        fk_country: 'India', // Assuming 'India' is the country
    },
    {
        id: '2',
        fk_stateOrProvince: 'Maharashtra', // Assuming 'Maharashtra' is the state or province
        cityName: 'Pune',
        archive: 'ACTIVE',
        fk_country: 'India', // Assuming 'India' is the country
    },
    {
        id: '3',
        fk_stateOrProvince: 'California', // Assuming 'California' is the state or province
        cityName: 'Los Angeles',
        archive: 'ACTIVE',
        fk_country: 'USA', // Assuming 'USA' is the country
    },
    // Add more dummy data as needed
];

const ViewCity = (onInputChange: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View City'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [cityData, setCityData] = useState<CityData[]>(staticCityData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<CityData[]>([]);
    const [recordsData, setRecordsData] = useState<CityData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<CityData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [stateOption, setStateOption] = useState<any[]>([]);
    const [countryOption, setCountryOption] = useState<any[]>([]);

    // handle states
    const handleState = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setState(value);
        onInputChange({
            target: {
                name: 'fk_stateOrProvince',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    useEffect(() => {
        const getAllStateData = async () => {
            try {
                const data = await getAllState();
                setStateOption(data?.data?.States);
            } catch (error) {
                console.log(error);
            }
        };
        getAllStateData();
    }, []);

    // handle country
    const handleCountryfk_country = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCountry(value);
        onInputChange({
            target: {
                name: 'fk_country',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    useEffect(() => {
        const getAllCountryData = async () => {
            try {
                const data = await getAllCountry();
                setCountryOption(data?.data?.Countries);
            } catch (error) {
                console.log(error);
            }
        };
        getAllCountryData();
    }, []);

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
    //     dispatch(setPageTitle('View City'));

    //     const fetchAdminCityData = async () => {
    //         try {
    //             const { data } = await getAllCityData();
    //             if (data?.Cities) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.Cities.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setCityData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminCityData();
    // }, [dispatch]);

    useEffect(() => {
        if (cityData.length > 0) {
            const sortedData = cityData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof CityData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [cityData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', fk_stateOrProvince = '', cityName = '', archive = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_stateOrProvince?.toLowerCase().includes(searchString) ||
                cityName?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // City to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };
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

    const columns: DataTableColumn<CityData>[] = [
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
                                    const editUrl = `/UtilityModule/City/EditCity/${rowData.id}`;
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
                                    const viewUrl = `/UtilityModule/City/ViewSpecificCity/${rowData.id}`;
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
        { accessor: 'fk_stateOrProvince', title: 'State Name', sortable: true, hidden: hiddenColumns.includes('fk_stateOrProvince') },
        { accessor: 'cityName', title: 'City Name', sortable: true, hidden: hiddenColumns.includes('cityName') },
        { accessor: 'archive', title: 'Status (Archive)', sortable: true, hidden: hiddenColumns.includes('archive') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: CityData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: CityData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/UtilityModule/City/ViewSpecificCity/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `UtilityModule/City/EditCity/${selectedRecords[0].id}`;
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
            label: 'City',
            to: '/UtilityModule/City/ViewCity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/City/ViewCity' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/UtilityModule/City/CreateCity" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create City
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
                        totalRecords={cityData.length}
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

                <div className="flex flex-row gap-5 mt-4">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="fk_country" name="fk_country" className="form-select text-white-dark" required onChange={handleCountryfk_country}>
                            <option value="">Select Country</option>
                            {countryOption?.map((data) => {
                                return <option value={data?._id}>{data?.countryName}</option>;
                            })}
                        </select>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="fk_stateOrProvince" name="fk_stateOrProvince" className="form-select text-white-dark" required onChange={handleState}>
                            <option value="">Select State</option>
                            {stateOption?.map((data) => {
                                return <option value={data?._id}>{data?.stateName}</option>;
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCity;