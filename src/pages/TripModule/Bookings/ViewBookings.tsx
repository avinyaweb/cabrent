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
import toast from 'react-hot-toast';
import { downloadExcel } from '@/utils/Excel';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { successAlert } from '@/utils/Toast';

interface BookingsData {
    id: string;
    driver: string;
    vehicle: string;
    bookingAmtDistribution: string;
    user: string;
    ride: string;
    promocode: string;
    reviews: string;
    ratings: string;
    coupon: string;
    driverratings: string;
    riderratings: string;
    tickets: string;
    invoice: string;
    bookingInitiationTime: string;
    bookingConfirmedTime: string;
    bookingCancelledTime: string;
    bookingCancelledBy: string;
    cancellationReason: string;
    bookingConfirmedHistory: string;
    bookingCancelledHistory: string;
    isDestinationChanged: string;
    changedDestination: string;
    paymentHistory: string;
    isSOSUsed: string;
    SOSTimestamp: string;
    paymentStatus: string;
    charges: string;
    otpVerification: string;
    status: string;
    bookingMode: string;
    additionalCharges: string;
    acAvailable: string;
    bookingType: string;
    driverAssignmentByType: string;
    driverAssignmentBy: string;
    serviceType: string;
    leadSource: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticBookingsData = [
    {
        id: '1',
        driver: 'DRV123',
        vehicle: 'VHCL456',
        bookingAmtDistribution: 'BDID789',
        user: 'USR987',
        ride: 'RID001',
        promocode: 'PROMO567',
        coupon: 'CARRENTRIDE',
        reviews: 'Good service',
        ratings: '4.5',
        driverratings: '4.5',
        riderratings: '4.5',
        tickets: 'TCKT321',
        invoice: 'INV555',
        bookingInitiationTime: '2023-12-15T09:30:00Z',
        bookingConfirmedTime: '2023-12-15T09:45:00Z',
        bookingCancelledTime: '2023-12-15T10:00:00Z',
        bookingCancelledBy: 'USR654',
        cancellationReason: 'Driver unavailability',
        bookingConfirmedHistory: 'CONFIRMED',
        bookingCancelledHistory: 'CANCELLED',
        isDestinationChanged: 'Yes',
        changedDestination: 'New location',
        paymentHistory: 'PAID',
        isSOSUsed: 'No',
        SOSTimestamp: '',
        paymentStatus: 'Completed',
        charges: '50.00',
        otpVerification: 'Verified',
        status: 'Completed',
        bookingMode: 'Online',
        additionalCharges: '10.00',
        acAvailable: 'Yes',
        bookingType: 'One-way',
        driverAssignmentByType: 'Manual',
        driverAssignmentBy: 'ADM001',
        serviceType: 'Premium',
        leadSource: 'Advertisement',
        archive: 'APPROVED',
        approvedBy: 'Admin',
        approvedAt: '2023-12-31',
        createdBy: 'Jane Smith',
        createdAt: '2023-12-01',
        updatedBy: 'Jane Smith',
        updatedAt: '2023-12-15',
    },
    {
        id: '2',
        driver: 'DRV789',
        vehicle: 'VHCL321',
        bookingAmtDistribution: 'BDID987',
        user: 'USR543',
        ride: 'RID002',
        promocode: 'PROMO123',
        coupon: 'CARRENTRIDE',
        reviews: 'Excellent experience',
        ratings: '4.7',
        driverratings: '4.7',
        riderratings: '4.5',
        tickets: 'TCKT654',
        invoice: 'INV888',
        bookingInitiationTime: '2023-12-20T11:00:00Z',
        bookingConfirmedTime: '2023-12-20T11:15:00Z',
        bookingCancelledTime: '',
        bookingCancelledBy: '',
        cancellationReason: '',
        bookingConfirmedHistory: 'CONFIRMED',
        bookingCancelledHistory: '',
        isDestinationChanged: 'No',
        changedDestination: '',
        paymentHistory: 'PAID',
        isSOSUsed: 'Yes',
        SOSTimestamp: '2023-12-20T11:30:00Z',
        paymentStatus: 'Completed',
        charges: '75.00',
        otpVerification: 'Verified',
        status: 'Ongoing',
        bookingMode: 'Offline',
        additionalCharges: '15.00',
        acAvailable: 'No',
        bookingType: 'Round-trip',
        driverAssignmentByType: 'Automated',
        driverAssignmentBy: 'SYS005',
        serviceType: 'Standard',
        leadSource: 'Referral',
        archive: 'REJECTED',
        approvedBy: 'SuperAdmin',
        approvedAt: '2023-12-31',
        createdBy: 'Bob Brown',
        createdAt: '2023-11-20',
        updatedBy: 'Bob Brown',
        updatedAt: '2023-11-25',
    },
];

const ViewBookings = ({ tabs }: { tabs: boolean }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const [ChannelPartnerData, setChannelPartnerData] = useState<BookingsData[]>(staticBookingsData);
    const [modal3, setmodal3] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<BookingsData[]>([]);
    const [recordsData, setRecordsData] = useState<BookingsData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<BookingsData[]>([]);
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
    const fetchChannelPartnerData = async () => {
        try {
            const { data } = await getChannelPartnerData();
            if (data?.ChannelPartners) {
                // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                const newData = data.ChannelPartners.map(({ _id, ...rest }: any) => ({
                    id: _id,
                    ...rest,
                }));
                //setChannelPartnerData(newData);
                setChannelPartnerData(staticBookingsData);
            }
        } catch (error: any) {
            console.error('Error fetching Bookings data:', error.message);
        }
    };

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof BookingsData;
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
                id = '',
                driver = '',
                vehicle = '',
                bookingAmtDistribution = '',
                user = '',
                ride = '',
                promocode = '',
                coupon = '',
                driverratings = '',
                riderratings = '',
                tickets = '',
                invoice = '',
                bookingInitiationTime = '',
                bookingConfirmedTime = '',
                bookingCancelledTime = '',
                bookingCancelledBy = '',
                cancellationReason = '',
                bookingConfirmedHistory = '',
                bookingCancelledHistory = '',
                isDestinationChanged = '',
                changedDestination = '',
                paymentHistory = '',
                isSOSUsed = '',
                SOSTimestamp = '',
                paymentStatus = '',
                charges = '',
                otpVerification = '',
                status = '',
                bookingMode = '',
                additionalCharges = '',
                acAvailable = '',
                bookingType = '',
                driverAssignmentByType = '',
                driverAssignmentBy = '',
                serviceType = '',
                leadSource = '',
                archive = '',
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
                driver?.toLowerCase().includes(searchString) ||
                vehicle?.toLowerCase().includes(searchString) ||
                bookingAmtDistribution?.toLowerCase().includes(searchString) ||
                user?.toLowerCase().includes(searchString) ||
                ride?.toLowerCase().includes(searchString) ||
                promocode?.toLowerCase().includes(searchString) ||
                coupon?.toLowerCase().includes(searchString) ||
                driverratings?.toLowerCase().includes(searchString) ||
                riderratings?.toLowerCase().includes(searchString) ||
                tickets?.toLowerCase().includes(searchString) ||
                invoice?.toLowerCase().includes(searchString) ||
                bookingInitiationTime?.toLowerCase().includes(searchString) ||
                bookingConfirmedTime?.toLowerCase().includes(searchString) ||
                bookingCancelledTime?.toLowerCase().includes(searchString) ||
                bookingCancelledBy?.toLowerCase().includes(searchString) ||
                cancellationReason?.toLowerCase().includes(searchString) ||
                bookingConfirmedHistory?.toLowerCase().includes(searchString) ||
                bookingCancelledHistory?.toLowerCase().includes(searchString) ||
                isDestinationChanged?.toLowerCase().includes(searchString) ||
                changedDestination?.toLowerCase().includes(searchString) ||
                paymentHistory?.toLowerCase().includes(searchString) ||
                isSOSUsed?.toLowerCase().includes(searchString) ||
                SOSTimestamp?.toLowerCase().includes(searchString) ||
                paymentStatus?.toLowerCase().includes(searchString) ||
                charges?.toLowerCase().includes(searchString) ||
                otpVerification?.toLowerCase().includes(searchString) ||
                status?.toLowerCase().includes(searchString) ||
                bookingMode?.toLowerCase().includes(searchString) ||
                additionalCharges?.toLowerCase().includes(searchString) ||
                acAvailable?.toLowerCase().includes(searchString) ||
                bookingType?.toLowerCase().includes(searchString) ||
                driverAssignmentByType?.toLowerCase().includes(searchString) ||
                driverAssignmentBy?.toLowerCase().includes(searchString) ||
                serviceType?.toLowerCase().includes(searchString) ||
                leadSource?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<BookingsData>[] = [
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
                                    const editUrl = `/TripModule/Bookings/EditBookings/${rowData.id}`;
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
                                    const viewUrl = `/TripModule/Bookings/ViewSpecificBookings/${rowData.id}`;
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
        { accessor: 'driver', title: 'Driver', sortable: true, hidden: hiddenColumns.includes('driver') },
        { accessor: 'vehicle', title: 'Vehicle', sortable: true, hidden: hiddenColumns.includes('vehicle') },
        { accessor: 'bookingAmtDistribution', title: 'Booking Amt Distribution', sortable: true, hidden: hiddenColumns.includes('bookingAmtDistribution') },
        { accessor: 'user', title: 'User', sortable: true, hidden: hiddenColumns.includes('user') },
        { accessor: 'ride', title: 'Ride', sortable: true, hidden: hiddenColumns.includes('ride') },
        { accessor: 'promocode', title: 'Promocode', sortable: true, hidden: hiddenColumns.includes('promocode') },
        { accessor: 'coupon', title: 'Coupon', sortable: true, hidden: hiddenColumns.includes('coupon') },
        { accessor: 'driverratings', title: 'Driver ratings', sortable: true, hidden: hiddenColumns.includes('driverratings') },
        { accessor: 'riderratings', title: 'Rider ratings', sortable: true, hidden: hiddenColumns.includes('riderratings') },
        { accessor: 'tickets', title: 'Tickets', sortable: true, hidden: hiddenColumns.includes('tickets') },
        { accessor: 'invoice', title: 'Invoice', sortable: true, hidden: hiddenColumns.includes('invoice') },
        { accessor: 'bookingInitiationTime', title: 'Booking Initiation Time', sortable: true, hidden: hiddenColumns.includes('bookingInitiationTime') },
        { accessor: 'bookingConfirmedTime', title: 'Booking Confirmed Time', sortable: true, hidden: hiddenColumns.includes('bookingConfirmedTime') },
        { accessor: 'bookingCancelledTime', title: 'Booking Cancelled Time', sortable: true, hidden: hiddenColumns.includes('bookingCancelledTime') },
        { accessor: 'bookingCancelledBy', title: 'Booking Cancelled By', sortable: true, hidden: hiddenColumns.includes('bookingCancelledBy') },
        { accessor: 'cancellationReason', title: 'Cancellation Reason', sortable: true, hidden: hiddenColumns.includes('cancellationReason') },
        { accessor: 'bookingConfirmedHistory', title: 'Booking Confirmed History', sortable: true, hidden: hiddenColumns.includes('bookingConfirmedHistory') },
        { accessor: 'bookingCancelledHistory', title: 'Booking Cancelled History', sortable: true, hidden: hiddenColumns.includes('bookingCancelledHistory') },
        { accessor: 'isDestinationChanged', title: 'Is Destination Changed', sortable: true, hidden: hiddenColumns.includes('isDestinationChanged') },
        { accessor: 'changedDestination', title: 'Changed Destination', sortable: true, hidden: hiddenColumns.includes('changedDestination') },
        { accessor: 'paymentHistory', title: 'Payment History', sortable: true, hidden: hiddenColumns.includes('paymentHistory') },
        { accessor: 'isSOSUsed', title: 'Is SOS Used', sortable: true, hidden: hiddenColumns.includes('isSOSUsed') },
        { accessor: 'SOSTimestamp', title: 'SOS Timestamp', sortable: true, hidden: hiddenColumns.includes('SOSTimestamp') },
        { accessor: 'paymentStatus', title: 'Payment Status', sortable: true, hidden: hiddenColumns.includes('paymentStatus') },
        { accessor: 'charges', title: 'Charges', sortable: true, hidden: hiddenColumns.includes('charges') },
        { accessor: 'otpVerification', title: 'Otp Verification', sortable: true, hidden: hiddenColumns.includes('otpVerification') },
        { accessor: 'status', title: 'Status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'bookingMode', title: 'Booking Mode', sortable: true, hidden: hiddenColumns.includes('bookingMode') },
        { accessor: 'additionalCharges', title: 'Additional Charges', sortable: true, hidden: hiddenColumns.includes('additionalCharges') },
        { accessor: 'acAvailable', title: 'Ac Available', sortable: true, hidden: hiddenColumns.includes('acAvailable') },
        { accessor: 'bookingType', title: 'Booking Type', sortable: true, hidden: hiddenColumns.includes('bookingType') },
        { accessor: 'driverAssignmentByType', title: 'Driver Assignment By Type', sortable: true, hidden: hiddenColumns.includes('driverAssignmentByType') },
        { accessor: 'driverAssignmentBy', title: 'Driver Assignment By', sortable: true, hidden: hiddenColumns.includes('driverAssignmentBy') },
        { accessor: 'serviceType', title: 'Service Type', sortable: true, hidden: hiddenColumns.includes('serviceType') },
        { accessor: 'leadSource', title: 'Lead Source', sortable: true, hidden: hiddenColumns.includes('leadSource') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: BookingsData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: BookingsData[] = [];

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
            const editUrl = `/TripModule/Bookings/EditBookings/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length === 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Booking');
        } else {
            toast.error('Please Select from Table.');
        }
    };

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle adjust the date
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
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
            label: 'Bookings',
            to: '/TripModule/Bookings/ViewBookings',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/Bookings/ViewBookings' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {!tabs && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <Link to="/TripModule/Bookings/CreateBookings" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                                Create Bookings
                            </Link>
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
            <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} />
        </>
    );
};

export default ViewBookings;
