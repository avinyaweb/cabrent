import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
// future code -->>
// import { updateAdmin, getAdminById } from '@/services/AdminService';
import AdminLayout from './AdminLayout';
import AdminDocLayout from './AdminDocLayout';
import PermissionModule from '../Roles/PermissionModule';
import { DataTableColumn } from 'mantine-datatable';
// future code -->>
// import Tippy from '@tippyjs/react';
import IconEdit from '@/components/Icon/IconEdit';
// future code -->>
// import IconEye from '@/components/Icon/IconEye';
// import { getAllTeams } from '@/services/RolesService';
// import { getAdminTicketsData } from '@/services/AdminTicketsService';
// import Dropdown from '@/components/Dropdown';
// import IconCaretDown from '@/components/Icon/IconCaretDown';
// import { IRootState } from '@/store';
// import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
// import AdminTeamModule from '../AdminTeams/AdminTeamModule';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import { staticAdminData } from './ViewAdmin';
import InputComponent from '@/components/inputComponents';
import ViewAdminTickets, { staticTicketData } from '../AdminTickets/ViewAdminTickets';
import { successAlert } from '@/utils/Toast';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticAdminTeamData } from '../AdminTeams/ViewAdminTeams';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import ViewAdminTeams from '../AdminTeams/ViewAdminTeams';
import ViewSpecificBankAccount from '@/pages/WalletModule/BankAccountDetails/ViewSpecificBankAccount';
import Tippy from '@tippyjs/react';
import BankAccountModule from '@/pages/WalletModule/BankAccountDetails/BankAccountModule';
import BankAccountDocumentModule from '@/pages/WalletModule/BankAccountDetails/BankAccountDocumentModule';

interface FormValues {
    _id: string;
    bussinessName: string;
    roleOrg: string;
    fk_serviceCity: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    mobileNumber: string;
    altMobileNumber: string;
    password: string;
    country: string;
    state: string;
    city: string;
    commAmtType: string;
    commAmt: string;
    regAddress: string;
    commAddress: string;
    remarks: string;
    fk_roleType: string;
    fk_reportingManager: string;
    adminTeam: string;
    employeeLevel: string;
    archive: string;
    status: string;
    regNumber: string;
    aadharCard: string;
    panCard: string;
    gstNumber: string;
    docNumber: string;
    accName: string;
    accNumber: string;
    branchName: string;
    ifscCode: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
    phoneNumber: string;
    passwordHash: string;
    fk_reportsTo: string;
    fk_adminTeam: string;
    altPhoneNumber: string;
    fk_teamManager: string;
    profileImage: string;
    aadharImages: string;
    panImages: string;
}

interface adminTeamsDetailsFormValues {
    teamName: string;
    fk_reportingManager: string;
    teamManager: string;
    fk_serviceCity: string;
    remarks: string;
    status: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

interface AdminData {
    ticketIdKey: string;
    title: string;
    ticketType: string;
    priority: string;
}

interface InputItem {
    name: string;
    title: string;
    type: string;
    value: string;
}

interface InputSection {
    mainHeader: string;
    details: InputItem[];
    viewSpecific: boolean;
    viewEndPoint: string; // Optional view endpoint
    editEndPoint: string; // Optional edit endpoint
}

interface BankAccountProps {
    id: string;
    bankName: string;
    fk_userId: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    panNumber: string;
    voterId: string;
    aadhar: string;
    gst: string;
    accountType: string;
    verificationHistory: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    bankVerify: string;
    pgLabel: string;
    pgVerify: string;

    fromUser: string;
    toUser: string;
    toUserPhoneNumber: string;
    userId: string;
    purpose: string;
    amount: string;
    walletType: string;
    bankAccountIFSCFrom: string;
    bankAccountIFSCTo: string;
    pgTransactionId: string;
    transactionMode: string;
    walletStatus: string;
    appTransactionId: string;
    platformTransactionId: string;
    bankVerification: string;
    bankLabel: string;
    walletTransactionId: string;
    virtualTransactionId: string;
    paymentStatus: string;
    dateTime: string;
    distributorName: string;
    walletProfileStatus: string;
    walletIdFromUser: string;
    walletIdToUser: string;
    source: string;
}

interface BankDocProps {
    accountNumber: string;
    panNumber: string;
    voterId: string;
    aadhar: string;
    verificationHistory: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

const ViewSpecificAdmin: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const { admin }: { admin?: any } = useParams();
    let adminId: string | undefined = '';
    let index: any = '';
    if (admin?.length > 1) {
        const [Id, Idx] = admin?.split(',');
        adminId = Id;
        index = Idx;
    } else {
        adminId = admin;
    }

