import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getAdminTicketsData } from '@/services/AdminTicketsService';
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
import { errorAlert, successAlert } from '@/utils/Toast';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { downloadExcel } from '@/utils/Excel';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { staticAdminData } from '../Admin/ViewAdmin';
import { staticAdminTeamData } from '../AdminTeams/ViewAdminTeams';
import Piechart from '@/components/ChartAndGraph/Piechart';
import StatusOfTickets from '@/components/ChartAndGraph/AdminTicketsReport/StatusOfTickets';
import ReportOfUsers from '@/components/ChartAndGraph/AdminTicketsReport/ReportOfUsers';

interface AdminTicketsData {
    id: string;
    ticketIdKey: string;
    ticketType: string;
    title: string;
    description: string;
    fk_raisedBy: string;
    raisedAgainst: string;
    fk_raisedAgainstType: string;
    closedAt: string;
    closedBy: string;
    status: string;
    priority: string;
    archive: string;
    remarks: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
}

export const staticTicketData = [
    {
        id: '1',
        ticketIdKey: 'TKT-001',
        ticketType: 'Incident',
        title: 'Network Outage',
        description: 'Reported network outage affecting multiple users.',
        fk_raisedBy: 'Travel Agency',
        raisedAgainst: 'Trips',
        fk_raisedAgainstType: 'Trips Department',
        adminTeamsType: 'Team A',
        closedAt: '10/04/2024',
        closedBy: 'jagri',
        status: 'Reopen',
        priority: 'High',
        archive: 'Hold',
        remarks: 'Urgent attention required.',
        approvedAt: '2024-05-15T10:00:00Z',
        approvedBy: 'hishtha',
        createdAt: '2024-05-10T09:00:00Z',
        createdBy: 'John Doe',
    },
    {
        id: '2',
        ticketIdKey: 'TKT-002',
        ticketType: 'Request',
        title: 'Software Installation',
        description: 'Requesting installation of software X on my workstation.',
        fk_raisedBy: 'Admin',
        raisedAgainst: 'Wallet',
        fk_raisedAgainstType: 'Finance',
        adminTeamsType: 'Team B',
        closedAt: '10/04/2024',
        closedBy: 'Ragu',
        status: 'Open',
        priority: 'Medium',
        archive: 'Approved',
        remarks: 'Needed for project deadline.',
        approvedAt: '2024-05-15T10:00:00Z',
        approvedBy: 'Jane Smith',
        createdAt: '2024-05-10T09:00:00Z',
        createdBy: 'John Doe',
    },
];

const staticDepartmentData = [
    { id: 1, departmentName: 'Finance', roleOfDepartment: 'Manager', fk_serviceCity: 'New York', status: 'Active' },
    { id: 2, departmentName: 'Human Resources', roleOfDepartment: 'HR Manager', fk_serviceCity: 'Los Angeles', status: 'Inactive' },
    { id: 3, departmentName: 'Marketing', roleOfDepartment: 'Marketing Executive', fk_serviceCity: 'Chicago', status: 'Active' },
    { id: 4, departmentName: 'IT', roleOfDepartment: 'IT Specialist', fk_serviceCity: 'Houston', status: 'Active' },
    { id: 5, departmentName: 'Operations', roleOfDepartment: 'Operations Manager', fk_serviceCity: 'Miami', status: 'Inactive' },
];

