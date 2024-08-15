import React, { useState, useEffect, ChangeEvent, Fragment } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { Tab } from '@headlessui/react';
import { getRoleById } from '@/services/RolesService';
import RolesModule from './RolesModule';
import PermissionModule from './PermissionModule';
import IconEdit from '@/components/Icon/IconEdit';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import { FaUserLock } from 'react-icons/fa6';
import { AiOutlineAudit } from 'react-icons/ai';

interface FormValues {
    roleName: string;
    archive: string;
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

const ViewSpecificRoles: React.FC = (props) => {
    const { roleId }: { roleId?: any } = useParams();
    const viewSpecific = true;
    let { state } = useLocation(); // you can pass values to store and get from store instead of this.

    const dispatch = useDispatch();
    // future code -->>
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Specific Roles'));
    }, [dispatch]);

    const initialFormValues: FormValues = {
        roleName: state?.roleName,
        archive: state?.archive,
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    // future code -->>
    //const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [roleDetails, setRoleDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const fetchRoleDetails = async () => {
            try {
                const response = await getRoleById(roleId);
                console.log('Fetched Data', response);

                const { role } = response;
                setRoleDetails({
                    ...roleDetails,
                    ...role,
                });
            } catch (error: any) {
                console.error('Error fetching role details:', error.message);
            }
        };

        fetchRoleDetails();
    }, [roleId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRoleDetails({ ...roleDetails, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    // handling next & previous Buttons for tabs.
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 3;

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
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/AdminModule/Roles/ViewRoles' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to="/AdminModule/Roles/ViewRoles" className={currentPage === 'AdminModule/Roles/ViewRoles' ? 'active' : ''} onClick={() => setCurrent('/viewRoles')}>
                        Roles
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/Roles/ViewSpecificRoles/${roleId}` ? 'text-blue-600' : ''
                    }`}
                >
                    View Roles
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
                                    <FaUserLock className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Admin Roles & Permissions</span>
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
                                    <AiOutlineAudit className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
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
                                            const viewUrl: any = `/AdminModule/Admin/EditAdmin/1`;
                                            Navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <RolesModule details={roleDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} />

                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/4">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input
                                            name="approvedAt"
                                            type="text"
                                            id="approvedAt"
                                            placeholder="Enter Approved At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={roleDetails.approvedAt}
                                            value="2024-01-08T09:00:00Z  "
                                        />
                                    </div>
                                    <div className="lg:w-1/4">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input
                                            name="approvedBy"
                                            type="text"
                                            id="approvedBy"
                                            placeholder="Enter Approved By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            // value={roleDetails.approvedBy}
                                            value="John Doe"
                                        />
                                    </div>
                                    <div className="lg:w-1/4">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input
                                            name="createdAt"
                                            type="text"
                                            id="createdAt"
                                            placeholder="Enter Created At"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            readOnly={viewSpecific}
                                            //  value={roleDetails.createdAt}
                                            value="2024-01-08T08:30:00Z"
                                        />
                                    </div>
                                    <div className="lg:w-1/4">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input
                                            name="createdBy"
                                            type="text"
                                            id="createdBy"
                                            placeholder="Enter Created By"
                                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                            // value={roleDetails.createdBy}
                                            readOnly={viewSpecific}
                                            value="Alice"
                                        />
                                    </div>
                                </div>
                                <PermissionModule />
                            </div>
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

export default ViewSpecificRoles;
