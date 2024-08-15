import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getAdminData } from '@/services/AdminService';
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
import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticAdminTeamData } from '../AdminTeams/ViewAdminTeams';
import { successAlert } from '@/utils/Toast';
import { staticTicketData } from '../AdminTickets/ViewAdminTickets';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

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
    members: string;
    teamCount: string;
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

export const staticAdminData = [
    {
        id: '1',
        employeeId: 'EMPL1234',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        phoneNumber: '123-456-7890',
        email: 'john.doe@example.com',
        passwordHash: 'a1b2c3d4e5f6g7h8i9j0',
        fk_roleType: 'employee',
        fk_reportsTo: 'Dinakar',
        fk_adminTeam: 'Finance Team+2',
        role: 'E1',
        dob: '1990-05-15',
        gender: 'male',
        altPhoneNumber: '987-654-3210',
        members: ' 10',
        teamCount: '5',
        country: 'India',
        state: 'Karnataka',
        city: 'Mangluru',
        employeeLevel: 'E1',
        fk_serviceCity: 'Mangluru +3',
        fk_teamManager: 'Junaid',
        archive: 'Pending',
        approvedBy: 'admin',
        approvedTime: '2024-03-31T12:30:00Z',
        createdAt: '2024-03-31T12:00:00Z',
        updatedAt: '2024-03-31T12:30:00Z',
        createdBy: 'admin',
        updatedBy: 'admin',
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
        status: 'Active',
        teamAlloted: 'teamA',
        reportsTo: 'manager123',
        approvedAt: '2024-03-31T12:30:00Z',
    },
    // Adding the second object
    {
        id: '2',
        employeeId: 'EMPL5678',
        firstName: 'Jane',
        middleName: 'Ann',
        lastName: 'Doe',
        phoneNumber: '321-654-0987',
        email: 'jane.ann@example.com',
        passwordHash: 'j1k2l3m4n5o6p7q8r9s0',
        fk_roleType: 'manager',
        fk_reportsTo: 'Sandeep',
        fk_adminTeam: 'Telecaller Team+2',
        role: 'M2',
        dob: '1985-03-25',
        gender: 'female',
        altPhoneNumber: '876-543-2109',
        members: '5',
        teamCount: '7',
        country: 'India',
        state: 'Karnataka',
        city: 'Bangluru',
        employeeLevel: 'M2',
        fk_serviceCity: 'Bangluru +1',
        fk_teamManager: 'Ansar',
        archive: 'Approved',
        approvedBy: 'director001',
        approvedTime: '2024-04-01T15:00:00Z',
        createdAt: '2024-03-31T15:00:00Z',
        updatedAt: '2024-03-31T15:00:00Z',
        createdBy: 'director001',
        updatedBy: 'director001',
        updatedHistory: [
            {
                updatedByObjectId: 'abc123def456ghi789jkl',
                updatedTime: '2024-01-01T09:00:00.000Z',
                _id: '123456789abcdef',
            },
            {
                updatedByObjectId: 'abc123def456ghi789jkl',
                updatedTime: '2024-01-01T11:00:00.000Z',
                _id: 'abcdef123456789',
            },
        ],
        status: 'Inactive',
        teamAlloted: 'teamB',
        reportsTo: 'director001',
        approvedAt: '2024-04-01T15:00:00Z',
    },
    // Adding the third object
    {
        id: '3',
        employeeId: 'EMPL91011',
        firstName: 'Michael',
        middleName: 'David',
        lastName: 'Johnson',
        phoneNumber: '456-789-0123',
        email: 'michael.david@example.com',
        passwordHash: 't1u2v3w4x5y6z7a8b9c0',
        fk_roleType: 'director',
        fk_reportsTo: 'Sandeep',
        fk_adminTeam: 'L2ticket Team+4',
        role: 'D3',
        dob: '1975-07-05',
        gender: 'male',
        altPhoneNumber: '543-210-9876',
        members: '8',
        teamCount: '10',
        country: 'India',
        state: 'Kerala',
        city: 'Kochi',
        employeeLevel: 'D3',
        fk_serviceCity: 'Kochi +4',
        fk_teamManager: 'Fayiz',
        archive: 'Pending',
        approvedBy: 'subash',
        approvedTime: '2024-04-02T10:00:00Z',
        createdAt: '2024-04-01T10:00:00Z',
        updatedAt: '2024-04-01T10:00:00Z',
        createdBy: 'owner',
        updatedBy: 'owner',
        updatedHistory: [
            {
                updatedByObjectId: 'xyz987pqr654stuvw',
                updatedTime: '2024-01-02T08:00:00.000Z',
                _id: '654321abcdef987',
            },
            {
                updatedByObjectId: 'xyz987pqr654stuvw',
                updatedTime: '2024-01-02T12:00:00.000Z',
                _id: 'abcdef654321987',
            },
        ],
        status: 'Active',
        teamAlloted: 'teamC',
        reportsTo: 'owner',
        approvedAt: '2024-04-02T10:00:00Z',
    },
];