    const initialFormValues: FormValues = {
        _id: '',
        bussinessName: '',
        roleOrg: '',
        fk_serviceCity: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: '',
        mobileNumber: '',
        altMobileNumber: '',
        password: '',
        country: '',
        state: '',
        city: '',
        commAmtType: '',
        commAmt: '',
        regAddress: '',
        commAddress: '',
        remarks: '',
        fk_roleType: '',
        fk_reportingManager: '',
        adminTeam: '',
        employeeLevel: '',
        archive: '',
        status: '',
        regNumber: '',
        aadharCard: '',
        panCard: '',
        gstNumber: '',
        docNumber: '',
        accName: '',
        accNumber: '',
        branchName: '',
        ifscCode: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [],
        phoneNumber: '',
        passwordHash: '',
        fk_reportsTo: '',
        fk_adminTeam: '',
        altPhoneNumber: '',
        fk_teamManager: '',
        profileImage: '',
        aadharImages: '',
        panImages: '',
    };
    const initialBanckValues: BankAccountProps = {
        id: '',
        bankName: '',
        fk_userId: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        panNumber: '',
        voterId: '',
        aadhar: '',
        gst: '',
        accountType: '',
        verificationHistory: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
        bankVerify: '',
        pgLabel: '',
        pgVerify: '',
        fromUser: '',
        toUser: '',
        toUserPhoneNumber: '',
        userId: '',
        purpose: '',
        amount: '',
        walletType: '',
        bankAccountIFSCFrom: '',
        bankAccountIFSCTo: '',
        pgTransactionId: '',
        transactionMode: '',
        walletStatus: '',
        appTransactionId: '',
        platformTransactionId: '',
        bankVerification: '',
        bankLabel: '',
        walletTransactionId: '',
        virtualTransactionId: '',
        paymentStatus: '',
        dateTime: '',
        distributorName: '',
        walletProfileStatus: '',
        walletIdFromUser: '',
        walletIdToUser: '',
        source: '',
    };

