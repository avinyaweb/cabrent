import React, { useState, useEffect, ChangeEvent, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { Tab } from '@headlessui/react';
import AdminTeamModule from './AdminTeamModule';
import IconEdit from '@/components/Icon/IconEdit';
import 'rsuite/dist/rsuite-no-reset.min.css';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { staticAdminTeamData } from './ViewAdminTeams';
import ViewAdmin from '../Admin/ViewAdmin';
import ViewAdminTickets from '../AdminTickets/ViewAdminTickets';

interface FormValues {
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

const ViewSpecificAdminTeams: React.FC = (props) => {
    let { state } = useLocation(); // you can pass values to store and get from store instead of this.
    const { adminTeamsId } = useParams();
    const viewSpecific = true;

    // future code -->>
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Specific Admin Teams'));
    }, [dispatch]);

    const initialFormValues: FormValues = {
        teamName: state?.teamName,
        fk_reportingManager: state?.fk_reportingManager,
        teamManager: state?.teamManager,
        fk_serviceCity: state?.fk_serviceCity,
        remarks: state?.remarks,
        status: state?.status,
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [adminTeamsDetails, setAdminTeamsDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData: any = staticAdminTeamData.find((data) => data.id === adminTeamsId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setAdminTeamsDetails(specificData); // Set the entire form data
        }
    }, [adminTeamsId]);

    // future code -->>
    // useEffect(() => {
    //     const fetchAdminTeamsDetails = async () => {
    //         try {
    //             const response = await getAdminTeamsById(adminTeamsId);
    //             console.log('Fetched Data', response);
    //             setAdminTeamsDetails(response);
    //         } catch (error: any) {
    //             console.error('Error fetching admin teams details:', error.message);
    //         }
    //     };

    //     fetchAdminTeamsDetails();
    // }, [adminTeamsId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminTeamsDetails({ ...adminTeamsDetails, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // handling next & previous Buttons for tabs.
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 4;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => navigate('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/AdminTeams/ViewAdminTeams' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to="/AdminModule/AdminTeams/ViewAdminTeams" className={currentPage === 'AdminModule/AdminTeams/ViewAdminTeams' ? 'active' : ''} onClick={() => navigate('/viewAdminTeams')}>
                        Admin Teams
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/AdminTeams/ViewSpecificAdminTeams/${adminTeamsId}` ? 'text-blue-600' : ''
                    }`}
                >
                    View Admin Teams
                </li>
            </ol>

            <div className="panel mt-6">
                <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                    <Tab.List className="mt-3 flex flex-wrap ">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Admin Team</span>
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
                                    <span className="text-md font-bold">Team Members</span>
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
                                    <span className="text-md font-bold">Team Ticket</span>
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
                                            const viewUrl = `/AdminModule/AdminTeams/EditAdminTeams/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <AdminTeamModule
                                    details={adminTeamsDetails}
                                    onInputChange={handleInputChange}
                                    showStatus={true}
                                    showApprovalFields={true}
                                    viewSpecific={viewSpecific}
                                    redirect={true}
                                    isEditPage={false}
                                />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="approvedAt" className="block mb-1 text-md font-bold">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={adminTeamsDetails.approvedAt}
                                            value="12-03-2024"
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
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={adminTeamsDetails.approvedBy}
                                            value="vengadesh"
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
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={adminTeamsDetails.createdAt}
                                            value="1-03-2024"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1 text-md font-bold">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={adminTeamsDetails.createdBy}
                                            value="udhai nag"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="createdBy" className="block mb-1 text-md font-bold">
                                            Closed By
                                        </label>
                                        <input
                                            name="closedBy"
                                            type="text"
                                            id="closedBy"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={adminTeamsDetails.createdBy}
                                            value="udhai nag"
                                        />
                                    </div>
                                    <div className="lg:w-1/3 pointer-events-none">
                                        <label htmlFor="closedAt" className="block mb-1 text-md font-bold">
                                            Closed At
                                        </label>
                                        <input
                                            name=" closedAt"
                                            type="text"
                                            id="closedAt"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={adminTeamsDetails.createdBy}
                                            value="12-03-2024"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <ViewAdmin tabs={true} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <ViewAdminTickets tabs_Team={true} tabs={true} />
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Logs File</h2>
                                </div>
                                <AuditLogsTable />
                                {/* <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className='mb-2'>VerificationHisory</h2>
                                </div>
                                <VerificationHistory /> */}
                            </div>
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

export default ViewSpecificAdminTeams;
