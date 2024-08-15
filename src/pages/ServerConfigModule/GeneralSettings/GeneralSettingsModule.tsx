import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TripsInvoiceProps {
    details: {
        id: string;
        bookingId: string;
        amount: string;
        archive: string;
        appName: string;
        companyMail: string;
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
}

const GeneralSettingsModule: React.FC<TripsInvoiceProps> = ({ details, onInputChange, showStatus = true, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD'];

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="appName" className="block mb-1">
                        App Name
                    </label>
                    <input name="appName" type="text" id="appName" placeholder="Enter App Name" className="form-input w-full" value={details.appName} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="defaultPassword" className="block mb-1">
                        Default Password
                    </label>
                    <input
                        name="defaultPassword"
                        type="password"
                        id="defaultPassword"
                        placeholder="Enter Default Password"
                        className="form-input w-full"
                        // value={details.defaultPassword}   ///check if you needed
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="timezoneOffset" className="block mb-1">
                        Timezone Offset
                    </label>
                    <input name="timezoneOffset" type="text" id="timezoneOffset" placeholder="Enter Timezone Offset" className="form-input w-full" onChange={onInputChange} />
                </div>
            </div>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="defaultPhoneCode" className="block mb-1">
                        Default Phone Code
                    </label>
                    <input name="defaultPhoneCode" type="text" id="defaultPhoneCode" placeholder="Enter Default Phone Code" className="form-input w-full" onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="companyAddress" className="block mb-1">
                        Company Address
                    </label>
                    <input name="companyAddress" type="text" id="companyAddress" placeholder="Enter Company Address" className="form-input w-full" onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="companyMail" className="block mb-1">
                        Company Mail
                    </label>
                    <input name="companyMail" type="email" id="companyMail" placeholder="Enter Company Mail" className="form-input w-full" value={details.companyMail} onChange={onInputChange} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="maxRequestRadius" className="block mb-1">
                        Max Request Radius (In Miles)
                    </label>
                    <input name="maxRequestRadius" type="text" id="maxRequestRadius" placeholder="Enter Max Request Radius" className="form-input w-full" onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="driverCanceledAllowed" className="block mb-1">
                        No Of Driver Canceled Allowed Per Day (No - 1)
                    </label>
                    <input
                        name="driverCanceledAllowed"
                        type="text"
                        id="driverCanceledAllowed"
                        placeholder="Enter No Of Driver Canceled Allowed"
                        className="form-input w-full"
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="riderCanceledAllowed" className="block mb-1">
                        No Of Rider Canceled Allowed Per Day (No - 1)
                    </label>
                    <input name="riderCanceledAllowed" type="text" id="riderCanceledAllowed" placeholder="Enter No Of Rider Canceled Allowed" className="form-input w-full" onChange={onInputChange} />
                </div>
            </div>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="driversToBeCalled" className="block mb-1">
                        No Of Drivers To be Called Nearby Pickup Point
                    </label>
                    <input name="driversToBeCalled" type="text" id="driversToBeCalled" placeholder="Enter No Of Drivers To be Called" className="form-input w-full" onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="requestTimeDriver" className="block mb-1">
                        Req Time For Single Driver Accept/Decline
                    </label>
                    <input name="requestTimeDriver" type="text" id="requestTimeDriver" placeholder="Enter Request Time For Single Driver" className="form-input w-full" onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="requestTimeRider" className="block mb-1">
                        Req Time for Rider to Search for Nearby Driver
                    </label>
                    <input name="requestTimeRider" type="text" id="requestTimeRider" placeholder="Enter Requesting Time For Rider" className="form-input w-full" onChange={onInputChange} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="currencySymbol" className="block mb-1">
                        Currency Symbol
                    </label>
                    <input name="currencySymbol" type="text" id="currencySymbol" placeholder="Enter Currency Symbol" className="form-input w-full" onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="currencyLabel" className="block mb-1">
                        Currency Label
                    </label>
                    <input name="currencyLabel" type="text" id="currencyLabel" placeholder="Enter Currency Label" className="form-input w-full" onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="distanceUnitSymbol" className="block mb-1">
                        Distance Unit Symbol
                    </label>
                    <input name="distanceUnitSymbol" type="text" id="distanceUnitSymbol" placeholder="Enter Distance Unit Symbol" className="form-input w-full" onChange={onInputChange} />
                </div>
            </div>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="distanceUnitLabel" className="block mb-1">
                        Distance Unit Label
                    </label>
                    <input name="distanceUnitLabel" type="text" id="distanceUnitLabel" placeholder="Enter Distance Unit Label" className="form-input w-full" onChange={onInputChange} />
                </div>
            </div>

            {showStatus ? (
                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Status
                    </label>
                    <select name="archive" id="archive" className="form-select w-full" value={details.archive} onChange={onInputChange} disabled={!isEditable}>
                        {statusOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="lg:w-1/3" />
            )}
        </>
    );
};

export default GeneralSettingsModule;
