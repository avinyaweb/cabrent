import React, { ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';

interface AppOfferedMoneyHistoryProps {
    details: {
        id: string;
        fk_applicationOfferedMoney: string;
        fk_couponHistoryId: string;
        fk_bonusHistoryId: string;
        fk_refferalHistoryId: string;
        fk_promocodeHistoryId: string;
        amount: string;
        paymentType: string;
        paidToRefrence: string;
        paidToRefrenceType: string;
        paidByRefrence: string;
        paidByRefrenceType: string;
        transactionStatus: string;
        transactionMode: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
    viewSpecific?: boolean;
}
const AppOfferedMoneyHistoryModule: React.FC<AppOfferedMoneyHistoryProps> = ({ details, onInputChange, showStatus = true, isEditable = true, viewSpecific }) => {
    // Dynamic roles data fetching-will use in future

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

    // Add your dropdown options here
    const paymentTypeOptions = ['Pomocode', 'Subscription', 'Coupon Bonus', 'Bonus Receive', 'Refferal Bonus'];
    const paidToRefrenceTypeOptions = ['SUBSCRIPTION', 'TRIP', 'USER MONEY ADDED', 'CARRENT ACCOUNT'];
    const paidByRefrenceTypeOptions = ['APP OFF MONEY', 'CARRENT ACCOUNT', 'USER ACCOUNT'];
    const statusOptions = ['APPROVED', 'REJECTED', 'SUSPENDED', 'ONHOLD', 'PENDING'];
    const transactionModeOptions = ['QR', 'LINK'];
    const navigate = useNavigate();
    return (
        <>
            {viewSpecific && (
                <>
                    <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                        {/* Edit */}
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => navigate('/TransactionModule/AppOfferedMoneyHistory/EditAppOfferedMoneyHistory/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 pointer-events-none">
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_applicationOfferedMoney" className="block mb-1">
                            Application Offered Money
                        </label>
                        {viewSpecific && (
                            <Link to={'/TransactionModule/AppOfferedMoney/ViewSpecificAppOfferedMoney/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        name="fk_applicationOfferedMoney"
                        type="text"
                        id="fk_applicationOfferedMoney"
                        placeholder="Enter App. Offered Money"
                        className="form-input w-full pointer-events-none"
                        value={details.fk_applicationOfferedMoney}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_couponHistoryId" className="block mb-1">
                            Coupon History
                        </label>
                        {viewSpecific && (
                            <Link to={'/PromotionModule/CouponMaster/ViewSpecificCouponMaster/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        readOnly
                        name="fk_couponHistoryId"
                        type="text"
                        id="fk_couponHistoryId"
                        placeholder="Enter Coupon History ID"
                        className="form-input w-full pointer-events-none"
                        value={details.fk_couponHistoryId}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_bonusHistoryId" className="block mb-1">
                            Bonus History
                        </label>
                        {viewSpecific && (
                            <Link to={'/PromotionModule/BonusMaster/ViewSpecificBonusMaster/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        readOnly
                        name="fk_bonusHistoryId"
                        type="text"
                        id="fk_bonusHistoryId"
                        placeholder="Enter Bonus History ID"
                        className="form-input w-full pointer-events-none"
                        value={details.fk_bonusHistoryId}
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 pointer-events-none">
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_refferalHistoryId" className="block mb-1">
                            Refferal History
                        </label>
                        {viewSpecific && (
                            <Link to={'/PromotionModule/RefferalMaster/ViewSpecificRefferalMaster/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        readOnly
                        name="fk_refferalHistoryId"
                        type="text"
                        id="fk_refferalHistoryId"
                        placeholder="Enter Refferal History ID"
                        className="form-input w-full pointer-events-none"
                        value={details.fk_refferalHistoryId}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_promocodeHistoryId" className="block mb-1">
                            Promocode History
                        </label>
                        {viewSpecific && (
                            <Link to={'/PromotionModule/PromocodeMaster/ViewSpecificPromocodeMaster/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        readOnly
                        name="fk_promocodeHistoryId"
                        type="text"
                        id="fk_promocodeHistoryId"
                        placeholder="Enter Promocode History ID"
                        className="form-input w-full pointer-events-none"
                        value={details.fk_promocodeHistoryId}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="amount" className="block mb-1">
                        Amount
                    </label>
                    <input name="amount" type="text" id="amount" placeholder="Enter Amount" className="form-input w-full pointer-events-none" value={details.amount} onChange={onInputChange} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 pointer-events-none">
                <div className="lg:w-1/3 pointer-events-none ">
                    <label htmlFor="paymentType" className="block mb-1">
                        Payment Type
                    </label>
                    {viewSpecific ? (
                        <input name="paymentType" type="text" id="paymentType" className="form-input w-full pointer-events-none" value={details.paymentType} onChange={onInputChange} />
                    ) : (
                        <select name="paymentType" id="paymentType" className="form-select w-full pointer-events-none" value={details.paymentType} onChange={onInputChange} disabled={!isEditable}>
                            {paymentTypeOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="paidToRefrence" className="block mb-1">
                        Paid To Refrence
                    </label>
                    <input
                        readOnly
                        name="paidToRefrence"
                        type="text"
                        id="paidToRefrence"
                        placeholder="Enter Paid To Refrence"
                        className="form-input w-full"
                        value={details.paidToRefrence}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3  pointer-events-none">
                    <label htmlFor="paidToRefrenceType" className="block mb-1">
                        Paid To Refrence Type
                    </label>
                    {viewSpecific ? (
                        <input
                            readOnly
                            name="paidToRefrenceType"
                            type="text"
                            id="paidToRefrenceType"
                            placeholder="Enter Paid By Refrence"
                            className="form-input w-full pointer-events-none"
                            value={details.paidToRefrenceType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select
                            name="paidToRefrenceType"
                            id="paidToRefrenceType"
                            className="form-select w-full"
                            value={details.paidToRefrenceType}
                            onChange={onInputChange}
                            disabled={!isEditable}
                            aria-readonly
                        >
                            {paidToRefrenceTypeOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 pointer-events-none">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="paidByRefrence" className="block mb-1">
                        Paid By Refrence
                    </label>
                    <input
                        readOnly
                        name="paidByRefrence"
                        type="text"
                        id="paidByRefrence"
                        placeholder="Enter Paid By Refrence"
                        className="form-input w-full pointer-events-none"
                        value={details.paidByRefrence}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="paidByRefrenceType" className="block mb-1 pointer-events-none">
                        Paid By Refrence Type
                    </label>
                    {viewSpecific ? (
                        <input
                            readOnly
                            name="paidByRefrenceType"
                            type="text"
                            id="paidByRefrenceType"
                            className="form-input w-full pointer-events-none"
                            value={details.paidByRefrenceType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select
                            name="paidByRefrenceType"
                            id="paidByRefrenceType"
                            className="form-select w-full pointer-events-none"
                            value={details.paidByRefrenceType}
                            onChange={onInputChange}
                            disabled={!isEditable}
                        >
                            {paidByRefrenceTypeOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="transactionStatus" className="block mb-1 ">
                        Transaction Status
                    </label>
                    <input
                        readOnly
                        name="transactionStatus"
                        type="text"
                        id="transactionStatus"
                        placeholder="Enter Transaction Status"
                        className="form-input w-full pointer-events-none"
                        value={details.transactionStatus}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="transactionMode" className="block mb-1">
                        Transaction Mode
                    </label>
                    <select
                        name="transactionMode"
                        id="transactionMode"
                        className="form-select w-full pointer-events-none"
                        value={details.transactionMode}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    >
                        {transactionModeOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
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

                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default AppOfferedMoneyHistoryModule;
