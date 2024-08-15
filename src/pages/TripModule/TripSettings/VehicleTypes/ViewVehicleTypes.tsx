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
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { getAllCity } from '@/services/RolesService';

interface VehicleTypesData {
    id: string;
    vehicleType: string;
    serviceType: string;
    displayOrder: string;
    tripType: string;
    seatCapacity: string;
    fk_serviceCity: string;
    lowCatVehicle: string;
    baseFee: string;
    leadCharge: string;
    perKMRate: string;
    minimumFare: string;
    commision: string;
    timeMinRate: string;
    rideLater: string;
    isVehAvailable: string;
    description: string;
    features: string;
    vehicleIcon: string;
    conveyanceAvail: string;
    conveyanceCharge: string;
    taxApplicable: string;
    cgst: string;
    sgst: string;
    cancelChargeDriver: string;
    cancelChargeRider: string;
    peakHourStart: string;
    peakHourEnd: string;
    peakFareIncrease: string;
    peakHourStart2: string;
    peakHourEnd2: string;
    peakFare2Increase: string;
    nightHourStart: string;
    nightHourEnd: string;
    nightIncreseFare: string;
    isWaitCharge: string;
    beforeTripWaitChargeApplicable: string;
    maxWaitTime: string;
    minWaitTimeBeforeTrip: string;
    waitChargePerMin: string;
    waitingRate: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;

    //booking amt dist
    actualTripCost: string;
    leadCharges1: string;
    leadCharges2: string;
    convinenceCharge: string;
    adminCharge: string;
    tax: string;
    techCharges: string;
    promotionDiscount: string;
    SPDiscount: string;
}

export const staticVehicleTypesData = [
    {
        id: '1',
        vehicleType: 'Sedan',
        serviceType: 'sample',
        displayOrder: '1',
        tripType: 'One-way',
        seatCapacity: '4',
        fk_serviceCity: 'CityA',
        lowCatVehicle: 'No',
        baseFee: '10.00',
        leadCharge: '5.00',
        perKMRate: '0.50',
        minimumFare: '15.00',
        commision: '0.10',
        timeMinRate: '0.20',
        rideLater: 'Yes',
        isVehAvailable: 'Yes',
        description: 'Comfortable sedan car',
        features: 'AC, Radio, Bluetooth',
        vehicleIcon: 'sedan-icon.png',
        conveyanceAvail: 'Yes',
        conveyanceCharge: '20.00',
        taxApplicable: 'Yes',
        cgst: '5%',
        sgst: '5%',
        cancelChargeDriver: '10.00',
        cancelChargeRider: '5.00',
        peakHourStart: '18:00',
        peakHourEnd: '22:00',
        peakFareIncrease: '1.50',
        peakHourStart2: '07:00',
        peakHourEnd2: '09:00',
        peakFare2Increase: '1.20',
        nightHourStart: '23:00',
        nightHourEnd: '05:00',
        nightIncreseFare: '2.00',
        isWaitCharge: 'Yes',
        beforeTripWaitChargeApplicable: 'No',
        maxWaitTime: '30',
        minWaitTimeBeforeTrip: '10',
        waitChargePerMin: '0.25',
        waitingRate: '0.15',
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

        actualTripCost: '150.00',
        leadCharges1: '25.00',
        leadCharges2: '30.00',
        convinenceCharge: '5.00',
        adminCharge: '8.00',
        tax: '20.00',
        techCharges: '15.00',
        promotionDiscount: '10.00',
        SPDiscount: '7.50',
    },
    {
        id: '2',
        vehicleType: 'SUV',
        serviceType: 'sample',
        displayOrder: '2',
        tripType: 'Round-trip',
        seatCapacity: '7',
        fk_serviceCity: 'CityB',
        lowCatVehicle: 'Yes',
        baseFee: '15.00',
        leadCharge: '7.50',
        perKMRate: '0.60',
        minimumFare: '20.00',
        commision: '0.12',
        timeMinRate: '0.25',
        rideLater: 'No',
        isVehAvailable: 'Yes',
        description: 'Spacious SUV with extra legroom',
        features: '4WD, Sunroof, Entertainment System',
        vehicleIcon: 'suv-icon.png',
        conveyanceAvail: 'No',
        conveyanceCharge: '0.00',
        taxApplicable: 'Yes',
        cgst: '6%',
        sgst: '6%',
        cancelChargeDriver: '12.00',
        cancelChargeRider: '6.50',
        peakHourStart: '17:00',
        peakHourEnd: '21:00',
        peakFareIncrease: '1.80',
        peakHourStart2: '08:00',
        peakHourEnd2: '10:00',
        peakFare2Increase: '1.30',
        nightHourStart: '22:00',
        nightHourEnd: '04:00',
        nightIncreseFare: '2.50',
        isWaitCharge: 'Yes',
        beforeTripWaitChargeApplicable: 'Yes',
        maxWaitTime: '45',
        minWaitTimeBeforeTrip: '15',
        waitChargePerMin: '0.30',
        waitingRate: '0.20',
        archive: 'Yes',
        approvedBy: '',
        approvedAt: '',
        createdBy: 'Bob Brown',
        createdAt: '2023-11-20',
        updatedBy: 'Bob Brown',
        updatedAt: '2023-11-25',

        actualTripCost: '150.00',
        leadCharges1: '25.00',
        leadCharges2: '30.00',
        convinenceCharge: '5.00',
        adminCharge: '8.00',
        tax: '20.00',
        techCharges: '15.00',
        promotionDiscount: '10.00',
        SPDiscount: '7.50',
    },
];

