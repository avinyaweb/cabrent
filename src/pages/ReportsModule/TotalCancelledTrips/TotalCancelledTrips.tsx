import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import CancelledTripsChart from '@/components/ChartAndGraph/ReportsChartAndGraph/CancelledTripCharts/CancelledTripsChart';
import { downloadExcel } from '@/utils/Excel';

interface TripsData {
    id: string;
    driverId: string;
    vehicleId: string;
    diverPhone: string;
    userId: string;
    userPhone: string;
    fromLocation: string;
    tripStatus: string;
    expectedDuration: string;
    actualDuration: string;
    distance: string;
    startTime: string;
    endTime: string;
    rideType: string;
    chargeExtraKM: string;
    extraTime: string;
    driverFacialVerificationStatus: string;
    expectedDriverArrivalTime: string;
    actualDriverArrivalTime: string;
    expectedDriverArrivalDuration: string;
    actualDriverArrivalDuration: string;
    pickupLocation: string;
    dropLocation: string;
    intermediateStop: string;
    routeDirection: string;
    realTimelocation: string;
    waitingTimeDuration: string;
    bookingAmtDistribution: string;
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
    serviceType: string;
    leadSource: string;
    promocode: string;
    reviews: string;
    coupon: string;
    tickets: string;
    fk_Servicecity: string;
    fk_vehicleType: string;
    driverProfilePic: string;
    driverSince: string;
    driverName: string;
    vehicleNumber: string;
    vehicleModel: string;
    riderratings: string;
    riderName: string;
    riderSince: string;
    riderProfilePic: string;
    estimationFareDetails: string;
    requerstedTime: string;
    acceptedTime: string;
    calls: string;
    messages: string;
    isUserTrackedDriver: string;
    paymentMode: string;
    discount: string;
    convenienceCharge: string;
    isInvoiceShared: string;
    vehicleRatings: string;
    driverAssignmentByType: string;
    driverAssignmentBy: string;
    driverratings: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    businessName: string;
    businessAddress: string;
    gst: string;
    pan: string;
    distributorName: string;
    serviceCity: string;
    vehicleType: string;
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
}

