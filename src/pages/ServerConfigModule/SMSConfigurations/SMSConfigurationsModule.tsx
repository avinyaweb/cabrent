import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TripsInvoiceProps {
    details: {
        id: string;
        bookingId: string;
        amount: string;
        archive: string;
        smsGateway: string;
        twilioAccountSid: string;
        twilioAuthToken: string;
        twilioNumber: string;
        nexmoApiKey: string;
        nexmoApiSecret: string;
        nexmoApiNumber: string;
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
}

const SMSConfigurationsModule: React.FC<TripsInvoiceProps> = ({ details, onInputChange, showStatus = true, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD'];

    return (
        <>
            <div>
                <h1>SMS Configuration</h1>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="smsGateway" className="block mb-1">
                            SMS Gateway
                        </label>
                        <select name="smsGateway" id="smsGateway" className="form-select w-full" value={details.smsGateway} onChange={onInputChange}>
                            <option value="twilio">Twilio</option>
                            <option value="nexmo">Nexmo</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="twilioAccountSid" className="block mb-1">
                            Twilio Account Sid
                        </label>
                        <input
                            name="twilioAccountSid"
                            type="text"
                            id="twilioAccountSid"
                            placeholder="Enter Twilio Account Sid"
                            className="form-input w-full"
                            value={details.twilioAccountSid}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="twilioAuthToken" className="block mb-1">
                            Twilio Auth Token
                        </label>
                        <input
                            name="twilioAuthToken"
                            type="password"
                            id="twilioAuthToken"
                            placeholder="Enter Twilio Auth Token"
                            className="form-input w-full"
                            value={details.twilioAuthToken}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="twilioNumber" className="block mb-1">
                            Twilio Number
                        </label>
                        <input name="twilioNumber" type="tel" id="twilioNumber" placeholder="Enter Twilio Number" className="form-input w-full" value={details.twilioNumber} onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="nexmoApiKey" className="block mb-1">
                            Nexmo API Key
                        </label>
                        <input name="nexmoApiKey" type="text" id="nexmoApiKey" placeholder="Enter Nexmo API Key" className="form-input w-full" value={details.nexmoApiKey} onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="nexmoApiSecret" className="block mb-1">
                            Nexmo API Secret
                        </label>
                        <input
                            name="nexmoApiSecret"
                            type="password"
                            id="nexmoApiSecret"
                            placeholder="Enter Nexmo API Secret"
                            className="form-input w-full"
                            value={details.nexmoApiSecret}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="nexmoApiNumber" className="block mb-1">
                            Nexmo API Number
                        </label>
                        <input
                            name="nexmoApiNumber"
                            type="tel"
                            id="nexmoApiNumber"
                            placeholder="Enter Nexmo API Number"
                            className="form-input w-full"
                            value={details.nexmoApiNumber}
                            onChange={onInputChange}
                        />
                    </div>
                    {/* Add similar divs for other settings */}
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

export default SMSConfigurationsModule;
