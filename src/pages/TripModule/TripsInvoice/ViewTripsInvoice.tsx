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
import '@react-pdf-viewer/core/lib/styles/index.css';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaDownload } from 'react-icons/fa';

interface TripsInvoiceData {
    id: string;
    bookingId: string;
    amount: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    driverId: string;
    vehicleId: string;
    fromLocation: string;
    tripStatus: string;
    ServiceCity: string;
    tolls: string;
    taxes: string;
    distance: string;
}

export const staticTripsInvoiceData = [
    {
        id: '1',
        bookingId: '123',
        amount: '100',
        archive: 'APPROVED',
        driverId: 'driver5432',
        vehicleId: 'vehicle888',
        fromLocation: '456 Oak Street, CityB',
        tripStatus: 'Completed',
        ServiceCity: 'banglore',
        tolls: '10',
        taxes: '5',
        distance: '20',
        approvedBy: 'Admin',
        approvedAt: '2023-12-31',
        createdBy: 'Jane Smith',
        createdAt: '2023-12-01',
        updatedBy: 'Jane Smith',
        updatedAt: '2023-12-15',
    },
    {
        id: '2',
        bookingId: '456',
        amount: '200',
        archive: 'SUSPENDED',
        driverId: 'driver5432',
        vehicleId: 'vehicle888',
        ServiceCity: 'banglore',
        fromLocation: '456 Oak Street, CityB',
        tripStatus: 'Completed',
        tolls: '15',
        taxes: '8',
        distance: '25',
        approvedBy: 'SuperAdmin',
        approvedAt: '2023-12-31',
        createdBy: 'Bob Brown',
        createdAt: '2023-11-20',
        updatedBy: 'Bob Brown',
        updatedAt: '2023-11-25',
    },
];

const ViewTripsInvoice = ({ tabs }: { tabs: boolean }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ChannelPartnerData, setChannelPartnerData] = useState<TripsInvoiceData[]>(staticTripsInvoiceData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<TripsInvoiceData[]>([]);
    const [recordsData, setRecordsData] = useState<TripsInvoiceData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<TripsInvoiceData[]>([]);
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
        dispatch(setPageTitle('View Trips Invoice'));

        const fetchChannelPartnerData = async () => {
            try {
                const { data } = await getChannelPartnerData();
                if (data?.ChannelPartners) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.ChannelPartners.map(({ _id }: { _id: string }, ...rest: any) => ({
                        id: _id,
                        ...rest,
                    }));
                    //setChannelPartnerData(newData);
                    setChannelPartnerData(staticTripsInvoiceData);
                }
            } catch (error: any) {
                console.error('Error fetching Trips Invoice data:', error.message);
            }
        };
        fetchChannelPartnerData();
    }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof TripsInvoiceData;
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
            const { id = '', bookingId = '', amount = '', archive = '', approvedBy = '', approvedAt = '', createdBy = '', createdAt = '', updatedBy = '', updatedAt = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                bookingId?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<TripsInvoiceData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    {/* <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/tripModule/tripsInvoice/editTripsInvoice/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy> */}
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/TripModule/TripsInvoice/ViewSpecificTripsInvoice/${rowData.id}`;
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
        { accessor: 'bookingId', title: 'Booking ID', sortable: true, hidden: hiddenColumns.includes('bookingId') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        { accessor: 'driverId', title: 'Driver ID', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'ServiceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('ServiceCity') }, // Add Driver ID column
        { accessor: 'vehicleId', title: 'Vehicle ID', sortable: true, hidden: hiddenColumns.includes('vehicleId') }, // Add Vehicle ID column
        { accessor: 'fromLocation', title: 'From Location', sortable: true, hidden: hiddenColumns.includes('fromLocation') }, // Add From Location column
        { accessor: 'tripStatus', title: 'Trip Status', sortable: true, hidden: hiddenColumns.includes('tripStatus') }, // Add Trip Status column
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: TripsInvoiceData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: TripsInvoiceData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/tripModule/tripsInvoice/editTripsInvoice/${selectedRecords[0].id}`;
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
            label: 'Trips Invoice',
            to: '/TripModule/TripsInvoice/ViewTripsInvoice',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/TripsInvoice/ViewTripsInvoice' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handledownload = () => {
        if (selectedRecords.length >= 1) {
            // Create a new instance of jsPDF
            const pdf = new jsPDF();

            // Set font properties
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(12);

            // Set up the content for the PDF as a table
            const tableData = selectedRecords.map((record, index) => [
                index + 1,
                record.amount,
                record.bookingId,
                record.approvedBy,
                record.driverId,
                record.vehicleId,
                record.fromLocation,
                record.tripStatus,
                record.ServiceCity,
            ]);

            const tableColumns = [
                { header: 'No.', dataKey: 'no' },
                { header: 'Amount', dataKey: 'amount' },
                { header: 'Booking ID', dataKey: 'bookingId' },
                { header: 'Approved By', dataKey: 'approvedBy' },
                { header: 'Driver ID', dataKey: 'driverId' },
                { header: 'Service City', dataKey: 'ServiceCity' },
                { header: 'Vehicle ID', dataKey: 'vehicleId' },
                { header: 'From Location', dataKey: 'fromLocation' },
                { header: 'Trip Status', dataKey: 'tripStatus' },
            ];

            // Add the table to the PDF
            pdf.autoTable({
                head: [tableColumns.map((column) => column.header)],
                body: tableData,
                startY: 10,
            });

            // Save the PDF as a file
            pdf.save('invoice.pdf');
        } else {
            console.log('No records selected.');
        }
    };

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <div className="bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-pointer flex items-center justify-center" onClick={handledownload}>
                            <FaDownload className="mr-2" />
                            Download
                        </div>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" value={search} onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Search Service City</option>
                            <option value={search}>Banglore</option>
                            <option value={search}>Chennai</option>
                            <option value={search}>madurai</option>
                        </select>
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

export default ViewTripsInvoice;