export const staticTripsData = [
    {
        id: '1',
        driverId: 'D123',
        vehicleId: 'V456',
        diverPhone: '+911234567890',
        fk_Servicecity: 'Delhi',
        fk_vehicleType: 'Sedan',
        driverProfilePic: 'http://example.com/driver1.jpg',
        driverSince: '2022-01-01',
        driverName: 'Rajesh Kumar',
        vehicleNumber: 'DL1234',
        vehicleModel: 'Maruti Suzuki Swift',
        riderratings: '4.3',
        riderName: 'Priya Sharma',
        riderSince: '2023-05-15',
        riderProfilePic: 'http://example.com/rider1.jpg',
        estimationFareDetails: '₹200',
        requerstedTime: '2024-05-13T09:00:00',
        acceptedTime: '2024-05-13T09:05:00',
        calls: '2',
        messages: '5',
        isUserTrackedDriver: 'true',
        paymentMode: 'Credit Card',
        discount: '10%',
        convenienceCharge: '₹20',
        isInvoiceShared: 'true',
        vehicleRatings: '4.2',
        userId: 'U789',
        userPhone: '+919876543210',
        fromLocation: 'New Delhi',
        tripStatus: 'Completed',
        expectedDuration: '30 mins',
        actualDuration: '35 mins',
        distance: '10 km',
        startTime: '2024-05-13T09:10:00',
        endTime: '2024-05-13T09:45:00',
        rideType: 'Regular',
        chargeExtraKM: '₹10/km',
        extraTime: '₹5/min',
        driverFacialVerificationStatus: 'Verified',
        expectedDriverArrivalTime: '2024-05-13T09:00:00',
        actualDriverArrivalTime: '2024-05-13T09:05:00',
        expectedDriverArrivalDuration: '5 mins',
        actualDriverArrivalDuration: '5 mins',
        driverAssignmentByType: 'Automatic',
        driverAssignmentBy: 'System',
        driverratings: '4.7',
        pickupLocation: 'Connaught Place',
        dropLocation: 'India Gate',
        intermediateStop: 'none',
        routeDirection: 'To Destination',
        realTimelocation: 'Latitude: 28.6139, Longitude: 77.2090',
        waitingTimeDuration: '10 mins',
        bookingAmtDistribution: '₹150 to Driver, ₹50 to Service',
        bookingInitiationTime: '2024-05-13T08:50:00',
        bookingConfirmedTime: '2024-05-13T08:55:00',
        bookingCancelledTime: '',
        bookingCancelledBy: '',
        cancellationReason: '',
        bookingConfirmedHistory: 'Confirmed by User',
        bookingCancelledHistory: '',
        isDestinationChanged: 'false',
        changedDestination: '',
        paymentHistory: '₹200 Paid',
        isSOSUsed: 'false',
        SOSTimestamp: '',
        paymentStatus: 'Paid',
        charges: '₹200',
        otpVerification: 'Completed',
        status: 'Completed',
        bookingMode: 'Online',
        additionalCharges: '₹30',
        acAvailable: 'true',
        bookingType: 'One-Way',
        serviceType: 'Premium',
        leadSource: 'App',
        promocode: 'SUMMER25',
        reviews: 'Positive',
        coupon: 'IND123',
        tickets: 'T789',
        archive: 'false',
        approvedBy: 'Admin',
        approvedAt: '2024-05-13T10:00:00',
        createdBy: 'User',
        createdAt: '2024-05-13T08:45:00',
        updatedBy: 'System',
        updatedAt: '2024-05-13T10:05:00',

        businessName: 'Indian Travels',
        businessAddress: '456 Park Avenue, Mumbai',
        gst: 'GST0987654321',
        pan: 'ABCDE1234F',
        distributorName: 'Mumbai Distributors',
        serviceCity: 'Mumbai',
        vehicleType: 'Hatchback',
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
    },
    {
        id: '2',
        driverId: 'D234',
        vehicleId: 'V567',
        diverPhone: '+911234567891',
        fk_Servicecity: 'Mumbai',
        fk_vehicleType: 'SUV',
        driverProfilePic: 'http://example.com/driver2.jpg',
        driverSince: '2021-12-01',
        driverName: 'Amit Patel',
        vehicleNumber: 'MH4567',
        vehicleModel: 'Hyundai Creta',
        riderratings: '4.5',
        riderName: 'Anjali Desai',
        riderSince: '2023-04-20',
        riderProfilePic: 'http://example.com/rider2.jpg',
        estimationFareDetails: '₹300',
        requerstedTime: '2024-05-13T10:30:00',
        acceptedTime: '2024-05-13T10:35:00',
        calls: '3',
        messages: '8',
        isUserTrackedDriver: 'true',
        paymentMode: 'Cash',
        discount: '15%',
        convenienceCharge: '₹25',
        isInvoiceShared: 'true',
        vehicleRatings: '4.8',
        userId: 'U987',
        userPhone: '+919876543211',
        fromLocation: 'Bandra',
        tripStatus: 'Ongoing',
        expectedDuration: '45 mins',
        actualDuration: '40 mins',
        distance: '15 km',
        startTime: '2024-05-13T10:40:00',
        endTime: '2024-05-13T11:30:00',
        rideType: 'Regular',
        chargeExtraKM: '₹12/km',
        extraTime: '₹6/min',
        driverFacialVerificationStatus: 'Verified',
        expectedDriverArrivalTime: '2024-05-13T10:30:00',
        actualDriverArrivalTime: '2024-05-13T10:35:00',
        expectedDriverArrivalDuration: '5 mins',
        actualDriverArrivalDuration: '5 mins',
        driverAssignmentByType: 'Manual',
        driverAssignmentBy: 'Admin',
        driverratings: '4.9',
        pickupLocation: 'Juhu Beach',
        dropLocation: 'Gateway of India',
        intermediateStop: 'none',
        routeDirection: 'To Destination',
        realTimelocation: 'Latitude: 19.0759, Longitude: 72.8777',
        waitingTimeDuration: '15 mins',
        bookingAmtDistribution: '₹250 to Driver, ₹50 to Service',
        bookingInitiationTime: '2024-05-13T10:20:00',
        bookingConfirmedTime: '2024-05-13T10:25:00',
        bookingCancelledTime: '',
        bookingCancelledBy: '',
        cancellationReason: '',
        bookingConfirmedHistory: 'Confirmed by User',
        bookingCancelledHistory: '',
        isDestinationChanged: 'false',
        changedDestination: '',
        paymentHistory: '₹300 Paid',
        isSOSUsed: 'true',
        SOSTimestamp: '2024-05-13T10:45:00',
        paymentStatus: 'Pending',
        charges: '₹300',
        otpVerification: 'Completed',
        status: 'Ongoing',
        bookingMode: 'Phone',
        additionalCharges: '₹35',
        acAvailable: 'true',
        bookingType: 'Round-Trip',
        serviceType: 'Luxury',
        leadSource: 'Website',
        promocode: 'WINTER20',
        reviews: 'Positive',
        coupon: 'MUM123',
        tickets: 'T123',

        businessName: 'Indian Travels',
        businessAddress: '456 Park Avenue, Mumbai',
        gst: 'GST0987654321',
        pan: 'ABCDE1234F',
        distributorName: 'Mumbai Distributors',
        serviceCity: 'Mumbai',
        vehicleType: 'Hatchback',
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

        archive: 'false',
        approvedBy: 'Admin',
        approvedAt: '2024-05-13T11:00:00',
        createdBy: 'User',
        createdAt: '2024-05-13T10:15:00',
        updatedBy: 'Admin',
        updatedAt: '2024-05-13T11:05:00',
    },
];