const ViewAdminTickets = ({ tabs_Admin, tabs_Team, tabs }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('View Admin Tickets'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [adminTicketsData, setAdminTicketsData] = useState<AdminTicketsData[]>(staticTicketData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AdminTicketsData[]>([]);
    const [recordsData, setRecordsData] = useState<AdminTicketsData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<AdminTicketsData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: '_id',
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
        dispatch(setPageTitle('Admin Tickets'));

        const fetchAdminTicketsData = async () => {
            try {
                const { data } = await getAdminTicketsData();

                if (data?.adminTickets) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.adminTickets.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
                        id,
                        ...rest,
                    }));
                    setAdminTicketsData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminTicketsData();
    }, [dispatch]);

    useEffect(() => {
        if (adminTicketsData.length > 0) {
            const sortedData = adminTicketsData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AdminTicketsData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [adminTicketsData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                ticketIdKey = '',
                title = '',
                ticketType = '',
                priority = '',
                fk_raisedBy = '',
                raisedAgainst = '',
                archive = '',
                approvedAt = '',
                approvedBy = '',
                createdAt = '',
                createdBy = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                ticketIdKey?.toLowerCase().includes(searchString) ||
                title?.toLowerCase().includes(searchString) ||
                ticketType?.toLowerCase().includes(searchString) ||
                priority?.toLowerCase().includes(searchString) ||
                fk_raisedBy?.toLowerCase().includes(searchString) ||
                raisedAgainst?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                // city?.toLowerCase().includes(searchString) || // future code --- >>>
                // adminTeamsType?.toLowerCase().includes(searchString)||
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

    const columns: DataTableColumn<AdminTicketsData>[] = [
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
                                    const editUrl = `/AdminModule/AdminTickets/EditAdminTickets/${rowData.id}`;
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
                                    const viewUrl = `/AdminModule/AdminTickets/ViewSpecificAdminTickets/${rowData.id}`;
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
        { accessor: 'ticketIdKey', title: 'Ticket ID Key', sortable: true, hidden: hiddenColumns.includes('ticketIdKey') },
        { accessor: 'ticketType', title: 'Ticket Type', sortable: true, hidden: hiddenColumns.includes('ticketType') },
        { accessor: 'title', title: 'Title', sortable: true, hidden: hiddenColumns.includes('title') },
        { accessor: 'description', title: 'Description', sortable: true, hidden: hiddenColumns.includes('description') },
        { accessor: 'fk_raisedBy', title: 'Raised By', sortable: true, hidden: hiddenColumns.includes('fk_raisedBy') },
        { accessor: 'raisedAgainst', title: 'Raised Against', sortable: true, hidden: hiddenColumns.includes('raisedAgainst') },
        { accessor: 'fk_raisedAgainstType', title: 'Raised Against Type', sortable: true, hidden: hiddenColumns.includes('fk_raisedAgainstType') },
        { accessor: 'closedAt', title: 'Closed At', sortable: true, hidden: hiddenColumns.includes('closedAt') },
        { accessor: 'closedBy', title: 'Closed By', sortable: true, hidden: hiddenColumns.includes('closedBy') },
        { accessor: 'priority', title: 'Priority', sortable: true, hidden: hiddenColumns.includes('priority') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    // Function to handle row click
    const handleRowClick = (row: AdminTicketsData) => {
        const editUrl = `/AdminModule/AdminTickets/ViewSpecificAdminTickets/${row.id}`;
        // Redirect to the edit/admin team ID page
        window.location.href = editUrl;
    };

    // update archive
    const [modal3, setmodal3] = useState(false);

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/AdminTickets/EditAdminTickets/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            window.confirm('Are you sure want to delete this Ticket ?');
            errorAlert('Ticket Deleted');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else if (selectedOption === 'assignAdmin' && selectedRecords.length === 1) {
            setModal5(true);
        } else if (selectedOption === 'assignTeam' && selectedRecords.length === 1) {
            setModal4(true);
        } else if (selectedOption === 'unassignTicket' && selectedRecords.length === 1) {
            successAlert('Ticket Unassigned Successfully');
        } else if (selectedOption === 'assignDepartment' && selectedRecords.length >= 1) {
            setModal8(true);
        }
    };

    //assign admin

    const [modal5, setModal5] = useState(false);
    const [selectedAssignAdmin, setSelectedAssignAdmin] = useState<any[]>([]);
    const [addedAssignAdminType, setAddedAssignAdminType] = useState<any>();

    const assignedAdminColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'fk_roleType', title: 'Role Type', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'firstName', title: 'First Name', sortable: true },
        { accessor: 'middleName', title: 'Middle Name', sortable: true },
        { accessor: 'lastName', title: 'Last Name', sortable: true },
        { accessor: 'email', title: 'Email', sortable: true },
        { accessor: 'phoneNumber', title: 'Phone Number', sortable: true },
        { accessor: 'dob', title: 'Date of Birth', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'gender', title: 'Gender', sortable: true },
        { accessor: 'fk_reportsTo', title: 'Reporting Manager', sortable: true },
        { accessor: 'fk_adminTeam', title: 'Admin Team', sortable: true },
        { accessor: 'role', title: 'Team Role', sortable: true },
        { accessor: 'fk_teamManager', title: 'Admin Team Manager', sortable: true },
        { accessor: 'altPhoneNumber', title: 'Alternate Phone Number', sortable: true },
        { accessor: 'country', title: 'Country', sortable: true },
        { accessor: 'state', title: 'State', sortable: true },
        { accessor: 'city', title: 'City', sortable: true },
        { accessor: 'employeeLevel', title: 'Employee Level', sortable: true },
    ];

    const handleAddAssignAdmin = (selectedAdmin: any[], id: string) => {
        successAlert('Admin Assigned Successfully');
        setSelectedAssignAdmin(selectedAdmin);
        setAddedAssignAdminType(id);
    };

    //assign team

    const [modal4, setModal4] = useState(false);
    const [SelectedAssinedTeam, setAssingTeam] = useState<any[]>([]);
    const [addedAssinedTeamType, setAssinedTeamType] = useState<any>();

    const assinedTeamColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'teamName', title: 'Team Name', sortable: true },
        { accessor: 'fk_reportingManager', title: 'Reporting Manager', sortable: true },
        { accessor: 'teamManager', title: 'Team Manager', sortable: true },
        { accessor: 'role', title: 'Role', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'remarks', title: 'Remarks', sortable: true },
        { accessor: 'status', title: 'Status', sortable: true },
    ];

    // popup Assign Team
    const handleAddAssinedTeam = (selectedTeam: any[], id: string) => {
        successAlert('Team Assined Succesfully');
        setAssingTeam(selectedTeam);
        setAssinedTeamType(id);
    };

    //assign Department

    const [modal8, setModal8] = useState(false);
    const [SelectedAssinedDepartment, setAssingDepartment] = useState<any[]>([]);
    const [addedAssinedDepartmentType, setAssinedDepartmentType] = useState<any>();

    const assinedDepartmentColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'departmentName', title: 'Department Name', sortable: true },
        { accessor: 'roleOfDepartment', title: 'Role', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'status', title: 'Status', sortable: true },
    ];

    // popup Assign Team
    const handleAddAssinedDepartment = (selectedTeam: any[], id: string) => {
        successAlert('Department Assigned Successfully');
        setAssingDepartment(selectedTeam);
        setAssinedDepartmentType(id);
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Assign Tickets popup -------------->>
    const [modal, setmodal] = useState(false);
    const [SelectedAddTicket, setAddTicket] = useState<any[]>([]);
    const [addedAddTicketType, setAddTicketType] = useState<any>();
    // channel partner table columns
    const addTicketColumns: DataTableColumn<any>[] = [
        { accessor: 'ticketIdKey', title: 'Ticket ID Key', sortable: true },
        { accessor: 'ticketType', title: 'Ticket Type', sortable: true },
        { accessor: 'title', title: 'Title', sortable: true },
        { accessor: 'description', title: 'Description', sortable: true },
        { accessor: 'fk_raisedBy', title: 'Raised By', sortable: true },
        { accessor: 'raisedAgainst', title: 'Raised Against', sortable: true },
        { accessor: 'fk_raisedAgainstType', title: 'Raised Against Type', sortable: true },
        { accessor: 'closedAt', title: 'Closed At', sortable: true },
        { accessor: 'closedBy', title: 'Closed By', sortable: true },
        { accessor: 'priority', title: 'Priority', sortable: true },
    ];

    // popup Assign Tickets
    const handleAddTicket = (selectedTeam: any[], id: string) => {
        successAlert('Ticket Added Succesfully');
        setAddTicket(selectedTeam);
        setAddTicketType(id);
    };

    return (
        <>
            {!tabs && (
                <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                    <li className="">
                        <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                            Home
                        </Link>
                    </li>
                    <li
                        className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                            currentPath === '/AdminModule/AdminTickets/ViewAdminTickets' ? 'text-blue-600' : ''
                        }`}
                    >
                        Admin Tickets
                    </li>
                </ol>
            )}

            <div className="panel mt-3">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {!tabs && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <Link to="/adminModule/adminTickets/createAdminTickets" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                                Create Admin Tickets
                            </Link>
                        </div>
                    )}

                    {/* {tabs_Team && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <button className="btn btn-primary block w-full sm:inline-block text-center mt-0" onClick={() => setmodal(true)}>
                                Add Tickets
                            </button>
                        </div>
                    )} */}

                    {/* {tabs_Admin && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <button className="btn btn-primary block w-full sm:inline-block text-center mt-0" onClick={() => setmodal(true)}>
                                Add Tickets
                            </button>
                        </div>
                    )} */}

                    {(tabs_Admin || (tabs_Team && !tabs_Admin)) && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <button className="btn btn-primary block w-full sm:inline-block text-center mt-0" onClick={() => setmodal(true)}>
                                Add Tickets
                            </button>
                        </div>
                    )}

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
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        {tabs ? (
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                {tabs_Team && <option value="unassignTicket">Unassign Ticket</option>}
                                {tabs_Admin && <option value="delete">Delete</option>}
                                <option value="updateArchive">Update Profile Status</option>
                                <option value="export">Export</option>
                            </select>
                        ) : (
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                <option value="assignAdmin">Assign Admin</option>
                                <option value="assignTeam">Assign Team</option>
                                <option value="assignDepartment">Assign Department</option>
                                <option value="updateArchive">Update Profile Status</option>
                                <option value="export">Export</option>
                            </select>
                        )}
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={adminTicketsData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                        //onRowClick={(row) => handleRowClick(row)}
                    />
                </div>
            </div>

            {!tabs && (
                <>
                    <Piechart />
                    <div className="panel mt-4">
                        <StatusOfTickets />
                    </div>
                    <div className="panel mt-4">
                        <ReportOfUsers />
                    </div>
                </>
            )}

            <CommonPopUp title={'Assign Admin'} columns={assignedAdminColumns} data={staticAdminData} event={modal5} closeModal={() => setModal5(false)} onSubmit={handleAddAssignAdmin} />
            <CommonPopUp title={'Assign Team'} columns={assinedTeamColumns} data={staticAdminTeamData} event={modal4} closeModal={() => setModal4(false)} onSubmit={handleAddAssinedTeam} />
            <CommonPopUp title={'Assign Ticket'} columns={addTicketColumns} data={staticTicketData} event={modal} closeModal={() => setmodal(false)} onSubmit={handleAddTicket} />
            <CommonPopUp
                title={'Assign Department'}
                columns={assinedDepartmentColumns}
                data={staticDepartmentData}
                event={modal8}
                closeModal={() => setModal8(false)}
                onSubmit={handleAddAssinedDepartment}
            />
            <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} />
        </>
    );
};

export default ViewAdminTickets;
