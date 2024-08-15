import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import TripsModule from './TripsModule';
import { staticTripsData } from './ViewTrips';
import { AiOutlineAudit, AiOutlineIssuesClose } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { BiTrip } from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ViewInvoiceDetails from './ViewInvoiceDetails';
import BookingsModule from '../../Bookings/BookingsModule';
import BookingAmtDistributionModule from '../../BookingAmtDistribution/BookingAmtDistributionModule';
import { staticBookingAmtDistributionData } from '../../BookingAmtDistribution/ViewBookingAmtDistribution';
import { staticBookingsData } from '../../Bookings/ViewBookings';
import { FaCarSide, FaRegStar } from 'react-icons/fa6';
import { LuNewspaper } from 'react-icons/lu';
import { IoWomanOutline } from 'react-icons/io5';
import { RiSteering2Line } from 'react-icons/ri';
import { GrTransaction } from 'react-icons/gr';
import ServiceProviderModule from '@/pages/BusinessModule/ServiceProvider/ServiceProviderModule';
import { staticServiceProviderData } from '@/components/Models/DriverDetailsModal';
import VehicleProfileModule from '@/pages/BusinessModule/VehicleProfile/VehicleProfileModule';
import { staticVehicleProfileData } from '@/components/Models/VehicleDetailsModal';
import ViewTickets from '../../Tickets/ViewTickets';

interface FormValues {
    id: string;
    driverId: string;
    vehicleId: string;
    diverPhone: string;
    riderId: string;
    riderPhone: string;
    driverAcceptLocation: string;
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
    isriderTrackedDriver: string;
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
}
interface BookingsProps {
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
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
}
interface BookingsAmtDistProps {
    id: string;
    actualTripCost: string;
    cgst: string;
    sgst: string;
    leadCharges1: string;
    leadCharges2: string;
    convinenceCharge: string;
    adminCharge: string;
    tax: string;
    techCharges: string;
    promotionDiscount: string;
    SPDiscount: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
        remark?: string;
    }[];
}

interface DriverValues {
    serviceProviderType: string;
    driverKey: string;
    channelPartnerType: string;
    TravelAgency: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    fatherName: string;
    mobileNumber: string;
    altMobileNumber: string;
    country: string;
    state: string;
    city: string;
    dlNumber: string;
    dlValidity: string;
    policeVerNumber: string;
    batchNumber: string;
    batchValidity: string;
    password: string;
    permanentAddress: string;
    presentAddress: string;
    registerAddress: string;
    fk_serviceCity: string;
    badgeNumber: string;
    badgeValidity: string;
    isAvailable: boolean;
    driverStatus: string;
    driverLocation: boolean;
    emergencyContact: string;
    driverApprovalDate: string;
    panNumber: string;
    rtoDisplayCard: string;
    stateAndRto: string;
    verificationHistory: string;
    archive: string;
    profileImage: string;
    drivinglicense: string;
    aadharCard: string;
    aadharImages: string;
    panImages: string;
    panCard: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    remark: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string;
    }[];
}

interface VehicleValues {
    id: string;
    serviceProviderType: string;
    channelPartnerType: string;
    fleetManagementType: string;
    vehRegNumber: string;
    vehRTONumber: string;
    vehChasisNumber: string;
    vehCategory: string;
    seatCapacity: string;
    bootSpace: string;
    loadCapacity: string;
    bodyDimension: string;
    vehBrandName: string;
    vehType: string;
    vehBrandModel: string;
    vehColor: string;
    vehFuelType: string;
    country: string;
    state: string;
    city: string;
    fk_serviceCity: string;
    serviceType: string;
    vehicleRegistrationDate: Date | string;
    vehicleAge: string;
    loanBanker: string;
    loanAccNumber: string;
    emiAmt: string;
    emiDate: string;
    currLocation: string;
    archive: string;
    vehManufacturer: string;
}

