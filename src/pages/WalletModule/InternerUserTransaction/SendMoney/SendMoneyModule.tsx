import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate } from 'react-router-dom';

interface SendMoneyProps {
    details: {
        id: string;
        amount: string;
        senderDriverid: string;
        toDriverid: string;
        transactionMode: string;
        status: string;
        approvedBy: string;
        approvedAt: string;
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void; // Update type here
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const SendMoneyModule: React.FC<SendMoneyProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
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
                    <label htmlFor="senderDriverName" className="block mb-1 pointer-events-none">
                        Sender Driver Name
                    </label>
                    <input
                        name="senderDriverName"
                        type="text"
                        id="senderDriverName"
                        placeholder="Enter Sender Driver Name"
                        className="form-input w-full"
                        // value={details.senderDriverName}
                        value="Suresh"
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="sendtoDriverName" className="block mb-1 pointer-events-none">
                        Send to Driver Name
                    </label>
                    <input
                        name="sendtoDriverName"
                        type="text"
                        id="sendtoDriverName"
                        placeholder="Enter Send to Driver Name"
                        className="form-input w-full"
                        // value={details.sendtoDriverName}
                        value="Rajesh"
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="transactionMode" className="block mb-1 pointer-events-none">
                        Transaction Mode
                    </label>
                    {viewSpecific ? (
                        <input
                            id="planStatus"
                            name="planStatus"
                            readOnly
                            type="text"
                            className="form-input w-full pointer-events-none"
                            // value={details.planStatus}
                            value="Successfull"
                            onChange={onInputChange}
                        />
                    ) : (
                        <select
                            id="planStatus"
                            name="planStatus"
                            className="form-select text-white-dark"
                            required
                            // onChange={handlePlanStatusTypeChange}
                            // value={details.planStatus}
                            value="Active"
                        >
                            <option value="">Select Plan Status</option>
                            <option value="plan1">Active</option>
                            <option value="plan2">Expired</option>
                            <option value="plan3">Upcoming</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="updateProfileStatus" className="block mb-1 pointer-events-none">
                        Update Profile Status
                    </label>
                    <select id="updateProfileStatus" name="updateProfileStatus" className="form-select text-white-dark" required>
                        <option value="">Select Profile Status</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Inactive'}>Inactive</option>
                        <option value={'Pending'}>Pending</option>
                        <option value={'Blocked'}>Blocked</option>
                        <option value={'Suspended'}>Suspended</option>
                    </select>
                </div>
            </div>

            {/* <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-1/3">
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
                <div className="lg:w-1/3 ">
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
                
            </div> */}
        </>
    );
};

export default SendMoneyModule;
