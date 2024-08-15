import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
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
import { downloadExcel } from '@/utils/Excel';

const staticAuditLogsData = [
    {
        id: '1',
        level: 'Login',
        message: 'Login Attempt Done',
        timestamp: '2024/02/04 11:21:35',
    },
    {
        id: '2',
        level: 'Document Uploads',
        message: 'Document Uploads Done',
        timestamp: '2024/02/04 11:21:41',
    },
    {
        id: '3',
        level: 'Profile Updated',
        message: 'Profile Updated Successfully',
        timestamp: '2024/02/04 11:22:00',
    },
    {
        id: '4',
        level: 'Verification Updated',
        message: 'Verification Updated Successfully',
        timestamp: '2024/02/04 11:22:15',
    },
    {
        id: '5',
        level: 'Created Ticket',
        message: 'Ticket Creation Successful',
        timestamp: '2024/02/04 11:22:30',
    },
    {
        id: '6',
        level: 'Updated Ticket',
        message: 'Ticket Update Successful',
        timestamp: '2024/02/04 11:22:45',
    },
    {
        id: '7',
        level: 'Document Exported',
        message: 'Document Exported Successfully',
        timestamp: '2024/02/04 11:23:00',
    },
    {
        id: '8',
        level: 'Vehicle Added',
        message: 'Vehicle Added Successfully',
        timestamp: '2024/02/04 11:23:15',
    },
    {
        id: '9',
        level: 'Vehicle Removed',
        message: 'Vehicle Removed Successfully',
        timestamp: '2024/02/04 11:23:30',
    },
    {
        id: '10',
        level: 'Updated Vehicle',
        message: 'Vehicle Update Successful',
        timestamp: '2024/02/04 11:23:45',
    },
    {
        id: '11',
        level: 'Purchased Subscription',
        message: 'Subscription Purchased Successfully',
        timestamp: '2024/02/04 11:24:00',
    },
    {
        id: '12',
        level: 'Payments',
        message: 'Payment Received Successfully',
        timestamp: '2024/02/04 11:24:15',
    },
    {
        id: '13',
        level: 'Added Bank Account',
        message: 'Bank Account Added Successfully',
        timestamp: '2024/02/04 11:24:30',
    },
    {
        id: '14',
        level: 'Updated Bank Account',
        message: 'Bank Account Update Successful',
        timestamp: '2024/02/04 11:24:45',
    },
    {
        id: '15',
        level: 'Promotion Availed',
        message: 'Promotion Availed Successfully',
        timestamp: '2024/02/04 11:25:00',
    },
    {
        id: '16',
        level: 'Trip Accepted',
        message: 'Trip Accepted Successfully',
        timestamp: '2024/02/04 11:25:15',
    },
    {
        id: '17',
        level: 'Trip Cancelled',
        message: 'Trip Cancelled Successfully',
        timestamp: '2024/02/04 11:25:30',
    },
    {
        id: '18',
        level: 'Rating Given',
        message: 'Rating Given Successfully',
        timestamp: '2024/02/04 11:25:45',
    },
    {
        id: '19',
        level: 'Ticket Created',
        message: 'Ticket Created Successfully',
        timestamp: '2024/02/04 11:26:00',
    },
];

