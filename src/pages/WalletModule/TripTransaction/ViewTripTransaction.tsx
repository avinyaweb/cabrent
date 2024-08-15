import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
// import { gettripTransactionData } from '@/services/ChannelPartnerService';
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

interface TripTransactionData {
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
    businessName: string;
    businessAddress: string;
    gst: string;
    pan: string;
    driverName: string;
    vehicleNumber: string;
    distributorName: string;
    serviceCity: string;
    serviceType: string;
    bookingType: string;
    vehicleType: string;
    leadSource: string;
    promoDiscount: string;
    totalDistance: string;
    totalTime: string;
    baseFare: string;
    extraKmCharge: string;
    extraTimeCharge: string;
    waitingTime: string;
    waitingCharge: string;
    pickupCharge: string;
    nightFare: string;
    driverNightConvenienceCharge: string;
    driverDayConvenienceCharge: string;
    travelAgencyDiscount: string;
    tollPermitParkingCharges: string;
    gstTax: string;
    totalCalculationTripCost: string;
    leadCharge: string;
    pgCharge: string;
    googleCharge: string;
    platformGSTtTax: string;
    roundOff: string;
    netPayableAmount: string;
    paymentMode: string;
    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    purpose: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    walletStatus: string;
    appTransactionId: string;
    platformTransactionId: string;
    bankVerification: string;
    bankLabel: string;
    walletTransactionId: string;
    virtualTransactionId: string;
    dateTime: string;
    walletProfileStatus: string;
    walletIdFromUser: string;
    walletIdToUser: string;
    source: string;
}

export const staticTripTransactionData = [
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
        businessName: 'Indian Travels',
        businessAddress: '456 Park Avenue, Mumbai',
        gst: 'GST0987654321',
        pan: 'ABCDE1234F',
        driverName: 'Rajesh Sharma',
        vehicleNumber: 'DL 02 CD 4567',
        distributorName: 'Mumbai Distributors',
        serviceCity: 'Mumbai',
        serviceType: 'Daily',
        bookingType: 'Online',
        vehicleType: 'Hatchback',
        leadSource: 'Website',
        promoDiscount: '5%',
        totalDistance: '30 km',
        totalTime: '1.5 hours',
        baseFare: '₹500',
        extraKmCharge: '₹10/km',
        extraTimeCharge: '₹5/min',
        waitingTime: '20 mins',
        waitingCharge: '₹15',
        pickupCharge: '₹10',
        nightFare: '₹30',
        driverNightConvenienceCharge: '₹10',
        driverDayConvenienceCharge: '₹5',
        travelAgencyDiscount: '10%',
        tollPermitParkingCharges: '₹20',
        gstTax: '₹25',
        totalCalculationTripCost: '₹450',
        leadCharge: '₹15',
        pgCharge: '₹10',
        googleCharge: '₹5',
        platformGSTtTax: '₹10',
        roundOff: '₹2',
        netPayableAmount: '₹500',
        paymentMode: 'Debit Card',
        fromUser: 'UserA',
        toUser: 'UserB',
        toUserPhoneNumber: '12345234523',
        purpose: 'Payment for services',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC001',
        bankAccountIFSCTo: 'IFSC002',
        walletStatus: 'Completed',
        appTransactionId: 'APP123456',
        platformTransactionId: 'PLT123456',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123456',
        virtualTransactionId: 'VT123456',
        dateTime: '2024-05-20T12:00:00Z',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID123',
        walletIdToUser: 'WID456',
        source: 'Mobile App',
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
        businessName: 'Indian Travels',
        businessAddress: '456 Park Avenue, Mumbai',
        gst: 'GST0987654321',
        pan: 'ABCDE1234F',
        driverName: 'Rajesh Sharma',
        vehicleNumber: 'DL 02 CD 4567',
        distributorName: 'Mumbai Distributors',
        serviceCity: 'Mumbai',
        serviceType: 'Daily',
        bookingType: 'Online',
        vehicleType: 'Hatchback',
        leadSource: 'Website',
        promoDiscount: '5%',
        totalDistance: '30 km',
        totalTime: '1.5 hours',
        baseFare: '₹500',
        extraKmCharge: '₹10/km',
        extraTimeCharge: '₹5/min',
        waitingTime: '20 mins',
        waitingCharge: '₹15',
        pickupCharge: '₹10',
        nightFare: '₹30',
        driverNightConvenienceCharge: '₹10',
        driverDayConvenienceCharge: '₹5',
        travelAgencyDiscount: '10%',
        tollPermitParkingCharges: '₹20',
        gstTax: '₹25',
        totalCalculationTripCost: '₹450',
        leadCharge: '₹15',
        pgCharge: '₹10',
        googleCharge: '₹5',
        platformGSTtTax: '₹10',
        roundOff: '₹2',
        netPayableAmount: '₹500',
        paymentMode: 'Debit Card',
        fromUser: 'UserA',
        toUser: 'UserB',
        toUserPhoneNumber: '12345234523',
        purpose: 'Payment for services',
        walletType: 'Digital',
        bankAccountIFSCFrom: 'IFSC001',
        bankAccountIFSCTo: 'IFSC002',
        walletStatus: 'Completed',
        appTransactionId: 'APP123456',
        platformTransactionId: 'PLT123456',
        bankVerification: 'Verified',
        bankLabel: 'Yes',
        walletTransactionId: 'WT123456',
        virtualTransactionId: 'VT123456',
        dateTime: '2024-05-20T12:00:00Z',
        walletProfileStatus: 'Active',
        walletIdFromUser: 'WID123',
        walletIdToUser: 'WID456',
        source: 'Mobile App',
        approvedBy: 'SuperAdmin',
        approvedAt: '2023-12-31',
        createdBy: 'Bob Brown',
        createdAt: '2023-11-20',
        updatedBy: 'Bob Brown',
        updatedAt: '2023-11-25',
    },
];

