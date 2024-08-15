import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate } from 'react-router-dom';

interface BonusMasterProps {
    details: {
        id: string;
        bonusType: string;
        amount: string;
        bonusCode: string;
        startDate: string;
        endDate: string;
        description: string;
        message: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void; // Update type here
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const BonusMasterModule: React.FC<BonusMasterProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [date1, setDate1] = useState<any>(formattedToday);
    const [date2, setDate2] = useState<any>(formattedToday);

    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

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
                            onClick={() => navigate('/PromotionModule/BonusHistory/EditBonusHistory/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="bonusType" className="block mb-1 pointer-events-none ">
                        Bonus Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="bonusType"
                            type="text"
                            id="bonusType"
                            placeholder="Enter Bonus Type"
                            className="form-input w-full pointer-events-none"
                            value={details.bonusType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="archive" name="archive" className="form-select text-white-dark" required>
                            <option value="">Select Bonus Type</option>
                            <option value={'PENDING'}>SUBSCRIPTION</option>
                            <option value={'APPROVED'}>TRIPS</option>
                            <option value={'REJECTED'}>NEWJOINER</option>
                            <option value={'HOLD'}>COUPON</option>
                            <option value={'SUSPENDED'}>REFFERAL</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="amount" className="block mb-1 pointer-events-none">
                        Amount
                    </label>
                    {viewSpecific ? (
                        <input name="amount" type="number" id="amount" placeholder="Enter Amount" className="form-input w-full pointer-events-none" value={details.amount} onChange={onInputChange} />
                    ) : (
                        <input name="amount" type="number" id="amount" placeholder="Enter Amount" className="form-input w-full" value={details.amount} onChange={onInputChange} />
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bonusCode" className="block mb-1 pointer-events-none">
                        Bonus Code
                    </label>
                    {viewSpecific ? (
                        <input
                            name="bonusCode"
                            type="text"
                            id="bonusCode"
                            placeholder="Enter Bonus Code"
                            className="form-input w-full pointer-events-none"
                            value={details.bonusCode}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="bonusCode" type="text" id="bonusCode" placeholder="Enter Bonus Code" className="form-input w-full" value={details.bonusCode} onChange={onInputChange} />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3` : `lg:w-1/2`}`}>
                    <label htmlFor="startdate" className="block mb-1">
                        Start Date
                    </label>
                    {viewSpecific ? (
                        <Flatpickr
                            value={date1}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className="form-input pointer-events-none"
                            onChange={(date: any) => setDate1(date)}
                        />
                    ) : (
                        <Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date: any) => setDate1(date)} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3` : `lg:w-1/2`}`}>
                    <label htmlFor="endDate" className="block mb-1">
                        End Date
                    </label>
                    {viewSpecific ? (
                        <Flatpickr
                            value={date2}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className="form-input pointer-events-none"
                            onChange={(date: any) => setDate2(date)}
                        />
                    ) : (
                        <Flatpickr value={date2} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date: any) => setDate2(date)} />
                    )}
                </div>

                {showStatus ? (
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Update Profile Status
                        </label>
                        {viewSpecific ? (
                            <input name="archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
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
                ) : null}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-1/2">
                    <label htmlFor="description" className="block mb-1 text-md font-bold">
                        Discription
                    </label>
                    {viewSpecific ? (
                        <div className=" w-full border rounded-md text-start h-28 pointer-events-none">
                            <p className="m-2 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                                cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                            </p>
                        </div>
                    ) : (
                        <ReactQuill theme="snow" value={value} onChange={setValue} className={`h-24 w-full`} />
                    )}
                </div>
                <div className="lg:w-1/2 ">
                    <label htmlFor="remarks" className="block mb-1 text-md font-bold">
                        Message
                    </label>
                    {viewSpecific ? (
                        <div className=" w-full border rounded-md text-start h-28 pointer-events-none">
                            <p className="m-2 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                                cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                            </p>
                        </div>
                    ) : (
                        <ReactQuill theme="snow" value={value2} onChange={setValue2} className={`h-24 w-full`} />
                    )}
                </div>
            </div>
        </>
    );
};

export default BonusMasterModule;
