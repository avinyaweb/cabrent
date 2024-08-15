import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import '@react-pdf-viewer/core/lib/styles/index.css';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

interface SubscriptionHistoryProps {
    details: {
        id: string;
        planId: string;
        purchasedBy: string;
        purchasedByRolesId: string;
        driverId: string;
        vehicleId: string;
        planStatus: string;
        startDate: string;
        endDate: string;
        transactionStatus: string;
        couponHistoryId: string;
        walletHistoryId: string;
        transactionHistoryId: string;
        paymentType: string;
        archive: string;

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
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    viewSpecific?: boolean;
    showStatus?: boolean; // New prop to conditionally show/hide status
    redirect?: boolean;
}

const SubscriptionWalletHistroyModule: React.FC<SubscriptionHistoryProps> = ({ details, onInputChange, showStatus = true, viewSpecific, redirect }) => {
    //const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedPlanStatus, setSelectedPlanStatus] = useState(details.planStatus);
    const [selectedPaymentType, setSelectedPaymentType] = useState(details.paymentType);

    const navigate = useNavigate();

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [date1, setDate1] = useState<any>(formattedToday);
    const EDIT: boolean = true;

    // Dynamic roles data fetching- will use in future
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

    const handlePlanStatusTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedPlanStatus(value);
        onInputChange({
            target: {
                name: 'planStatus',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

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

    //desable date :
    const flatpickrConfig = {
        allowInput: false, // prevent "readonly"
        disable: ['all'],
    };

    const navigateToInvoice = () => {
        navigate('/SubscriptionModule/SubscriptionInvoice/ViewSpecificSubscriptionInvoice/1');
    };

    const handleIconClick = () => {
        navigate('/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/1');
    };

    const classNames = `${viewSpecific ? 'lg:w-1/2 pointer-events-none' : 'lg:w-1/2'}`;

    const placeholderCouponHistory = viewSpecific ? '' : 'Enter Coupon History';
    const placeholderTransactionHistory = viewSpecific ? '' : 'Enter Transaction History';

    return (
        <>
            {viewSpecific ? (
                <div className="flex items-center px-4 py-2 mb-4">
                    <div className="flex-grow" />
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-pointer" onClick={navigateToInvoice}>
                        View Subscription Invoice
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className={classNames}>
                    <label htmlFor="planId" className="block mb-1">
                        Plan
                    </label>
                    <input
                        name="planId"
                        readOnly
                        type="text"
                        id="planId"
                        placeholder="Enter Plan ID"
                        className="form-input w-full pointer-events-none"
                        // value={details.planId}
                        value="NEWOFF34"
                        onChange={onInputChange}
                    />
                </div>

                <div className={classNames}>
                    <label htmlFor="purchasedBy" className="block mb-1">
                        Purchased By
                        <FaArrowUpRightFromSquare className="inline-block ml-2 text-blue-500" onClick={handleIconClick} />
                    </label>
                    <input
                        name="purchasedBy"
                        readOnly
                        type="text"
                        id="purchasedBy"
                        placeholder="Enter Purchased By"
                        className="pointer-events-none form-input w-full"
                        // value={details.purchasedBy}
                        value="junaid"
                        onChange={onInputChange}
                    />
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/2 pointer-events-none' : 'lg:w-1/2'}`}>
                    <label htmlFor="purchasedByRolesId" className="block mb-1">
                        Purchased By Role Type
                    </label>
                    <select
                        name="purchasedByRolesId"
                        id="purchasedByRolesId"
                        className="form-select w-full"
                        // value={details.purchasedByRolesId}
                        value="Driver"
                        // onChange={onInputChange}
                        disabled={viewSpecific}
                    >
                        <option value="">Select Role Type</option>
                        <option value="driver">Driver</option>
                        <option value="channelPartner">Channel Partner</option>
                        <option value="travelAgency">Travel Agency</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={classNames}>
                    <label htmlFor="driverId" className="block mb-1">
                        Driver
                    </label>
                    <input
                        name="driverId"
                        readOnly
                        type="text"
                        id="driverId"
                        placeholder="Enter Driver ID"
                        className="pointer-events-none form-input w-full"
                        // value={details.driverId}
                        value="Raju"
                        onChange={onInputChange}
                    />
                </div>
                <div className={classNames}>
                    <label htmlFor="vehicleId" className="block mb-1">
                        Vehicle
                    </label>
                    <input
                        name="vehicleId"
                        readOnly
                        type="text"
                        id="vehicleId"
                        placeholder="Enter Vehicle ID"
                        className="form-input w-full pointer-events-none"
                        // value={details.vehicleId}
                        value="KL 42 LK 6345"
                        onChange={onInputChange}
                    />
                </div>

                <div className={classNames}>
                    <label htmlFor="planStatus" className="block mb-1">
                        Plan Status
                    </label>
                    {viewSpecific ? (
                        <input name="planStatus" readOnly type="text" id="planStatus" className="form-input w-full pointer-events-none" value={details.planStatus} onChange={onInputChange} />
                    ) : (
                        <select
                            id="planStatus"
                            className="form-select text-white-dark"
                            required
                            disabled={viewSpecific}
                            // value={details.planStatus}
                            value="Active"
                            onChange={handlePlanStatusTypeChange}
                        >
                            <option value="">Select Plan Status</option>
                            <option value="plan1">Active</option>
                            <option value="plan2">Expired</option>
                            <option value="plan3">Upcoming</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={classNames}>
                    <label htmlFor="ctnEmail" className="block mb-1 ">
                        Start date
                    </label>
                    <Flatpickr
                        value={date1}
                        options={{ ...flatpickrConfig, dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                        className="pointer-events-none form-input"
                        onChange={(date: any) => setDate1(date)}
                    />
                </div>
                <div className={classNames}>
                    <label htmlFor="ctnEmail" className="block mb-1">
                        End date
                    </label>
                    <Flatpickr
                        value={date1}
                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                        className="pointer-events-none form-input"
                        onChange={(date: any) => setDate1(date)}
                    />
                </div>
                <div className={classNames}>
                    <label htmlFor="couponHistoryId" className="block mb-1">
                        Coupon
                    </label>
                    <input
                        name="couponHistoryId"
                        readOnly
                        type="text"
                        id="couponHistoryId"
                        placeholder={placeholderCouponHistory}
                        className="pointer-events-none form-input w-full"
                        value={'541245'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={classNames}>
                    <label htmlFor="walletHistoryId" className="block mb-1">
                        Wallet Amount
                    </label>
                    <input
                        name="walletHistoryId"
                        readOnly
                        type="text"
                        id="walletHistoryId"
                        placeholder="Enter Wallet History ID"
                        className="pointer-events-none form-input w-full"
                        // value={details.walletHistoryId}
                        value={`${viewSpecific ? '1200' : ''}`}
                        onChange={onInputChange}
                    />
                </div>
                <div className={classNames}>
                    <label htmlFor="transactionHistoryId" className="block mb-1">
                        Transaction
                    </label>
                    <input
                        name="transactionHistoryId"
                        readOnly
                        type="text"
                        id="transactionHistoryId"
                        placeholder={placeholderTransactionHistory}
                        className="pointer-events-none form-input w-full"
                        value={'H18JBKU122'}
                        onChange={onInputChange}
                    />
                </div>
                <div className={classNames}>
                    <label htmlFor="paymentType" className="block mb-1">
                        Payment Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="paymentType"
                            readOnly
                            type="text"
                            id="paymentType"
                            className="pointer-events-none form-input w-full"
                            //  value={details.paymentType}
                            value="Wallet"
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="paymentType" className="form-select text-white-dark" required disabled value={details.paymentType} onChange={handlePaymentTypeChange}>
                            <option value="">Select Payment Type</option>
                            <option value="type1">Wallet</option>
                            <option value="type2">Coupon</option>
                            <option value="type3">PG Transaction</option>
                        </select>
                    )}
                </div>
            </div>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={classNames}>
                    <label htmlFor="transactionStatus" className="block mb-1">
                        Transaction Status
                    </label>
                    <select
                        name="transactionStatus"
                        id="transactionStatus"
                        className="form-select w-full"
                        value={details.transactionStatus}
                        // onChange={onInputChange}
                        disabled={viewSpecific}
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="SUCCESS">SUCCESS</option>
                        <option value="FAILED">FAILED</option>
                    </select>
                </div>
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

export default SubscriptionWalletHistroyModule;
