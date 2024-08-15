import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import 'flatpickr/dist/flatpickr.css';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate } from 'react-router-dom';

interface WalletHistoryProps {
    details: {
        id: string;
        fk_walletMaster: string;
        paidToReference: string;
        paidByReference: string;
        transactionStatus: string;
        fk_pgTransactionId: string;
        paymentType: string;
        transactionMode: string;
        archive: string;
        transactionAmount: string;

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
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const WalletHistoryModule: React.FC<WalletHistoryProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    //const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedPaymentType, setSelectedPaymentType] = useState(details.paymentType);
    const [selectedTransactionMode, setSelectedTransactionMode] = useState(details.transactionMode);

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [date1, setDate1] = useState<any>(formattedToday);

    // Dynamic roles data fetching --Will use In Future
    // {
    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         try {
    //             const response = await getRoleData();
    //             const rolesData = response.data.roles;

    //             if (Array.isArray(rolesData)) {
    //                 // Extract role names from the fetched data and update roleOptions state
    //                 const roles = rolesData.map((fk_roleType: any) => ({
    //                     label: fk_roleType.roleName,
    //                     value: fk_roleType.roleId // Assuming roleId exists to uniquely identify the role
    //                 }));
    //                 setRoleOptions(roles);
    //             } else {
    //                 console.error('Invalid data format:', rolesData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching roles:', error);
    //         }
    //     };
    //     fetchRoles();
    // }, []);
    // }

    // const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    // };

    const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedPaymentType(value);
        onInputChange({
            target: {
                name: 'paymentType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleTransactionModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                            onClick={() => navigate('/TransactionModule/WalletHistory/EditWalletHistory/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="fk_walletMaster" className="block mb-1 pointer-events-none">
                        Wallet Master
                    </label>
                    <input
                        name="fk_walletMaster"
                        type="text"
                        id="fk_walletMaster"
                        placeholder="Enter Wallet Master"
                        className="form-input w-full pointer-events-none"
                        // value={details.fk_walletMaster}
                        value="DRI546"
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="paidToReference" className="block mb-1">
                        Paid To Reference
                    </label>
                    <input
                        name="paidToReference"
                        type="text"
                        id="paidToReference"
                        placeholder="Enter Paid To Reference"
                        className="form-input w-full pointer-events-none"
                        // value={details.paidToReference}
                        value="4500"
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="paidByReference" className="block mb-1">
                        Paid By Reference
                    </label>
                    <input
                        name="paidByReference"
                        type="text"
                        id="paidByReference"
                        placeholder="Enter Paid By Reference"
                        className="form-input w-full pointer-events-none"
                        // value={details.paidByReference}
                        value="200"
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="transactionStatus" className="block mb-1">
                        Transaction Status
                    </label>
                    <input
                        name="transactionStatus"
                        type="text"
                        id="transactionStatus"
                        placeholder="Enter Transaction Status"
                        className="form-input w-full pointer-events-none"
                        // value={details.transactionStatus}
                        value="Successfull"
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="vehicleId" className="block mb-1">
                        PG Transaction
                    </label>
                    <input
                        name="vehicleId"
                        type="text"
                        id="vehicleId"
                        placeholder="Enter PG Transaction ID"
                        className="form-input w-full pointer-events-none"
                        // value={details.fk_pgTransactionId}
                        value="KL3JHSJHSFH"
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="paymentType" className="block mb-1 ">
                        Payment Type
                    </label>
                    <select id="paymentType" className="form-select text-white-dark" required value={details.paymentType} onChange={handlePaymentTypeChange}>
                        <option value="">Select Payment Type</option>
                        <option value="Bank Withdraw">Bank Withdraw</option>
                        <option value="Money Added">Money Added</option>
                        <option value="Subscription">Subscription</option>
                        <option value="type4">Trip Payment</option>
                        <option value="type5">Bonus Receive</option>
                        <option value="type6">Refferal Bonus</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3  pointer-events-none">
                    <label htmlFor="transactionMode" className="block mb-1 ">
                        Transaction Mode
                    </label>
                    <select
                        id="transactionMode"
                        className="form-select text-white-dark"
                        required
                        // value={details.transactionMode}
                        value="QR"
                        onChange={handleTransactionModeChange}
                    >
                        <option value="">Select Transaction Mode</option>
                        <option value="QR">QR</option>
                        <option value="Link">Link</option>
                    </select>
                </div>
                <div className="lg:w-1/3  pointer-events-none">
                    <label htmlFor="transactionMode" className="block mb-1 ">
                        Transaction Amount
                    </label>
                    <input name="vehicleId" type="text" id="vehicleId" placeholder="Enter PG Transaction ID" className="form-input w-full pointer-events-none" value="200" onChange={onInputChange} />
                </div>

                {/* {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <input name="archive" type="text" id="archive" placeholder="Enter Status" className="form-input w-full" value={details.archive} onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )} */}

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="archive" className="block mb-1">
                        Update Profile Status
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            value={details?.archive} // Update this line
                            onChange={onInputChange}
                        >
                            <option value="">Select Status</option>
                            <option value={'APPROVED'}>APPROVED</option>
                            <option value={'REJECT'}>HOLD</option>
                            <option value={'PENIDNG'}>PENIDNG</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3  pointer-events-none">
                    <label htmlFor="transactionMode" className="block mb-1 ">
                        paid To Refrence Type
                    </label>
                    <select
                        id="transactionMode"
                        className="form-select text-white-dark"
                        required
                        // value={details.transactionMode}
                        value="WALLET"
                        onChange={handleTransactionModeChange}
                    >
                        <option value="">Paid To Refrence Type</option>
                        <option value="BANK">BANK</option>
                        <option value="WALLET">WALLET</option>
                    </select>
                </div>
                <div className="lg:w-1/3  pointer-events-none">
                    <label htmlFor="transactionMode" className="block mb-1 ">
                        Paid By Refrence Type{' '}
                    </label>
                    <select
                        id="transactionMode"
                        className="form-select text-white-dark"
                        required
                        // value={details.transactionMode}
                        value="BANK"
                        onChange={handleTransactionModeChange}
                    >
                        <option value="">Select Paid By Refrence Type</option>
                        <option value="BANK">BANK</option>
                        <option value="WALLET">WALLET</option>
                    </select>
                </div>
                <div className="lg:w-1/3  pointer-events-none"></div>
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

export default WalletHistoryModule;
