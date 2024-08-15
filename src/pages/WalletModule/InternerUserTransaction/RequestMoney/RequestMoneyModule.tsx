import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import IconEdit from '@/components/Icon/IconEdit';

interface MoneyRequestProps {
    details: {
        id: string;
        moneyRequestType: string;
        amount: string;
        fk_toPerson: string;
        fk_fromPerson: string;
        remarks: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const RequestMoneyModule: React.FC<MoneyRequestProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [value, setValue] = useState('');

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

    const [selectedMoneyRequest, setSelectedMoneyRequest] = useState(details.moneyRequestType);

    const handleMoneyRequestTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedMoneyRequest(value);
        onInputChange({
            target: {
                name: 'moneyRequestType',
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
                            onClick={() => navigate('/TransactionModule/MoneyRequest/EditMoneyRequest/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}

            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="serviceProviderType" className="block mb-1">
                        Money Request Type
                    </label>
                    <select
                        id="serviceProviderType"
                        className="form-select text-white-dark pointer-events-none"
                        required
                        // value={details.moneyRequestType}
                        value="Send"
                        onChange={handleMoneyRequestTypeChange}
                    >
                        <option value="">Select Money Request Type</option>
                        <option value="Send">Send</option>
                        <option value="Request">Request</option>
                    </select>
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="planDetails" className="block mb-1">
                        Amount
                    </label>
                    <input
                        name="planDetails"
                        type="text"
                        id="planDetails"
                        placeholder="Enter Plan Details"
                        className="form-input w-full pointer-events-none"
                        value={details.amount}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                            To Person
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Admin/ViewSpecificAdmin/654e130c221e70962b239872'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        name="planAmount"
                        type="text"
                        id="planAmount"
                        placeholder="Enter Plan Amount"
                        className="form-input w-full pointer-events-none"
                        value={details.fk_toPerson}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                            From Person
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Admin/ViewSpecificAdmin/654e130c221e70962b239872'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input
                        name="planDuration"
                        type="text"
                        id="planDuration"
                        placeholder="Enter Plan Duration"
                        className="form-input w-full pointer-events-none"
                        value={details.fk_fromPerson}
                        onChange={onInputChange}
                    />
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

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/3 pointer-events-none">
                        <label htmlFor="status" className="block mb-1">
                            Transaction Status
                        </label>
                        <input name="status" type="text" id="status" placeholder="Enter Status" className="form-input w-full pointer-events-none" value="Success" onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )}

                {/* <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="archive" className="block mb-1">
                    Transaction Status
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder='Status' type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                        // value={details?.archive}  // Update this line
                        // onChange={handleInputChange}
                        >
                            <option value="">Select Status</option>
                            <option value={"Awaited"}>Awaited</option>
                            <option value={"Completed"}>Completed</option>
                            <option value={"Cancelled"}>Cancelled</option>

                        </select>

                    )}
                </div> */}
            </div>

            {/* <div className="mt-6 mb-12">
                <label htmlFor="remarks" className="block mb-1">
                    Reamrks
                </label>
                <ReactQuill theme="snow" value={value} onChange={setValue} className='h-24' />
            </div> */}
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 pointer-events-none mt-3">
                    <label htmlFor="serviceProviderType" className="block mb-1">
                        Transaction Type
                    </label>
                    <select
                        id="serviceProviderType"
                        className="form-select text-white-dark pointer-events-none"
                        required
                        // value={details.moneyRequestType}
                        value="Bank"
                        onChange={handleMoneyRequestTypeChange}
                    >
                        <option value="">Select Transaction Type</option>
                        <option value="Wallet">Wallet</option>
                        <option value="Bank">Bank</option>
                    </select>
                </div>

                {!viewSpecific && (
                    <>
                        <div className="lg:w-1/3 pointer-events-none">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                                    Wallet History
                                </label>
                            </div>
                            <input
                                name="planDuration"
                                type="text"
                                id="planDuration"
                                placeholder="Enter Plan Duration"
                                className="form-input w-full pointer-events-none"
                                //   value={details.fk_fromPerson}
                                value="wallet123"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="lg:w-1/3 pointer-events-none">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                                    PG Transaction
                                </label>
                            </div>
                            <input
                                name="planDuration"
                                type="text"
                                id="planDuration"
                                placeholder="Enter Plan Duration"
                                className="form-input w-full pointer-events-none"
                                //   value={details.fk_fromPerson}
                                value="PGT-321"
                                onChange={onInputChange}
                            />
                        </div>
                    </>
                )}
            </div>

            <div className={`lg:w-1/3 mt-6  ${viewSpecific ? 'pointer-events-none' : ''}`}>
                <label htmlFor="remarks" className="block mb-1">
                    Remarks
                </label>
                {viewSpecific ? (
                    <input name="archive" placeholder="" type="text" id="remarks" className="form-input w-full pointer-events-none h-24" value="hai hello" readOnly />
                ) : (
                    <ReactQuill theme="snow" value={value} onChange={setValue} className="h-24 " />
                )}
            </div>
        </>
    );
};

export default RequestMoneyModule;
