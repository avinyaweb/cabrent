import React, { useState, ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface WithdrawMoneyFromWalletProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const WithdrawMoneyFromWallet = () => {
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
                        currentPath === '/WalletModule/WithdrawMoneyFromWallet/ViewWithdrawMoneyFromWallet' ? 'text-blue-600' : ''
                    }`}
                >
                    Withdraw Money From Wallet
                </li>
            </ol>

            <div className="panel mt-6">
                <h1 className="text-2xl p-2 font-bold"> Withdraw Money From Wallet</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="transactionId" className="block mb-1">
                                Transaction ID
                            </label>
                            <input name="transactionId" type="text" id="transactionId" placeholder="Enter Transaction ID" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="driverName" className="block mb-1">
                                Driver Name
                            </label>
                            <input name="driverName" type="text" id="driverName" placeholder="Enter Driver Name" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="amount" className="block mb-1">
                                Amount
                            </label>
                            <input name="amount" type="text" id="amount" placeholder="Enter Amount" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="paymentType" className="block mb-1">
                                Payment Type
                            </label>
                            <input name="paymentType" type="text" id="paymentType" placeholder="Enter Payment Type" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="description" className="block mb-1">
                                Description
                            </label>
                            <input name="description" type="text" id="description" placeholder="Enter Description" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="paymentDate" className="block mb-1">
                                Payment Date
                            </label>
                            <input name="paymentDate" type="date" id="paymentDate" placeholder="Enter Payment Date" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Add
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

export default WithdrawMoneyFromWallet;