const ViewTripTransaction = ({ tabs }: { tabs: boolean }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tripTransactionData, settripTransactionData] = useState<TripTransactionData[]>(staticTripTransactionData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<TripTransactionData[]>([]);
    const [recordsData, setRecordsData] = useState<TripTransactionData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<TripTransactionData[]>([]);
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
    //     dispatch(setPageTitle('View Trips Transaction'));

    //     const fetchtripTransactionData = async () => {
    //         try {
    //             const { data } = await gettripTransactionData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id }: { _id: string }, ...rest: any) => ({
    //                     id: _id,
    //                     ...rest,
    //                 }));
    //                 //settripTransactionData(newData);
    //                 settripTransactionData(staticTripTransactionData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching Trips Invoice data:', error.message);
    //         }
    //     };
    //     fetchtripTransactionData();
    // }, [dispatch]);

    useEffect(() => {
        if (tripTransactionData.length > 0) {
            const sortedData = tripTransactionData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof TripTransactionData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [tripTransactionData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                bookingId = '',
                amount = '',
                businessName = '',
                businessAddress = '',
                gst = '',
                pan = '',
                driverName = '',
                vehicleNumber = '',
                distributorName = '',
                serviceCity = '',
                serviceType = '',
                bookingType = '',
                vehicleType = '',
                leadSource = '',
                promoDiscount = '',
                totalDistance = '',
                totalTime = '',
                baseFare = '',
                extraKmCharge = '',
                extraTimeCharge = '',
                waitingTime = '',
                waitingCharge = '',
                pickupCharge = '',
                nightFare = '',
                driverNightConvenienceCharge = '',
                driverDayConvenienceCharge = '',
                travelAgencyDiscount = '',
                tollPermitParkingCharges = '',
                gstTax = '',
                totalCalculationTripCost = '',
                leadCharge = '',
                pgCharge = '',
                googleCharge = '',
                platformGSTtTax = '',
                roundOff = '',
                netPayableAmount = '',
                paymentMode = '',

                fromUser = '',
                toUser = '',
                toUserPhoneNumber = '',
                purpose = '',
                walletType = '',
                bankAccountIFSCFrom = '',
                bankAccountIFSCTo = '',
                walletStatus = '',
                appTransactionId = '',
                platformTransactionId = '',
                bankVerification = '',
                bankLabel = '',
                walletTransactionId = '',
                virtualTransactionId = '',
                dateTime = '',
                walletProfileStatus = '',
                walletIdFromUser = '',
                walletIdToUser = '',

                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : '';

            return (
                id?.toLowerCase().includes(searchString) ||
                bookingId?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                businessName?.toLowerCase().includes(searchString) ||
                businessAddress?.toLowerCase().includes(searchString) ||
                gst?.toLowerCase().includes(searchString) ||
                pan?.toLowerCase().includes(searchString) ||
                driverName?.toLowerCase().includes(searchString) ||
                vehicleNumber?.toLowerCase().includes(searchString) ||
                distributorName?.toLowerCase().includes(searchString) ||
                serviceCity?.toLowerCase().includes(searchString) ||
                serviceType?.toLowerCase().includes(searchString) ||
                bookingType?.toLowerCase().includes(searchString) ||
                vehicleType?.toLowerCase().includes(searchString) ||
                leadSource?.toLowerCase().includes(searchString) ||
                promoDiscount?.toLowerCase().includes(searchString) ||
                totalDistance?.toLowerCase().includes(searchString) ||
                totalTime?.toLowerCase().includes(searchString) ||
                baseFare?.toLowerCase().includes(searchString) ||
                extraKmCharge?.toLowerCase().includes(searchString) ||
                extraTimeCharge?.toLowerCase().includes(searchString) ||
                waitingTime?.toLowerCase().includes(searchString) ||
                waitingCharge?.toLowerCase().includes(searchString) ||
                pickupCharge?.toLowerCase().includes(searchString) ||
                nightFare?.toLowerCase().includes(searchString) ||
                driverNightConvenienceCharge?.toLowerCase().includes(searchString) ||
                driverDayConvenienceCharge?.toLowerCase().includes(searchString) ||
                travelAgencyDiscount?.toLowerCase().includes(searchString) ||
                tollPermitParkingCharges?.toLowerCase().includes(searchString) ||
                gstTax?.toLowerCase().includes(searchString) ||
                totalCalculationTripCost?.toLowerCase().includes(searchString) ||
                leadCharge?.toLowerCase().includes(searchString) ||
                pgCharge?.toLowerCase().includes(searchString) ||
                googleCharge?.toLowerCase().includes(searchString) ||
                platformGSTtTax?.toLowerCase().includes(searchString) ||
                roundOff?.toLowerCase().includes(searchString) ||
                netPayableAmount?.toLowerCase().includes(searchString) ||
                paymentMode?.toLowerCase().includes(searchString) ||
                fromUser.toLowerCase().includes(searchString) ||
                toUser.toLowerCase().includes(searchString) ||
                toUserPhoneNumber.toLowerCase().includes(searchString) ||
                purpose.toLowerCase().includes(searchString) ||
                amount.toLowerCase().includes(searchString) ||
                walletType.toLowerCase().includes(searchString) ||
                bankAccountIFSCFrom.toLowerCase().includes(searchString) ||
                bankAccountIFSCTo.toLowerCase().includes(searchString) ||
                walletStatus.toLowerCase().includes(searchString) ||
                appTransactionId.toLowerCase().includes(searchString) ||
                platformTransactionId.toLowerCase().includes(searchString) ||
                bankVerification.toLowerCase().includes(searchString) ||
                bankLabel.toLowerCase().includes(searchString) ||
                walletTransactionId.toLowerCase().includes(searchString) ||
                virtualTransactionId.toLowerCase().includes(searchString) ||
                dateTime.toLowerCase().includes(searchString) ||
                distributorName.toLowerCase().includes(searchString) ||
                walletProfileStatus.toLowerCase().includes(searchString) ||
                walletIdFromUser.toLowerCase().includes(searchString) ||
                walletIdToUser.toLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<TripTransactionData>[] = [
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
                                    const viewUrl = `/WalletModule/TripTransaction/ViewSpecificTripTransaction/1`;
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
        { accessor: 'businessName', title: 'Business Name', sortable: true, hidden: hiddenColumns.includes('businessName') },
        { accessor: 'businessAddress', title: 'Business Address', sortable: true, hidden: hiddenColumns.includes('businessAddress') },
        { accessor: 'gst', title: 'GST', sortable: true, hidden: hiddenColumns.includes('gst') },
        { accessor: 'pan', title: 'PAN', sortable: true, hidden: hiddenColumns.includes('pan') },
        { accessor: 'driverName', title: 'Driver Name', sortable: true, hidden: hiddenColumns.includes('driverName') },
        { accessor: 'vehicleNumber', title: 'Vehicle Number', sortable: true, hidden: hiddenColumns.includes('vehicleNumber') },
        { accessor: 'distributorName', title: 'Distributor Name', sortable: true, hidden: hiddenColumns.includes('distributorName') },
        { accessor: 'serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('serviceCity') },
        { accessor: 'serviceType', title: 'Service Type', sortable: true, hidden: hiddenColumns.includes('serviceType') },
        { accessor: 'bookingType', title: 'Booking Type', sortable: true, hidden: hiddenColumns.includes('bookingType') },
        { accessor: 'vehicleType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('vehicleType') },
        { accessor: 'leadSource', title: 'Lead Source', sortable: true, hidden: hiddenColumns.includes('leadSource') },
        { accessor: 'promoDiscount', title: 'Promo Discount', sortable: true, hidden: hiddenColumns.includes('promoDiscount') },
        { accessor: 'totalDistance', title: 'Total Distance', sortable: true, hidden: hiddenColumns.includes('totalDistance') },
        { accessor: 'totalTime', title: 'Total Time', sortable: true, hidden: hiddenColumns.includes('totalTime') },
        { accessor: 'baseFare', title: 'Base Fare', sortable: true, hidden: hiddenColumns.includes('baseFare') },
        { accessor: 'extraKmCharge', title: 'Extra Km Charge', sortable: true, hidden: hiddenColumns.includes('extraKmCharge') },
        { accessor: 'extraTimeCharge', title: 'Extra Time Charge', sortable: true, hidden: hiddenColumns.includes('extraTimeCharge') },
        { accessor: 'waitingTime', title: 'Waiting Time', sortable: true, hidden: hiddenColumns.includes('waitingTime') },
        { accessor: 'waitingCharge', title: 'Waiting Charge', sortable: true, hidden: hiddenColumns.includes('waitingCharge') },
        { accessor: 'pickupCharge', title: 'Pickup Charge', sortable: true, hidden: hiddenColumns.includes('pickupCharge') },
        { accessor: 'nightFare', title: 'Night Fare', sortable: true, hidden: hiddenColumns.includes('nightFare') },
        { accessor: 'driverNightConvenienceCharge', title: 'Driver Night Convenience Charge', sortable: true, hidden: hiddenColumns.includes('driverNightConvenienceCharge') },
        { accessor: 'driverDayConvenienceCharge', title: 'Driver Day Convenience Charge', sortable: true, hidden: hiddenColumns.includes('driverDayConvenienceCharge') },
        { accessor: 'travelAgencyDiscount', title: 'Travel Agency Discount', sortable: true, hidden: hiddenColumns.includes('travelAgencyDiscount') },
        { accessor: 'tollPermitParkingCharges', title: 'Toll Permit Parking Charges', sortable: true, hidden: hiddenColumns.includes('tollPermitParkingCharges') },
        { accessor: 'gstTax', title: 'GST Tax', sortable: true, hidden: hiddenColumns.includes('gstTax') },
        { accessor: 'totalCalculationTripCost', title: 'Total Calculation Trip Cost', sortable: true, hidden: hiddenColumns.includes('totalCalculationTripCost') },
        { accessor: 'leadCharge', title: 'Lead Charge', sortable: true, hidden: hiddenColumns.includes('leadCharge') },
        { accessor: 'pgCharge', title: 'PG Charge', sortable: true, hidden: hiddenColumns.includes('pgCharge') },
        { accessor: 'googleCharge', title: 'Google Charge', sortable: true, hidden: hiddenColumns.includes('googleCharge') },
        { accessor: 'platformGSTtTax', title: 'Platform GST Tax', sortable: true, hidden: hiddenColumns.includes('platformGSTtTax') },
        { accessor: 'roundOff', title: 'Round Off', sortable: true, hidden: hiddenColumns.includes('roundOff') },
        { accessor: 'netPayableAmount', title: 'Net Payable Amount', sortable: true, hidden: hiddenColumns.includes('netPayableAmount') },
        { accessor: 'paymentMode', title: 'Payment Mode', sortable: true, hidden: hiddenColumns.includes('paymentMode') },

        { accessor: 'fromUser', title: 'From User', sortable: true, hidden: hiddenColumns.includes('fromUser') },
        { accessor: 'toUser', title: 'To User', sortable: true, hidden: hiddenColumns.includes('toUser') },
        { accessor: 'toUserPhoneNumber', title: 'To User Phone Number', sortable: true, hidden: hiddenColumns.includes('toUserPhoneNumber') },
        { accessor: 'userId', title: 'User ID', sortable: true, hidden: hiddenColumns.includes('userId') },
        { accessor: 'purpose', title: 'Purpose', sortable: true, hidden: hiddenColumns.includes('purpose') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'walletType', title: 'Wallet Type', sortable: true, hidden: hiddenColumns.includes('walletType') },
        { accessor: 'bankAccountIFSCFrom', title: 'Bank Account IFSC (From)', sortable: true, hidden: hiddenColumns.includes('bankAccountIFSCFrom') },
        { accessor: 'bankAccountIFSCTo', title: 'Bank Account IFSC (To)', sortable: true, hidden: hiddenColumns.includes('bankAccountIFSCTo') },
        { accessor: 'pgTransactionId', title: 'PG Transaction ID', sortable: true, hidden: hiddenColumns.includes('pgTransactionId') },
        { accessor: 'transactionMode', title: 'Transaction Mode', sortable: true, hidden: hiddenColumns.includes('transactionMode') },
        { accessor: 'walletStatus', title: 'Wallet Status', sortable: true, hidden: hiddenColumns.includes('walletStatus') },
        { accessor: 'appTransactionId', title: 'App Transaction ID', sortable: true, hidden: hiddenColumns.includes('appTransactionId') },
        { accessor: 'platformTransactionId', title: 'Platform Transaction ID', sortable: true, hidden: hiddenColumns.includes('platformTransactionId') },
        { accessor: 'bankVerification', title: 'Bank Verification', sortable: true, hidden: hiddenColumns.includes('bankVerification') },
        { accessor: 'bankLabel', title: 'Bank Label', sortable: true, hidden: hiddenColumns.includes('bankLabel') },
        { accessor: 'walletTransactionId', title: 'Wallet Transaction ID', sortable: true, hidden: hiddenColumns.includes('walletTransactionId') },
        { accessor: 'virtualTransactionId', title: 'Virtual Transaction ID', sortable: true, hidden: hiddenColumns.includes('virtualTransactionId') },
        { accessor: 'paymentStatus', title: 'Payment Status', sortable: true, hidden: hiddenColumns.includes('paymentStatus') },
        { accessor: 'dateTime', title: 'Date and Time', sortable: true, hidden: hiddenColumns.includes('dateTime') },
        { accessor: 'distributorName', title: 'Distribution Name', sortable: true, hidden: hiddenColumns.includes('distributorName') },
        { accessor: 'walletProfileStatus', title: 'Wallet Profile Status', sortable: true, hidden: hiddenColumns.includes('walletProfileStatus') },
        { accessor: 'walletIdFromUser', title: 'Wallet ID (From User)', sortable: true, hidden: hiddenColumns.includes('walletIdFromUser') },
        { accessor: 'walletIdToUser', title: 'Wallet ID (To User)', sortable: true, hidden: hiddenColumns.includes('walletIdToUser') },
        { accessor: 'source', title: 'Source', sortable: true, hidden: hiddenColumns.includes('source') },

        { accessor: 'driverId', title: 'Driver ID', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'ServiceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('ServiceCity') }, // Add Driver ID column
        { accessor: 'vehicleId', title: 'Vehicle ID', sortable: true, hidden: hiddenColumns.includes('vehicleId') }, // Add Vehicle ID column
        { accessor: 'fromLocation', title: 'From Location', sortable: true, hidden: hiddenColumns.includes('fromLocation') }, // Add From Location column
        { accessor: 'tripStatus', title: 'Trip Status', sortable: true, hidden: hiddenColumns.includes('tripStatus') }, // Add Trip Status column
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: TripTransactionData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: TripTransactionData[] = [];

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
            label: 'Trip Transaction',
            to: '/TripModule/TripsInvoice/ViewTripTransaction',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/TripsInvoice/ViewTripTransaction' ? 'text-blue-600' : ''
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
                        totalRecords={tripTransactionData.length}
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

export default ViewTripTransaction;
