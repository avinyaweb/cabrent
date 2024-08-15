import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import BonusModal from '@/components/Models/BonusModal';

interface RefferalMasterProps {
    details: {
        id: string;
        fk_bonus: string;
        refferalByType: string;
        refferalBy: string;
        messageForInviter: string;
        uniqueURL: string;
        benefit: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
    isEditPage?: boolean;
}

const RefferalMasterModule: React.FC<RefferalMasterProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [selectedRefferalByType, setSelectedRefferalByType] = useState(details.refferalByType);

    const [value, setValue] = useState('');

    const handleRefferalByTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedRefferalByType(value);
        onInputChange({
            target: {
                name: 'refferalByType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // Dynamic roles data fetching

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

    const [modal8, setModal8] = useState(false);

    const [addedteamType, setAddedteamType] = useState<any>();
    const [teamData, setteamData] = useState<any>();

    // Add Teams data
    const handleAddTeamData = (selectedTeam: any, userID: string) => {
        setteamData(selectedTeam);
        setAddedteamType(userID);
        onInputChange({
            target: {
                name: 'fk_adminTeam',
                value: selectedTeam,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <>
            {viewSpecific && (
                <>
                    <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                        {/* Edit */}
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => navigate('/PromotionModule/RefferalMaster/EditRefferalMaster/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                {/* <div className="lg:w-1/3">
                    <label htmlFor="fk_bonusId" className="block mb-1 pointer-events-none">
                        Bonus
                    </label>

                    {viewSpecific ? (
                        <input
                            name="fk_bonusId"
                            type="text"
                            id="fk_bonusId"
                            placeholder="Enter Coupon ID"
                            className="form-input w-full pointer-events-none"
                            value={details.fk_bonusId}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="fk_bonusId" type="text" id="fk_bonusId" placeholder="Enter Coupon ID" className="form-input w-full" value={details.fk_bonusId} onChange={onInputChange} />
                    )}
                </div> */}

                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                            Bonus
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/AdminTeams/ViewSpecificAdminTeams/656839ae5c22a05aecf56c21'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="fk_bonus" type="text" id="fk_bonus" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_bonus} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedteamType === 'AdminTeams' ? (
                                <button type="button" onClick={() => setModal8(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input name="fk_bonus" type="text" id="fk_bonus" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_bonus} readOnly />
                                    <button type="button" onClick={() => setModal8(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <BonusModal event={modal8} closeModal={() => setModal8(false)} onAddAdminTeams={handleAddTeamData} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedteamType === 'AdminTeams' ? (
                                <button type="button" onClick={() => setModal8(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal8(true)} className="btn btn-primary w-full">
                                    Add Bonus
                                </button>
                            )}
                            <BonusModal event={modal8} closeModal={() => setModal8(false)} onAddAdminTeams={handleAddTeamData} />
                        </div>
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="refferalByType" className="block mb-1">
                        Refferal By Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="refferalByType"
                            placeholder="refferalByType"
                            type="text"
                            id="refferalByType"
                            className="form-input w-full pointer-events-none"
                            value={details.refferalByType}
                            readOnly
                        />
                    ) : (
                        <select id="refferalByType" className="form-select text-white-dark" required value={details.refferalByType} onChange={handleRefferalByTypeChange}>
                            <option value="">Select Refferal By Type</option>
                            <option value="type1">Driver</option>
                            <option value="type2">Rider</option>
                            <option value="type3">Channel Partner</option>
                        </select>
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="refferalBy" className="block mb-1 pointer-events-none">
                        Refferal By
                    </label>
                    <input name="refferalBy" type="text" id="refferalBy" placeholder="Enter Refferal By" className="form-input w-full" value={details.refferalBy} onChange={onInputChange} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                {/* <div className="lg:w-1/3">
                    <label htmlFor="messageForInviter" className="block mb-1">
                        Message For Inviter
                    </label>
                    <input name="messageForInviter" type="text" id="messageForInviter" placeholder="Enter Message For Inviter" className="form-input w-full" value={details.messageForInviter} onChange={onInputChange} />
                </div> */}
                <div className="lg:w-1/3">
                    <label htmlFor="uniqueURL" className="block mb-1 pointer-events-none">
                        Unique URL
                    </label>
                    {viewSpecific ? (
                        <input name="uniqueURL" type="text" id="uniqueURL" placeholder="Enter Unique URL" className="form-input w-full pointer-events-none" value={details.uniqueURL} />
                    ) : (
                        <input name="uniqueURL" type="text" id="uniqueURL" placeholder="Enter Unique URL" className="form-input w-full" value={details.uniqueURL} onChange={onInputChange} />
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="benefit" className="block mb-1 pointer-events-none">
                        Benefit
                    </label>

                    {viewSpecific ? (
                        <input name="benefit" type="text" id="benefit" placeholder="Enter Benfit" className="form-input w-full pointer-events-none" value={details.benefit} />
                    ) : (
                        <input name="benefit" type="text" id="benefit" placeholder="Enter Benfit" className="form-input w-full" value={details.benefit} onChange={onInputChange} />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1 pointer-events-none">
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
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
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

                <div className="lg:w-1/3 mt-4">
                    <label htmlFor="messageForInviter" className="block mb-1 pointer-events-none">
                        Message For Inviter
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="" type="text" id="remarks" className="form-input w-full pointer-events-none h-24" value="hai everyone its me " readOnly />
                    ) : (
                        <ReactQuill theme="snow" value={details.messageForInviter} />
                        // onChange={onInputChange}
                    )}
                </div>

                <div className="lg:w-1/3" />
                <div className="lg:w-1/3" />
            </div>
        </>
    );
};

export default RefferalMasterModule;