const TotalCancelledTrips = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ChannelPartnerData, setChannelPartnerData] = useState<TripsData[]>(staticTripsData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<TripsData[]>([]);
    const [recordsData, setRecordsData] = useState<TripsData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<TripsData[]>([]);
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
        dispatch(setPageTitle('View Trips'));
        // future code --->>>
        // const fetchChannelPartnerData = async () => {
        //     try {
        //         const { data } = await getChannelPartnerData();
        //         if (data?.ChannelPartners) {
        //             // pk-note: ask backend developer to change the accessor _id:id, remove the following later
        //             const newData = data.ChannelPartners.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
        //                 id,
        //                 ...rest,
        //             }));
        //             //setChannelPartnerData(newData);
        //             setChannelPartnerData(staticTripsData);
        //         }
        //     } catch (error: any) {
        //         console.error('Error fetching Trips data:', error.message);
        //     }
        // };
        // fetchChannelPartnerData();
    }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof TripsData;
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
                driverId = '',
                vehicleId = '',
                diverPhone = '',
                userId = '',
                userPhone = '',
                fromLocation = '',
                tripStatus = '',
                expectedDuration = '',
                actualDuration = '',
                distance = '',
                startTime = '',
                endTime = '',
                rideType = '',
                chargeExtraKM = '',
                extraTime = '',
                driverFacialVerificationStatus = '',
                expectedDriverArrivalTime = '',
                actualDriverArrivalTime = '',
                expectedDriverArrivalDuration = '',
                actualDriverArrivalDuration = '',
                pickupLocation = '',
                dropLocation = '',
                intermediateStop = '',
                routeDirection = '',
                realTimelocation = '',
                waitingTimeDuration = '',
                bookingAmtDistribution = '',
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
                serviceType = '',
                leadSource = '',
                promocode = '',
                reviews = '',
                coupon = '',
                riderratings = '',
                tickets = '',
                driverAssignmentByType = '',
                driverAssignmentBy = '',
                driverratings = '',
                fk_Servicecity = '',
                fk_vehicleType = '',
                driverProfilePic = '',
                driverSince = '',
                driverName = '',
                vehicleNumber = '',
                vehicleModel = '',
                riderName = '',
                riderSince = '',
                riderProfilePic = '',
                estimationFareDetails = '',
                requerstedTime = '',
                acceptedTime = '',
                calls = '',
                messages = '',
                isUserTrackedDriver = '',
                paymentMode = '',
                discount = '',
                convenienceCharge = '',
                isInvoiceShared = '',
                vehicleRatings = '',

                businessName = '',
                businessAddress = '',
                gst = '',
                pan = '',
                distributorName = '',
                serviceCity = '',
                vehicleType = '',
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
                id.toLowerCase().includes(searchString) ||
                driverId.toLowerCase().includes(searchString) ||
                vehicleId.toLowerCase().includes(searchString) ||
                diverPhone.toLowerCase().includes(searchString) ||
                userId.toLowerCase().includes(searchString) ||
                userPhone.toLowerCase().includes(searchString) ||
                fromLocation.toLowerCase().includes(searchString) ||
                tripStatus.toLowerCase().includes(searchString) ||
                expectedDuration.toLowerCase().includes(searchString) ||
                actualDuration.toLowerCase().includes(searchString) ||
                distance.toLowerCase().includes(searchString) ||
                startTime.toLowerCase().includes(searchString) ||
                endTime.toLowerCase().includes(searchString) ||
                rideType.toLowerCase().includes(searchString) ||
                chargeExtraKM.toLowerCase().includes(searchString) ||
                extraTime.toLowerCase().includes(searchString) ||
                driverFacialVerificationStatus.toLowerCase().includes(searchString) ||
                expectedDriverArrivalTime.toLowerCase().includes(searchString) ||
                actualDriverArrivalTime.toLowerCase().includes(searchString) ||
                expectedDriverArrivalDuration.toLowerCase().includes(searchString) ||
                actualDriverArrivalDuration.toLowerCase().includes(searchString) ||
                pickupLocation.toLowerCase().includes(searchString) ||
                dropLocation.toLowerCase().includes(searchString) ||
                intermediateStop.toLowerCase().includes(searchString) ||
                routeDirection.toLowerCase().includes(searchString) ||
                realTimelocation.toLowerCase().includes(searchString) ||
                waitingTimeDuration.toLowerCase().includes(searchString) ||
                bookingAmtDistribution.toLowerCase().includes(searchString) ||
                bookingInitiationTime.toLowerCase().includes(searchString) ||
                bookingConfirmedTime.toLowerCase().includes(searchString) ||
                bookingCancelledTime.toLowerCase().includes(searchString) ||
                bookingCancelledBy.toLowerCase().includes(searchString) ||
                cancellationReason.toLowerCase().includes(searchString) ||
                bookingConfirmedHistory.toLowerCase().includes(searchString) ||
                bookingCancelledHistory.toLowerCase().includes(searchString) ||
                isDestinationChanged.toLowerCase().includes(searchString) ||
                changedDestination.toLowerCase().includes(searchString) ||
                paymentHistory.toLowerCase().includes(searchString) ||
                isSOSUsed.toLowerCase().includes(searchString) ||
                SOSTimestamp.toLowerCase().includes(searchString) ||
                paymentStatus.toLowerCase().includes(searchString) ||
                charges.toLowerCase().includes(searchString) ||
                otpVerification.toLowerCase().includes(searchString) ||
                status.toLowerCase().includes(searchString) ||
                bookingMode.toLowerCase().includes(searchString) ||
                additionalCharges.toLowerCase().includes(searchString) ||
                acAvailable.toLowerCase().includes(searchString) ||
                bookingType.toLowerCase().includes(searchString) ||
                serviceType.toLowerCase().includes(searchString) ||
                leadSource.toLowerCase().includes(searchString) ||
                promocode.toLowerCase().includes(searchString) ||
                reviews.toLowerCase().includes(searchString) ||
                coupon.toLowerCase().includes(searchString) ||
                tickets.toLowerCase().includes(searchString) ||
                fk_Servicecity.toLowerCase().includes(searchString) ||
                fk_vehicleType.toLowerCase().includes(searchString) ||
                driverProfilePic.toLowerCase().includes(searchString) ||
                driverSince.toLowerCase().includes(searchString) ||
                driverName.toLowerCase().includes(searchString) ||
                vehicleNumber.toLowerCase().includes(searchString) ||
                vehicleModel.toLowerCase().includes(searchString) ||
                riderratings.toLowerCase().includes(searchString) ||
                riderName.toLowerCase().includes(searchString) ||
                riderSince.toLowerCase().includes(searchString) ||
                riderProfilePic.toLowerCase().includes(searchString) ||
                estimationFareDetails.toLowerCase().includes(searchString) ||
                requerstedTime.toLowerCase().includes(searchString) ||
                acceptedTime.toLowerCase().includes(searchString) ||
                calls.toLowerCase().includes(searchString) ||
                messages.toLowerCase().includes(searchString) ||
                isUserTrackedDriver.toLowerCase().includes(searchString) ||
                paymentMode.toLowerCase().includes(searchString) ||
                discount.toLowerCase().includes(searchString) ||
                convenienceCharge.toLowerCase().includes(searchString) ||
                isInvoiceShared.toLowerCase().includes(searchString) ||
                vehicleRatings.toLowerCase().includes(searchString) ||
                driverAssignmentByType.toLowerCase().includes(searchString) ||
                driverAssignmentBy.toLowerCase().includes(searchString) ||
                driverratings.toLowerCase().includes(searchString) ||
                businessName.toLowerCase().includes(searchString) ||
                businessAddress.toLowerCase().includes(searchString) ||
                gst.toLowerCase().includes(searchString) ||
                pan.toLowerCase().includes(searchString) ||
                distributorName.toLowerCase().includes(searchString) ||
                serviceCity.toLowerCase().includes(searchString) ||
                vehicleType.toLowerCase().includes(searchString) ||
                promoDiscount.toLowerCase().includes(searchString) ||
                totalDistance.toLowerCase().includes(searchString) ||
                totalTime.toLowerCase().includes(searchString) ||
                baseFare.toLowerCase().includes(searchString) ||
                extraKmCharge.toLowerCase().includes(searchString) ||
                extraTimeCharge.toLowerCase().includes(searchString) ||
                waitingTime.toLowerCase().includes(searchString) ||
                waitingCharge.toLowerCase().includes(searchString) ||
                pickupCharge.toLowerCase().includes(searchString) ||
                nightFare.toLowerCase().includes(searchString) ||
                driverNightConvenienceCharge.toLowerCase().includes(searchString) ||
                driverDayConvenienceCharge.toLowerCase().includes(searchString) ||
                travelAgencyDiscount.toLowerCase().includes(searchString) ||
                tollPermitParkingCharges.toLowerCase().includes(searchString) ||
                gstTax.toLowerCase().includes(searchString) ||
                totalCalculationTripCost.toLowerCase().includes(searchString) ||
                leadCharge.toLowerCase().includes(searchString) ||
                pgCharge.toLowerCase().includes(searchString) ||
                googleCharge.toLowerCase().includes(searchString) ||
                platformGSTtTax.toLowerCase().includes(searchString) ||
                roundOff.toLowerCase().includes(searchString) ||
                netPayableAmount.toLowerCase().includes(searchString) ||
                archive.toLowerCase().includes(searchString) ||
                approvedBy.toLowerCase().includes(searchString) ||
                approvedAt.toLowerCase().includes(searchString) ||
                createdBy.toLowerCase().includes(searchString) ||
                createdAt.toLowerCase().includes(searchString) ||
                updatedBy.toLowerCase().includes(searchString) ||
                updatedAt.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([
        'id',
        'approvedAt',
        'approvedBy',
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy',
        ' fk_Servicecity',
        'fk_vehicleType',
        'driverProfilePic',
        'driverSince',
        'driverName',
        'vehicleNumber',
        'vehicleModel',
        'riderName',
        'riderSince',
        'riderProfilePic',
        'estimationFareDetails',
        'requerstedTime',
        'acceptedTime',
        'calls',
        'messages',
        'isUserTrackedDriver',
        'paymentMode',
        'discount',
        'convenienceCharge',
        'isInvoiceShared',
        'vehicleRatings',
        'businessName',
        'businessAddress',
        'gst',
        'pan',
        'distributorName',
        'serviceCity',
        'vehicleType',
        'promoDiscount',
        'totalDistance',
        'totalTime',
        'baseFare',
        'extraKmCharge',
        'extraTimeCharge',
        'waitingTime',
        'waitingCharge',
        'pickupCharge',
        'nightFare',
        'driverNightConvenienceCharge',
        'driverDayConvenienceCharge',
        'travelAgencyDiscount',
        'tollPermitParkingCharges',
        'gstTax',
        'totalCalculationTripCost',
        'leadCharge',
        'pgCharge',
        'googleCharge',
        'platformGSTtTax',
        'roundOff',
        'netPayableAmount',
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

    const columns: DataTableColumn<TripsData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/TripModule/Trips/ViewSpecificTrips/${rowData.id}`;
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
        { accessor: 'driverId', title: 'Driver', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'vehicleId', title: 'Vehicle ID', sortable: true, hidden: hiddenColumns.includes('vehicleId') },
        { accessor: 'diverPhone', title: 'Driver Phone', sortable: true, hidden: hiddenColumns.includes('diverPhone') },
        { accessor: 'userId', title: 'User ID', sortable: true, hidden: hiddenColumns.includes('userId') },
        { accessor: 'userPhone', title: 'User Phone', sortable: true, hidden: hiddenColumns.includes('userPhone') },
        { accessor: 'fromLocation', title: 'From Location', sortable: true, hidden: hiddenColumns.includes('fromLocation') },
        { accessor: 'tripStatus', title: 'Trip Status', sortable: true, hidden: hiddenColumns.includes('tripStatus') },
        { accessor: 'expectedDuration', title: 'Expected Duration', sortable: true, hidden: hiddenColumns.includes('expectedDuration') },
        { accessor: 'actualDuration', title: 'Actual Duration', sortable: true, hidden: hiddenColumns.includes('actualDuration') },
        { accessor: 'distance', title: 'Distance', sortable: true, hidden: hiddenColumns.includes('distance') },
        { accessor: 'startTime', title: 'Start Time', sortable: true, hidden: hiddenColumns.includes('startTime') },
        { accessor: 'endTime', title: 'End Time', sortable: true, hidden: hiddenColumns.includes('endTime') },
        { accessor: 'rideType', title: 'Ride Type', sortable: true, hidden: hiddenColumns.includes('rideType') },
        { accessor: 'chargeExtraKM', title: 'Charge Extra KM', sortable: true, hidden: hiddenColumns.includes('chargeExtraKM') },
        { accessor: 'extraTime', title: 'Extra Time', sortable: true, hidden: hiddenColumns.includes('extraTime') },
        { accessor: 'driverFacialVerificationStatus', title: 'Driver Facial Verification Status', sortable: true, hidden: hiddenColumns.includes('driverFacialVerificationStatus') },
        { accessor: 'expectedDriverArrivalTime', title: 'Expected Driver Arrival Time', sortable: true, hidden: hiddenColumns.includes('expectedDriverArrivalTime') },
        { accessor: 'actualDriverArrivalTime', title: 'Actual Driver Arrival Time', sortable: true, hidden: hiddenColumns.includes('actualDriverArrivalTime') },
        { accessor: 'expectedDriverArrivalDuration', title: 'Expected Driver Arrival Duration', sortable: true, hidden: hiddenColumns.includes('expectedDriverArrivalDuration') },
        { accessor: 'actualDriverArrivalDuration', title: 'Actual Driver Arrival Duration', sortable: true, hidden: hiddenColumns.includes('actualDriverArrivalDuration') },
        { accessor: 'pickupLocation', title: 'Pickup Location', sortable: true, hidden: hiddenColumns.includes('pickupLocation') },
        { accessor: 'dropLocation', title: 'Drop Location', sortable: true, hidden: hiddenColumns.includes('dropLocation') },
        { accessor: 'intermediateStop', title: 'Intermediate Stop', sortable: true, hidden: hiddenColumns.includes('intermediateStop') },
        { accessor: 'routeDirection', title: 'Route Direction', sortable: true, hidden: hiddenColumns.includes('routeDirection') },
        { accessor: 'realTimelocation', title: 'Real Time Location', sortable: true, hidden: hiddenColumns.includes('realTimelocation') },
        { accessor: 'waitingTimeDuration', title: 'Waiting Time Duration', sortable: true, hidden: hiddenColumns.includes('waitingTimeDuration') },
        { accessor: 'bookingAmtDistribution', title: 'Booking Amount Distribution', sortable: true, hidden: hiddenColumns.includes('bookingAmtDistribution') },
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
        { accessor: 'otpVerification', title: 'OTP Verification', sortable: true, hidden: hiddenColumns.includes('otpVerification') },
        { accessor: 'status', title: 'Status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'bookingMode', title: 'Booking Mode', sortable: true, hidden: hiddenColumns.includes('bookingMode') },
        { accessor: 'additionalCharges', title: 'Additional Charges', sortable: true, hidden: hiddenColumns.includes('additionalCharges') },
        { accessor: 'acAvailable', title: 'AC Available', sortable: true, hidden: hiddenColumns.includes('acAvailable') },
        { accessor: 'bookingType', title: 'Booking Type', sortable: true, hidden: hiddenColumns.includes('bookingType') },
        { accessor: 'driverAssignmentByType', title: 'Driver Assignment By Type', sortable: true, hidden: hiddenColumns.includes('driverAssignmentByType') },
        { accessor: 'driverAssignmentBy', title: 'Driver Assignment By', sortable: true, hidden: hiddenColumns.includes('driverAssignmentBy') },
        { accessor: 'serviceType', title: 'Service Type', sortable: true, hidden: hiddenColumns.includes('serviceType') },
        { accessor: 'leadSource', title: 'Lead Source', sortable: true, hidden: hiddenColumns.includes('leadSource') },
        { accessor: 'promocode', title: 'Promocode', sortable: true, hidden: hiddenColumns.includes('promocode') },
        { accessor: 'reviews', title: 'Reviews', sortable: true, hidden: hiddenColumns.includes('reviews') },
        { accessor: 'coupon', title: 'Coupon', sortable: true, hidden: hiddenColumns.includes('coupon') },
        { accessor: 'driverratings', title: 'Driver Ratings', sortable: true, hidden: hiddenColumns.includes('driverratings') },
        { accessor: 'riderratings', title: 'Rider Ratings', sortable: true, hidden: hiddenColumns.includes('riderratings') },
        { accessor: 'tickets', title: 'Tickets', sortable: true, hidden: hiddenColumns.includes('tickets') },
        { accessor: 'fk_Servicecity', title: 'Service city', sortable: true, hidden: hiddenColumns.includes('fk_Servicecity') },
        { accessor: 'fk_vehicleType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('fk_vehicleType') },
        { accessor: 'driverSince', title: 'Driver Since', sortable: true, hidden: hiddenColumns.includes('driverSince') },
        { accessor: 'driverName', title: 'Driver Name', sortable: true, hidden: hiddenColumns.includes('driverName') },
        { accessor: 'vehicleNumber', title: 'Vehicle Number', sortable: true, hidden: hiddenColumns.includes('vehicleNumber') },
        { accessor: 'vehicleModel', title: 'Vehicle Model', sortable: true, hidden: hiddenColumns.includes('vehicleModel') },
        { accessor: 'riderName', title: 'Rider Name', sortable: true, hidden: hiddenColumns.includes('riderName') },
        { accessor: 'riderSince', title: 'Rider Since', sortable: true, hidden: hiddenColumns.includes('riderSince') },
        { accessor: 'estimationFareDetails', title: 'Estimation Fare Details', sortable: true, hidden: hiddenColumns.includes('estimationFareDetails') },
        { accessor: 'requerstedTime', title: 'Requersted Time', sortable: true, hidden: hiddenColumns.includes('requerstedTime') },
        { accessor: 'acceptedTime', title: 'Accepted Time', sortable: true, hidden: hiddenColumns.includes('acceptedTime') },
        { accessor: 'calls', title: 'Calls', sortable: true, hidden: hiddenColumns.includes('calls') },
        { accessor: 'messages', title: 'Messages', sortable: true, hidden: hiddenColumns.includes('messages') },
        { accessor: 'isUserTrackedDriver', title: 'Is User Tracked Driver', sortable: true, hidden: hiddenColumns.includes('isUserTrackedDriver') },
        { accessor: 'paymentMode', title: 'Payment Mode', sortable: true, hidden: hiddenColumns.includes('paymentMode') },
        { accessor: 'discount', title: 'Discount', sortable: true, hidden: hiddenColumns.includes('discount') },
        { accessor: 'convenienceCharge', title: 'Convenience Charge', sortable: true, hidden: hiddenColumns.includes('convenienceCharge') },
        { accessor: 'isInvoiceShared', title: 'Is Invoice Shared', sortable: true, hidden: hiddenColumns.includes('isInvoiceShared') },
        { accessor: 'vehicleRatings', title: 'Vehicle Ratings', sortable: true, hidden: hiddenColumns.includes('vehicleRatings') },
        { accessor: 'businessName', title: 'Business Name', sortable: true, hidden: hiddenColumns.includes('businessName') },
        { accessor: 'businessAddress', title: 'Business Address', sortable: true, hidden: hiddenColumns.includes('businessAddress') },
        { accessor: 'gst', title: 'GST', sortable: true, hidden: hiddenColumns.includes('gst') },
        { accessor: 'pan', title: 'PSN', sortable: true, hidden: hiddenColumns.includes('pan') },
        { accessor: 'distributorName', title: 'Distributor Name', sortable: true, hidden: hiddenColumns.includes('distributorName') },
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
        { accessor: 'driverDayConvenienceCharge', title: 'Driver DayConvenience Charge', sortable: true, hidden: hiddenColumns.includes('driverDayConvenienceCharge') },
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
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: TripsData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: TripsData[] = [];

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
        if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'viewApp offered Money History');
        }
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Total Cancelled Trips',
            to: '/TripModule/Trips/ViewTrips',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/Trips/ViewTrips' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <CancelledTripsChart />

            <div className="panel mt-6">
                <h2 className="mb-3 font-semibold text-lg dark:text-white-light ">History Table Of Cancelled Trips</h2>
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/TripModule/Trips/CreateTrips" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Trips
                        </Link>
                    </div> */}

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
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>

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

export default TotalCancelledTrips;