const ViewSpecificTrips: React.FC = () => {
    const navigate = useNavigate();

    const { tripsId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        driverId: '',
        vehicleId: '',
        diverPhone: '',
        riderId: '',
        riderPhone: '',
        driverAcceptLocation: '',
        tripStatus: '',
        expectedDuration: '',
        actualDuration: '',
        distance: '',
        startTime: '',
        endTime: '',
        rideType: '',
        chargeExtraKM: '',
        extraTime: '',
        driverFacialVerificationStatus: '',
        expectedDriverArrivalTime: '',
        actualDriverArrivalTime: '',
        expectedDriverArrivalDuration: '',
        actualDriverArrivalDuration: '',
        pickupLocation: '',
        dropLocation: '',
        intermediateStop: '',
        routeDirection: '',
        realTimelocation: '',
        waitingTimeDuration: '',
        bookingAmtDistribution: '',
        bookingInitiationTime: '',
        bookingConfirmedTime: '',
        bookingCancelledTime: '',
        bookingCancelledBy: '',
        cancellationReason: '',
        bookingConfirmedHistory: '',
        bookingCancelledHistory: '',
        isDestinationChanged: '',
        changedDestination: '',
        paymentHistory: '',
        isSOSUsed: '',
        SOSTimestamp: '',
        paymentStatus: '',
        charges: '',
        otpVerification: '',
        status: '',
        bookingMode: '',
        additionalCharges: '',
        acAvailable: '',
        bookingType: '',
        serviceType: '',
        leadSource: '',
        promocode: '',
        reviews: '',
        coupon: '',
        tickets: '',
        fk_Servicecity: '',
        fk_vehicleType: '',
        driverProfilePic: '',
        driverSince: '',
        driverName: '',
        vehicleNumber: '',
        vehicleModel: '',
        riderratings: '',
        riderName: '',
        riderSince: '',
        riderProfilePic: '',
        estimationFareDetails: '',
        requerstedTime: '',
        acceptedTime: '',
        calls: '',
        messages: '',
        isriderTrackedDriver: '',
        paymentMode: '',
        discount: '',
        convenienceCharge: '',
        isInvoiceShared: '',
        vehicleRatings: '',
        driverAssignmentByType: '',
        driverAssignmentBy: '',
        driverratings: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
    };

    const initialBookingValues: BookingsProps = {
        id: '',
        driver: '',
        vehicle: '',
        bookingAmtDistribution: '',
        user: '',
        ride: '',
        promocode: '',
        reviews: '',
        ratings: '',
        coupon: '',
        driverratings: '',
        riderratings: '',
        tickets: '',
        invoice: '',
        bookingInitiationTime: '',
        bookingConfirmedTime: '',
        bookingCancelledTime: '',
        bookingCancelledBy: '',
        cancellationReason: '',
        bookingConfirmedHistory: '',
        bookingCancelledHistory: '',
        isDestinationChanged: '',
        changedDestination: '',
        paymentHistory: '',
        isSOSUsed: '',
        SOSTimestamp: '',
        paymentStatus: '',
        charges: '',
        otpVerification: '',
        status: '',
        bookingMode: '',
        additionalCharges: '',
        acAvailable: '',
        bookingType: '',
        driverAssignmentByType: '',
        driverAssignmentBy: '',
        serviceType: '',
        leadSource: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
    };

    const initialBookingAmtDistValues: BookingsAmtDistProps = {
        id: '',
        actualTripCost: '',
        cgst: '',
        sgst: '',
        leadCharges1: '',
        leadCharges2: '',
        convinenceCharge: '',
        adminCharge: '',
        tax: '',
        techCharges: '',
        promotionDiscount: '',
        SPDiscount: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [],
    };

    const initialDriverValues: DriverValues = {
        serviceProviderType: '',
        driverKey: '',
        channelPartnerType: '',
        TravelAgency: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        fatherName: '',
        mobileNumber: '',
        altMobileNumber: '',
        country: '',
        state: '',
        city: '',
        dlNumber: '',
        dlValidity: '',
        policeVerNumber: '',
        batchNumber: '',
        batchValidity: '',
        password: '',
        permanentAddress: '',
        presentAddress: '',
        registerAddress: '',
        fk_serviceCity: '',
        badgeNumber: '',
        badgeValidity: '',
        isAvailable: false,
        driverStatus: '',
        driverLocation: false,
        emergencyContact: '',
        driverApprovalDate: '',
        panNumber: '',
        rtoDisplayCard: '',
        stateAndRto: '',
        verificationHistory: '',
        archive: '',
        profileImage: '',
        drivinglicense: '',
        aadharCard: '',
        aadharImages: '',
        panImages: '',
        panCard: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        remark: '',
        updatedHistory: [],
    };

    const initialVehicleValues: VehicleValues = {
        id: '',
        vehManufacturer: '',
        serviceProviderType: '',
        channelPartnerType: '',
        fleetManagementType: '',
        vehRegNumber: '',
        vehRTONumber: '',
        vehChasisNumber: '',
        vehCategory: '',
        seatCapacity: '',
        bootSpace: '',
        loadCapacity: '',
        bodyDimension: '',
        vehBrandName: '',
        vehType: '',
        vehBrandModel: '',
        vehColor: '',
        vehFuelType: '',
        country: '',
        state: '',
        city: '',
        fk_serviceCity: '',
        serviceType: '',
        vehicleRegistrationDate: '',
        vehicleAge: '',
        loanBanker: '',
        loanAccNumber: '',
        emiAmt: '',
        emiDate: '',
        currLocation: '',
        archive: '',
    };

    const [vehicleData, setVehicleData] = useState<VehicleValues>(initialVehicleValues);
    const [driverData, setDriverData] = useState<DriverValues>(initialDriverValues);
    const [bookingData, setBookingData] = useState<BookingsProps>(initialBookingValues);
    const [bookingAmtDistData, setBookingAmtDistData] = useState<BookingsAmtDistProps>(initialBookingAmtDistValues);
    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [isEditable, setIsEditable] = useState(false);

    // trip static Data
    useEffect(() => {
        const specificData = staticTripsData.find((data) => data.id === tripsId);
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [tripsId]);

    // Booking static Data
    useEffect(() => {
        const specificData = staticBookingAmtDistributionData.find((data) => data.id === tripsId);
        if (specificData) {
            setBookingAmtDistData(specificData as unknown as BookingsAmtDistProps);
        }
    }, [tripsId]);

    // Booking amt Dist static Data
    useEffect(() => {
        const specificData = staticBookingsData.find((data) => data.id === tripsId);
        if (specificData) {
            setBookingData(specificData as unknown as BookingsProps);
        }
    }, [tripsId]);

    // Driver static Data
    useEffect(() => {
        const specificData = staticServiceProviderData.find((data) => data.id === tripsId);
        if (specificData) {
            setDriverData(specificData as unknown as DriverValues);
        }
    }, [tripsId]);

    // Vehicle static Data
    useEffect(() => {
        const specificData = staticVehicleProfileData.find((data) => data.id === tripsId);
        if (specificData) {
            setVehicleData(specificData as unknown as VehicleValues);
        }
    }, [tripsId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        // Do whatever you want with the input value, like updating state
        console.log(`Field ${name} changed to ${value}`);
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>('');

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
            label: 'Trips',
            to: '/TripModule/Trips/ViewTrips',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/Trips/ViewTrips' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Trips',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-6">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <BiTrip className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Trips</span>
                                </button>
                            )}
                        </Tab>

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <RiSteering2Line className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Driver</span>
                                </button>
                            )}
                        </Tab>

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaCarSide className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Vehicle</span>
                                </button>
                            )}
                        </Tab>

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <IoWomanOutline className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Rider</span>
                                </button>
                            )}
                        </Tab>

                        {/* <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <LuNewspaper className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Promotion</span>
                                </button>
                            )}
                        </Tab> */}

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaRegStar className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Ratings</span>
                                </button>
                            )}
                        </Tab>

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <AiOutlineIssuesClose className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Tickets</span>
                                </button>
                            )}
                        </Tab>

                        {/* <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <GrTransaction className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Transaction</span>
                                </button>
                            )}
                        </Tab> */}

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <AiOutlineAudit className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit Log</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        {/* trip details */}
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="mb-2 mt-5 flex justify-end items-center gap-3">
                                    <Tippy content="Get Invoice">
                                        <button
                                            onClick={() => {
                                                const viewUrl = `/TripModule/TripsInvoice/ViewSpecificTripsInvoice/1`;
                                                navigate(viewUrl);
                                            }}
                                            type="button"
                                            className="btn btn-success"
                                        >
                                            View Invoice
                                        </button>
                                    </Tippy>
                                </div>
                                <TripsModule details={formData} onInputChange={handleInputChange} showStatus={true} isEditable={isEditable} />
                                <h1 className="text-3xl font-bold mt-7 mb-3">Invoice Details.</h1>
                                <ViewInvoiceDetails />
                                <h1 className="text-3xl font-bold mt-7 mb-3">Booking Details.</h1>
                                <BookingsModule details={bookingData} onInputChange={handleInputChange} viewSpecific={true} />
                                <h1 className="text-3xl font-bold mt-7 mb-3">Booking Amnt Distribution.</h1>
                                <BookingAmtDistributionModule details={bookingAmtDistData} onInputChange={handleInputChange} isEditable={false} />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1 ">
                                            Approved At
                                        </label>
                                        <input name="approvedAt" type="text" id="approvedAt" placeholder="Enter Approved At" className="form-input w-full" value={formData.approvedAt} />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input name="approvedBy" type="text" id="approvedBy" placeholder="Enter Approved By" className="form-input w-full" value={formData.approvedBy} />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input name="createdAt" type="text" id="createdAt" placeholder="Enter Created At" className="form-input w-full" value={formData.createdAt} />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" placeholder="Enter Created By" className="form-input w-full" value={formData.createdBy} />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>

                        {/* Driver details */}
                        <Tab.Panel>
                            <div className="mt-10">
                                <ServiceProviderModule details={driverData} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} noPassEdit={false} />
                            </div>
                        </Tab.Panel>

                        {/* Vehicle details */}
                        <Tab.Panel>
                            <div className="mt-10">
                                <VehicleProfileModule details={vehicleData} onInputChange={handleProfileInputChange} showStatus={true} viewSpecific={true} isEditPage={true} />
                            </div>
                        </Tab.Panel>

                        {/* Rider details */}
                        <Tab.Panel>
                            <div className="mt-10">
                                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-2">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="riderId" className="block mb-1">
                                            Rider ID
                                        </label>
                                        <input name="riderId" type="text" id="riderId" className="form-input w-full" value={'RK-432KPS'} disabled={true} />
                                    </div>

                                    <div className="lg:w-1/3">
                                        <label htmlFor="riderName" className="block mb-1">
                                            Rider Name
                                        </label>
                                        <input name="riderName" type="text" id="riderName" className="form-input w-full" value={'Arun'} readOnly={true} />
                                    </div>

                                    <div className="lg:w-1/3">
                                        <label htmlFor="riderSince" className="block mb-1">
                                            Rider Since
                                        </label>
                                        <input name="riderSince" type="text" id="riderSince" className="form-input w-full" value={'21/07/2023'} />
                                    </div>
                                </div>

                                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/4">
                                        <label htmlFor="riderProfilePic" className="block mb-1">
                                            Rider Profile Pic
                                        </label>
                                        <a href={'https://pbs.twimg.com/profile_images/1031203066572406784/bwwh-VzG_400x400.jpg'} target="_blank" rel="noopener">
                                            <input
                                                name="riderProfilePic"
                                                type="text"
                                                alt="View Profile"
                                                id="riderProfilePic"
                                                className="form-input w-full cursor-pointer hover:underline hover:text-blue-700"
                                                value={'View Image'}
                                                readOnly={true}
                                            />
                                        </a>
                                    </div>

                                    <div className="lg:w-1/4">
                                        <label htmlFor="riderratings" className="block mb-1">
                                            Rider Ratings
                                        </label>
                                        <input name="riderratings" type="text" id="riderratings" className="form-input w-full" value={'4.2'} readOnly={true} />
                                    </div>

                                    <div className="lg:w-1/4">
                                        <label htmlFor="riderPhone" className="block mb-1">
                                            Rider Phone
                                        </label>
                                        <input name="riderPhone" type="text" id="riderPhone" className="form-input w-full" value={'9876543210'} disabled={true} />
                                    </div>

                                    <div className="lg:w-1/4">
                                        <label htmlFor="rideType" className="block mb-1">
                                            Ride Type
                                        </label>
                                        <input name="rideType" type="text" id="rideType" className="form-input w-full" value={'Student'} disabled={true} />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>

                        {/* Promotion details */}
                        {/* <Tab.Panel>
                            <div className="mt-5"></div>
                        </Tab.Panel> */}

                        {/* Rating details */}
                        <Tab.Panel>
                            <div className="mt-10">
                                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="driverratings" className="block mb-1">
                                            Driver Ratings
                                        </label>
                                        <input name="driverratings" type="text" id="driverratings" className="form-input w-full" value={'4.3'} readOnly={true} />
                                    </div>

                                    <div className="lg:w-1/3">
                                        <label htmlFor="riderratings" className="block mb-1">
                                            Rider Ratings
                                        </label>
                                        <input name="riderratings" type="text" id="riderratings" className="form-input w-full" value={'3.9'} readOnly={true} />
                                    </div>

                                    <div className="lg:w-1/3">
                                        <label htmlFor="vehicleRatings" className="block mb-1">
                                            Vehicle Ratings
                                        </label>
                                        <input name="vehicleRatings" type="text" id="vehicleRatings" className="form-input w-full" value={'4.1'} readOnly={true} />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>

                        {/* Tickets details */}
                        <Tab.Panel>
                            <div className="mt-10">
                                <ViewTickets tabs={true} />
                            </div>
                        </Tab.Panel>

                        {/* Wallet details */}
                        {/* <Tab.Panel>
                            <div className="mt-5"></div>
                        </Tab.Panel> */}

                        {/* Audit Logs */}
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Audit logs</h2>
                                </div>
                                <AuditLogsTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    );
};

export default ViewSpecificTrips;