const AuditLogsChannelpatner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // All states.
    const [AuditLogsData, setAuditLogsData] = useState<any>(staticAuditLogsData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any>([]);
    const [recordsData, setRecordsData] = useState<any>([]);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    //handle date sorting
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

    useEffect(() => {
        if (AuditLogsData.length > 0) {
            const sortedData = AuditLogsData.slice().sort((a: any, b: any) => {
                const accessor = sortStatus.columnAccessor as keyof any;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [AuditLogsData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item: any) => {
            const { level = '', message = '', timestamp = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return level?.toLowerCase().includes(searchString) || message?.toLowerCase().includes(searchString) || timestamp?.toLowerCase().includes(searchString);
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['level1', 'message1', 'timestamp1']);

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

    const columns: DataTableColumn<any>[] = [
        // {
        //     accessor: 'actions',
        //     title: 'Actions',
        //     // eslint-disable-next-line react/display-name
        //     render: (rowData) => (
        //         <div className="flex items-center">
        //             <Tippy content="Edit">
        //                 <button
        //                     type="button"
        //                     className="mr-4"
        //                     onClick={() => {
        //                         if (rowData && rowData.id) {
        //                             const editUrl = `/businessModule/AuditLogs/editAuditLogs/${rowData.id}`;
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
        //                             const viewUrl = `/businessModule/AuditLogs/viewSpecificAuditLogs/${rowData.id}`;
        //                             navigate(viewUrl);
        //                         }
        //                     }}
        //                 >
        //                     <IconEye />
        //                 </button>
        //             </Tippy>
        //         </div>
        //     ),
        // },
        { accessor: 'level', title: 'Level', sortable: true, hidden: hiddenColumns.includes('level') },
        { accessor: 'message', title: 'Message', sortable: true, hidden: hiddenColumns.includes('message') },
        { accessor: 'timestamp', title: 'Tmestamp', sortable: true, hidden: hiddenColumns.includes('timestamp') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: any) => {
        const isSelected = selectedRecords.some((selectedRow: any) => selectedRow.id === row.id);
        let updatedSelectedRecords: any[] = [];
        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow: any) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }
        setSelectedRecords(updatedSelectedRecords);
        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // // Handle changes in the "Admin Actions" dropdown
    // const handleSelectChange = (selectedOption: string) => {
    //     if (selectedOption === 'edit' && selectedRecords.length === 1) {
    //         const editUrl = `/businessModule/AuditLogs/editAuditLogs/${selectedRecords[0].id}`;
    //         navigate(editUrl);
    //     } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
    //         const confirmDelete = window.confirm('Do you really want to delete this Travel Agency?');
    //     } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
    //         downloadExcel(selectedRecords, 'Audit logs');
    //     }else if (selectedOption === 'login') {
    //       setSearch('login')
    //     }
    // };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        switch (selectedOption) {
            case 'edit':
                if (selectedRecords.length === 1) {
                    const editUrl = `/businessModule/AuditLogs/editAuditLogs/${selectedRecords[0].id}`;
                    navigate(editUrl);
                }
                break;
            case 'delete':
                if (selectedRecords.length === 1) {
                    const confirmDelete = window.confirm('Do you really want to delete this Travel Agency?');
                    if (confirmDelete) {
                        // Delete logic here
                    }
                }
                break;
            case 'export':
                if (selectedRecords.length >= 1) {
                    downloadExcel(selectedRecords, 'Audit logs');
                }
                break;
            case '':
                setSearch('');
                break;
            case 'Login':
            case 'Document Uploads':
            case 'Profile Updated':
            case 'Verification Updated':
            case 'Created Ticket':
            case 'Updated Ticket':
            case 'Document Exported':
            case 'Vehicle Added':
            case 'Vehicle Removed':
            case 'Updated Vehicle':
            case 'Purchased Subscription':
            case 'Payments':
            case 'Added Bank Account':
            case 'Updated Bank Account':
            case 'Promotion Availed':
            case 'Trip Accepted':
            case 'Trip Cancelled':
            case 'Rating Given':
            case 'Ticket Created':
                setSearch(selectedOption);
                break;
            default:
                // Handle default case if needed
                break;
        }
    };

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const handleExport = () => {
        if (selectedRecords.length > 0) {
            // Call the downloadExcel function to export selected records
            downloadExcel(selectedRecords, 'Audit logs');
        } else {
            // Provide feedback or handle the case where no records are selected
            console.log('No records selected for export');
        }
    };

    return (
        <>
            <div className="panel">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <button className="btn btn-primary block w-full sm:inline-block text-center mt-0" onClick={handleExport}>
                            Export
                        </button>
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
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="Login">Login</option>
                            <option value="Document Uploads">Document uploads</option>
                            <option value="Profile Updated">Profile updated</option>
                            <option value="Verification Updated">Verification updated</option>
                            <option value="Created Ticket">Created ticket</option>
                            <option value="Updated Ticket">Updated ticket</option>
                            <option value="Document Exported">Document exported</option>
                            <option value="Vehicle Added">Vehicle added</option>
                            <option value="Vehicle Removed">Vehicle removed</option>
                            <option value="Updated Vehicle">Updated vehicle</option>
                            <option value="Purchased Subscription">Purchased subscription</option>
                            <option value="Payments">Payments</option>
                            <option value="Added Bank Account">Added bank account</option>
                            <option value="Updated Bank Account">Updated bank account</option>
                            <option value="Promotion Availed">Promotion availed</option>
                            <option value="Trip Accepted">Trip accepted</option>
                            <option value="Trip Cancelled">Trip cancelled</option>
                            <option value="Rating Given">Rating given</option>
                            <option value="Ticket Created">Ticket created</option>
                        </select>
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={AuditLogsData.length}
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

export default AuditLogsChannelpatner;
