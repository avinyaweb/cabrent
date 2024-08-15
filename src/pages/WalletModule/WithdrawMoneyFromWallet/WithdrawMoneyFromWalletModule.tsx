import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface WithdrawMoneyFromWalletModuleProps {
    details: {
        id: string;
        TransactionID: string;
        DriverName: string;
        Amount: string;
        PaymentType: string;
        Description: string;
        PaymentDate: string;
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const WithdrawMoneyFromWalletModule: React.FC<WithdrawMoneyFromWalletModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [value, setValue] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="transactionId" className="block mb-1">
                        Transaction ID
                    </label>
                    <input
                        name="transactionId"
                        type="text"
                        id="transactionId"
                        placeholder="Enter Transaction ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.transactionId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="driverName" className="block mb-1">
                        Driver Name
                    </label>
                    <input
                        name="driverName"
                        type="text"
                        id="driverName"
                        placeholder="Enter Driver Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.driverName}
                        value="shashi"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="amount" className="block mb-1">
                        Amount
                    </label>
                    <input
                        name="amount"
                        type="text"
                        id="amount"
                        placeholder="Enter Amount"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value="24500"
                        // value={details?.amount}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-4">
                <div className="lg:w-1/3">
                    <label htmlFor="paymentType" className="block mb-1">
                        Payment Type
                    </label>
                    <input
                        name="paymentType"
                        type="text"
                        id="paymentType"
                        placeholder="Enter Payment Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.paymentType}
                        value="UPI"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="description" className="block mb-1">
                        Description
                    </label>
                    <input
                        name="description"
                        type="text"
                        id="description"
                        placeholder="Enter Description"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.description}
                        value="Wallet Amount Debited Successfull"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="paymentDate" className="block mb-1">
                        Payment Date
                    </label>
                    <input
                        name="paymentDate"
                        type="date"
                        id="paymentDate"
                        placeholder="Enter Payment Date"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.paymentDate}
                        value="2024-05-13"
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </>
    );
};

export default WithdrawMoneyFromWalletModule;
