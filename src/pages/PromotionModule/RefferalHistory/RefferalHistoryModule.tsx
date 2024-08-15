import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import IconEdit from '@/components/Icon/IconEdit';

interface RefferalHistoryProps {
    details: {
        id: string;
        invitedByType: string;
        invitedToType: string;
        refferalMaster: string;
        invitedByUser: string;
        invitedToUser: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const RefferalHistoryModule: React.FC<RefferalHistoryProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [selectedInvitedByType, setSelectedInvitedByType] = useState(details.invitedByType);
    const [selectedInvitedToType, setSelectedInvitedToType] = useState(details.invitedToType);

    const handleInvitedByTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedInvitedByType(value);
        onInputChange({
            target: {
                name: 'invitedByType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleInvitedToTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedInvitedToType(value);
        onInputChange({
            target: {
                name: 'invitedToType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // Dynamic roles data fetching
    {
        /*
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoleData();
                const rolesData = response.data.roles;

                if (Array.isArray(rolesData)) {
                    // Extract role names from the fetched data and update roleOptions state
                    const roles = rolesData.map((fk_roleType: any) => ({
                        label: fk_roleType.roleName,
                        value: fk_roleType.roleId // Assuming roleId exists to uniquely identify the role
                    }));
                    setRoleOptions(roles);
                } else {
                    console.error('Invalid data format:', rolesData);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []); 
    */
    }
    const navigate = useNavigate();
    return (
        <>
            {viewSpecific && (
                <>
                    <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                        {/* Edit */}
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => navigate('/PromotionModule/RefferalHistory/EditRefferalHistory/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="inviteByType" className="block mb-1 ">
                        Invite By Type
                    </label>

                    <select
                        id="inviteByType"
                        className="form-select text-white-dark pointer-events-none"
                        required
                        // value={details.invitedByType}
                        onChange={handleInvitedByTypeChange}
                        value="Driver"
                    >
                        <option value="">Select Invite By Type</option>
                        <option value="Driver">Driver</option>
                        <option value="Rider">Rider</option>
                        <option value="type3">Channel Partner</option>
                        <option value="type4">Driver</option>
                    </select>
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="inviteToType" className="block mb-1 ">
                        Invite To Type
                    </label>
                    <select
                        id="inviteToType"
                        className="form-select text-white-dark pointer-events-none"
                        required
                        // value={details.invitedToType}
                        onChange={handleInvitedToTypeChange}
                        value="Rider"
                    >
                        <option value="">Select Invite To Type</option>
                        <option value="Driver">Driver</option>
                        <option value="Rider">Rider</option>
                        <option value="types3">Channel Partner</option>
                        <option value="types4">Driver</option>
                    </select>
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="refferalMaster" className="block mb-1">
                        Refferal Master
                    </label>
                    <input
                        name="refferalMaster"
                        type="text"
                        id="refferalMaster"
                        placeholder="Enter Refferal Master"
                        className="form-input w-full pointer-events-none"
                        value={details.refferalMaster}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                            Invited By User
                        </label>
                        {viewSpecific && (
                            <Link to={'/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        name="invitedByUser"
                        type="text"
                        id="invitedByUser"
                        placeholder="Enter Invited By User"
                        className="form-input w-full pointer-events-none"
                        value={details.invitedByUser}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                            Invited To User
                        </label>
                        {viewSpecific && (
                            <Link to={'/RiderModule/RiderUsers/ViewSpecificRiderUsers/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        name="invitedToUser"
                        type="text"
                        id="invitedToUser"
                        placeholder="Enter Invited To User"
                        className="form-input w-full pointer-events-none"
                        value={details.invitedToUser}
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Update Profile Status
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            value={details.archive} // Update this line
                            onChange={onInputChange}
                        >
                            <option value="">Select Archive</option>
                            <option value={'PENDING'}>Pending</option>
                            <option value={'APPROVED'}>Approved</option>
                            <option value={'REJECTED'}>Rejected</option>
                            <option value={'HOLD'}>Hold</option>
                            <option value={'SUSPENDED'}>Suspended</option>
                        </select>
                    )}
                </div>

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Refferal History Status
                        </label>
                        <input name="archive" type="text" id="status" placeholder="Enter Status" className="form-input w-full pointer-events-none" value="ONBOARDED" onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )}
            </div>
        </>
    );
};

export default RefferalHistoryModule;