const ViewVehicleTypes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [VehicleTypesData, setVehicleTypesData] = useState<VehicleTypesData[]>(staticVehicleTypesData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<VehicleTypesData[]>([]);
    const [recordsData, setRecordsData] = useState<VehicleTypesData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<VehicleTypesData[]>([]);
    const [search, setSearch] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
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

    // date sort
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Dynamic Data
    // useEffect(() => {
    //     dispatch(setPageTitle('View Vehicle Types'));

    //     const fetchVehicleTypesData = async () => {
    //         try {
    //             const { data } = await getVehicleTypesData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 //setVehicleTypesData(newData);
    //                 setVehicleTypesData(staticVehicleTypesData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching Vehicle Types data:', error.message);
    //         }
    //     };
    //     fetchVehicleTypesData();
    // }, [dispatch]);

    useEffect(() => {
        if (VehicleTypesData.length > 0) {
            const sortedData = VehicleTypesData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof VehicleTypesData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [VehicleTypesData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                vehicleType = '',
                serviceType = '',
                displayOrder = '',
                tripType = '',
                seatCapacity = '',
                fk_serviceCity = '',
                lowCatVehicle = '',
                baseFee = '',
                leadCharge = '',
                perKMRate = '',
                minimumFare = '',
                commision = '',
                timeMinRate = '',
                rideLater = '',
                isVehAvailable = '',
                description = '',
                features = '',
                vehicleIcon = '',
                conveyanceAvail = '',
                conveyanceCharge = '',
                taxApplicable = '',
                cgst = '',
                sgst = '',
                cancelChargeDriver = '',
                cancelChargeRider = '',
                peakHourStart = '',
                peakHourEnd = '',
                peakFareIncrease = '',
                peakHourStart2 = '',
                peakHourEnd2 = '',
                peakFare2Increase = '',
                nightHourStart = '',
                nightHourEnd = '',
                nightIncreseFare = '',
                isWaitCharge = '',
                beforeTripWaitChargeApplicable = '',
                maxWaitTime = '',
                minWaitTimeBeforeTrip = '',
                waitChargePerMin = '',
                waitingRate = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',

                actualTripCost = '',
                leadCharges1 = '',
                leadCharges2 = '',
                convinenceCharge = '',
                adminCharge = '',
                tax = '',
                techCharges = '',
                promotionDiscount = '',
                SPDiscount = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                vehicleType?.toLowerCase().includes(searchString) ||
                serviceType?.toLowerCase().includes(searchString) ||
                displayOrder?.toLowerCase().includes(searchString) ||
                tripType?.toLowerCase().includes(searchString) ||
                seatCapacity?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                lowCatVehicle?.toLowerCase().includes(searchString) ||
                baseFee?.toLowerCase().includes(searchString) ||
                leadCharge?.toLowerCase().includes(searchString) ||
                perKMRate?.toLowerCase().includes(searchString) ||
                minimumFare?.toLowerCase().includes(searchString) ||
                commision?.toLowerCase().includes(searchString) ||
                timeMinRate?.toLowerCase().includes(searchString) ||
                rideLater?.toLowerCase().includes(searchString) ||
                isVehAvailable?.toLowerCase().includes(searchString) ||
                description?.toLowerCase().includes(searchString) ||
                features?.toLowerCase().includes(searchString) ||
                vehicleIcon?.toLowerCase().includes(searchString) ||
                conveyanceAvail?.toLowerCase().includes(searchString) ||
                conveyanceCharge?.toLowerCase().includes(searchString) ||
                taxApplicable?.toLowerCase().includes(searchString) ||
                cgst?.toLowerCase().includes(searchString) ||
                sgst?.toLowerCase().includes(searchString) ||
                cancelChargeDriver?.toLowerCase().includes(searchString) ||
                cancelChargeRider?.toLowerCase().includes(searchString) ||
                peakHourStart?.toLowerCase().includes(searchString) ||
                peakHourEnd?.toLowerCase().includes(searchString) ||
                peakFareIncrease?.toLowerCase().includes(searchString) ||
                peakHourStart2?.toLowerCase().includes(searchString) ||
                peakHourEnd2?.toLowerCase().includes(searchString) ||
                peakFare2Increase?.toLowerCase().includes(searchString) ||
                nightHourStart?.toLowerCase().includes(searchString) ||
                nightHourEnd?.toLowerCase().includes(searchString) ||
                nightIncreseFare?.toLowerCase().includes(searchString) ||
                isWaitCharge?.toLowerCase().includes(searchString) ||
                beforeTripWaitChargeApplicable?.toLowerCase().includes(searchString) ||
                maxWaitTime?.toLowerCase().includes(searchString) ||
                minWaitTimeBeforeTrip?.toLowerCase().includes(searchString) ||
                waitChargePerMin?.toLowerCase().includes(searchString) ||
                waitingRate?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                actualTripCost?.toLowerCase().includes(searchString) ||
                leadCharges1?.toLowerCase().includes(searchString) ||
                leadCharges2?.toLowerCase().includes(searchString) ||
                convinenceCharge?.toLowerCase().includes(searchString) ||
                adminCharge?.toLowerCase().includes(searchString) ||
                tax?.toLowerCase().includes(searchString) ||
                techCharges?.toLowerCase().includes(searchString) ||
                promotionDiscount?.toLowerCase().includes(searchString) ||
                SPDiscount?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<VehicleTypesData>[] = [
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
                                    const editUrl = `/TripModule/TripSettings/VehicleType/EditVehicleTypes/${rowData.id}`;
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
                                    const viewUrl = `/TripModule/TripSettings/VehicleType/ViewSpecificVehicleTypes/${rowData.id}`;
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
        { accessor: 'serviceType', title: 'Service Type', sortable: true, hidden: hiddenColumns.includes('serviceType') },
        { accessor: 'displayOrder', title: 'Display Order', sortable: true, hidden: hiddenColumns.includes('displayOrder') },
        { accessor: 'tripType', title: 'Trip Type', sortable: true, hidden: hiddenColumns.includes('tripType') },
        { accessor: 'seatCapacity', title: 'Seat Capacity', sortable: true, hidden: hiddenColumns.includes('seatCapacity') },
        { accessor: 'fk_serviceCity', title: 'service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'lowCatVehicle', title: 'Low Cat Vehicle', sortable: true, hidden: hiddenColumns.includes('lowCatVehicle') },
        { accessor: 'baseFee', title: 'Base Fee', sortable: true, hidden: hiddenColumns.includes('baseFee') },
        { accessor: 'leadCharge', title: 'Lead Charge', sortable: true, hidden: hiddenColumns.includes('leadCharge') },
        { accessor: 'perKMRate', title: 'Per KM Rate', sortable: true, hidden: hiddenColumns.includes('perKMRate') },
        { accessor: 'minimumFare', title: 'Minimum Fare', sortable: true, hidden: hiddenColumns.includes('minimumFare') },
        { accessor: 'commision', title: 'Commision', sortable: true, hidden: hiddenColumns.includes('commision') },
        { accessor: 'timeMinRate', title: 'Time Min Rate', sortable: true, hidden: hiddenColumns.includes('timeMinRate') },
        { accessor: 'rideLater', title: 'Ride Later', sortable: true, hidden: hiddenColumns.includes('rideLater') },
        { accessor: 'isVehAvailable', title: 'Is Veh Available', sortable: true, hidden: hiddenColumns.includes('isVehAvailable') },
        { accessor: 'description', title: 'Description', sortable: true, hidden: hiddenColumns.includes('description') },
        { accessor: 'features', title: 'Features', sortable: true, hidden: hiddenColumns.includes('features') },
        { accessor: 'vehicleIcon', title: 'Vehicle Icon', sortable: true, hidden: hiddenColumns.includes('vehicleIcon') },
        { accessor: 'conveyanceAvail', title: 'Conveyance Avail', sortable: true, hidden: hiddenColumns.includes('conveyanceAvail') },
        { accessor: 'conveyanceCharge', title: 'Conveyance Charge', sortable: true, hidden: hiddenColumns.includes('conveyanceCharge') },
        { accessor: 'taxApplicable', title: 'Tax Applicable', sortable: true, hidden: hiddenColumns.includes('taxApplicable') },
        { accessor: 'cgst', title: 'CGST', sortable: true, hidden: hiddenColumns.includes('cgst') },
        { accessor: 'sgst', title: 'SGST', sortable: true, hidden: hiddenColumns.includes('sgst') },
        { accessor: 'cancelChargeDriver', title: 'Cancel Charge Driver', sortable: true, hidden: hiddenColumns.includes('cancelChargeDriver') },
        { accessor: 'cancelChargeRider', title: 'Cancel Charge Rider', sortable: true, hidden: hiddenColumns.includes('cancelChargeRider') },
        { accessor: 'peakHourStart', title: 'Peak Hour Start', sortable: true, hidden: hiddenColumns.includes('peakHourStart') },
        { accessor: 'peakHourEnd', title: 'Peak Hour End', sortable: true, hidden: hiddenColumns.includes('peakHourEnd') },
        { accessor: 'peakFareIncrease', title: 'Peak Fare Increase', sortable: true, hidden: hiddenColumns.includes('peakFareIncrease') },
        { accessor: 'peakHourStart2', title: 'Peak Hour Start 2', sortable: true, hidden: hiddenColumns.includes('peakHourStart2') },
        { accessor: 'peakHourEnd2', title: 'Peak Hour End 2', sortable: true, hidden: hiddenColumns.includes('peakHourEnd2') },
        { accessor: 'peakFare2Increase', title: 'Peak Fare2 Increase', sortable: true, hidden: hiddenColumns.includes('peakFare2Increase') },
        { accessor: 'nightHourStart', title: 'Night Hour Start', sortable: true, hidden: hiddenColumns.includes('nightHourStart') },
        { accessor: 'nightHourEnd', title: 'Night Hour End', sortable: true, hidden: hiddenColumns.includes('nightHourEnd') },
        { accessor: 'nightIncreseFare', title: 'Night Increse Fare', sortable: true, hidden: hiddenColumns.includes('nightIncreseFare') },
        { accessor: 'isWaitCharge', title: 'Is Wait Charge', sortable: true, hidden: hiddenColumns.includes('isWaitCharge') },
        { accessor: 'beforeTripWaitChargeApplicable', title: 'Before Trip Wait Charge Applicable', sortable: true, hidden: hiddenColumns.includes('beforeTripWaitChargeApplicable') },
        { accessor: 'maxWaitTime', title: 'maxWaitTime', sortable: true, hidden: hiddenColumns.includes('maxWaitTime') },
        { accessor: 'minWaitTimeBeforeTrip', title: 'Min Wait Time Before Trip', sortable: true, hidden: hiddenColumns.includes('minWaitTimeBeforeTrip') },
        { accessor: 'waitChargePerMin', title: 'Wait Charge Per Min', sortable: true, hidden: hiddenColumns.includes('waitChargePerMin') },
        { accessor: 'waitingRate', title: 'Waiting Rate', sortable: true, hidden: hiddenColumns.includes('waitingRate') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },

        { accessor: 'actualTripCost', title: 'Actual Trip Cost', sortable: true, hidden: hiddenColumns.includes('actualTripCost') },
        { accessor: 'leadCharges1', title: 'Lead Charges 1', sortable: true, hidden: hiddenColumns.includes('leadCharges1') },
        { accessor: 'leadCharges2', title: 'Lead Charges 2', sortable: true, hidden: hiddenColumns.includes('leadCharges2') },
        { accessor: 'convinenceCharge', title: 'Convinence Charge', sortable: true, hidden: hiddenColumns.includes('convinenceCharge') },
        { accessor: 'adminCharge', title: 'Admin Charge', sortable: true, hidden: hiddenColumns.includes('adminCharge') },
        { accessor: 'tax', title: 'Tax', sortable: true, hidden: hiddenColumns.includes('tax') },
        { accessor: 'techCharges', title: 'Tech Charges', sortable: true, hidden: hiddenColumns.includes('techCharges') },
        { accessor: 'promotionDiscount', title: 'Promotion Discount', sortable: true, hidden: hiddenColumns.includes('promotionDiscount') },
        { accessor: 'SPDiscount', title: 'SP Discount', sortable: true, hidden: hiddenColumns.includes('SPDiscount') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: VehicleTypesData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: VehicleTypesData[] = [];

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
            const editUrl = `/TripModule/VehicleTypes/EditVehicleTypes/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete') {
            const confirmDelete = window.confirm('Do you really want to delete this ticket?');
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
            label: 'Vehicle Types',
            to: '/TripModule/VehicleTypes/ViewVehicleTypes',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/VehicleTypes/ViewVehicleTypes' ? 'text-blue-600' : ''
            }`,
        },
    ];

    //future code
    // const [city, setCity] = useState(VehicleTypesData.fk_serviceCity);
    const [cityOption, setCityOption] = useState<any[]>([]);

    const getAllServiceCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllServiceCityData();
    }, []);

    //future things
    // const handleServiceCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setCity(value);
    //     onInputChange({
    //         target: {
    //             name: 'fk_serviceCity',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TripModule/TripSettings/VehicleType/CreateVehicleTypes" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            <span className="text-[13px]">Create Vehicle Types</span>
                        </Link>
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
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">EDIT</option>
                            <option value="delete">DELETE</option>
                        </select>
                    </div>
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={VehicleTypesData.fk_serviceCity} onChange={handleServiceCityTypeChange}>
                            <option value="">Select Service city</option>
                            {cityOption.map((data) => {
                                return <option value={data.cityName}>{data?.cityName}</option>;
                            })}
                        </select>
                    </div> */}

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
                        totalRecords={VehicleTypesData.length}
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

export default ViewVehicleTypes;
