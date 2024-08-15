import React, { useState, useEffect, ChangeEvent } from 'react';
// future code -->
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '@/store';
import { getAllTeams, getAllCountry, getAllState, getAllCity } from '@/services/RolesService';
import { getAllEmployeeLevels } from '@/services/UtilityServices/EmployeeLevelServices';
// future code -->
// import { getAdminData } from '@/services/AdminService';
import { getAllAdminRoles } from '@/services/UtilityServices/AdminRoleServices';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import ServiceCityModal from '@/components/Models/ServiceCityModal';
import ReportManagerModal from '@/components/Models/ReportManagerModal';
import TeamManagerModal from '@/components/Models/TeamManagerModal';
import AdminTeamsModal from '@/components/Models/AdminTeamsModal';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { DataTableColumn } from 'mantine-datatable';
import { successAlert } from '@/utils/Toast';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticAdminTeamData } from '../AdminTeams/ViewAdminTeams';
import StatusButtons from '@/components/StatusButtons';
interface AdminProps {
    details: {
        firstName: string;
        middleName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        passwordHash: string;
        fk_roleType: string;
        fk_reportsTo: string;
        fk_adminTeam: string;
        dob: string;
        gender: string;
        altPhoneNumber: string;
        country: string;
        state: string;
        city: string;
        employeeLevel: string;
        fk_serviceCity: string;
        fk_teamManager: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    redirect?: boolean;
    viewSpecific?: boolean;
    noPassEdit?: boolean;
    isEditPage?: boolean;
    validation: any;
}

const AdminLayout: React.FC<AdminProps> = ({ details, onInputChange, showStatus = true, viewSpecific, validation, redirect, noPassEdit, isEditPage }) => {
    // future code --- >>>
    // const dispatch = useDispatch();
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const navigate = useNavigate();

    // future code --->>>
    // const [selectedManager, setSelectedManager] = useState(details.fk_reportsTo);
    // const [selectManagerOption, setManagerOption] = useState<any[]>([]);
    // const [selectedAdminTeam, setSelectedAdminTeam] = useState(details.fk_adminTeam);
    const [selectTeamOption, setTeamOption] = useState<any[]>([]);
    const [gender, setGender] = useState(details.gender);
    const [selectedEmployeeLevel, setSelectedEmployeeLevel] = useState(details.employeeLevel);
    const [selectedRole, setSelectedRole] = useState(details.fk_roleType);
    const [state, setState] = useState(details.state);
    const [country, setCountry] = useState(details.country);
    const [city, setCity] = useState(details.city);
    const [countryOption, setCountryOption] = useState<any[]>([]);
    const [stateOption, setStateOption] = useState<any[]>([]);
    const [cityOption, setCityOption] = useState<any[]>([]);
    const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    const [serviceCity, SetServiceCity] = useState(details.city);
    const [employeeLevelOption, setEmployeeLevelOption] = useState<any[]>([]);
    const [employeeLevel, setEmployeeLevel] = useState(details.city);

    const [adminRoleOption, setAdminRoleOption] = useState<any[]>([]);
    const [adminRole, setAdminRole] = useState(details.city);

    //fetch all teams data
    const getAllTeamsData = async () => {
        try {
            const data = await getAllTeams();
            setTeamOption(data?.data?.teams);
        } catch (error) {
            console.log(error);
        }
    };

    //fetch all Country datas
    const getAllCountryData = async () => {
        try {
            const data = await getAllCountry();
            setCountryOption(data?.data?.Countries);
        } catch (error) {
            console.log(error);
        }
    };

    //fetch all states data
    const getAllStateData = async () => {
        try {
            const data = await getAllState();
            setStateOption(data?.data?.States);
        } catch (error) {
            console.log(error);
        }
    };

    //fetch all city data
    const getAllCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    //fetch all employee level
    const getAllEmployeeLevelsData = async () => {
        try {
            const data = await getAllEmployeeLevels();
            setEmployeeLevelOption(data?.data?.EmployeeLevels);
        } catch (error) {
            console.log(error);
        }
    };

    //fetch all admin role from utility
    const getAllAdminRolesData = async () => {
        try {
            const data = await getAllAdminRoles();
            setAdminRoleOption(data?.data?.AdminRoles);
        } catch (error) {
            console.log(error);
        }
    };

    //utility calls
    useEffect(() => {
        getAllTeamsData();
        getAllCountryData();
        getAllStateData();
        getAllCityData();
        getAllEmployeeLevelsData();
        getAllAdminRolesData();
    }, []);

    const handleCountryTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [CountryName, CountryId] = event.target.value.split(',');
        // const CountryData = {};
        // CountryData.value = CountryName;
        // CountryData.id = CountryId;
        setCountry(CountryName);
        onInputChange({
            target: {
                name: 'country',
                value: CountryName,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleStateTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [StateName, StateId] = event.target.value.split(',');
        // const StateData = {};
        // StateData.value = StateName;
        // StateData.id = StateId;
        setState(StateName);
        onInputChange({
            target: {
                name: 'state',
                value: StateName,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [CityName, CityId] = event.target.value.split(',');
        // const CityData = {};
        // CityData.value = CityName;
        // CityData.id = CityId;
        setCity(CityName);
        onInputChange({
            target: {
                name: 'city',
                value: CityName,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleSelectGebder = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setGender(value);
        onInputChange({
            target: {
                name: 'gender',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleEmployeeLevelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [employeeLevelName, employeeId] = event.target.value.split(',');
        // const employeeLevel = {};
        // employeeLevel.value = employeeLevelName;
        // employeeLevel.id = employeeId;
        setEmployeeLevel(employeeLevelName);
        onInputChange({
            target: {
                name: 'employeeLevel',
                value: employeeLevelName,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleAdminRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [roleTypeName, roleTypeId] = event.target.value.split(',');
        // const roleType = {};
        // roleType.value = roleTypeName;
        // roleType.id = roleTypeId;
        setAdminRole(roleTypeName);
        onInputChange({
            target: {
                name: 'fk_roleType',
                value: roleTypeName,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // const [moduleDetails, setModuleDetails] = useState(details);
    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     // Update the moduleDetails state based on the input changes
    //     setModuleDetails({ ...moduleDetails, [name]: value });
    // };

    const [modal6, setModal6] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [modal7, setModal7] = useState(false);
    const [modal8, setModal8] = useState(false);

    const [addedTeamManagerType, setAddedTeamManagerType] = useState<any>();
    const [TeamManagerData, setTeamManagerData] = useState<any>();

    const [addedReportManagerType, setAddedReportManagerType] = useState<any>();
    const [reportManagerData, setReportManagerData] = useState<any>();

    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [addedRoleType, setAddedRoleType] = useState<any>();
    const [ServiceCityData, setServiceCityData] = useState<any>();

    const [addedteamType, setAddedteamType] = useState<any>();
    const [teamData, setteamData] = useState<any>();

    // fk_reportTo
    const handleAddReportManagerData = (selectedReportManager: any, userID: string) => {
        setReportManagerData(selectedReportManager);
        setAddedReportManagerType(userID);
        onInputChange({
            target: {
                name: 'fk_reportsTo',
                value: selectedReportManager,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
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
    // Add service City
    const handleAddServiceCitySubmit = (selectedServiceCity: any, userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
        onInputChange({
            target: {
                name: 'fk_serviceCity',
                value: selectedServiceCity,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // Add team manager
    const handleAddTeamManagerData = (selectedTeamManager: any, userID: string) => {
        setTeamManagerData(selectedTeamManager);
        setAddedTeamManagerType(userID);
        onInputChange({
            target: {
                name: 'fk_teamManager',
                value: selectedTeamManager,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    //password visibility:
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Assign Team popup table --------->>
    const [modal, setmodal] = useState(false);
    const [SelectedAssinedTeam, setAssingTeam] = useState<any[]>([]);
    const [addedAssinedTeamType, setAssinedTeamType] = useState<any>();
    // channel partner table columns
    const assinedTeamColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'teamName', title: 'Team Name', sortable: true },
        { accessor: 'fk_reportingManager', title: 'Reporting Manager', sortable: true },
        { accessor: 'teamManager', title: 'Team Manager', sortable: true },
        { accessor: 'role', title: 'Role', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'remarks', title: 'Remarks', sortable: true },
        { accessor: 'status', title: 'Status', sortable: true },
    ];

    // popup Assign Team
    const handleAddAssinedTeam = (selectedTeam: any[], id: string) => {
        setAddedRoleType(id);
        successAlert('Role Type Succesfully');
        setAssingTeam(selectedTeam);
        setAssinedTeamType(id);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="firstName" className="block mb-1 text-md font-bold">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        id="firstName"
                        placeholder={viewSpecific ? '' : 'Enter First Name'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.firstName}
                        onChange={onInputChange}
                    />
                    {validation?.firstName && <div className="text-red-600 text-sm">*{validation?.firstName}</div>}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="middleName" className="block mb-1 text-md font-bold">
                        Middle Name
                    </label>
                    <input
                        name="middleName"
                        type="text"
                        id="middleName"
                        placeholder={viewSpecific ? '' : 'Enter Middle Name'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.middleName}
                        onChange={onInputChange}
                    />
                    {validation?.middleName && <div className="text-red-600 text-sm">*{validation?.middleName}</div>}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="lastName" className="block mb-1 text-md font-bold">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        id="lastName"
                        placeholder={viewSpecific ? '' : 'Enter Last Name'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.lastName}
                        onChange={onInputChange}
                    />
                    {validation?.lastName && <div className="text-red-600 text-sm">*{validation?.lastName}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="phoneNumber" className="block mb-1 text-md font-bold">
                        Mobile Number
                    </label>
                    <input
                        name="phoneNumber"
                        type="number"
                        id="phoneNumber"
                        placeholder={viewSpecific ? '' : '(+91) Enter Mobile Number'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.phoneNumber}
                        value="9937835356"
                        onChange={onInputChange}
                    />
                    {validation?.phoneNumber && <div className="text-red-600 text-sm">*{validation?.phoneNumber}</div>}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="email" className="block mb-1 text-md font-bold">
                        Email Address
                    </label>
                    <input
                        name="email"
                        id="email"
                        type="text"
                        placeholder={viewSpecific ? '' : 'example@gmail.com'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.email}
                        onChange={onInputChange}
                    />
                    {validation?.email && <div className="text-red-600 text-sm">*{validation?.email}</div>}
                </div>

                <div className={`lg:w-1/3 `}>
                    <label htmlFor="passwordHash" className="block mb-1 text-md font-bold flex flex-row items-center gap-2">
                        Password
                        {showPassword ? (
                            <IoEyeOff className="text-gray-600 cursor-pointer" onClick={togglePasswordVisibility} />
                        ) : (
                            <IoEye className="text-gray-600 cursor-pointer" onClick={togglePasswordVisibility} />
                        )}
                        {noPassEdit && (
                            <>
                                <span className="ml-2 text-sm text-blue-600 cursor-pointer">Reset Password</span>
                                <FaArrowUpRightFromSquare className="text-blue-600 " onClick={() => navigate('/ResetPassword')} />
                            </>
                        )}
                    </label>
                    <input
                        name="passwordHash"
                        type={showPassword ? 'text' : 'password'}
                        id="passwordHash"
                        placeholder={viewSpecific ? '' : 'Enter Password'}
                        className={`form-input w-full ${viewSpecific || noPassEdit ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.passwordHash}
                        onChange={onInputChange}
                    />
                    {validation?.passwordHash && <div className="text-red-600 text-sm">*{validation?.passwordHash}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                            Admin Team
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/AdminTeams/ViewSpecificAdminTeams/656839ae5c22a05aecf56c21'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="fk_adminTeam" type="text" id="fk_adminTeam" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_adminTeam} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedteamType === 'AdminTeams' ? (
                                <button type="button" onClick={() => setModal8(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_adminTeam"
                                        type="text"
                                        id="fk_adminTeam"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_adminTeam}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal8(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <AdminTeamsModal event={modal8} closeModal={() => setModal8(false)} onAddAdminTeams={handleAddTeamData} />
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
                                    Add Admin Team
                                </button>
                            )}
                            <AdminTeamsModal event={modal8} closeModal={() => setModal8(false)} onAddAdminTeams={handleAddTeamData} />
                        </div>
                    )}
                </div>

                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                            Reporting Manager
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Admin/ViewSpecificAdmin/654e26276e8ddde56bf6fe58'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="fk_reportsTo" type="text" id="fk_reportsTo" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_reportsTo} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedReportManagerType === 'reportManagerAdded' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input name="fk_reportsTo" type="text" id="fk_reportsTo" className={`form-input w-full pointer-events-none`} value={details.fk_reportsTo} readOnly />
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
                            Team Manager
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
                            // value={details.fk_teamManager}
                            value="thanish"
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
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="dob" className="block mb-1 text-md font-bold">
                        Date Of Birth
                    </label>
                    <input
                        name="dob"
                        type="date"
                        id="dob"
                        placeholder={viewSpecific ? '' : '(+91) Enter Date Of Birth'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.dob}
                        onChange={onInputChange}
                    />
                    {validation?.dob && <div className="text-red-600 text-sm">*{validation?.dob}</div>}
                </div>

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="gender" className="block mb-1 text-md font-bold">
                        Gender
                    </label>
                    {viewSpecific ? (
                        <input
                            name="gender"
                            type="text"
                            id="passwordHash"
                            placeholder={viewSpecific ? '' : 'Gender'}
                            className="form-input w-full pointer-events-none"
                            value={details.gender}
                            readOnly
                        />
                    ) : (
                        <select id="gender" className="form-select text-white-dark" value={details.gender} onChange={handleSelectGebder}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    )}
                    {validation?.gender && <div className="text-red-600 text-sm">*{validation?.gender}</div>}
                </div>

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="altPhoneNumber" className="block mb-1 text-md font-bold">
                        Alternate Mobile Number
                    </label>
                    <input
                        name="altPhoneNumber"
                        type="number"
                        id="altPhoneNumber"
                        placeholder={viewSpecific ? '' : '(+91) Enter Alternate Mobile Number'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.altPhoneNumber}
                        value="9459846985"
                        onChange={onInputChange}
                    />
                    {validation?.altPhoneNumber && <div className="text-red-600 text-sm">*{validation?.altPhoneNumber}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 text-md font-bold">
                        Country
                    </label>
                    {viewSpecific ? (
                        <input name="country" type="tel" id="country" className="form-input w-full pointer-events-none" value="India" onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" onChange={handleCountryTypeChange}>
                            <option value="">Select your Country</option>
                            {countryOption?.map((data) => {
                                return <option value={`${data.countryName},${data._id}`}>{data?.countryName}</option>;
                            })}
                        </select>
                    )}
                    {validation?.country && <div className="text-red-600 text-sm">*{validation?.country}</div>}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 text-md font-bold">
                        State
                    </label>
                    {viewSpecific ? (
                        <input name="state" type="tel" id="state" className="form-input w-full pointer-events-none" value="Goa" onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" onChange={handleStateTypeChange}>
                            <option value="">Select your state</option>
                            {stateOption?.map((data) => {
                                return <option value={`${data.stateName},${data._id}`}>{data?.stateName}</option>;
                            })}
                        </select>
                    )}
                    {validation?.state && <div className="text-red-600 text-sm">*{validation?.state}</div>}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 text-md font-bold">
                        City
                    </label>
                    {viewSpecific ? (
                        <input name="city" type="tel" id="city" className="form-input w-full pointer-events-none" value="Panava" onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" onChange={handleCityTypeChange}>
                            <option value="">Select your city</option>
                            {cityOption?.map((data) => {
                                return <option value={`${data.cityName},${data._id}`}>{data?.cityName}</option>;
                            })}
                        </select>
                    )}
                    {validation?.state && <div className="text-red-600 text-sm">*{validation?.state}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="employeeLevel" className="block mb-1 text-md font-bold">
                        Employee Level
                    </label>
                    {viewSpecific ? (
                        <input name="employeeLevel" type="tel" id="employeeLevel" className="form-input w-full pointer-events-none" value={details.employeeLevel} onChange={onInputChange} readOnly />
                    ) : (
                        <select id="employeeLevel" className="form-select text-white-dark" onChange={handleEmployeeLevelTypeChange}>
                            <option value="">Select Employee Level</option>
                            {employeeLevelOption?.map((data) => {
                                return <option value={`${data.employeeLevelName},${data._id}`}>{data?.employeeLevelName}</option>;
                            })}
                        </select>
                    )}
                    {/* {validation?.employeeLevel && <div className="text-red-600 text-sm">*{validation?.employeeLevel}</div>} */}
                </div>

                <div className={`lg:w-1/3   ${viewSpecific && !redirect ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_roleType" className="block mb-1 text-md font-bold flex flex-row items-center gap-2 ">
                        Roles Name
                        {redirect && (
                            <FaArrowUpRightFromSquare
                                className="text-blue-600 "
                                onClick={() => {
                                    navigate('/UtilityModule/AdminRole/ViewSpecificAdminRole/65843090a059cdac90e542f3');
                                }}
                            />
                        )}
                    </label>
                    {viewSpecific ? (
                        <input name="fk_roleType" type="text" id="fk_roleType" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_roleType} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedRoleType === 'role type' ? (
                                <button type="button" onClick={() => setmodal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_roleType"
                                        type="text"
                                        id="fk_roleType"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_roleType}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setmodal(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <ServiceCityModal event={modal6} closeModal={() => setmodal(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setmodal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setmodal(true)} className="btn btn-primary w-full">
                                    Add Role Name
                                </button>
                            )}
                            <CommonPopUp title={'Role Type'} columns={assinedTeamColumns} data={staticAdminTeamData} event={modal} closeModal={() => setmodal(false)} onSubmit={handleAddAssinedTeam} />
                        </div>
                    )}
                </div>

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
                            value={details.fk_serviceCity}
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

                {/* {showStatus ? (
                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="archive" className="block mb-1 text-md font-bold">
                            Archive
                        </label>
                        {viewSpecific ? (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                value={details.archive}
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
                ) : null} */}
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <StatusButtons title="Admin Status" />
            </div>
        </>
    );
};

export default AdminLayout;
