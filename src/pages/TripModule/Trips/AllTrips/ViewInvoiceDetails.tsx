import React from 'react';

interface ViewInvoiceProps {
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
}

const staticTripsData: ViewInvoiceProps = {
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
};

const ViewInvoiceDetails = () => {
    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="businessName" className="block mb-1">
                        Business Name
                    </label>
                    <input name="businessName" type="text" className="form-input w-full" value={staticTripsData?.businessName} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="businessAddress" className="block mb-1">
                        Business Address
                    </label>
                    <input name="businessAddress" type="text" className="form-input w-full" value={staticTripsData?.businessAddress} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="gst" className="block mb-1">
                        GST
                    </label>
                    <input name="gst" type="text" id="gst" className="form-input w-full" value={staticTripsData?.gst} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="pan" className="block mb-1">
                        PAN
                    </label>
                    <input name="pan" type="text" className="form-input w-full" value={staticTripsData?.pan} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="driverName" className="block mb-1">
                        Driver Name
                    </label>
                    <input name="driverName" type="text" className="form-input w-full" value={staticTripsData?.driverName} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="vehicleNumber" className="block mb-1">
                        Vehicle Number
                    </label>
                    <input name="vehicleNumber" type="text" className="form-input w-full" value={staticTripsData?.vehicleNumber} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="distributorName" className="block mb-1">
                        Distributor Name
                    </label>
                    <input name="distributorName" type="text" className="form-input w-full" value={staticTripsData?.distributorName} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="serviceCity" className="block mb-1">
                        Service City
                    </label>
                    <input name="serviceCity" type="text" className="form-input w-full" value={staticTripsData?.serviceCity} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="serviceType" className="block mb-1">
                        Service Type
                    </label>
                    <input name="serviceType" type="text" className="form-input w-full" value={staticTripsData?.serviceType} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="bookingType" className="block mb-1">
                        Booking Type
                    </label>
                    <input name="bookingType" type="text" className="form-input w-full" value={staticTripsData?.bookingType} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="vehicleType" className="block mb-1">
                        Vehicle Type
                    </label>
                    <input name="vehicleType" type="text" className="form-input w-full" value={staticTripsData?.vehicleType} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="leadSource" className="block mb-1">
                        Lead Source
                    </label>
                    <input name="leadSource" type="text" className="form-input w-full" value={staticTripsData?.leadSource} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="promoDiscount" className="block mb-1">
                        Promo Discount
                    </label>
                    <input name="promoDiscount" type="text" className="form-input w-full" value={staticTripsData?.promoDiscount} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="totalDistance" className="block mb-1">
                        Total Distance
                    </label>
                    <input name="totalDistance" type="text" className="form-input w-full" value={staticTripsData?.totalDistance} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="totalTime" className="block mb-1">
                        Total Time
                    </label>
                    <input name="totalTime" type="text" className="form-input w-full" value={staticTripsData?.totalTime} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="baseFare" className="block mb-1">
                        Base Fare
                    </label>
                    <input name="baseFare" type="text" className="form-input w-full" value={staticTripsData?.baseFare} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="extraKmCharge" className="block mb-1">
                        Extra Km Charge
                    </label>
                    <input name="extraKmCharge" type="text" className="form-input w-full" value={staticTripsData?.extraKmCharge} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="extraTimeCharge" className="block mb-1">
                        Extra Time Charge
                    </label>
                    <input name="extraTimeCharge" type="text" className="form-input w-full" value={staticTripsData?.extraTimeCharge} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="waitingTime" className="block mb-1">
                        Waiting Time
                    </label>
                    <input name="waitingTime" type="text" className="form-input w-full" value={staticTripsData?.waitingTime} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="waitingCharge" className="block mb-1">
                        Waiting Charge
                    </label>
                    <input name="waitingCharge" type="text" className="form-input w-full" value={staticTripsData?.waitingCharge} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="pickupCharge" className="block mb-1">
                        Pickup Charge
                    </label>
                    <input name="pickupCharge" type="text" className="form-input w-full" value={staticTripsData?.pickupCharge} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="nightFare" className="block mb-1">
                        Night Fare
                    </label>
                    <input name="nightFare" type="text" className="form-input w-full" value={staticTripsData?.nightFare} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="driverNightConvenienceCharge" className="block mb-1">
                        Driver Night Convenience Charge
                    </label>
                    <input name="driverNightConvenienceCharge" type="text" className="form-input w-full" value={staticTripsData?.driverNightConvenienceCharge} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="driverDayConvenienceCharge" className="block mb-1">
                        Driver Day Convenience Charge
                    </label>
                    <input name="driverDayConvenienceCharge" type="text" className="form-input w-full" value={staticTripsData?.driverDayConvenienceCharge} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="travelAgencyDiscount" className="block mb-1">
                        Travel Agency Discount
                    </label>
                    <input name="travelAgencyDiscount" type="text" className="form-input w-full" value={staticTripsData?.travelAgencyDiscount} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="tollPermitParkingCharges" className="block mb-1">
                        Toll Permit Parking Charges
                    </label>
                    <input name="tollPermitParkingCharges" type="text" className="form-input w-full" value={staticTripsData?.tollPermitParkingCharges} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="gstTax" className="block mb-1">
                        GST Tax
                    </label>
                    <input name="gstTax" type="text" className="form-input w-full" value={staticTripsData?.gstTax} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="totalCalculationTripCost" className="block mb-1">
                        Total Calculation Trip Cost
                    </label>
                    <input name="totalCalculationTripCost" type="text" className="form-input w-full" value={staticTripsData?.totalCalculationTripCost} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="leadCharge" className="block mb-1">
                        Lead Charge
                    </label>
                    <input name="leadCharge" type="text" className="form-input w-full" value={staticTripsData?.leadCharge} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="pgCharge" className="block mb-1">
                        PG Charge
                    </label>
                    <input name="pgCharge" type="text" className="form-input w-full" value={staticTripsData?.pgCharge} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="googleCharge" className="block mb-1">
                        Google Charge
                    </label>
                    <input name="googleCharge" type="text" className="form-input w-full" value={staticTripsData?.googleCharge} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="platformGSTtTax" className="block mb-1">
                        Platform GST Tax
                    </label>
                    <input name="platformGSTtTax" type="text" className="form-input w-full" value={staticTripsData?.platformGSTtTax} readOnly={true} />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="roundOff" className="block mb-1">
                        Round Off
                    </label>
                    <input name="roundOff" type="text" className="form-input w-full" value={staticTripsData?.roundOff} readOnly={true} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/2 pointer-events-none">
                    <label htmlFor="netPayableAmount" className="block mb-1">
                        Net Payable Amount
                    </label>
                    <input name="netPayableAmount" type="text" className="form-input w-full" value={staticTripsData?.netPayableAmount} readOnly={true} />
                </div>
                <div className="lg:w-1/2 pointer-events-none">
                    <label htmlFor="paymentMode" className="block mb-1">
                        Payment Mode
                    </label>
                    <input name="paymentMode" type="text" className="form-input w-full" value={staticTripsData?.paymentMode} readOnly={true} />
                </div>
            </div>
        </>
    );
};

export default ViewInvoiceDetails;
