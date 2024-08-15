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
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
}

const TripsInvoiceModule: React.FC<TripsInvoiceProps> = ({ details, onInputChange, showStatus = true, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD'];

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="bookingId" className="block mb-1">
                        Booking ID
                    </label>
                    <input
                        name="bookingId"
                        type="text"
                        id="bookingId"
                        placeholder="Enter Booking ID"
                        className="form-input w-full"
                        value={details.bookingId}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="amount" className="block mb-1">
                        Amount
                    </label>
                    <input name="amount" type="text" id="amount" placeholder="Enter Amount" className="form-input w-full" value={details.amount} onChange={onInputChange} disabled={!isEditable} />
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
            </div>
        </>
    );
};

export default TripsInvoiceModule;
