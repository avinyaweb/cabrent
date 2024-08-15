import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

interface ChannelPartnerAPIData {
    id: string;
    cpAPIKey: string;
    apiName: string;
    apiURL: string;
    permissions: string;
    archive: string;
    status: string;
    accessKey: string;
    bookingType: string;
    serviceType: string;
    limitedCalls: string;
    serviceCity: string;
    leadCharges: string;
    tax: string;
    channelPartnerId: string;
    totalCalls: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticChannelPartnerAPIData = [
    {
        id: '1',
        cpAPIKey: 'dummyApiKey1',
        apiName: 'Dummy API 1',
        apiURL: 'https://dummyapi1.com',
        permissions: 'READ, WRITE',
        archive: 'APPROVED',
        status: 'Yes',
        accessKey: 'dummyAccessKey1',
        bookingType: 'Online',
        serviceType: 'Daily',
        limitedCalls: '100',
        serviceCity: 'New York',
        leadCharges: '$10',
        tax: '5%',
        channelPartnerId: 'CP001',
        totalCalls: '500',
        approvedBy: 'John Doe',
        approvedAt: '2024-01-08T09:00:00Z',
        createdBy: 'Alice',
        createdAt: '2024-01-08T08:30:00Z',
        updatedBy: 'Alice',
        updatedAt: '2024-01-08T09:15:00Z',
    },
    {
        id: '2',
        cpAPIKey: 'dummyApiKey2',
        apiName: 'Dummy API 2',
        apiURL: 'https://dummyapi2.com',
        permissions: 'READ',
        archive: 'PENDING',
        status: 'Yes',
        accessKey: 'dummyAccessKey1',
        bookingType: 'Online',
        serviceType: 'Daily',
        limitedCalls: '100',
        serviceCity: 'New York',
        leadCharges: '$10',
        tax: '5%',
        channelPartnerId: 'CP001',
        totalCalls: '500',
        approvedBy: 'Jane Smith',
        approvedAt: '2024-01-10T11:20:00Z',
        createdBy: 'Bob',
        createdAt: '2024-01-10T10:45:00Z',
        updatedBy: 'Bob',
        updatedAt: '2024-01-10T11:30:00Z',
    },
    {
        id: '3',
        cpAPIKey: 'dummyApiKey3',
        apiName: 'Dummy API 3',
        apiURL: 'https://dummyapi3.com',
        permissions: 'WRITE',
        archive: 'ONHOLD',
        status: 'No',
        accessKey: 'dummyAccessKey1',
        bookingType: 'Online',
        serviceType: 'Daily',
        limitedCalls: '100',
        serviceCity: 'New York',
        leadCharges: '$10',
        tax: '5%',
        channelPartnerId: 'CP001',
        totalCalls: '500',
        approvedBy: 'Eleanor Rigby',
        approvedAt: '2024-01-20T15:45:00Z',
        createdBy: 'Charlie',
        createdAt: '2024-01-20T15:00:00Z',
        updatedBy: 'Charlie',
        updatedAt: '2024-01-20T16:00:00Z',
    },
];

const ViewChannelPartnerAPI = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ChannelPartnerData, setChannelPartnerData] = useState<ChannelPartnerAPIData[]>(staticChannelPartnerAPIData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ChannelPartnerAPIData[]>([]);
    const [recordsData, setRecordsData] = useState<ChannelPartnerAPIData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<ChannelPartnerAPIData[]>([]);
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
        dispatch(setPageTitle('View Channel Partner API'));

        const fetchChannelPartnerData = async () => {
            try {
                const { data } = await getChannelPartnerData();
                if (data?.ChannelPartners) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.ChannelPartners.map(({ _id, ...rest }: { _id: string; [key: string]: any }) => ({
                        id: _id,
                        ...rest,
                    }));
                    //setChannelPartnerData(newData);
                    setChannelPartnerData(staticChannelPartnerAPIData);
                }
            } catch (error: any) {
                console.error('Error fetching Channel Partner API data:', error.message);
            }
        };
        fetchChannelPartnerData();
    }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ChannelPartnerAPIData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ChannelPartnerData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = ' ',
                cpAPIKey = ' ',
                apiName = ' ',
                apiURL = ' ',
                permissions = ' ',
                archive = ' ',
                status = ' ',
                accessKey = ' ',
                bookingType = ' ',
                serviceType = ' ',
                limitedCalls = ' ',
                serviceCity = ' ',
                leadCharges = ' ',
                tax = ' ',
                channelPartnerId = ' ',
                totalCalls = ' ',
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
                cpAPIKey?.toLowerCase().includes(searchString) ||
                apiName?.toLowerCase().includes(searchString) ||
                apiURL?.toLowerCase().includes(searchString) ||
                permissions?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                status?.toLowerCase().includes(searchString) ||
                accessKey?.toLowerCase().includes(searchString) ||
                bookingType?.toLowerCase().includes(searchString) ||
                serviceType?.toLowerCase().includes(searchString) ||
                limitedCalls?.toLowerCase().includes(searchString) ||
                serviceCity?.toLowerCase().includes(searchString) ||
                leadCharges?.toLowerCase().includes(searchString) ||
                tax?.toLowerCase().includes(searchString) ||
                channelPartnerId?.toLowerCase().includes(searchString) ||
                totalCalls?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<ChannelPartnerAPIData>[] = [
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
                                    const editUrl = `/AdminModule/ChannelPartnerAPI/EditChannelPartnerAPI/${rowData.id}`;
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
                                    const viewUrl = `/AdminModule/ChannelPartnerAPI/ViewSpecificChannelPartnerAPI/${rowData.id}`;
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
        { accessor: 'cpAPIKey', title: 'Channel Partner API ', sortable: true, hidden: hiddenColumns.includes('cpAPIKey') },
        { accessor: 'apiName', title: 'API Name', sortable: true, hidden: hiddenColumns.includes('apiName') },
        { accessor: 'apiURL', title: 'API URL', sortable: true, hidden: hiddenColumns.includes('apiURL') },
        { accessor: 'permissions', title: 'Permissions', sortable: true, hidden: hiddenColumns.includes('permissions') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'status', title: 'Status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'accessKey', title: 'Access Key', sortable: true, hidden: hiddenColumns.includes('accessKey') },
        { accessor: 'bookingType', title: 'Booking Type', sortable: true, hidden: hiddenColumns.includes('bookingType') },
        { accessor: 'serviceType', title: 'Service Type', sortable: true, hidden: hiddenColumns.includes('serviceType') },
        { accessor: 'limitedCalls', title: 'Limited Calls', sortable: true, hidden: hiddenColumns.includes('limitedCalls') },
        { accessor: 'serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('serviceCity') },
        { accessor: 'leadCharges', title: 'Lead Charges', sortable: true, hidden: hiddenColumns.includes('leadCharges') },
        { accessor: 'tax', title: 'Tax', sortable: true, hidden: hiddenColumns.includes('tax') },
        { accessor: 'channelPartnerId', title: 'Channel Partner ID', sortable: true, hidden: hiddenColumns.includes('channelPartnerId') },
        { accessor: 'totalCalls', title: 'Total Calls', sortable: true, hidden: hiddenColumns.includes('totalCalls') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: ChannelPartnerAPIData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: ChannelPartnerAPIData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartnerAPI/ViewSpecificChannelPartnerAPI/${row.id}`);
    };

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    // for adjust the date
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    const [modal3, setmodal3] = useState(false);

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/ChannelPartnerAPI/EditChannelPartnerAPI/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
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
            label: 'Channel Partner API',
            to: '/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/AdminModule/ChannelPartnerAPI/CreateChannelPartnerAPI" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create C.P API
                        </Link>
                    </div>

                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/AdminModule/ChannelPartnerAPI/CreateChannelPartnerAPI" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create C.P API
                        </Link>
                    </div> */}

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
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="updateArchive">Update Archive</option>
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
                        totalRecords={ChannelPartnerData.length}
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

export default ViewChannelPartnerAPI;
