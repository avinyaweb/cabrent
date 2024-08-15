import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';

interface ViewPaymentGatewayConfigurationProps {
    details: {
        id: string;
        bookingId: string;
        amount: string;
        archive: string;
        paymentGatewayCurrency: string;
        stripeSecretKey: string;
        braintreeEnvironment: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewPaymentGatewayConfigurations = () => {
    // const [moduleDetails, setModuleDetails] = useState(details);

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     console.log('Input changed:', event.target.name, event.target.value);
    //     setModuleDetails({ ...moduleDetails, [event.target.name]: event.target.value });
    //     onInputChange(event);
    // };

    const [quileContent, setQuileContent] = useState('hello');

    const handleRemarksChange = (content: string) => {
        setQuileContent(content);
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/ServerConfigModule/PaymentGatewayConfigurations/ViewPaymentGatewayConfigurations' ? 'text-blue-600' : ''
                    }`}
                >
                    Payment Gateway Configuration
                </li>
            </ol>

            <div className="panel mt-6">
                <h1 className="text-2xl p-2 font-bold">Payment Gateway Configuration</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="paymentGateway" className="block mb-1">
                                Payment Gateway
                            </label>
                            <select id="paymentGateway" name="paymentGateway" className="form-select text-white-dark" required>
                                <option value="">Select </option>
                                <option value={'PayPal'}>PayPal</option>
                                <option value={'Paytm'}>Paytm</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="paymentGatewayCurrency" className="block mb-1">
                                Payment Gateway Currency
                            </label>
                            <input name="paymentGatewayCurrency" type="text" id="paymentGatewayCurrency" placeholder="Enter Payment Gateway Currency" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="stripeSecretKey" className="block mb-1">
                                Stripe Secret Key
                            </label>
                            <input name="stripeSecretKey" type="text" id="stripeSecretKey" placeholder="Enter Stripe Secret Key" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="braintreeEnvironment" className="block mb-1">
                                Braintree Environment
                            </label>
                            <input name="braintreeEnvironment" type="text" id="braintreeEnvironment" placeholder="Enter Braintree Environment" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="razorpayId" className="block mb-1">
                                Razorpay Id
                            </label>
                            <input name="razorpayId" type="text" id="razorpayId" placeholder="Enter Razorpay Id" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="razorpaySecretKey" className="block mb-1">
                                Razorpay Secret Key
                            </label>
                            <input name="razorpaySecretKey" type="text" id="razorpaySecretKey" placeholder="Enter Razorpay Secret Key" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="braintreePrivateKey" className="block mb-1">
                                Braintree PrivateKey
                            </label>
                            <input name="braintreePrivateKey" type="text" id="braintreePrivateKey" placeholder="Enter Braintree PrivateKey" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="razorpayCommission" className="block mb-1">
                                Razorpay commission in percentage
                            </label>
                            <input name="razorpayCommission" type="text" id="razorpayCommission" placeholder="Enter Razorpay commission" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Update
                        </button>
                        <button type="button" className="btn btn-danger !mt-6">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ViewPaymentGatewayConfigurations;
