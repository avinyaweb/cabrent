import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getAdminTeamsData } from '@/services/AdminTeamsService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import AdminTeamModule from '../AdminTeamModule';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticTicketData } from '../../AdminTickets/ViewAdminTickets';
import { staticAdminData } from '../../Admin/ViewAdmin';

interface AdminTeamsData {
    id: string;
    teamName: string;
    fk_reportingManager: string;
    teamLead: string;
    teamMemberCount: string;
    role: string;
    fk_serviceCity: string;
    remarks: string;
    status: 'PENDING';
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

export const staticAdminTeamData: AdminTeamsData[] = [
    {
        id: '1',
        teamName: 'Sales Team',
        fk_reportingManager: 'manager123',
        teamLead: 'manager456',
        fk_serviceCity: 'New York City',
        remarks: 'Newly formed sales team for NYC region',
        status: 'PENDING',
        role: 'E1',
        approvedAt: '',
        approvedBy: '',
        createdAt: '2024-04-01T13:00:00Z',
        createdBy: 'admin',
        updatedAt: '2024-04-01T13:00:00Z',
        updatedBy: 'admin',
        teamMemberCount: '5', // Dummy data for team member count
    },
    {
        id: '2',
        teamName: 'Marketing Team',
        fk_reportingManager: 'manager789',
        teamLead: 'manager101',
        fk_serviceCity: 'Los Angeles',
        remarks: 'Revamping marketing strategies for LA region',
        status: 'PENDING',
        role: 'E2',
        approvedAt: '',
        approvedBy: '',
        createdAt: '2024-04-01T14:00:00Z',
        createdBy: 'admin',
        updatedAt: '2024-04-01T14:00:00Z',
        updatedBy: 'admin',
        teamMemberCount: '7', // Dummy data for team member count
    },
    {
        id: '3',
        teamName: 'Customer Support Team',
        fk_reportingManager: 'manager111',
        teamLead: 'manager222',
        fk_serviceCity: 'Chicago',
        remarks: 'Expanding customer support services in Chicago',
        status: 'PENDING',
        role: 'E3',
        approvedAt: '',
        approvedBy: '',
        createdAt: '2024-04-01T15:00:00Z',
        createdBy: 'admin',
        updatedAt: '2024-04-01T15:00:00Z',
        updatedBy: 'admin',
        teamMemberCount: '10', // Dummy data for team member count
    },
];

interface AdminTeamInterface {
    tabs: boolean;
}

const ViewMyTeam: React.FC<AdminTeamInterface> = ({ tabs }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Admin Teams'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [adminTeamsData, setAdminTeamsData] = useState<AdminTeamsData[]>(staticAdminTeamData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AdminTeamsData[]>([]);
    const [recordsData, setRecordsData] = useState<AdminTeamsData[]>([]);
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const [selectedRecords, setSelectedRecords] = useState<AdminTeamsData[]>([]);
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
        dispatch(setPageTitle('View Admin Teams'));

        const fetchAdminTeamsData = async () => {
            try {
                const { data } = await getAdminTeamsData();
                if (data?.teams) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    // const newData = data.teams.map(({ _id: id, ...rest }) => ({
                    //     id,
                    //     ...rest,
                    // }));

                    const newData = data.teams.map(({ _id, ...rest }: { _id: string }) => ({
                        id: _id,
                        ...rest,
                    }));

                    setAdminTeamsData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminTeamsData();
    }, [dispatch]);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // date sorting by useeffect.
    // useEffect(() => {
    //     const fetchAdminData = async () => {
    //         try {
    //             const { data } = await getAdminTeamsData();
    //             if (data?.teams) {
    //                 const filteredData = data.teams.filter((item: AdminTeamsData) => {
    //                     if (!selectedDateRange) return true;
    //                     const createdAtTimestamp = new Date(item.createdAt).getTime();
    //                     const startDate = selectedDateRange[0]?.getTime() || 0;
    //                     const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
    //                     return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
    //                 });
    //                 setAdminTeamsData(filteredData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminData();
    // }, [selectedDateRange]);

    useEffect(() => {
        if (adminTeamsData.length > 0) {
            const sortedData = adminTeamsData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AdminTeamsData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [adminTeamsData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', teamName = '', fk_reportingManager = '', teamLead = '', fk_serviceCity = '', remarks = '', teamMemberCount = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                teamName?.toLowerCase().includes(searchString) ||
                fk_reportingManager?.toLowerCase().includes(searchString) ||
                teamLead?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                teamMemberCount?.toLowerCase().includes(searchString) ||
                remarks?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<AdminTeamsData>[] = [
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
                                if (rowData?.id) {
                                    const editUrl = `/AdminModule/AdminTeams/EditAdminTeams/${rowData.id}`;
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
                                if (rowData?.id) {
                                    const viewUrl = `/AdminModule/AdminTeams/ViewSpecificAdminTeams/${rowData.id}`;
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
        { accessor: 'teamName', title: 'Team Name', sortable: true, hidden: hiddenColumns.includes('teamName') },
        { accessor: 'fk_reportingManager', title: 'Reporting Manager', sortable: true, hidden: hiddenColumns.includes('fk_reportingManager') },
        { accessor: 'teamLead', title: 'Team Lead', sortable: true, hidden: hiddenColumns.includes('teamLead') },
        { accessor: 'role', title: 'Role', sortable: true, hidden: hiddenColumns.includes('role') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'teamMemberCount', title: 'Team Member Count', sortable: true, hidden: hiddenColumns.includes('teamMemberCount') },
        { accessor: 'remarks', title: 'Remarks', sortable: true, hidden: hiddenColumns.includes('remarks') },
        { accessor: 'status', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('status') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: AdminTeamsData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: AdminTeamsData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/AdminTeams/ViewSpecificAdminTeams/${row.id}`);
    };

    //assign tickets

    // Assign Tickets popup -------------->>
    const [modal2, setmodal2] = useState(false);
    const [SelectedAssignTicket, setAssignTicket] = useState<any[]>([]);
    const [addedAssignTicketType, setAssignTicketType] = useState<any>();
    // channel partner table columns
    const assinedTicketColumns: DataTableColumn<any>[] = [
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
    const handleAddAssignTicket = (selectedTeam: any[], id: string) => {
        successAlert('Ticket Assined Succesfully');
        setAssignTicket(selectedTeam);
        setAssignTicketType(id);
    };

    //admin team members
    const [modal5, setModal5] = useState(false);
    const [selectedAssignTeamMember, setSelectedAssignTeamMember] = useState<any[]>([]);
    const [addedAssignTeamMemberType, setAddedAssignTeamMemberType] = useState<any>();

    const assinedTeamMembersColumns: DataTableColumn<any>[] = [
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

    const handleAddAssignTeamMember = (selectedTeam: any[], id: string) => {
        successAlert('Team Member Assigned Successfully');
        setSelectedAssignTeamMember(selectedTeam);
        setAddedAssignTeamMemberType(id);
    };

    const [modal3, setmodal3] = useState(false);

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/AdminTeams/EditAdminTeams/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else if (selectedOption === 'assignTickets' && selectedRecords.length === 1) {
            setmodal2(true);
        } else if (selectedOption === 'assignTeamMember' && selectedRecords.length === 1) {
            setModal5(true);
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
            {!tabs && (
                <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                    <li className="">
                        <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                            Home
                        </Link>
                    </li>
                    <li
                        className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                            currentPath === '/AdminModule/AdminTeams/MyTeam/ViewMyTeam' ? 'text-blue-600' : ''
                        }`}
                    >
                        Admin Teams
                    </li>
                </ol>
            )}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* {!tabs && (<div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/AdminModule/AdminTeams/CreateAdminTeams" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Admin Teams
                        </Link>
                    </div>)} */}

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
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="assignTeamMember">Add team member</option>
                            <option value="assignTickets">Assign a ticket</option>
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
                        totalRecords={adminTeamsData.length}
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
                <CommonPopUp
                    title={'Assign Team Member'}
                    columns={assinedTeamMembersColumns}
                    data={staticAdminData}
                    event={modal5}
                    closeModal={() => setModal5(false)}
                    onSubmit={handleAddAssignTeamMember}
                />
                <CommonPopUp title={'Assign Ticket'} columns={assinedTicketColumns} data={staticTicketData} event={modal2} closeModal={() => setmodal2(false)} onSubmit={handleAddAssignTicket} />{' '}
                <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewMyTeam;
