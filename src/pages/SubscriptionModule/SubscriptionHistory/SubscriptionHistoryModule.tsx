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
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    viewSpecific?: boolean;
    showStatus?: boolean; // New prop to conditionally show/hide status
    redirect?: boolean;
}

const SubscriptionHistoryModule: React.FC<SubscriptionHistoryProps> = ({ details, onInputChange, showStatus = true, viewSpecific, redirect }) => {
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
                        value={details.planId}
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
                        value={details.purchasedBy}
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
                        value={details.purchasedByRolesId}
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
                        value={details.driverId}
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
                        value={details.vehicleId}
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
                        <select id="planStatus" className="form-select text-white-dark" required disabled={viewSpecific} value={details.planStatus} onChange={handlePlanStatusTypeChange}>
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
        </>
    );
};

export default SubscriptionHistoryModule;