const ViewAdmin = ({ tabs }: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Admin'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [totalCount, setTotalCount] = useState(0);
    const [modal3, setmodal3] = useState(false);
    const [AdminData, setAdminData] = useState<AdminData[]>(staticAdminData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100, 200];
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

    // future code -->>
    // const [searchTerm, setSearchTerm] = useState('');

    // handle date sort
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // date vise sorting.
    // useEffect(() => {
    //     const fetchAdminData = async () => {
    //         try {
    //             const { data } = await getAdminData();
    //             if (data?.admins) {
    //                 const filteredData = data.admins.filter((item: AdminData) => {
    //                     if (!selectedDateRange) return true;
    //                     const createdAtTimestamp = new Date(item.createdAt).getTime();
    //                     const startDate = selectedDateRange[0]?.getTime() || 0;
    //                     const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
    //                     return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
    //                 });
    //                 setAdminData(filteredData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminData();
    // }, [selectedDateRange]);

    // future code -->>
    // const handleDateChange = (date: any) => {
    //     setSelectedDate(date);
    // };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // future code -->>
    // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View Admin'));
    //     const fetchAdminData = async () => {
    //         try {
    //             const { data } = await getAdminData(page, pageSize);
    //             if (data?.admins) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.admins.map(({ _id, ...rest }: { _id: string;[key: string]: any }) => ({
    //                     id: _id,
    //                     ...rest,
    //                 }));

    //                 setAdminData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminData();
    // }, [dispatch]);

    useEffect(() => {
        dispatch(setPageTitle('View Admin'));
        const fetchAdminData = async () => {
            interface AdminDatas {
                country: { value: string };
                state: { value: string };
                city: { value: string };
                fk_serviceCity: any[];
                fk_reportsTo: any[];
                fk_adminTeam: any[];
                fk_teamManager: any[];
                employeeLevel: { value: string };
                fk_roleType: { value: string };
            }
            try {
                const { data } = await getAdminData(page, pageSize);

                if (data?.admins) {
                    const newData = data.admins.map(({ _id, ...rest }: any) => ({
                        id: _id,
                        ...rest,
                    }));

                    // filtering datas without id's
                    // let extractedData = newData.map(({ country, state, city, fk_serviceCity, fk_reportsTo, fk_adminTeam, fk_teamManager, employeeLevel, fk_roleType, ...admin }: AdminDatas) => {
                    //     // Extracting fk_adminTeam value
                    //     let adminTeam = fk_adminTeam.length > 0 ? fk_adminTeam?.map((team) => team?.value).join(', ') : null;
                    //     // Extracting fk_serviceCity value
                    //     let serviceCity = fk_serviceCity.length > 0 ? fk_serviceCity?.map((city) => city?.value).join(', ') : null;
                    //     // Extracting fk_reportsTo value
                    //     let reportsTo = fk_reportsTo.length > 0 ? fk_reportsTo?.map((report) => report?.value).join(', ') : null;
                    //     // Extracting fk_teamManager value
                    //     let teamManager = fk_teamManager.length > 0 ? fk_teamManager?.map((manager) => manager?.value).join(', ') : null;
                    //     return {
                    //         ...admin,
                    //         country: country.value,
                    //         state: state.value,
                    //         city: city.value,
                    //         fk_serviceCity: serviceCity,
                    //         fk_reportsTo: reportsTo,
                    //         fk_adminTeam: adminTeam,
                    //         fk_teamManager: teamManager,
                    //         employeeLevel: employeeLevel.value,
                    //         fk_roleType: fk_roleType.value,
                    //     };
                    // });
                    setAdminData(newData);
                    // Assuming 'totalCount' is the field name for total count of items
                    setTotalCount(data.totalCount); // You need to add this state variable
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error?.message);
            }
        };
        fetchAdminData();
    }, [page, pageSize, dispatch]);

    useEffect(() => {
        if (AdminData.length > 0) {
            console.log('Admin Data:', AdminData); // Log fetched AdminData
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
        { accessor: 'employeeId', title: 'Employee ID', sortable: true, hidden: hiddenColumns.includes('employeeId') },
        { accessor: 'fk_roleType', title: 'Role Name', sortable: true, hidden: hiddenColumns.includes('fk_roleType') },

        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'phoneNumber', title: 'Phone Number', sortable: true, hidden: hiddenColumns.includes('phoneNumber') },
        { accessor: 'dob', title: 'Date of Birth', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'fk_reportsTo', title: 'Reporting Manager', sortable: true, hidden: hiddenColumns.includes('fk_reportsTo') },
        { accessor: 'fk_adminTeam', title: 'Team Name', sortable: true, hidden: hiddenColumns.includes('fk_adminTeam') },
        { accessor: 'role', title: 'Team Department', sortable: true, hidden: hiddenColumns.includes('role') },
        { accessor: 'members', title: 'Team Members Count', sortable: true, hidden: hiddenColumns.includes('members') },
        { accessor: 'teamCount', title: 'Admin Team Count', sortable: true, hidden: hiddenColumns.includes('teamCount') },
        { accessor: 'fk_teamManager', title: 'Admin Team Manager', sortable: true, hidden: hiddenColumns.includes('fk_teamManager') },
        { accessor: 'altPhoneNumber', title: 'Alternate Phone Number', sortable: true, hidden: hiddenColumns.includes('altPhoneNumber') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'employeeLevel', title: 'Employee Level', sortable: true, hidden: hiddenColumns.includes('employeeLevel') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'status', title: 'Admin Status', sortable: true, hidden: hiddenColumns.includes('status') },
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

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    // Assign Team popup table --------->>
    const [modal, setmodal] = useState(false);
    const [SelectedAssinedTeam, setAssingTeam] = useState<any[]>([]);
    const [addedAssinedTeamType, setAssinedTeamType] = useState<any>();
    // channel partner table columns
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

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/Admin/EditAdmin/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'uploadDocument' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/Admin/EditAdmin/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'editRoles' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/Admin/EditAdmin/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'assignTeam' && selectedRecords.length === 1) {
            setmodal(true);
        } else if (selectedOption === 'assignTickets' && selectedRecords.length === 1) {
            setmodal2(true);
        } else if (selectedOption === 'viewLogs' && selectedRecords.length === 1) {
            const selectedRecordId = selectedRecords[0].id;
            const index = 5;
            const editUrl = `/AdminModule/Admin/ViewSpecificAdmin/${selectedRecordId},${index}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else if (selectedOption === 'removeMember' && selectedRecords.length === 1) {
            successAlert('Member Removed Successfully');
        }
    };

    //add member

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
                            currentPath === '/AdminModule/Admin/ViewAdmin' ? 'text-blue-600' : ''
                        }`}
                    >
                        Admin
                    </li>
                </ol>
            )}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {!tabs && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <Link to="/AdminModule/Admin/CreateAdmin" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                                Create Admin
                            </Link>
                        </div>
                    )}

                    {tabs && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <button className="btn btn-primary block w-full sm:inline-block text-center mt-0" onClick={() => setModal5(true)}>
                                Add Member
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
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        {tabs ? (
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                <option value="removeMember">Remove member</option>
                                <option value="updateArchive">Update archive</option>
                                <option value="export">Export</option>
                            </select>
                        ) : (
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                <option value="uploadDocument">Upload Document</option>
                                <option value="editRoles">Edit roles</option>
                                <option value="assignTeam">Assign Team</option>
                                <option value="assignTickets">Assign Tickets</option>
                                <option value="viewLogs">View Audit Logs</option>
                                <option value="updateArchive">Update Profile Status</option>
                                <option value="export">Export</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData} // Make sure this is set correctly to display the current page of records
                        columns={columns}
                        highlightOnHover
                        totalRecords={totalCount} // Use totalCount here
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
                    />
                </div>
                <CommonPopUp title={'Assign Team'} columns={assinedTeamColumns} data={staticAdminTeamData} event={modal} closeModal={() => setmodal(false)} onSubmit={handleAddAssinedTeam} />{' '}
                <CommonPopUp title={'Assign Ticket'} columns={assinedTicketColumns} data={staticTicketData} event={modal2} closeModal={() => setmodal2(false)} onSubmit={handleAddAssignTicket} />{' '}
                <CommonPopUp title={'Assign Admin'} columns={assignedAdminColumns} data={staticAdminData} event={modal5} closeModal={() => setModal5(false)} onSubmit={handleAddAssignAdmin} />
                <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewAdmin;
