import React, { useState, ChangeEvent, useEffect } from 'react';
import { getAdminData } from '@/services/AdminService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllCity } from '@/services/RolesService';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import ServiceCityModal from '@/components/Models/ServiceCityModal';
import ReportManagerModal from '@/components/Models/ReportManagerModal';
import TeamManagerModal from '@/components/Models/TeamManagerModal';
import StatusButtons from '@/components/StatusButtons';

interface AdminTeamModuleProps {
    details: {
        teamName: string;
        fk_reportsTo?: string;
        fk_teamManager?: string;
        fk_serviceCity?: string;
        fk_teamMembers?: string;
        teamMemberCount?: string;
        role?: string;
        remarks?: string;
        status?: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    showApprovalFields?: boolean;
    redirect?: boolean;
    tabs?: boolean;
    Validation?: boolean;
    viewSpecific: boolean;
    isEditPage: boolean;
}

const AdminTeamModule: React.FC<AdminTeamModuleProps> = ({ tabs, details, onInputChange, showStatus = true, viewSpecific, Validation, redirect, isEditPage, showApprovalFields }) => {
    // const [moduleDetails, setModuleDetails] = useState(details?.adminTeam);
    const [quileContent, setQuileContent] = useState(details?.remarks);
    const [selectedManager, setSelectedManager] = useState(details.fk_reportsTo);
    const [selectManagerOption, setManagerOption] = useState<any[]>([]);
    const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    const [serviceCity, SetServiceCity] = useState(details.fk_serviceCity);

    //currenly just show city instant of service city
    const getAllServiceCityData = async () => {
        try {
            const data = await getAllCity();
            SetServiceCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllServiceCityData();
    }, []);

    const handleServiceCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        SetServiceCity(value);
        onInputChange({
            target: {
                name: 'Service city',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // Add a check to ensure fk_serviceCity is defined before calling split
    // const selectedCities = moduleDetails?.fk_serviceCity ? moduleDetails?.fk_serviceCity.split(',') : [];

    // const handleCitySelection = (selectedCities: { value: string; label: string }[]) => {
    //     const cityValues = selectedCities.map((city) => city.value).join(',');
    //     setModuleDetails({ ...moduleDetails, fk_serviceCity: cityValues });
    //     onCitySelection(selectedCities); // Pass selectedCities to the parent component
    // };

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setModuleDetails({ ...moduleDetails, [name]: value });
    //     onInputChange(event); // Pass the event to the parent component
    // };

    const getAllAdmins = async () => {
        try {
            const data = await getAdminData(1, 10);
            setManagerOption(data.data.admins);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemarksChange = (content: string) => {
        setQuileContent(content);
    };
    useEffect(() => {
        getAllAdmins();
    }, []);

    const handleManagerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedManager(value);
        onInputChange({
            target: {
                name: 'fk_reportingManager',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const navigate = useNavigate();

    const handleChange = () => {
        console.log('helo');
    };

    const [modal6, setModal6] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [modal7, setModal7] = useState(false);

    const [addedTeamManagerType, setAddedTeamManagerType] = useState<any>();
    const [TeamManagerData, setTeamManagerData] = useState<any[]>([]);

    const [addedReportManagerType, setAddedReportManagerType] = useState<any>();
    const [reportManagerData, setReportManagerData] = useState<any[]>([]);

    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [ServiceCityData, setServiceCityData] = useState<any[]>([]);

    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
    };

    const handleAddReportManagerData = (selectedReportManager: any[], userID: string) => {
        setReportManagerData(selectedReportManager);
        setAddedReportManagerType(userID);
    };

    const handleAddTeamManagerData = (selectedTeamManager: any[], userID: string) => {
        setTeamManagerData(selectedTeamManager);
        setAddedTeamManagerType(userID);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                {(viewSpecific || isEditPage) && (
                    <div className={`lg:w-1/3`}>
                        <label htmlFor="teamID" className="block mb-1 text-md font-bold">
                            Team ID
                        </label>
                        <input name="teamID" type="text" id="teamID" className={`form-input w-full cursor-not-allowed`} readOnly={viewSpecific} value="DEV-321456" disabled={true} />
                    </div>
                )}
                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="teamName" className="block mb-1 text-md font-bold">
                        Team Name
                    </label>
                    <input
                        name="teamName"
                        type="text"
                        id="teamName"
                        placeholder={viewSpecific ? '' : 'Team Name'}
                        // className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''} ${Validation?.teamName ? 'border-red-500' : ''}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.data?.adminTeam?.fk_teamName}
                        value=" solution"
                        onChange={onInputChange}
                    />
                    {/* {Validation?.teamName && <div className="text-red-600 text-sm">{Validation?.teamName}</div>} */}
                </div>
                <div className={`lg:w-1/3`}>
                    <label htmlFor="roleOrg" className="mb-1 text-md font-bold flex flex-row items-center gap-2 ">
                        Team Roles
                    </label>

                    {viewSpecific ? (
                        <input
                            name="passwordHash"
                            type="text"
                            id="passwordHash"
                            placeholder={viewSpecific ? '' : 'select role'}
                            className="form-input w-full pointer-events-none"
                            // value={details.role}
                            value="e3"
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="fk_roleType" className="form-select text-white-dark" value={details.role}>
                            <option value="">Select Admin Role</option>
                            <option value="">e1</option>
                            <option value="">e2</option>
                            <option value="">e3</option>
                            <option value="">m1</option>
                            <option value="">m2</option>
                            <option value="">m3</option>
                            <option value="">t1</option>
                            <option value="">t2</option>
                            <option value="">t3</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_serviceCity" className="block mb-1 font-bold text-md">
                            Service City
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="fk_serviceCity"
                            type="text"
                            id="fk_serviceCity"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.fk_serviceCity}
                            value="kochi"
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setModal6(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_serviceCity"
                                        type="text"
                                        id="fk_serviceCity"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_serviceCity}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal6(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setModal6(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal6(true)} className="btn btn-primary w-full">
                                    Add Service City
                                </button>
                            )}
                            <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                        </div>
                    )}
                </div>

                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                            Reporting Manager
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Admin/ViewSpecificAdmin/654f107c78371e55de07b25a'}>
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
                            // value={details.fk_reportsTo}
                            value="regnesh"
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {addedReportManagerType === 'reportManagerAdded' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_reportsTo"
                                        type="text"
                                        id="fk_reportsTo"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_reportsTo}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal5(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <ReportManagerModal event={modal5} closeModal={() => setModal5(false)} onAddReportManager={handleAddReportManagerData} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedReportManagerType === 'reportManagerAdded' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-primary w-full">
                                    Add Reporting Manager
                                </button>
                            )}
                            <ReportManagerModal event={modal5} closeModal={() => setModal5(false)} onAddReportManager={handleAddReportManagerData} />
                        </div>
                    )}
                </div>

                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                            Team Lead
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Admin/ViewSpecificAdmin/654f286c78371e55de07b349'}>
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
                            // value={details.fk_teamManager}
                            value="manu"
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {addedTeamManagerType === 'teamManagerData' ? (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_reportsTo"
                                        type="text"
                                        id="fk_reportsTo"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_teamManager}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <TeamManagerModal event={modal7} closeModal={() => setModal7(false)} onAddTeamManager={handleAddTeamManagerData} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedTeamManagerType === 'teamManagerData' ? (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-full">
                                    Add Team Manager
                                </button>
                            )}
                            <TeamManagerModal event={modal7} closeModal={() => setModal7(false)} onAddTeamManager={handleAddTeamManagerData} />
                        </div>
                    )}
                </div>

                {viewSpecific && (
                    <div className={`w-1/3`}>
                        <label htmlFor="teammembercount" className="mb-1 text-md font-bold flex flex-row items-center gap-2 ">
                            Team Member Count
                        </label>
                        <input name="teamMemberCount" type="text" id="teamMemberCount" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'5'} readOnly />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                {!viewSpecific && ( // Check if viewSpecific is false
                    <div className={`w-1/3`}>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                                Team Members
                            </label>
                        </div>
                        {!viewSpecific && (
                            <>
                                {isEditPage ? (
                                    <div>
                                        {addedTeamManagerType === 'teamManagerData' ? (
                                            <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                                Added
                                            </button>
                                        ) : (
                                            <div className="flex ">
                                                <input
                                                    name="fk_reportsTo"
                                                    type="text"
                                                    id="fk_reportsTo"
                                                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                                    value={details.fk_teamManager}
                                                    readOnly
                                                />
                                                <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-1/3 ">
                                                    View
                                                </button>
                                                <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-1/3 mx-1">
                                                    Edit
                                                </button>
                                                <TeamManagerModal event={modal7} closeModal={() => setModal7(false)} onAddTeamManager={handleAddTeamManagerData} />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        {addedTeamManagerType === 'teamManagerData' ? (
                                            <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                                Added
                                            </button>
                                        ) : (
                                            <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-full">
                                                Add Team Members
                                            </button>
                                        )}
                                        <TeamManagerModal event={modal7} closeModal={() => setModal7(false)} onAddTeamManager={handleAddTeamManagerData} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                {viewSpecific && (
                    <div className={` lg:w-1/2 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="status" className="block mb-1 text-md font-bold">
                            Admin Team Status
                        </label>
                        <input name="status" type="text" id="status" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value="Active" onChange={onInputChange} />
                    </div>
                )}

                {!tabs && (
                    <div className={`lg:w-1/2 mb-10 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="remarks" className="block mb-1">
                            Remarks
                        </label>
                        {viewSpecific ? (
                            <input name="archive" placeholder="" type="text" id="remarks" className="form-input w-full pointer-events-none h-24" value="hai everyone its me " readOnly />
                        ) : (
                            <ReactQuill theme="snow" value={quileContent} onChange={(content) => handleRemarksChange(content)} className="h-24 " />
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <StatusButtons title="Team Status" />
            </div>
        </>
    );
};

export default AdminTeamModule;
