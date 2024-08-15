import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { getAllDocumentTypes } from '@/services/UtilityServices/DocumentTypeServices';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface DocumentTypeData {
    id: string;
    documentName: string;
    documentType: string;
    documentForModule: string;
    archive: string;
    userType: string; // Updated userType field with specific values
    serviceCity: string; // Added serviceCity field
    createdAt: string;
    documentCondition: string;
}

// Define static data
const staticDocumentTypeData: DocumentTypeData[] = [
    {
        id: '1',
        documentName: 'Aadhar Card',
        documentType: 'JPG +2',
        documentForModule: 'Driver',
        archive: 'PENDING',
        userType: 'driver', // Added userType field with specific value
        serviceCity: 'Kochi',
        createdAt: '2024-01-01T09:40:05.000Z',
        documentCondition: 'Optional',
    },
    {
        id: '2',
        documentName: 'PAN Card',
        documentType: 'JPG+4',
        documentForModule: 'Vehicle',
        archive: 'PENDING',
        userType: 'vehicle', // Added userType field with specific value
        serviceCity: 'Mumbai',
        createdAt: '2024-01-01T09:40:05.000Z',
        documentCondition: 'Mandatory',
    },
    {
        id: '3',
        documentName: 'Driving License',
        documentType: 'DOCX',
        documentForModule: 'Travel Agency',
        archive: 'PENDING',
        userType: 'travel_agency', // Added userType field with specific value
        serviceCity: 'Chennai',
        createdAt: '2024-01-01T09:40:05.000Z',
        documentCondition: 'Optional',
    },
    {
        id: '4',
        documentName: 'License Agreement',
        documentType: 'PDF+1',
        documentForModule: 'Driver',
        archive: 'PENDING',
        userType: 'channel_partner', // Added userType field with specific value
        serviceCity: 'Delhi',
        createdAt: '2024-01-01T09:40:05.000Z',
        documentCondition: 'Mandatory',
    },
];

const ViewDocumentType = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Document Type'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [documentTypeData, setDocumentTypeData] = useState<DocumentTypeData[]>(staticDocumentTypeData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<DocumentTypeData[]>([]);
    const [recordsData, setRecordsData] = useState<DocumentTypeData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<DocumentTypeData[]>([]);
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
    // useEffect(() => {
    //     dispatch(setPageTitle('View Admin Teams'));

    //     const fetchDocumentTypeData = async () => {
    //         try {
    //             const { data } = await getAllDocumentTypes();
    //             if (data?.DocumentTypes) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.DocumentTypes.map(({
    //                     _id: id,
    //                     ...rest
    //                 }) => ({
    //                     id,
    //                     ...rest
    //                 }))
    //                 setDocumentTypeData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchDocumentTypeData();
    // }, [dispatch]);

    useEffect(() => {
        if (documentTypeData.length > 0) {
            const sortedData = documentTypeData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof DocumentTypeData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [documentTypeData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', documentName = '', documentType = '', documentForModule = '', archive = '', userType = '', serviceCity = '', documentCondition = '' } = item || {};

            const searchString: any = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                documentName?.toLowerCase().includes(searchString) ||
                documentType?.toLowerCase().includes(searchString) ||
                documentForModule?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                userType?.toLowerCase().includes(searchString) ||
                serviceCity?.toLowerCase().includes(searchString) ||
                documentCondition?.toLowerCase().includes(searchString)
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

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // date vise sorting.
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const { data } = await getAllDocumentTypes();
                if (data?.Archives) {
                    const filteredData = data.Archives.filter((item: DocumentTypeData) => {
                        if (!selectedDateRange) return true;
                        const createdAtTimestamp = new Date(item.createdAt).getTime();
                        const startDate = selectedDateRange[0]?.getTime() || 0;
                        const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
                        return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
                    });
                    setSelectedDateRange(filteredData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminData();
    }, [selectedDateRange]);

    const handleDateChange = (date: any) => {
        setSelectedDateRange(date);
    };

    const columns: DataTableColumn<DocumentTypeData>[] = [
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
                                    const editUrl = `/UtilityModule/DocumentType/EditDocumentType/${rowData.id}`;
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
                                    const viewUrl = `/UtilityModule/DocumentType/ViewSpecificDocumentType/${rowData.id}`;
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
        { accessor: 'documentName', title: 'Document Name', sortable: true, hidden: hiddenColumns.includes('documentName') },
        { accessor: 'documentType', title: 'Document Type', sortable: true, hidden: hiddenColumns.includes('documentType') },
        { accessor: 'documentForModule', title: 'Document For Module', sortable: true, hidden: hiddenColumns.includes('documentForModule') },
        { accessor: 'userType', title: 'User Type', sortable: true, hidden: hiddenColumns.includes('userType') }, // Added userType column
        { accessor: 'serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('serviceCity') }, // Added serviceCity column
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'documentCondition', title: 'Document Condition', sortable: true, hidden: hiddenColumns.includes('documentCondition') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: DocumentTypeData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: DocumentTypeData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/adminModule/documentType/viewSpecificDocumentType/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/UtilityModule/DocumentType/EditDocumentType/${selectedRecords[0].id}`;
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
            label: 'Document Type',
            to: '/UtilityModule/DocumentType/ViewDocumentType',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/DocumentType/ViewDocumentType' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/UtilityModule/DocumentType/CreateDocumentType" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Document Type
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

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full sm:w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                        </select>
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={documentTypeData.length}
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

export default ViewDocumentType;
