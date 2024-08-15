import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
// future code --->>
// import { getAdminData } from '@/services/AdminService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { staticAdminData } from './ViewAdmin';
import DateRangePicker, { DateRange } from 'rsuite/esm/DateRangePicker';

interface AdminData {
    id: string;
    fk_roleType: string;
    archive: string;
    fk_serviceCity: string;
    firstName: string;
    middleName: string; // Adding middleName property
    lastName: string;
    email: string;
    phoneNumber: string;
    status: string;
    dob: string; // Adding dob property
    createdBy: string;
    gender: string;
    altPhoneNumber: string;
    country: string;
    state: string;
    city: string;
    employeeLevel: string;
    teamAlloted: string;
    reportsTo: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
}

const PendingAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Admin'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [AdminData, setAdminData] = useState<AdminData[]>(staticAdminData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AdminData[]>([]);
    const [recordsData, setRecordsData] = useState<AdminData[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [selectedRecords, setSelectedRecords] = useState<AdminData[]>([]);
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

    // ... (existing code)

    // useEffect(() => {
    //     dispatch(setPageTitle('Pending Admin'));

    //     const fetchAdminData = async () => {
    //         try {
    //             const { data } = await getAdminData();
    //             if (data?.admins) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.admins.map(({ _id, ...rest }: { _id: string;[key: string]: any }) => ({
    //                     id: _id,
    //                     ...rest,
    //                 }));

    //                 // Filter data to show only entries with status 'PENDING'
    //                 const pendingAdmins = newData.filter((admin: { archive: string; }) => admin.archive === 'PENDING');

    //                 setAdminData(pendingAdmins);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };

    //     fetchAdminData();
    // }, [dispatch]);

    // ... (remaining code)

    useEffect(() => {
        if (AdminData.length > 0) {
            const sortedData = AdminData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AdminData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [AdminData, sortStatus, pageSize]);

    // handle date sort
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                fk_roleType = '',
                archive = '',
                fk_serviceCity = '',
                firstName = '',
                middleName = '', // Adding middleName property
                lastName = '',
                email = '',
                phoneNumber = '',
                dob = '', // Adding dob property
                createdBy = '',
                gender = '',
                altPhoneNumber = '',
                country = '',
                state = '',
                city = '',
                employeeLevel = '',
                teamAlloted = '',
                reportsTo = '',
                approvedAt = '',
                approvedBy = '',
                createdAt = '',
                updatedAt = '',
                updatedBy = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase
            const createdAtTimestamp = new Date(item.createdAt).getTime();

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_roleType?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                phoneNumber?.toLowerCase().includes(searchString) ||
                employeeLevel?.toLowerCase().includes(searchString) ||
                teamAlloted?.toLowerCase().includes(searchString) ||
                reportsTo?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                dob?.toLowerCase().includes(searchString) || // Including dob in search
                gender?.toLowerCase().includes(searchString) || // Including dob in search
                altPhoneNumber?.toLowerCase().includes(searchString) || // Including gender in search
                country?.toLowerCase().includes(searchString) || // Including gender in search
                state?.toLowerCase().includes(searchString) || // Including gender in search
                city?.toLowerCase().includes(searchString) || // Including gender in search
                (selectedDate && createdAtTimestamp === selectedDate.getTime())
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize, selectedDate]);

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

    const columns: DataTableColumn<AdminData>[] = [
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
                                    const editUrl = `/AdminModule/Admin/EditAdmin/${rowData.id}`;
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
                                    const viewUrl = `/AdminModule/Admin/ViewSpecificAdmin/${rowData.id}`;
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
        { accessor: 'fk_roleType', title: 'Role type', sortable: true, hidden: hiddenColumns.includes('fk_roleType') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'fk_serviceCity', title: 'Service city', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'firstName', title: 'First name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'phoneNumber', title: 'Phone number', sortable: true, hidden: hiddenColumns.includes('phoneNumber') },
        { accessor: 'dob', title: 'Date of Birth', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'createdBy', title: 'Created by', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'fk_reportsTo', title: 'Reporting Manager', sortable: true, hidden: hiddenColumns.includes('fk_reportsTo') },
        { accessor: 'fk_adminTeam', title: 'Admin Team', sortable: true, hidden: hiddenColumns.includes('fk_adminTeam') },
        { accessor: 'role', title: 'Team Role', sortable: true, hidden: hiddenColumns.includes('role') },
        { accessor: 'fk_teamManager', title: 'Admin Team Manager', sortable: true, hidden: hiddenColumns.includes('fk_teamManager') },
        { accessor: 'altPhoneNumber', title: 'Alternate Phone Number', sortable: true, hidden: hiddenColumns.includes('altPhoneNumber') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'employeeLevel', title: 'Employee Level', sortable: true, hidden: hiddenColumns.includes('employeeLevel') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: AdminData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: AdminData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/Admin/ViewSpecificAdmin/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/Admin/EditAdmin/${selectedRecords[0].id}`;
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

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Admin/PendingAdmin' ? 'text-blue-600' : ''
                    }`}
                >
                    Pending Admin
                </li>
            </ol>

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
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
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
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
                        totalRecords={AdminData.length}
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

export default PendingAdmin;
