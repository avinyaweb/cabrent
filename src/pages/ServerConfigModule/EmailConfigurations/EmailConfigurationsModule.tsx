import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TripsInvoiceProps {
    details: {
        id: string;
        bookingId: string;
        amount: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
}

const EmailConfigurationsModule: React.FC<TripsInvoiceProps> = ({ details, onInputChange, showStatus = true, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD'];

    return (
        <>
            <div>
                <h1>Email Configuration</h1>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="emailGateway" className="block mb-1">
                            Email Gateway
                        </label>
                        <select
                            name="emailGateway"
                            id="emailGateway"
                            className="form-select w-full"
                            //  onChange={onInputChange}
                        >
                            <option value="gmail">Gmail</option>
                            <option value="outlook">Outlook</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="smtpEmailUserName" className="block mb-1">
                            SMTP Email User Name
                        </label>
                        <input name="smtpEmailUserName" type="text" id="smtpEmailUserName" placeholder="Enter SMTP Email User Name" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="smtpEmailPassword" className="block mb-1">
                            SMTP Email Password
                        </label>
                        <input name="smtpEmailPassword" type="password" id="smtpEmailPassword" placeholder="Enter SMTP Email Password" className="form-input w-full" onChange={onInputChange} />
                    </div>
                </div>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="sendGridKey" className="block mb-1">
                            SendGrid Key
                        </label>
                        <input name="sendGridKey" type="text" id="sendGridKey" placeholder="Enter SendGrid Key" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="mailFromAddress" className="block mb-1">
                            Mail From Address
                        </label>
                        <input name="mailFromAddress" type="email" id="mailFromAddress" placeholder="Enter Mail From Address" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="appSupportNumber" className="block mb-1">
                            App Support Number
                        </label>
                        <input name="appSupportNumber" type="tel" id="appSupportNumber" placeholder="Enter App Support Number" className="form-input w-full" onChange={onInputChange} />
                    </div>
                </div>
            </div>

            {showStatus ? (
                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Status
                    </label>
                    <select
                        name="archive"
                        id="archive"
                        className="form-select w-full"
                        value={details.archive}
                        // onChange={onInputChange}
                        disabled={!isEditable}
                    >
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

export default EmailConfigurationsModule;