    const initialBanckDoc: BankDocProps = {
        accountNumber: '',
        panNumber: '',
        voterId: '',
        aadhar: '',
        verificationHistory: '',
        archive: '',
        approvedBy: '',
        approvedAt: '',
        createdBy: '',
        createdAt: '',
        updatedBy: '',
        updatedAt: '',
    };
    const [adminDetails, setAdminDetails] = useState<FormValues>(initialFormValues);
    const [bankData, setBankData] = useState<BankAccountProps>(initialBanckValues);
    const [bankDoc, setBankDoc] = useState<BankDocProps>(initialBanckDoc);
    const [modal1, setModal1] = useState(false);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData: any = staticAdminData.find((data) => data.id === adminId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setAdminDetails(specificData); // Set the entire form data
        }
    }, [adminId]);

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    // useEffect(() => {
    //     const fetchAdminDetails = async () => {
    //         try {
    //             const response = await getAdminById(adminId!);
    //             setAdminDetails(response.data.admin);
    //         } catch (error: any) {
    //             console.error('Error fetching channel partner details:', error.message);
    //         }
    //     };

    //     fetchAdminDetails();
    // }, [adminId!]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdminDetails({ ...adminDetails, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    // Assign Team popup table --------->>
    const [modal, setmodal] = useState(false);
    const [SelectedChangeTeam, setChangeTeam] = useState<any[]>([]);
    const [addedChangeTeamType, setChangeTeamType] = useState<any>();
    // channel partner table columns
    const ChangeTeamColumns: DataTableColumn<any>[] = [
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
    const handleAddChangeTeam = (selectedTeam: any[], id: string) => {
        successAlert('Team Change Succesfully');
        setChangeTeam(selectedTeam);
        setChangeTeamType(id);
    };

    const [modal3, setmodal3] = useState(false);
    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit') {
            const editUrl = `/AdminModule/AdminTeams/EditAdminTeams/1`;
            navigate(editUrl);
        } else if (selectedOption === 'viewMore') {
            const editUrl = `/AdminModule/AdminTeams/ViewSpecificAdminTeams/1`;
            navigate(editUrl);
        } else if (selectedOption === 'changeTeam') {
            setmodal(true);
        } else if (selectedOption === 'updateArchive') {
            setmodal3(true);
        }
    };

    // admin team subsection data.
    const teamDetails: InputSection[] = [
        {
            viewEndPoint: '/AdminModule/AdminTeams/ViewSpecificAdminTeams/1',
            editEndPoint: '/AdminModule/AdminTeams/EditAdminTeams/1',
            mainHeader: '',
            details: [
                { name: 'teamName', title: 'Team Name', type: 'text', value: ' Solution' },
                { name: 'fk_reportsTo', title: 'Reporting Manager', type: 'text', value: 'Raghu' },
                { name: 'fk_teamManager', title: 'Team Manager', type: 'text', value: 'Manu' },
                { name: 'fk_serviceCity', title: 'Service City', type: 'text', value: 'Bangalore' },
                { name: 'teamsRoles', title: 'Team Roles', type: 'text', value: 'E3' },
            ],
            viewSpecific: true,
        },
    ];

    // handling next & previous Buttons for tabs.
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 6;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
    };

    useEffect(() => {
        setCurrentTabIndex(index);
    }, [index]);

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Admin/ViewAdmin' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to="/AdminModule/Admin/ViewAdmin" className={currentPage === 'AdminModule/Admin/ViewAdmin' ? 'active' : ''} onClick={() => setCurrent('/viewAdmin')}>
                        Admin
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/Admin/ViewSpecificAdmin/${adminId}` ? 'text-blue-600' : ''
                    }`}
                >
                    View Admin
                </li>
            </ol>

            <div className="panel mt-6">
                <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                    <Tab.List className="mt-3 flex flex-wrap">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Admin Details</span>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Documents Details</span>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Admin Roles</span>
                                </button>
                            )}
                        </Tab>

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Admin Teams</span>
                                </button>
                            )}
                        </Tab>

                        {/* <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Admin Tickets</span>
                                </button>
                            )}
                        </Tab> */}

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Admin Bank account</span>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Audit Logs</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center  rounded-md p-1"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/Admin/EditAdmin/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <AdminLayout details={adminDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={true} redirect={true} validation={null} />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1 text-md font-bold">
                                            Approved At
                                        </label>

                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            className="form-input w-full"
                                            // value={adminDetails.approvedAt}
                                            value="10/07/2024"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedBy" className="block mb-1 text-md font-bold">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            className="form-input w-full"
                                            // value={adminDetails.approvedBy}
                                            value="10/07/2024"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdAt" className="block mb-1 text-md font-bold">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            className="form-input w-full"
                                            // value={adminDetails.createdAt}
                                            value="10/07/2024"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1 text-md font-bold">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            className="form-input w-full"
                                            // value={adminDetails.createdBy}
                                            value="junaid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center gap-5 ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/Admin/EditAdmin/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <AdminDocLayout details={adminDetails} onInputChange={handleInputChange} viewSpecific={true} createAction={false} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center gap-5 ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/Admin/EditAdmin/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <PermissionModule viewSpecific={false} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <ViewAdminTeams tabs={true} />
                                {/* <div className="flex justify-end mx-9">
                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                            <option value="">Action Dropdown</option>
                                            <option value="viewMore">View More</option>
                                            <option value="changeTeam">Change Team</option>
                                            <option value="edit">Edit</option>
                                            <option value="updateArchive">Update Archive</option>
                                           
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    {teamDetails.map((section, index) => (
                                        <div key={index}>
                                            <InputComponent dropdown={true} sections={[section]} />
                                        </div>
                                    ))}
                                </div>
                                <CommonPopUp
                                    title={'Change Team'}
                                    columns={ChangeTeamColumns}
                                    data={staticAdminTeamData}
                                    event={modal}
                                    closeModal={() => setmodal(false)}
                                    onSubmit={handleAddChangeTeam}
                                />
                                <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} /> */}
                            </div>
                        </Tab.Panel>
                        {/* <Tab.Panel>
                            <div className="mt-5">
                                <ViewAdminTickets tabs_Admin={true} tabs={true} />
                            </div>
                        </Tab.Panel> */}
                        <Tab.Panel>
                            <div className="mt-5 flex justify-end items-center gap-3">
                                <button className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center" onClick={() => navigate('/AdminModule/Admin/EditAdmin/1')}>
                                    <h3>Update Bank Account</h3>
                                    <IconEdit />
                                </button>
                            </div>

                            <BankAccountModule details={bankData} onInputChange={handleInputChange} viewSpecific={true} isEdit={false} />
                            <BankAccountDocumentModule details={bankDoc} onInputChange={handleInputChange} viewSpecific={true} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2">Updated Hisory</h2>
                            </div>
                            <UpdatedHistoryTable />
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2">Logs File</h2>
                            </div>
                            <AuditLogsTable />
                            <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                <h2 className="mb-2">VerificationHisory</h2>
                            </div>
                            <VerificationHistory />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                <div className="flex justify-end mt-4">
                    <div className="flex gap-6 mt-4">
                        <button className="btn btn-primary" onClick={handlePrevious} disabled={currentTabIndex === 0}>
                            Previous
                        </button>
                        <button className="btn btn-primary" onClick={handleNext} disabled={currentTabIndex === totalTabs - 1}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewSpecificAdmin;
