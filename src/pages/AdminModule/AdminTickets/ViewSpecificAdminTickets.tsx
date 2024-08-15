import React, { useState, ChangeEvent, FormEvent, useEffect, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Tab } from '@headlessui/react';
import AdminTicketsModule from './AdminTicketsModule';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import { staticTicketData } from './ViewAdminTickets';
import IconEdit from '@/components/Icon/IconEdit';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import StatusTimeLine from '@/components/StatusTimeLine/StatusTimeLine';

interface FormValues {
    id: string;
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
    approvedAt?: string;
    approvedBy?: string;
    createdAt?: string;
    createdBy?: string;
    adminTeamsType: string;
    updatedHistory?: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string;
    }[];
}

const ViewSpecificAdminTickets: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { adminTicketsId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        ticketIdKey: '',
        ticketType: '',
        title: '',
        description: '',
        fk_raisedBy: '',
        raisedAgainst: '',
        fk_raisedAgainstType: '',
        closedAt: '',
        closedBy: '',
        status: '',
        priority: '',
        archive: '',
        remarks: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [],
        adminTeamsType: '',
    };

    const [adminTicketsDetails, setAdminTicketsDetails] = useState<FormValues>(initialFormValues);
    const [showComments, setShowComments] = useState(false);

    const [modal1, setModal1] = useState(false);

    // useEffect(() => {
    //     const specificData = staticTicketData.find((data) => data.id === adminTicketsId);
    //     if (specificData) {
    //         setAdminTicketsDetails(specificData); // Set the entire form data
    //     }
    // }, [adminTicketsId]);

    useEffect(() => {
        const specificData = staticTicketData.find((data) => data.id === adminTicketsId);
        if (specificData) {
            setAdminTicketsDetails(specificData as FormValues);
        }
    }, [adminTicketsId]);

    // useEffect(() => {
    //     const fetchAdminTicketsDetails = async () => {
    //         try {
    //             const response = await getAdminTicketsById(adminTicketsId);
    //             setAdminTicketsDetails(response);
    //         } catch (error: any) {
    //             console.error('Error fetching admin Tickets details:', error.message);
    //         }
    //     };

    //     fetchAdminTicketsDetails();
    // }, [adminTicketsId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminTicketsDetails({ ...adminTicketsDetails, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };
    const viewSpecific = true;

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

    const events = [
        { time: '10:00', description: 'Updated Server Logs', timeAgo: '25 mins ago', color: 'primary' },
        { time: '12:45', description: 'Backup Files EOD', timeAgo: '2 hrs ago', color: 'secondary' },
        { time: '14:00', description: 'Send Mail to HR and Admin', timeAgo: '4 hrs ago', color: 'success' },
        { time: '16:00', description: 'Conference call with Marketing Manager', timeAgo: '6 hrs ago', color: 'danger' },
        {
            time: '17:00',
            description: (
                <>
                    Collected documents from <a href="javascript:void(0);">Sara</a>
                </>
            ),
            timeAgo: '9 hrs ago',
            color: 'warning',
        },
        { time: '16:00', description: 'Server rebooted successfully', timeAgo: '8 hrs ago', color: 'info' },
    ];

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
                        currentPath === '/AdminModule/AdminTickets/ViewAdminTickets' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link
                        to="/AdminModule/AdminTickets/ViewAdminTickets"
                        className={currentPage === '/AdminModule/AdminTickets/ViewAdminTickets' ? 'active' : ''}
                        onClick={() => setCurrent('/viewAdminTickets')}
                    >
                        Admin Tickets
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/AdminTickets/ViewSpecificAdminTickets/${adminTicketsId}` ? 'text-blue-600' : ''
                    }`}
                >
                    View Admin Tickets
                </li>
            </ol>
            <div className=" panel mt-5">
                <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                    <Tab.List className="mt-3 flex flex-wrap ">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <span className="text-md font-bold">Admin Tickets</span>
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
                                    <span className="text-md font-bold">Remarks</span>
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
                                {/* <Tippy content="Currently Ticket is Active">
                                    <button type="button" className="btn btn-success">
                                        Active
                                    </button>
                                </Tippy> */}

                                <div className="flex flex-row justify-start">
                                    <StatusTimeLine />
                                </div>

                                <div className="flex items-center ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center  rounded-md p-1"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/AdminTickets/EditAdminTickets/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <AdminTicketsModule details={adminTicketsDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} redirect={true} isEditPage={false} />
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
                                            value="raghu"
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
                                            value="raghu"
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
                            <div className=" mt-5">
                                <div className="flex items-center ml-auto justify-end mb-2">
                                    <div
                                        className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center  rounded-md p-1"
                                        onClick={() => {
                                            const viewUrl = `/AdminModule/AdminTickets/EditAdminTickets/1`;
                                            navigate(viewUrl);
                                        }}
                                    >
                                        <h3>Edit</h3>
                                        <IconEdit />
                                    </div>
                                </div>
                                <div className="lg:w-1/3 mt-6">
                                    <label htmlFor="description1" className="mb-1 flex flex-row items-center justify-between">
                                        <div className="flex flex-row gap-2 align-center">
                                            Fayiz
                                            <Link to={'/adminModule/Admin/viewSpecificAdmin/654e26276e8ddde56bf6fe58'}>
                                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                                            </Link>
                                        </div>

                                        <h2>2024-01-01 09:40:05.00</h2>
                                    </label>
                                    <input name="description1" placeholder="" type="text" id="description1" className="form-input w-full pointer-events-none h-24" value="nice keep it up" readOnly />
                                </div>

                                <div className="lg:w-1/3 mt-6">
                                    <label htmlFor="description2" className="mb-1 flex flex-row items-center justify-between">
                                        <div className="flex flex-row gap-2 align-center">
                                            Manu
                                            <Link to={'/adminModule/Admin/viewSpecificAdmin/654e26276e8ddde56bf6fe58'}>
                                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                                            </Link>
                                        </div>
                                        <h2>2023-01-01 08:40:05.00</h2>
                                    </label>
                                    <input name="description2" placeholder="" type="text" id="description2" className="form-input w-full pointer-events-none h-24" value="please upgrade" readOnly />
                                </div>

                                <div className="lg:w-1/3 mt-6">
                                    <label htmlFor="description3" className="mb-1 flex flex-row items-center justify-between">
                                        <div className="flex flex-row gap-2 align-center">
                                            Venu
                                            <Link to={'/adminModule/Admin/viewSpecificAdmin/654e26276e8ddde56bf6fe58'}>
                                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                                            </Link>
                                        </div>
                                        <h2>2024-08-01 09:40:05.00</h2>
                                    </label>
                                    <input name="description3" placeholder="" type="text" id="description3" className="form-input w-full pointer-events-none h-24" value="good nice" readOnly />
                                </div>

                                <div className="lg:w-1/3 mt-6">
                                    <label htmlFor="description4" className="block mb-1 flex flex-row items-center justify-between">
                                        <div className="flex flex-row gap-2 align-center">
                                            Azhar
                                            <Link to={'/adminModule/Admin/viewSpecificAdmin/654e26276e8ddde56bf6fe58'}>
                                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                                            </Link>
                                        </div>
                                        <h2>2024-05-01 09:40:05.00</h2>
                                    </label>
                                    <input
                                        name="description4"
                                        placeholder=""
                                        type="text"
                                        id="description4"
                                        className="form-input w-full pointer-events-none h-24"
                                        value="data loding very fast"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </Tab.Panel>

                        <Tab.Panel>
                            <div className=" mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2 className="mb-2">Audit Logs</h2>
                                </div>
                                <AuditLogsTable />
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

            {/* <div className="panel mt-2">
                            <div className="space-y-2 prose dark:prose-headings:text-white-dark mt-6 mb-6">
                                <h5 className='font-bold'>Add Comment</h5>
                            </div>
                            <AdminTicketComments />
                        </div> */}

            {/* status time line
<div className="flex items-center justify-center space-x-2">
            <div className="timeline-item flex flex-col items-center text-center">
                <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                <p className="text-xs mt-1 text-[#3b3f5c] dark:text-white-light font-semibold">Pending</p>
                <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">25 mins ago</p>
            </div>
            <div className="h-0.5 bg-gray-300 w-4 my-auto"></div>
            <div className="timeline-item flex flex-col items-center text-center">
                <div className="w-6 h-6 rounded-full bg-yellow-300"></div>
                <p className="text-xs mt-1 text-[#3b3f5c] dark:text-white-light font-semibold">Hold</p>
                <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">2 hrs ago</p>
            </div>
            <div className="h-0.5 bg-gray-300 w-4 my-auto"></div>
            <div className="timeline-item flex flex-col items-center text-center">
                <div className="w-6 h-6 rounded-full bg-blue-300"></div>
                <p className="text-xs mt-1 text-[#3b3f5c] dark:text-white-light font-semibold">Checking</p>
                <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">4 hrs ago</p>
            </div>
            <div className="h-0.5 bg-gray-300 w-4 my-auto"></div>
            <div className="timeline-item flex flex-col items-center text-center">
                <div className="w-6 h-6 rounded-full bg-green-300"></div>
                <p className="text-xs mt-1 text-[#3b3f5c] dark:text-white-light font-semibold">Approved</p>
                <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">6 hrs ago</p>
            </div>
        </div> */}
        </>
    );
};

export default ViewSpecificAdminTickets;
