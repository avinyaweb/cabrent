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

interface VehicleFareMasterData {
    id: string;
    vehicleType: string;
    type: string;
    baseDailyFee: string; //notfound
    dailyExtraKMRate: string;
    dailyExtraTimeRate: string;
    baseRentalFee: string; // number
    rentalExtraKMRate: string;
    rentalExtraTimeRate: string;
    baseOutstationFeeOneWay: string; //notfound
    outstationExtraKMRateOneWay: string;
    outstationExtraTimeRateOneWay: string;
    outstationExtraKMRateTwoeWay: string; //notfound
    outstationExtraTimeRateTwoWay: string;
    status: string;
    features: string;
    vehicleIcon: string;
    conveyanceAvail: string; //boolean
    conveyanceCharge: string;
    taxApplicable: string;
    cgst: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticVehicleFareMasterData = [
    {
        id: '1',
        vehicleType: 'SUV',
        type: 'Standard',
        baseDailyFee: '50.00',
        dailyExtraKMRate: '0.30',
        dailyExtraTimeRate: '10.00',
        baseRentalFee: '200.00',
        rentalExtraKMRate: '1.00',
        rentalExtraTimeRate: '20.00',
        baseOutstationFeeOneWay: '300.00',
        outstationExtraKMRateOneWay: '1.50',
        outstationExtraTimeRateOneWay: '25.00',
        outstationExtraKMRateTwoeWay: '2.00',
        outstationExtraTimeRateTwoWay: '30.00',
        status: 'Active',
        features: 'GPS, Bluetooth, Air Conditioning',
        vehicleIcon: 'suv-icon.png',
        conveyanceAvail: 'Yes',
        conveyanceCharge: '20.00',
        taxApplicable: 'Yes',
        cgst: '6%',
        archive: 'No',
        approvedBy: 'Admin',
        approvedAt: '2023-12-31',
        createdBy: 'Jane Smith',
        createdAt: '2023-12-01',
        updatedBy: 'Jane Smith',
        updatedAt: '2023-12-15',
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
    },
    {
        id: '2',
        vehicleType: 'Sedan',
        type: 'Luxury',
        baseDailyFee: '80.00',
        dailyExtraKMRate: '0.40',
        dailyExtraTimeRate: '15.00',
        baseRentalFee: '300.00',
        rentalExtraKMRate: '1.50',
        rentalExtraTimeRate: '25.00',
        baseOutstationFeeOneWay: '400.00',
        outstationExtraKMRateOneWay: '2.00',
        outstationExtraTimeRateOneWay: '30.00',
        outstationExtraKMRateTwoeWay: '2.50',
        outstationExtraTimeRateTwoWay: '35.00',
        status: 'Inactive',
        features: 'Leather Seats, Sunroof, Navigation System',
        vehicleIcon: 'sedan-icon.png',
        conveyanceAvail: 'No',
        conveyanceCharge: '0.00',
        taxApplicable: 'Yes',
        cgst: '5%',
        archive: 'Yes',
        approvedBy: '',
        approvedAt: '',
        createdBy: 'Bob Brown',
        createdAt: '2023-11-20',
        updatedBy: 'Bob Brown',
        updatedAt: '2023-11-25',
    },
];

const ViewVehicleFareMaster = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ChannelPartnerData, setChannelPartnerData] = useState<VehicleFareMasterData[]>(staticVehicleFareMasterData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<VehicleFareMasterData[]>([]);
    const [recordsData, setRecordsData] = useState<VehicleFareMasterData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<VehicleFareMasterData[]>([]);
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
        dispatch(setPageTitle('View Vehicle Fare Master'));

        const fetchChannelPartnerData = async () => {
            try {
                const { data } = await getChannelPartnerData();
                if (data?.ChannelPartners) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    // const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
                    //     id,
                    //     ...rest,
                    // }));

                    const newData = data.ChannelPartners.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
                        id,
                        ...rest,
                    }));
                    //setChannelPartnerData(newData);
                    setChannelPartnerData(staticVehicleFareMasterData);
                }
            } catch (error: any) {
                console.error('Error fetching Vehicle Fare Master data:', error.message);
            }
        };
        fetchChannelPartnerData();
    }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof VehicleFareMasterData;
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
                vehicleType = '',
                type = '',
                baseDailyFee = '',
                dailyExtraKMRate = '',
                dailyExtraTimeRate = '',
                baseRentalFee = '',
                rentalExtraKMRate = '',
                rentalExtraTimeRate = '',
                baseOutstationFeeOneWay = '',
                outstationExtraKMRateOneWay = '',
                outstationExtraTimeRateOneWay = '',
                outstationExtraKMRateTwoeWay = '',
                outstationExtraTimeRateTwoWay = '',
                status = '',
                features = '',
                vehicleIcon = '',
                conveyanceAvail = '',
                conveyanceCharge = '',
                taxApplicable = '',
                cgst = '',
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
                vehicleType?.toLowerCase().includes(searchString) ||
                type?.toLowerCase().includes(searchString) ||
                baseDailyFee?.toLowerCase().includes(searchString) ||
                dailyExtraKMRate?.toLowerCase().includes(searchString) ||
                dailyExtraTimeRate?.toLowerCase().includes(searchString) ||
                baseRentalFee?.toLowerCase().includes(searchString) ||
                rentalExtraKMRate?.toLowerCase().includes(searchString) ||
                rentalExtraTimeRate?.toLowerCase().includes(searchString) ||
                baseOutstationFeeOneWay?.toLowerCase().includes(searchString) ||
                outstationExtraKMRateOneWay?.toLowerCase().includes(searchString) ||
                outstationExtraTimeRateOneWay?.toLowerCase().includes(searchString) ||
                outstationExtraKMRateTwoeWay?.toLowerCase().includes(searchString) ||
                outstationExtraTimeRateTwoWay?.toLowerCase().includes(searchString) ||
                status?.toLowerCase().includes(searchString) ||
                features?.toLowerCase().includes(searchString) ||
                vehicleIcon?.toLowerCase().includes(searchString) ||
                conveyanceAvail?.toLowerCase().includes(searchString) ||
                conveyanceCharge?.toLowerCase().includes(searchString) ||
                taxApplicable?.toLowerCase().includes(searchString) ||
                cgst?.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<VehicleFareMasterData>[] = [
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
                                    const editUrl = `/TripModule/VehicleFareMaster/EditVehicleFareMaster/${rowData.id}`;
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
                                    const viewUrl = `/TripModule/VehicleFareMaster/ViewSpecificVehicleFareMaster/${rowData.id}`;
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

        { accessor: 'vehicleType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('vehicleType') },
        { accessor: 'type', title: 'type', sortable: true, hidden: hiddenColumns.includes('type') },
        { accessor: 'baseDailyFee', title: 'Base Daily Fee', sortable: true, hidden: hiddenColumns.includes('baseDailyFee') },
        { accessor: 'dailyExtraKMRate', title: 'Daily Extra KM Rate', sortable: true, hidden: hiddenColumns.includes('dailyExtraKMRate') },
        { accessor: 'dailyExtraTimeRate', title: 'Daily Extra Time Rate', sortable: true, hidden: hiddenColumns.includes('dailyExtraTimeRate') },
        { accessor: 'baseRentalFee', title: 'Base Rental Fee', sortable: true, hidden: hiddenColumns.includes('baseRentalFee') },
        { accessor: 'rentalExtraKMRate', title: 'Rental Extra KM Rate', sortable: true, hidden: hiddenColumns.includes('rentalExtraKMRate') },
        { accessor: 'rentalExtraTimeRate', title: 'Rental Extra Time Rate', sortable: true, hidden: hiddenColumns.includes('rentalExtraTimeRate') },
        { accessor: 'baseOutstationFeeOneWay', title: 'Base Outstation Fee One Way', sortable: true, hidden: hiddenColumns.includes('baseOutstationFeeOneWay') },
        { accessor: 'outstationExtraKMRateOneWay', title: 'Outstation Extra KM Rate One Way', sortable: true, hidden: hiddenColumns.includes('outstationExtraKMRateOneWay') },
        { accessor: 'outstationExtraTimeRateOneWay', title: 'Outstation Extra Time Rate One Way', sortable: true, hidden: hiddenColumns.includes('outstationExtraTimeRateOneWay') },
        { accessor: 'outstationExtraKMRateTwoeWay', title: 'Outstation Extra KM Rate Two Way', sortable: true, hidden: hiddenColumns.includes('outstationExtraKMRateTwoeWay') },
        { accessor: 'outstationExtraTimeRateTwoWay', title: 'Outstation Extra Time Rate Two Way', sortable: true, hidden: hiddenColumns.includes('outstationExtraTimeRateTwoWay') },
        { accessor: 'status', title: 'status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'vehicleIcon', title: 'Vehicle Icon', sortable: true, hidden: hiddenColumns.includes('vehicleIcon') },
        { accessor: 'conveyanceAvail', title: 'Conveyance Avail', sortable: true, hidden: hiddenColumns.includes('conveyanceAvail') },
        { accessor: 'conveyanceCharge', title: 'Conveyance Charge', sortable: true, hidden: hiddenColumns.includes('conveyanceCharge') },
        { accessor: 'taxApplicable', title: 'Tax Applicable', sortable: true, hidden: hiddenColumns.includes('taxApplicable') },
        { accessor: 'cgst', title: 'CGST', sortable: true, hidden: hiddenColumns.includes('cgst') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: VehicleFareMasterData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: VehicleFareMasterData[] = [];

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
            const editUrl = `/TripModule/VehicleFareMaster/EditVehicleFareMaster/${selectedRecords[0].id}`;
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
            label: 'Vehicle Fare Master',
            to: '/TripModule/VehicleFareMaster/ViewVehicleFareMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/VehicleFareMaster/ViewVehicleFareMaster' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TripModule/VehicleFareMaster/CreateVehicleFareMaster" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Vehicle Fare Master
                        </Link>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
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

export default ViewVehicleFareMaster;
