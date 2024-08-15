import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import 'flatpickr/dist/flatpickr.css';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate } from 'react-router-dom';

interface AppOfferedMoneyProps {
    details: {
        id: string;
        bankName: string;
        userId: string;
        amount: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const AppOfferedMoneyModule: React.FC<AppOfferedMoneyProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    // Dynamic roles data fetching--Wil use in future
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

    const navigate = useNavigate();

    return (
        <>
            {viewSpecific && (
                <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                    <button className="text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center" onClick={() => navigate('/TransactionModule/AppOfferedMoney/EditAppOfferedMoney/1')}>
                        <h3>Edit</h3>
                        <IconEdit />
                    </button>
                </div>
            )}

            <div className={`grid grid-divs-1 sm:flex justify-between gap-5  ${viewSpecific ? 'pointer-events-none' : ''}`}>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="bankName" className="block mb-1">
                        Bank Name
                    </label>

                    <input
                        name="bankName"
                        type="text"
                        id="bankName"
                        placeholder="Enter Bank Name"
                        className={`form-input w-full pointer-events-none`}
                        readOnly={viewSpecific}
                        value={details.bankName}
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="userId" className="block mb-1">
                        User Name
                    </label>
                    <input
                        name="userId"
                        type="text"
                        id="userId"
                        placeholder="Enter Bank Name"
                        className={`form-input w-full pointer-events-none`}
                        readOnly={viewSpecific}
                        value={details.userId}
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="amount" className="block mb-1">
                        Amount
                    </label>
                    <input
                        name="amount"
                        type="text"
                        id="amount"
                        placeholder="Enter Amount"
                        className={`form-input w-full pointer-events-none`}
                        readOnly={viewSpecific}
                        value={details.amount}
                        onChange={onInputChange}
                    />
                </div>

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="archive" className="block mb-1">
                        Update Profile Status
                    </label>
                    {viewSpecific ? (
                        <input name="archive" type="text" id="archive" className={`form-input w-full pointer-events-none`} readOnly={viewSpecific} value={details.archive} onChange={onInputChange} />
                    ) : (
                        <select name="archive" id="archive" className={`form-select w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.archive} onChange={onInputChange}>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="HOLD">Hold</option>
                            <option value="SUSPENDED">Suspended</option>
                        </select>
                    )}
                </div>

                {/* will use in future
                
                {showStatus ? ( 
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <input name="archive" type="text" id="archive" placeholder="Enter Status" className="form-input w-full" value={details.archive} onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> 
                )} */}
            </div>
        </>
    );
};

export default AppOfferedMoneyModule;
