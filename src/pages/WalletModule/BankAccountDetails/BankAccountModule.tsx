import React, { useState, ChangeEvent } from 'react';
import '../../../assets/css/file-upload-preview.css';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate } from 'react-router-dom';

interface BankAccountProps {
    details: {
        id: string;
        bankName: string;
        fk_userId: string;
        accountHolderName: string;
        accountNumber: string;
        ifscCode: string;
        branchName: string;
        panNumber: string;
        voterId: string;
        aadhar: string;
        gst: string;
        accountType: string;
        verificationHistory: string;
        archive: string;
        approvedBy: string;
        approvedAt: string;
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
        bankVerify: string;
        pgLabel: string;
        pgVerify: string;

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
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    isEdit?: boolean;
    viewSpecific?: boolean;
}
interface User {
    id: string;
}
const BankAccountModule: React.FC<BankAccountProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEdit }) => {
    const [modal5, setModal5] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [addedUserType, setAddedUserType] = useState<any>();

    // add user in bank
    const handleAddUserSubmit = (selectedUsers: User[], userID: string) => {
        setSelectedUsers(selectedUsers);
        setAddedUserType(userID);
    };

    // const handleAddUserSubmit = (selectedUsers: string[], userID: string) => {
    //     setSelectedUsers(selectedUsers);
    //     setAddedUserType(userID);
    // };
    const navigate = useNavigate();

    const classNameValue = viewSpecific ? 'lg:w-1/2 pointer-events-none' : 'lg:w-1/3';

    return (
        <>
            {/* {viewSpecific && (
                <>
                    <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                        
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => navigate('/TransactionModule/BankAccount/EditBankAccount/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )} */}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className={classNameValue}>
                    <label htmlFor="bankName" className="block mb-1  ">
                        Bank Name
                    </label>
                    <input
                        name="bankName"
                        type="text"
                        id="bankName"
                        placeholder="Enter Bank Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        value={details.bankName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                {/* {!viewSpecific && (
                    <div className="lg:w-1/3">
                        <label htmlFor="fk_userId" className="block mb-1 ">
                            User List
                        </label>
                        <div>
                            {addedUserType === 'channelPartner' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added Channel Partner User
                                </button>
                            ) : addedUserType === 'driver' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added Driver User
                                </button>
                            ) : addedUserType === 'fleetOwner' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added fleet User
                                </button>
                            ) : isEdit ? (
                                <div className="flex">
                                    <input
                                        name="channelPartnerType"
                                        type="text"
                                        id="channelPartnerType"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={'Driver 1'}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal5(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-primary w-full">
                                    Add User
                                </button>
                            )}
                        </div>
                    </div>
                )} */}
                <div className={classNameValue}>
                    <label htmlFor="accountHolderName" className="block mb-1 ">
                        Account Holder Name
                    </label>
                    <input
                        name="accountHolderName"
                        type="text"
                        id="accountHolderName"
                        placeholder="Enter Account Holder Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        value={details.accountHolderName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={classNameValue}>
                    <label htmlFor="userType" className="block mb-1 ">
                        User Type
                    </label>
                    <input
                        name="userType"
                        type="text"
                        id="userType"
                        placeholder={!viewSpecific ? 'Enter the User Type' : ''}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        // value={details.accountHolderName}
                        value={viewSpecific ? 'Driver' : ''}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
            </div>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5  mt-6 ">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="accountNumber" className="block mb-1 ">
                        Account Number
                    </label>
                    <input
                        name="accountNumber"
                        type="text"
                        id="accountNumber"
                        placeholder="Enter Account Number"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        value={details.accountNumber}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="ifscCode" className="block mb-1 ">
                        IFSC Code
                    </label>
                    <input
                        name="ifscCode"
                        type="text"
                        id="ifscCode"
                        placeholder="Enter IFSC Code"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        value={details.ifscCode}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="branchName" className="block mb-1 ">
                        Branch Name
                    </label>
                    <input
                        name="branchName"
                        type="text"
                        id="branchName"
                        placeholder="Enter Branch Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        value={details.branchName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
            </div>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="accountType" className="block mb-1 ">
                        Account Type
                    </label>
                    <input
                        name="accountType"
                        type="text"
                        id="accountType"
                        placeholder="Enter Account Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        value={details.accountType}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="gst" className="block mb-1 ">
                        GST
                    </label>
                    <input
                        name="gst"
                        type="text"
                        id="gst"
                        placeholder="Enter GST Number"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                        value={details.gst}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="archive" className="block mb-1">
                        Update Profile Status
                    </label>
                    {viewSpecific ? (
                        <input name="status" type="text" id="status" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.archive} onChange={onInputChange} />
                    ) : (
                        <select id="status" className="form-select text-white-dark" required>
                            <option value="">Select your Status</option>
                            <option value={'PENDING'}>PENDING</option>
                            <option value={'APPROVED'}>APPROVED</option>
                            <option value={'REJECTED'}>REJECTED</option>
                            <option value={'HOLD'}>HOLD</option>
                            <option value={'SUSPENDED'}>SUSPENDED</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5  mt-6 ">
                <div className="lg:w-1/3">
                    <label htmlFor="bankVerify" className="block mb-1">
                        Bank Verify
                    </label>
                    {viewSpecific ? (
                        <input name="bankVerify" placeholder="Select" type="text" id="bankVerify" className="form-input w-full pointer-events-none" value={'Vehicle'} readOnly />
                    ) : (
                        <select id="bankVerify" name="bankVerify" className="form-select text-white-dark" required value={details?.bankVerify} onChange={onInputChange}>
                            <option value="">Select Bank Veification</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="pgLabel" className="block mb-1">
                        Pg label
                    </label>
                    {viewSpecific ? (
                        <input name="pgLabel" placeholder="Select" type="text" id="pgLabel" className="form-input w-full pointer-events-none" value={'Vehicle'} readOnly />
                    ) : (
                        <select id="pgLabel" name="pgLabel" className="form-select text-white-dark" required value={details?.pgLabel} onChange={onInputChange}>
                            <option value="">Select Pg label</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="pgVerify" className="block mb-1">
                        Pg Verify
                    </label>
                    {viewSpecific ? (
                        <input name="pgVerify" placeholder="Select" type="text" id="pgVerify" className="form-input w-full pointer-events-none" value={'Vehicle'} readOnly />
                    ) : (
                        <select id="pgVerify" name="pgVerify" className="form-select text-white-dark" required value={details?.pgVerify} onChange={onInputChange}>
                            <option value="">Select Pg Verify</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    )}
                </div>
            </div>
        </>
    );
};

export default BankAccountModule;
