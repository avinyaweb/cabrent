import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

interface TripsProps {
    details: {
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
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
    viewSpecific?: boolean;
}

const TripsModule: React.FC<TripsProps> = ({ details, onInputChange, showStatus = true, isEditable = true, viewSpecific }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [date1, setDate1] = useState<any>(formattedToday);
    const [date2, setDate2] = useState<any>(formattedToday);

    // Dynamic roles data fetching
    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         try {
    //             const response = await getRoleData();
    //             const rolesData = response.data.roles;
    //             if (Array.isArray(rolesData)) {
    //                 // Extract role names from the fetched data and update roleOptions state
    //                 const roles = rolesData.map((fk_roleType: any) => ({
    //                     label: fk_roleType.roleName,
    //                     value: fk_roleType.roleId, // Assuming roleId exists to uniquely identify the role
    //                 }));
    //                 setRoleOptions(roles);
    //             } else {
    //                 console.error('Invalid data format:', rolesData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching roles:', error);
    //         }
    //     };
    //     fetchRoles();
    // }, []);

    const handleOpenGoogleMaps = () => {
        const latitude = '12.870466';
        const longitude = '77.600002';
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

        // Open Google Maps in a separate tab
        window.open(googleMapsUrl, '_blank');
    };
    return (
        <>
            <h1 className="text-2xl font-bold my-2">Driver details*</h1>
            <div className="panel mt-2">
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-2">
                    <div className="lg:w-1/3">
                        <label htmlFor="driverId" className="block mb-1">
                            Driver ID
                        </label>
                        <input
                            name="driverId"
                            type="text"
                            id="driverId"
                            placeholder="Enter Driver ID"
                            className="form-input w-full"
                            value={details.driverId}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="driverName" className="block mb-1">
                            Driver Name
                        </label>
                        <input name="driverName" type="text" id="driverName" placeholder="Enter Driver Name" className="form-input w-full" value={details?.driverName} readOnly={!isEditable} />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="driverSince" className="block mb-1">
                            Driver Since
                        </label>
                        <input name="driverSince" type="text" id="driverSince" placeholder="Enter Driver Since" className="form-input w-full" value={details?.driverSince} readOnly={!isEditable} />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/4">
                        <label htmlFor="driverphone" className="block mb-1">
                            Driver phone
                        </label>
                        <input
                            name="driverphone"
                            type="text"
                            id="driverphone"
                            placeholder="Enter From Phone number"
                            className="form-input w-full"
                            value={`9876543210`}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/4">
                        <label htmlFor="driverProfilePic" className="block mb-1">
                            Driver Profile Pic
                        </label>
                        <a href={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVMF5ofPqy5faf6_tm_kMey8E9pfaIonfHRN8ueXPO4g&s'} target="_blank" rel="noopener">
                            <input
                                name="driverProfilePic"
                                type="text"
                                alt="View Profile"
                                id="driverProfilePic"
                                placeholder="Enter Driver Profile Pic"
                                className="form-input w-full cursor-pointer hover:underline hover:text-blue-700"
                                value={'View Image'}
                                readOnly={!isEditable}
                            />
                        </a>
                    </div>

                    <div className="lg:w-1/4">
                        <label htmlFor="fk_Servicecity" className="block mb-1">
                            Service City
                        </label>
                        <input
                            name="fk_Servicecity"
                            type="text"
                            id="fk_Servicecity"
                            placeholder="Enter Service City"
                            className="form-input w-full"
                            value={details?.fk_Servicecity}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/4">
                        <label htmlFor="driverratings" className="block mb-1">
                            Driver Ratings
                        </label>
                        <input
                            name="driverratings"
                            type="text"
                            id="driverratings"
                            placeholder="Enter Driver Ratings"
                            className="form-input w-full"
                            value={details?.driverratings}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-6">Vehicle details*</h1>
            <div className="panel mt-2">
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-2">
                    <div className="lg:w-1/3">
                        <label htmlFor="vehicleId" className="block mb-1">
                            Vehicle ID
                        </label>
                        <input
                            name="vehicleId"
                            type="text"
                            id="vehicleId"
                            placeholder="Enter Vehicle ID"
                            className="form-input w-full"
                            value={details.vehicleId}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="vehicleNumber" className="block mb-1">
                            Vehicle Number
                        </label>
                        <input
                            name="vehicleNumber"
                            type="text"
                            id="vehicleNumber"
                            placeholder="Enter Vehicle Number"
                            className="form-input w-full"
                            value={details?.vehicleNumber}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="fk_vehicleType" className="block mb-1">
                            Vehicle Type
                        </label>
                        <input
                            name="fk_vehicleType"
                            type="text"
                            id="fk_vehicleType"
                            placeholder="Enter Vehicle Type"
                            className="form-input w-full"
                            value={details?.fk_vehicleType}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/2">
                        <label htmlFor="vehicleModel" className="block mb-1">
                            Vehicle Model
                        </label>
                        <input name="vehicleModel" type="text" id="vehicleModel" placeholder="Enter Vehicle Model" className="form-input w-full" value={details?.vehicleModel} readOnly={!isEditable} />
                    </div>

                    <div className="lg:w-1/2">
                        <label htmlFor="vehicleRatings" className="block mb-1">
                            Vehicle Ratings
                        </label>
                        <input
                            name="vehicleRatings"
                            type="text"
                            id="vehicleRatings"
                            placeholder="Enter Vehicle Ratings"
                            className="form-input w-full"
                            value={details?.vehicleRatings}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-6">Rider details*</h1>
            <div className="panel mt-2">
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-2">
                    <div className="lg:w-1/3">
                        <label htmlFor="riderId" className="block mb-1">
                            Rider ID
                        </label>
                        <input
                            name="riderId"
                            type="text"
                            id="riderId"
                            placeholder="Enter rider ID"
                            className="form-input w-full"
                            value={details.riderId}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="riderName" className="block mb-1">
                            Rider Name
                        </label>
                        <input name="riderName" type="text" id="riderName" placeholder="Enter Rider Name" className="form-input w-full" value={details?.riderName} readOnly={!isEditable} />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="riderSince" className="block mb-1">
                            Rider Since
                        </label>
                        <input name="riderSince" type="text" id="riderSince" placeholder="Enter Rider Since" className="form-input w-full" value={details?.riderSince} readOnly={!isEditable} />
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
                                readOnly={!isEditable}
                            />
                        </a>
                    </div>

                    <div className="lg:w-1/4">
                        <label htmlFor="riderratings" className="block mb-1">
                            Rider Ratings
                        </label>
                        <input name="riderratings" type="text" id="riderratings" placeholder="Enter Rider Ratings" className="form-input w-full" value={details?.riderratings} readOnly={!isEditable} />
                    </div>

                    <div className="lg:w-1/4">
                        <label htmlFor="riderPhone" className="block mb-1">
                            Rider Phone
                        </label>
                        <input
                            name="riderPhone"
                            type="text"
                            id="riderPhone"
                            placeholder="Enter rider Phone"
                            className="form-input w-full"
                            value={details.riderPhone}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/4">
                        <label htmlFor="rideType" className="block mb-1">
                            Ride Type
                        </label>
                        <input
                            name="rideType"
                            type="text"
                            id="rideType"
                            placeholder="Enter Ride Type"
                            className="form-input w-full"
                            value={details.rideType}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-6">Ride details*</h1>
            <div className="panel mt-2">
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-2">
                    <div className="lg:w-1/3">
                        <label htmlFor="pickupLocation" className="block mb-1">
                            Pickup Location
                        </label>
                        <input
                            name="pickupLocation"
                            type="text"
                            id="pickupLocation"
                            placeholder="Enter Pickup Location"
                            className="form-input w-full"
                            value={details.pickupLocation}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="dropLocation" className="block mb-1">
                            Drop Location
                        </label>
                        <input
                            name="dropLocation"
                            type="text"
                            id="dropLocation"
                            placeholder="Enter Drop Location"
                            className="form-input w-full"
                            value={details.dropLocation}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="intermediateStop" className="block mb-1">
                            Intermediate Stop
                        </label>
                        <input
                            name="intermediateStop"
                            type="text"
                            id="intermediateStop"
                            placeholder="Enter Intermediate Stop"
                            className="form-input w-full"
                            value={details.intermediateStop}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="driverAcceptLocation" className="block mb-1">
                            Driver Accept Location
                        </label>
                        <input
                            name="driverAcceptLocation"
                            type="text"
                            id="driverAcceptLocation"
                            placeholder="Enter From Location"
                            className="form-input w-full"
                            value={details.driverAcceptLocation}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="tripStatus" className="block mb-1">
                            Trip Status
                        </label>
                        <input
                            name="tripStatus"
                            type="text"
                            id="tripStatus"
                            placeholder="Enter Trip Status"
                            className="form-input w-full"
                            value={details.tripStatus}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="expectedDuration" className="block mb-1">
                            Expected Duration
                        </label>
                        <input
                            name="expectedDuration"
                            type="text"
                            id="expectedDuration"
                            placeholder="Enter Expected Duration"
                            className="form-input w-full"
                            value={details.expectedDuration}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="actualDuration" className="block mb-1">
                            Actual Duration
                        </label>
                        <input
                            name="actualDuration"
                            type="text"
                            id="actualDuration"
                            placeholder="Enter Actual Duration"
                            className="form-input w-full"
                            value={details.actualDuration}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3 pointer-events-none">
                        <label htmlFor="startTime" className="block mb-1">
                            Start Time
                        </label>
                        {viewSpecific ? (
                            <Flatpickr
                                value={date1}
                                options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                className="form-input pointer-events-none"
                                onChange={(date: any) => setDate1(date)}
                            />
                        ) : (
                            <Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date: any) => setDate1(date)} />
                        )}
                    </div>
                    <div className="lg:w-1/3 pointer-events-none">
                        <label htmlFor="endtime" className="block mb-1">
                            End Time
                        </label>
                        {viewSpecific ? (
                            <Flatpickr
                                value={date2}
                                options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                className="form-input pointer-events-none"
                                onChange={(date: any) => setDate2(date)}
                            />
                        ) : (
                            <Flatpickr value={date2} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date: any) => setDate2(date)} />
                        )}
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="distance" className="block mb-1">
                            Distance
                        </label>
                        <input
                            name="distance"
                            type="text"
                            id="distance"
                            placeholder="Enter Distance"
                            className="form-input w-full"
                            value={details.distance}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="extraTime" className="block mb-1">
                            Extra Time
                        </label>
                        <input
                            name="extraTime"
                            type="text"
                            id="extraTime"
                            placeholder="Enter Extra Time"
                            className="form-input w-full"
                            value={details.extraTime}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="waitingTimeDuration" className="block mb-1">
                            Waiting Time Duration
                        </label>
                        <input
                            name="waitingTimeDuration"
                            type="text"
                            id="waitingTimeDuration"
                            placeholder="Enter Waiting Time Duration"
                            className="form-input w-full"
                            value={details.waitingTimeDuration}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="actualDriverArrivalTime" className="block mb-1">
                            Actual Driver Arrival Time
                        </label>
                        <input
                            name="actualDriverArrivalTime"
                            type="text"
                            id="actualDriverArrivalTime"
                            placeholder="Enter Actual Driver Arrival Time"
                            className="form-input w-full"
                            value={details.actualDriverArrivalTime}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="expectedDriverArrivalDuration" className="block mb-1">
                            Expected Driver Arrival Duration
                        </label>
                        <input
                            name="expectedDriverArrivalDuration"
                            type="text"
                            id="expectedDriverArrivalDuration"
                            placeholder="Enter Expected Driver Arrival Duration"
                            className="form-input w-full"
                            value={details.expectedDriverArrivalDuration}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="actualDriverArrivalDuration" className="block mb-1">
                            Actual Driver Arrival Duration
                        </label>
                        <input
                            name="actualDriverArrivalDuration"
                            type="text"
                            id="actualDriverArrivalDuration"
                            placeholder="Enter Actual Driver Arrival Duration"
                            className="form-input w-full"
                            value={details.actualDriverArrivalDuration}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="requerstedTime" className="block mb-1">
                            Requested Time
                        </label>
                        <input
                            name="requerstedTime"
                            type="text"
                            id="requerstedTime"
                            placeholder="Enter Requested Time"
                            className="form-input w-full"
                            value={details?.requerstedTime}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="acceptedTime" className="block mb-1">
                            Accepted Time
                        </label>
                        <input name="acceptedTime" type="text" id="acceptedTime" placeholder="Enter Accepted Time" className="form-input w-full" value={details?.acceptedTime} readOnly={!isEditable} />
                    </div>
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <label htmlFor="calls" className="block mb-1">
                                Calls
                            </label>
                            <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" />
                        </div>
                        <input name="calls" type="text" id="calls" placeholder="Enter Calls" className="form-input w-full" value={details?.calls} readOnly={!isEditable} />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <label htmlFor="messages" className="block mb-1">
                                Messages
                            </label>
                            <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" />
                        </div>
                        <input name="messages" type="text" id="messages" placeholder="Enter Messages" className="form-input w-full" value={details?.messages} readOnly={!isEditable} />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="chargeExtraKM" className="block mb-1">
                            Charge Extra KM
                        </label>
                        <input
                            name="chargeExtraKM"
                            type="text"
                            id="chargeExtraKM"
                            placeholder="Enter Charge Extra KM"
                            className="form-input w-full"
                            value={details.chargeExtraKM}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="expectedDriverArrivalTime" className="block mb-1">
                            Expected Driver Arrival Time
                        </label>
                        <input
                            name="expectedDriverArrivalTime"
                            type="text"
                            id="expectedDriverArrivalTime"
                            placeholder="Enter Expected Driver Arrival Time"
                            className="form-input w-full"
                            value={details.expectedDriverArrivalTime}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-6">Transaction details*</h1>
            <div className="panel mt-2">
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-2">
                    <div className="lg:w-1/3">
                        <label htmlFor="discount" className="block mb-1">
                            Discount
                        </label>
                        <input name="discount" type="text" id="discount" placeholder="Enter Discount" className="form-input w-full" value={details?.discount} readOnly={!isEditable} />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="convenienceCharge" className="block mb-1">
                            Convenience Charge
                        </label>
                        <input
                            name="convenienceCharge"
                            type="text"
                            id="convenienceCharge"
                            placeholder="Enter Convenience Charge"
                            className="form-input w-full"
                            value={details?.convenienceCharge}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="paymentMode" className="block mb-1">
                            Payment Mode
                        </label>
                        <input name="paymentMode" type="text" id="paymentMode" placeholder="Enter Payment Mode" className="form-input w-full" value={details?.paymentMode} readOnly={!isEditable} />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/2">
                        <label htmlFor="Waiting Charge" className="block mb-1">
                            Waiting Charge
                        </label>
                        <input
                            name="Waiting Charge"
                            type="text"
                            id="Waiting Charge"
                            className="form-input w-full"
                            value={'₹ 20.00 '}
                            // value={details?.waitingCharge}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <label htmlFor="estimationFareDetails" className="block mb-1">
                            Estimated Fare Details
                        </label>
                        <input
                            name="estimationFareDetails"
                            type="text"
                            id="estimationFareDetails"
                            placeholder="Enter Estimated Fare Details"
                            className="form-input w-full"
                            value={details?.estimationFareDetails}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-6">Booking details*</h1>
            <div className="panel mt-2">
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-2">
                    <div className="lg:w-1/3">
                        <label htmlFor="driverAssignmentByType" className="block mb-1">
                            Driver Assignment By Type
                        </label>
                        <input
                            name="driverAssignmentByType"
                            type="text"
                            id="driverAssignmentByType"
                            placeholder="Enter Driver Assignment By Type"
                            className="form-input w-full"
                            value={details?.driverAssignmentByType}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="driverAssignmentBy" className="block mb-1">
                            Driver Assignment By
                        </label>
                        <input
                            name="driverAssignmentBy"
                            type="text"
                            id="driverAssignmentBy"
                            placeholder="Enter Driver Assignment By"
                            className="form-input w-full"
                            value={details?.driverAssignmentBy}
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="driverFacialVerificationStatus" className="block mb-1">
                            Driver Facial Verification Status
                        </label>
                        <input
                            name="driverFacialVerificationStatus"
                            type="text"
                            id="driverFacialVerificationStatus"
                            placeholder="Enter Driver Facial Verification Status"
                            className="form-input w-full"
                            value={details.driverFacialVerificationStatus}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="isriderTrackedDriver" className="block mb-1">
                            Is Rider Tracked Driver
                        </label>
                        <input
                            name="isriderTrackedDriver"
                            type="text"
                            id="isriderTrackedDriver"
                            placeholder="Enter Is rider Tracked Driver"
                            className="form-input w-full"
                            value={'Yes'}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="isInvoiceShared" className="block mb-1">
                            Is Invoice Shared
                        </label>
                        <input
                            name="isInvoiceShared"
                            type="text"
                            id="isInvoiceShared"
                            placeholder="Enter Is Invoice Shared"
                            className="form-input w-full"
                            value={details?.isInvoiceShared}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <label htmlFor="realTimelocation" className="block mb-1">
                                Real-Time Location
                            </label>
                            <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" onClick={handleOpenGoogleMaps} />
                        </div>
                        <input
                            name="realTimelocation"
                            type="text"
                            id="realTimelocation"
                            placeholder="Enter Real-Time Location"
                            className="form-input w-full"
                            // value={details.realTimelocation}
                            value={`Bangalore`}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/2">
                        <label htmlFor="routeDirection" className="block mb-1">
                            Route Direction
                        </label>
                        <div className="border rounded-md">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>40.7128</td>
                                        <td>-74.0060</td>
                                    </tr>
                                    <tr>
                                        <td>51.5074</td>
                                        <td>-0.1278</td>
                                    </tr>
                                    <tr>
                                        <td>-33.8688</td>
                                        <td>151.2093</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <input name="status" type="text" id="status" className={`form-input w-full pointer-events-none`} value={details.archive} onChange={onInputChange} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TripsModule;
