import React, { useState, ChangeEvent, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllTicketPriority, getAllTicketType } from '@/config/constant';
import { getAllTeams } from '@/services/RolesService';
import { getAdminListData, getAdminTeamsById } from '@/services/AdminTeamsService';
import { useParams } from 'react-router-dom';
import RaisedAgainstModal from '../../../components/RaisedAgainstAddAdminModal';
import { getTicketTypeData } from '@/services/UtilityServices/TicketTypeService';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';

import RisedAgainstModal from '@/components/Models/RisedAgainstModal';

interface AdminTicketsModuleProps {
    details: {
        ticketIdKey: string;
        ticketType: string;
        title: string;
        description: string;
        fk_raisedBy: string;
        raisedAgainst: string;
        fk_raisedAgainstType: string;
        closedAt: string;
        closedBy: string;
        status: string;
        priority: string;
        archive: string;
        remarks: string;
        adminTeamsType: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific: boolean;
    redirect?: boolean;
    isEditPage: any;
}

const AdminTicketsModule: React.FC<AdminTicketsModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific, redirect, isEditPage }) => {
    const { adminTeamsId } = useParams();
    const ticketPriority = getAllTicketPriority();
    console.log(details);

    const [selectedTicketType, setSelectedTicketType] = useState(details.ticketType);
    const [selectedPriority, setSelectedPriority] = useState(details.priority);
    const [selectedAdminTeam, setSelectedAdminTeam] = useState(details.adminTeamsType);
    const [selectTeamOption, setTeamOption] = useState<any[]>([]);
    const [selectTicketTypeOption, setTicketTypeOption] = useState<any[]>([]);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    var toolbarOptions = [
        ['bold', 'italic'],
        ['link', 'image'],
    ];
    const module = {
        toolbar: toolbarOptions,
    };
    const getAllTeamsData = async () => {
        try {
            const data = await getAllTeams();
            setTeamOption(data?.data?.teams);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTicketTypeData = async () => {
        try {
            const data = await getTicketTypeData();
            setTicketTypeOption(data?.data?.TicketTypes);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllTeamsData();
        getAllTicketTypeData();
    }, []);

    const handleAdminTeamTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedAdminTeam(value);
        onInputChange({
            target: {
                name: 'adminTeamsType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    const handleTicketTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedTicketType(value);
        // onInputChange({
        //     target: {
        //         name: 'ticketType',
        //         value: value,
        //     },
        // });
    };
    const handlePriorityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedPriority(value);
        // onInputChange({
        //     target: {
        //         name: 'priority',
        //         value: value,
        //     },
        // });
    };
    const handleDescriptionChange = (content: string) => {
        setValue(content); // Update the local state when description changes
        onInputChange({
            target: {
                name: 'description',
                value: content,
            },
        } as ChangeEvent<HTMLInputElement>); // Update the parent component's state
    };

    const naviagte = useNavigate();

    const [modal9, setModal9] = useState(false);

    const [addedRisedByType, setAddedrisedByType] = useState<any>();
    const [risedByData, setrisedByrData] = useState<any[]>([]);

    const handleAddRisedAgainstData = (selectedTeamManager: any[], userID: string) => {
        setrisedByrData(selectedTeamManager);
        setAddedrisedByType(userID);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="title" className="block mb-1 text-md font-bold">
                        Ticket Id Key
                    </label>
                    {viewSpecific ? (
                        <input
                            name="ticketIdKey"
                            type="text"
                            id="ticketIdKey"
                            placeholder={viewSpecific ? '' : 'Enter Ticket ID'}
                            className="form-input w-full pointer-events-none"
                            value={details?.ticketIdKey}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <input name="title" type="text" id="title" placeholder="Enter Title" className="form-input w-full" value={details.ticketIdKey} onChange={onInputChange} />
                    )}
                </div>

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="ticketType" className="block mb-1 text-md font-bold">
                        Ticket Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="title"
                            type="text"
                            id="title"
                            placeholder={viewSpecific ? '' : 'Enter Ticket Type'}
                            className="form-input w-full pointer-events-none"
                            value="transactionRequest"
                            // value={details?.data?.adminTicket?.ticketType}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="ticketType" className="form-select text-white-dark" required value={selectedTicketType} onChange={handleTicketTypeChange}>
                            <option value="">Select Ticket Type</option>

                            <option value="Rolesandpermissions">Roles and Permissions</option>
                            <option value="changeservicecity">Change Service City</option>
                            <option value="transactionRequest">Transaction Request</option>
                            <option value="statusRequest">Status Request</option>
                            <option value="billingRequest">Billing Request</option>
                            <option value="tripRequest">Trip Request</option>
                            <option value="invoiceHistory">Invoice History</option>
                            <option value="userHistory">User History</option>
                            <option value="logHistory">Log History</option>
                            <option value="documentVerification">Document Verification</option>
                            <option value="adminStatusRequest">Admin Status Request</option>
                        </select>
                    )}
                </div>

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="title" className="block mb-1 text-md font-bold">
                        Title
                    </label>
                    {viewSpecific ? (
                        <input
                            name="title"
                            type="text"
                            id="title"
                            placeholder={viewSpecific ? '' : 'Enter Title'}
                            className="form-input w-full pointer-events-none"
                            // value={details?.data?.adminTicket?.title}
                            value="Driverbased"
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <input name="title" type="text" id="title" placeholder="Enter Title" className="form-input w-full" value={details?.title} onChange={onInputChange} />
                    )}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none lg:w-1/3' : ''}`}>
                    <label htmlFor="adminTeamsType" className="block mb-1 text-md font-bold   ">
                        Rised Against Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="fk_raisedBy"
                            type="text"
                            id="fk_raisedBy"
                            placeholder={viewSpecific ? '' : 'Enter Rised Against Type'}
                            className="form-input w-full pointer-events-none"
                            // value={details?.data?.adminTicket?.adminTeamsType}
                            value="Team"
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="ctnSelect1" className="form-select text-white-dark" required value={details?.adminTeamsType} onChange={handleAdminTeamTypeChange}>
                            <option value="">Select Rised Against Type</option>
                            <option value="">Team</option>
                            <option value="">Admin Member</option>

                            {/* {selectTeamOption?.map((data) => {
                                return <option value={data._id}>{data.teamName}</option>;
                            })} */}
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`w-1/2 ${viewSpecific ? 'pointer-events-none lg:w-1/3' : ''}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                            Rised Against
                        </label>
                        {viewSpecific && (
                            <Link to={'/adminModule/Admin/viewSpecificAdmin/654e26276e8ddde56bf6fe58'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="fk_reportsTo"
                            type="text"
                            id="fk_reportsTo"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.fk_risedagainst}
                            value="vignesh"
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {addedRisedByType === 'risedAgainst' ? (
                                <button type="button" onClick={() => setModal9(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_reportsTo"
                                        type="text"
                                        id="fk_reportsTo"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_raisedAgainstType}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal9(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <RisedAgainstModal event={modal9} closeModal={() => setModal9(false)} onRisedByData={handleAddRisedAgainstData} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedRisedByType === 'risedAgainst' ? (
                                <button type="button" onClick={() => setModal9(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal9(true)} className="btn btn-primary w-full">
                                    Rised Against
                                </button>
                            )}
                            <RisedAgainstModal event={modal9} closeModal={() => setModal9(false)} onRisedByData={handleAddRisedAgainstData} />
                        </div>
                    )}
                </div>
                {viewSpecific ? (
                    <div className={`lg:w-1/3   ${viewSpecific && !redirect ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="title" className="block mb-1 text-md font-bold flex flex-row items-center gap-2">
                            Raised By
                            {redirect && <FaArrowUpRightFromSquare className="text-blue-600 " onClick={() => naviagte('/adminModule/Admin/viewSpecificAdmin/654f286c78371e55de07b349')} />}
                        </label>

                        <input
                            name="title"
                            type="text"
                            id="title"
                            placeholder={viewSpecific ? '' : 'Enter rised by'}
                            className="form-input w-full pointer-events-none"
                            // value={details?.data?.adminTicket?.title}
                            value="rohit"
                            onChange={onInputChange}
                            readOnly
                        />
                    </div>
                ) : null}
                <div className={`lg:w-1/2   ${viewSpecific ? 'pointer-events-none lg:w-1/3' : ''}`}>
                    <label htmlFor="priority" className="block mb-1 text-md font-bold">
                        Priority
                    </label>
                    {viewSpecific ? (
                        <input
                            name="title"
                            type="text"
                            id="title"
                            placeholder={viewSpecific ? '' : 'Enter priority'}
                            className="form-input w-full pointer-events-none"
                            // value={details?.data?.adminTicket?.priority}
                            value="High"
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="priority" className="form-select text-white-dark" required value={details?.priority} onChange={handlePriorityTypeChange}>
                            <option value="">Select Priority</option>
                            {ticketPriority?.map((data) => {
                                return (
                                    <option value={data?.name} key={data.id}>
                                        {data?.name}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                {showStatus ? (
                    <div className={`lg:w-1/2   ${viewSpecific ? 'pointer-events-none lg:w-1/2' : ''}`}>
                        <label htmlFor="Archive" className="block mb-1 text-md font-bold">
                            Archive
                        </label>
                        {viewSpecific ? (
                            <input
                                name="Archive"
                                type="text"
                                id="Archive"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                // value={details?.data?.adminTicket?.archive}
                                value="HOLD"
                                onChange={onInputChange}
                            />
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
                ) : null}

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className={`lg:w-1/2   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="status" className="block mb-1 text-md font-bold">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                // value={details?.data?.adminTicket?.archive}
                                value="Open"
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark" required>
                                <option value="">Select your Status</option>
                                <option value={'OPEN'}>OPEN</option>
                                <option value={'CLOSE'}>CLOSE</option>
                                <option value={'INPROGRESS'}>INPROGRESS</option>
                                <option value={'REOPEN'}>REOPEN</option>
                                <option value={'COMPLETE'}>COMPLETE</option>
                            </select>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-10">
                <div className="lg:w-1/2">
                    <label htmlFor="regAddress" className="block mb-1 text-md font-bold">
                        Description
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
                {/* <div className="lg:w-1/2 ">
                    <label htmlFor="commAddress" className="block mb-1 text-md font-bold">
                        Remarks
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
                </div> */}
            </div>

            <RaisedAgainstModal adminTeamsId={adminTeamsId} id={'my_modal_3'} title={'add ticket'} />
        </>
    );
};

export default AdminTicketsModule;
