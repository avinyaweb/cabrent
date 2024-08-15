import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useSelector } from 'react-redux';
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
import { downloadExcel } from '@/utils/Excel';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { successAlert } from '@/utils/Toast';

interface FleetOwnerSettingsData {
    id: string;
    agencyID: string;
    companyType: string;
    travelAgencyStatus: string;
}

export const staticFleetOwnerSettingsData = [
    {
        id: '1',
        agencyID: 'Agency234',
        companyType: 'Partnership',
        travelAgencyStatus: 'Active',
    },
    {
        id: '2',
        agencyID: 'Agency984',
        companyType: 'Privet Limited',
        travelAgencyStatus: 'Active',
    },
    {
        id: '3',
        agencyID: 'Agency123',
        companyType: 'NGO limited',
        travelAgencyStatus: 'Hold',
    },
];

const ViewTravelAgencySettings = ({ tabs, userManagementPage = true }: any) => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // All states.
    const [FleetOwnerSettingsData, setFleetOwnerSettingsData] = useState<FleetOwnerSettingsData[]>(staticFleetOwnerSettingsData);
    const [modal3, setmodal3] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<FleetOwnerSettingsData[]>([]);
    const [recordsData, setRecordsData] = useState<FleetOwnerSettingsData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<FleetOwnerSettingsData[]>([]);
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
        if (FleetOwnerSettingsData.length > 0) {
            const sortedData = FleetOwnerSettingsData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof FleetOwnerSettingsData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [FleetOwnerSettingsData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', agencyID = '', companyType = '', travelAgencyStatus = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                agencyID?.toLowerCase().includes(searchString) ||
                companyType?.toLowerCase().includes(searchString) ||
                travelAgencyStatus?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([
        'id',
        'walletAmount',
        'walletStatus',
        'bankName',
        'accountHolderName',
        'accountNumber',
        'ifscCode',
        'branchName',
        'accountType',
        'gst',
        'approvedAt',
        'approvedBy',
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy',
    ]);

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

    const columns: DataTableColumn<FleetOwnerSettingsData>[] = [
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
                                    const editUrl = `/BusinessModule/FleetOwner/EditFleetOwner/${rowData.id}`;
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
                                    const viewUrl = `/BusinessModule/FleetOwner/TravelAgencySettings/TravelAgencySettingsModule/${rowData.id}`;
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
        { accessor: 'agencyID', title: 'Travel Agency ID', sortable: true, hidden: hiddenColumns.includes('agencyID') },
        { accessor: 'companyType', title: 'Company Type', sortable: true, hidden: hiddenColumns.includes('companyType') },
        { accessor: 'travelAgencyStatus', title: 'Travel Agency Status', sortable: true, hidden: hiddenColumns.includes('travelAgencyStatus') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: FleetOwnerSettingsData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: FleetOwnerSettingsData[] = [];
        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }
        setSelectedRecords(updatedSelectedRecords);
        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // add update ProfileStatus
    const handleAddUpdateProfileStatus = (selectedProfileStatus: any[], id: string) => {
        successAlert('ProfileStatus Updated Succesfully');
        // handle update ProfileStatus
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/FleetOwner/EditFleetOwner/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            window.confirm('Do you really want to delete this Travel Agency?');
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        }
    };

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
            label: 'Travel Agency Settings',
            to: '/BusinessModule/FleetOwner/ViewTravelAgencySettings',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/FleetOwner/ViewTravelAgencySettings' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

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
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {userManagementPage && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                {tabs && <option value="addTravelAgency">Add Travel Agency</option>}
                                {tabs && <option value="removeTravelAgency">Remove Travel Agency</option>}
                                <option value="uploadDocument">Upload Document</option>
                                <option value="addVehicle">Add Vehicle</option>
                                <option value="addDriver">Add Driver</option>
                                <option value="assignDistributor">Assign/update Distributor</option>
                                <option value="addMoneyToWallet">Add Money to Wallet</option>
                                <option value="updateBankAccountDetails">Update Bank Account Details</option>
                                <option value="updateProfileStatus">Update ProfileStatus</option>
                                <option value="export">Export</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={FleetOwnerSettingsData.length}
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
            <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateProfileStatus} />
        </>
    );
};

export default ViewTravelAgencySettings;
