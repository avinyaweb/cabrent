import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { Link, useNavigate } from 'react-router-dom';
import IconEdit from '@/components/Icon/IconEdit';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

interface PGTransactionsProps {
    details: {
        id: string;
        amount: string;
        fk_userid: string;
        transactionMode: string;
        archive: string;
        purposeOfTransaction: string;
        creditAndDebit: string;
        paymentModule: string;
        paymentStatus: string;
        coupon: string;
        thirdParty: string;
        fromUser: string;
        toUser: string;
        toUserPhoneNumber: string;
        userId: string;
        purpose: string;
        walletType: string;
        bankAccountIFSCFrom: string;
        bankAccountIFSCTo: string;
        pgTransactionId: string;
        walletStatus: string;
        appTransactionId: string;
        platformTransactionId: string;
        bankVerification: string;
        bankLabel: string;
        walletTransactionId: string;
        virtualTransactionId: string;
        dateTime: string;
        distributorName: string;
        walletProfileStatus: string;
        walletIdFromUser: string;
        walletIdToUser: string;
        source: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecificEdit: boolean;
    viewSpecific: boolean;
}

const PGTransactionsModulePage: React.FC<PGTransactionsProps> = ({ details, onInputChange, showStatus = true, viewSpecific, viewSpecificEdit }) => {
    const [selectedTransactionMode, setSelectedTransactionMode] = useState(details.transactionMode);
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // handle select dropdown function.
    const handleTransactionModeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedTransactionMode(value);
        onInputChange({
            target: {
                name: 'transactionMode',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    const navigate = useNavigate();
    return (
        <>
            {viewSpecific && (
                <>
                    <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                        {/* Edit */}
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => navigate('/TransactionModule/PGTransactions/EditPGTransactions/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}

            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className={`lg:w-1/3   ${viewSpecificEdit ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="amount" className="block mb-1  ">
                        Amount
                    </label>
                    {viewSpecificEdit ? (
                        <input
                            name="amount"
                            type="text"
                            id="amount"
                            placeholder="Enter Amount"
                            className={`form-input w-full pointer-events-none `}
                            readOnly={viewSpecific}
                            value={details.amount}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="amount"
                            type="text"
                            id="amount"
                            placeholder="Enter Amount"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none  ' : ''}`}
                            readOnly={viewSpecific}
                            // value={details.amount}
                            value="44"
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className={`lg:w-1/3   ${viewSpecificEdit ? 'pointer-events-none' : ''}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_userid" className="block mb-1 font-bold text-md">
                            User Name
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Admin/ViewSpecificAdmin/654e130c221e70962b239872'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>

                    {viewSpecificEdit ? (
                        <input
                            name="fk_userid"
                            type="text"
                            id="fk_userid"
                            placeholder="Enter User ID"
                            className={`form-input w-full pointer-events-none `}
                            readOnly={viewSpecific}
                            value={details.fk_userid}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="fk_userid"
                            type="text"
                            id="fk_userid"
                            placeholder="Enter User ID"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none  ' : ''}`}
                            readOnly={viewSpecific}
                            // value={details.fk_userid}
                            value="Ansar"
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="status" className="block mb-1 text-md font-bold">
                        Update Profile Status
                    </label>
                    {viewSpecific ? (
                        <input
                            name="Archive"
                            type="text"
                            id="Archive"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details?.data?.adminTeam?.Archive}
                            value="HOLD"
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="status" className="form-select text-white-dark" required>
                            <option value="">Select your Archive</option>
                            <option value={'PENDING'}>PENDING</option>
                            <option value={'APPROVED'}>APPROVED</option>
                            <option value={'REJECTED'}>REJECTED</option>
                            <option value={'HOLD'}>HOLD</option>
                            <option value={'SUSPENDED'}>SUSPENDED</option>
                        </select>
                    )}
                </div>
                {/* {showStatus && ( // Conditionally rendering based on the showStatus prop
                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="archive" className="block mb-1  ">
                             Status
                        </label>
                      
                            <input
                                name="status"
                                type="text"
                                id="status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none  ' : ''}`}
                                // value={details.transactionMode}
                                value='true'
                                onChange={onInputChange}
                            />
                       
                    </div>
                )} */}
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="serviceProviderType" className="block mb-1">
                        Transaction Mode
                    </label>
                    <input
                        id="serviceProviderType"
                        className="form-input text-white-dark pointer-events-none"
                        required
                        // value={details.moneyRequestType}
                        // onChange={handleMoneyRequestTypeChange}
                        value={'LINK'}
                    />
                </div>

                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="purposeOfTransaction" className="block mb-1">
                        Purpose Of Transaction
                    </label>
                    <input
                        id="purposeOfTransaction"
                        className="form-input text-white-dark pointer-events-none"
                        required
                        // value={details.moneyRequestType}
                        // onChange={handleMoneyRequestTypeChange}
                        value={'Subscription purchase'}
                    />
                </div>

                {/* <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="paymentModule" className="block mb-1">
                     Payment Module
                    </label>
                    <input
                        id="paymentModule"
                        className="form-input text-white-dark pointer-events-none"
                        required
                        value={'Bank Transfer'}
                        // onChange={handleMoneyRequestTypeChange}
                        // value={details.paymentModule}
                    />
                </div> */}

                <div className="lg:w-1/3">
                    <label htmlFor="paymentModule" className="block mb-1">
                        Payment Module
                    </label>
                    <input name="paymentModule" placeholder="" type="text" id="paymentModule" className="form-input w-full pointer-events-none" value={'Bank Transfer'} readOnly />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="coupon" className="block mb-1">
                        Coupon
                    </label>
                    <input
                        id="coupon"
                        className="form-input text-white-dark pointer-events-none"
                        required
                        // value={details.moneyRequestType}
                        // onChange={handleMoneyRequestTypeChange}
                        value={'COUPON3421'}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="creditAndDebit" className="block mb-1">
                        Credit And Debit
                    </label>
                    <input name="creditAndDebit" placeholder="" type="text" id="creditAndDebit" className="form-input w-full pointer-events-none" value={'Credit'} readOnly />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="paymentStatus" className="block mb-1">
                        Payment Status
                    </label>
                    <input name="paymentStatus" placeholder="" type="text" id="paymentStatus" className="form-input w-full pointer-events-none" value={'sucess'} readOnly />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="thirdParty" className="block mb-1">
                        Third Party
                    </label>

                    <input name="thirdParty" placeholder="" type="text" id="thirdParty" className="form-input w-full pointer-events-none" value={'Distributor'} readOnly />
                </div>

                <div className="lg:w-1/3"></div>
                <div className="lg:w-1/3"></div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
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
        </>
    );
};

export default PGTransactionsModulePage;
