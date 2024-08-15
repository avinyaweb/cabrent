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
import { staticTicketData } from '../ViewAdminTickets';

interface ViewDriverTicketsData {
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
}

const ViewDriverTickets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Pending Admin Tickets'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [adminTicketsData, setAdminTicketsData] = useState<ViewDriverTicketsData[]>(staticTicketData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ViewDriverTicketsData[]>([]);
    const [recordsData, setRecordsData] = useState<ViewDriverTicketsData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<ViewDriverTicketsData[]>([]);
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
        dispatch(setPageTitle('View Admin Tickets'));

        const fetchAdminTicketsData = async () => {
            try {
                const { data } = await getAdminTicketsData();
                if (data?.adminTickets) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.adminTickets.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
                        id,
                        ...rest,
                    }));

                    // Filter data to show only entries with status 'PENDING'
                    const pendingTickets = newData.filter((ticket: { archive: string }) => ticket.archive === 'PENDING');

                    setAdminTicketsData(pendingTickets);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };

        fetchAdminTicketsData();
    }, [dispatch]);

    // ... (remaining code)

    useEffect(() => {
        if (adminTicketsData.length > 0) {
            const sortedData = adminTicketsData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ViewDriverTicketsData;
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
            const { id = '', ticketIdKey = '', title = '', ticketType = '', priority = '', fk_raisedBy = '', raisedAgainst = '', archive = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                ticketIdKey?.toLowerCase().includes(searchString) ||
                title?.toLowerCase().includes(searchString) ||
                ticketType?.toLowerCase().includes(searchString) ||
                priority?.toLowerCase().includes(searchString) ||
                fk_raisedBy?.toLowerCase().includes(searchString) ||
                raisedAgainst?.toLowerCase().includes(searchString) ||
                // city?.toLowerCase().includes(searchString) || // Future code --->>
                // adminTeamsType?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<ViewDriverTicketsData>[] = [
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
        { accessor: 'ticketIdKey', title: 'Ticket Key', sortable: true, hidden: hiddenColumns.includes('ticketIdKey') },
        { accessor: 'title', title: 'Title', sortable: true, hidden: hiddenColumns.includes('title') },
        { accessor: 'ticketType', title: 'Ticket Type', sortable: true, hidden: hiddenColumns.includes('ticketType') },
        { accessor: 'priority', title: 'Priority', sortable: true, hidden: hiddenColumns.includes('priority') },
        { accessor: 'fk_raisedBy', title: 'Raised By', sortable: true, hidden: hiddenColumns.includes('fk_raisedBy') },
        { accessor: 'raisedAgainst', title: 'Raised Against', sortable: true, hidden: hiddenColumns.includes('raisedAgainst') },
        { accessor: 'adminTeamsType', title: 'Admin Teams Type', sortable: true, hidden: hiddenColumns.includes('adminTeamsType') },
        { accessor: 'description', title: 'Description', sortable: true, hidden: hiddenColumns.includes('description') },
        { accessor: 'remarks', title: 'Remarks', sortable: true, hidden: hiddenColumns.includes('remarks') },
        { accessor: 'archive', title: 'Status (Archive)', sortable: true, hidden: hiddenColumns.includes('archive') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    // Function to handle row click
    const handleRowClick = (row: ViewDriverTicketsData) => {
        const editUrl = `/AdminModule/AdminTickets/ViewSpecificAdminTickets/${row.id}`;
        // Redirect to the edit/admin team ID page
        window.location.href = editUrl;
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/AdminTickets/EditAdminTickets/${selectedRecords[0].id}`;
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
        <div>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/AdminTickets/ViewDriverTickets' ? 'text-blue-600' : ''
                    }`}
                >
                    Driver Tickets
                </li>
            </ol>

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/adminModule/adminTickets/createAdminTickets" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Admin Tickets
                        </Link>
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
        </div>
    );
};

export default ViewDriverTickets;
