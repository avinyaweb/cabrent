import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

interface TransactionHistoryModuleProps {
    details: {
        id: string;
        fromUser: string;
        toUser: string;
        toUserPhoneNumber: string;
        userId: string;
        purpose: string;
        amount: string;
        walletType: string;
        bankAccountIFSCFrom: string;
        bankAccountIFSCTo: string;
        pgTransactionId: string;
        transactionMode: string;
        walletStatus: string;
        appTransactionId: string;
        platformTransactionId: string;
        bankVerification: string;
        bankLabel: string;
        walletTransactionId: string;
        virtualTransactionId: string;
        paymentStatus: string;
        dateTime: string;
        distributorName: string;
        walletProfileStatus: string;
        walletIdFromUser: string;
        walletIdToUser: string;
        source: string;
    };

    showStatus?: boolean;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    viewSpecific: boolean;
}

const TransactionHistoryModule: React.FC<TransactionHistoryModuleProps> = ({ details, showStatus = true, onInputChange, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [quillContent, setQuillContent] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    const handleQuillChange = (content: string) => {
        setQuillContent(content);
    };

    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            // Replace 'your_upload_endpoint' with your actual image upload endpoint
            const response = await axios.post('your_upload_endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Assuming your server responds with the uploaded image URL
            const imageUrl = response.data.imageUrl;

            const editor = quillRef.current?.getEditor();
            if (editor) {
                const range = editor.getSelection(true);
                editor.insertEmbed(range.index, 'image', imageUrl);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const quillRef = React.useRef<ReactQuill>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/2">
                    <label htmlFor="fromUser" className="block mb-1">
                        From User
                    </label>
                    <input
                        name="fromUser"
                        type="text"
                        id="fromUser"
                        placeholder="From User"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.fromUser || 'UserA'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="toUser" className="block mb-1">
                        To User
                    </label>
                    <input
                        name="toUser"
                        type="text"
                        id="toUser"
                        placeholder="To User"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.toUser || 'UserB'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="toUserPhoneNumber" className="block mb-1">
                        To User Phone Number
                    </label>
                    <input
                        name="toUserPhoneNumber"
                        type="text"
                        id="toUserPhoneNumber"
                        placeholder="To User Phone Number"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.toUserPhoneNumber || '12345234523'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="userId" className="block mb-1">
                        User ID
                    </label>
                    <input
                        name="userId"
                        type="text"
                        id="userId"
                        placeholder="User ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.userId || 'U123'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="purpose" className="block mb-1">
                        Purpose
                    </label>
                    <input
                        name="purpose"
                        type="text"
                        id="purpose"
                        placeholder="Purpose"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.purpose || 'Payment for services'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="amount" className="block mb-1">
                        Amount
                    </label>
                    <input
                        name="amount"
                        type="text"
                        id="amount"
                        placeholder="Amount"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.amount || '100.00'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="walletType" className="block mb-1">
                        Wallet Type
                    </label>
                    <input
                        name="walletType"
                        type="text"
                        id="walletType"
                        placeholder="Wallet Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.walletType || 'Digital'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="bankAccountIFSCFrom" className="block mb-1">
                        Bank Account IFSC From
                    </label>
                    <input
                        name="bankAccountIFSCFrom"
                        type="text"
                        id="bankAccountIFSCFrom"
                        placeholder="Bank Account IFSC From"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.bankAccountIFSCFrom || 'IFSC001'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="bankAccountIFSCTo" className="block mb-1">
                        Bank Account IFSC To
                    </label>
                    <input
                        name="bankAccountIFSCTo"
                        type="text"
                        id="bankAccountIFSCTo"
                        placeholder="Bank Account IFSC To"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.bankAccountIFSCTo || 'IFSC002'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="pgTransactionId" className="block mb-1">
                        PG Transaction ID
                    </label>
                    <input
                        name="pgTransactionId"
                        type="text"
                        id="pgTransactionId"
                        placeholder="PG Transaction ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.pgTransactionId || 'PG123456'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="transactionMode" className="block mb-1">
                        Transaction Mode
                    </label>
                    <input
                        name="transactionMode"
                        type="text"
                        id="transactionMode"
                        placeholder="Transaction Mode"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.transactionMode || 'Online'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="walletStatus" className="block mb-1">
                        Wallet Status
                    </label>
                    <input
                        name="walletStatus"
                        type="text"
                        id="walletStatus"
                        placeholder="Wallet Status"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.walletStatus || 'Completed'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="appTransactionId" className="block mb-1">
                        App Transaction ID
                    </label>
                    <input
                        name="appTransactionId"
                        type="text"
                        id="appTransactionId"
                        placeholder="App Transaction ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.appTransactionId || 'APP123456'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="platformTransactionId" className="block mb-1">
                        Platform Transaction ID
                    </label>
                    <input
                        name="platformTransactionId"
                        type="text"
                        id="platformTransactionId"
                        placeholder="Platform Transaction ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.platformTransactionId || 'PLT123456'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="bankVerification" className="block mb-1">
                        Bank Verification
                    </label>
                    <input
                        name="bankVerification"
                        type="text"
                        id="bankVerification"
                        placeholder="Bank Verification"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.bankVerification || 'Verified'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="bankLabel" className="block mb-1">
                        Bank Label
                    </label>
                    <input
                        name="bankLabel"
                        type="text"
                        id="bankLabel"
                        placeholder="Bank Label"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.bankLabel || 'Yes'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="walletTransactionId" className="block mb-1">
                        Wallet Transaction ID
                    </label>
                    <input
                        name="walletTransactionId"
                        type="text"
                        id="walletTransactionId"
                        placeholder="Wallet Transaction ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.walletTransactionId || 'WT123456'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="virtualTransactionId" className="block mb-1">
                        Virtual Transaction ID
                    </label>
                    <input
                        name="virtualTransactionId"
                        type="text"
                        id="virtualTransactionId"
                        placeholder="Virtual Transaction ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.virtualTransactionId || 'VT123456'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="paymentStatus" className="block mb-1">
                        Payment Status
                    </label>
                    <input
                        name="paymentStatus"
                        type="text"
                        id="paymentStatus"
                        placeholder="Payment Status"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.paymentStatus || 'Success'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="dateTime" className="block mb-1">
                        Date & Time
                    </label>
                    <input
                        name="dateTime"
                        type="text"
                        id="dateTime"
                        placeholder="Date & Time"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.dateTime || '2024-05-20T12:00:00Z'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="distributorName" className="block mb-1">
                        Distributor Name
                    </label>
                    <input
                        name="distributorName"
                        type="text"
                        id="distributorName"
                        placeholder="Distributor Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.distributorName || 'manu privet limted'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/2">
                    <label htmlFor="walletProfileStatus" className="block mb-1">
                        Wallet Profile Status
                    </label>
                    <input
                        name="walletProfileStatus"
                        type="text"
                        id="walletProfileStatus"
                        placeholder="Wallet Profile Status"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.walletProfileStatus || 'Active'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="walletIdFromUser" className="block mb-1">
                        Wallet ID From User
                    </label>
                    <input
                        name="walletIdFromUser"
                        type="text"
                        id="walletIdFromUser"
                        placeholder="Wallet ID From User"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.walletIdFromUser || 'WID123'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="walletIdToUser" className="block mb-1">
                        Wallet ID To User
                    </label>
                    <input
                        name="walletIdToUser"
                        type="text"
                        id="walletIdToUser"
                        placeholder="Wallet ID To User"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.walletIdToUser || 'WID456'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                {showStatus && (
                    <div className="lg:w-1/2">
                        <label htmlFor="status" className="block mb-1">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input name="status" type="text" id="status" placeholder="Enter Status" className="form-input w-full pointer-events-none" value={'Approved'} readOnly />
                        ) : (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                placeholder="Enter Status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                // value={details.archive}
                                onChange={onInputChange}
                            />
                        )}
                    </div>
                )}
                {!showStatus && <div className="lg:w-1/3" />}
            </div>
        </>
    );
};

export default TransactionHistoryModule;
