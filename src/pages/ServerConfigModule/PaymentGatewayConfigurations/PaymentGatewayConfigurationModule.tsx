import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TripsInvoiceProps {
    details: {
        id: string;
        bookingId: string;
        amount: string;
        archive: string;
        paymentGatewayCurrency: string;
        stripeSecretKey: string;
        braintreeEnvironment: string;
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
}

const PaymentGatewayConfigurationModule: React.FC<TripsInvoiceProps> = ({ details, onInputChange, showStatus = true, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD'];

    return (
        <>
            <div>
                <h1>Payment Gateway Configuration</h1>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="paymentGateway" className="block mb-1">
                            Payment Gateway
                        </label>
                        <select name="paymentGateway" id="paymentGateway" className="form-select w-full" onChange={onInputChange}>
                            <option value="paypal">PayPal</option>
                            <option value="paytm">Paytm</option>
                            <option value="phonepay">PhonePe</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="paymentGatewayCurrency" className="block mb-1">
                            Payment Gateway Currency
                        </label>
                        <input
                            name="paymentGatewayCurrency"
                            type="text"
                            id="paymentGatewayCurrency"
                            placeholder="Enter Payment Gateway Currency"
                            className="form-input w-full"
                            value={details.paymentGatewayCurrency}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="stripeSecretKey" className="block mb-1">
                            Stripe Secret Key
                        </label>
                        <input
                            name="stripeSecretKey"
                            type="password"
                            id="stripeSecretKey"
                            placeholder="Enter Stripe Secret Key"
                            className="form-input w-full"
                            value={details.stripeSecretKey}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="braintreeEnvironment" className="block mb-1">
                            Braintree Environment
                        </label>
                        <input
                            name="braintreeEnvironment"
                            type="text"
                            id="braintreeEnvironment"
                            placeholder="Enter Braintree Environment"
                            className="form-input w-full"
                            value={details.braintreeEnvironment}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="razorpayId" className="block mb-1">
                            Razorpay Id
                        </label>
                        <input name="razorpayId" type="text" id="razorpayId" placeholder="Enter Razorpay Id" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="razorpaySecretKey" className="block mb-1">
                            Razorpay Secret Key
                        </label>
                        <input
                            name="razorpaySecretKey"
                            type="password"
                            id="razorpaySecretKey"
                            placeholder="Enter Razorpay Secret Key"
                            className="form-input w-full"
                            // value={details.razorpaySecretKey}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="braintreePrivateKey" className="block mb-1">
                            Braintree PrivateKey
                        </label>
                        <input name="braintreePrivateKey" type="text" id="braintreePrivateKey" placeholder="Enter Braintree PrivateKey" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="razorpayCommission" className="block mb-1">
                            Razorpay commission in percentage
                        </label>
                        <input
                            name="razorpayCommission"
                            type="text"
                            id="razorpayCommission"
                            placeholder="Enter Razorpay commission in percentage"
                            className="form-input w-full"
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

export default PaymentGatewayConfigurationModule;
