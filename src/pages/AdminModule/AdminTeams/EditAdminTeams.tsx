import React, { useState, FormEvent, useEffect, ChangeEvent, Fragment } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { updateAdminTeams, getAdminTeamsById, getAdminListData, deleteAdminListFromTeams } from '@/services/AdminTeamsService';
import AdminTeamModule from './AdminTeamModule';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import Dropdown from '@/components/Dropdown';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import { getAdminTicketsData } from '@/services/AdminTicketsService';
import { IRootState } from '@/store';
import AddAdminModal from '../../../components/AddAdminModal';
import AddTicketModal from '../../../components/AddTicketModal';
import IconTrash from '@/components/Icon/IconTrash';
import toast from 'react-hot-toast';
import IconEdit from '@/components/Icon/IconEdit';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { staticAdminTeamData } from './ViewAdminTeams';

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
    updatedAt: string;
    updatedBy: string;
}

interface AdminData {
    id: string;
    ticketIdKey: string;
    title: string;
    ticketType: string;
    priority: string;
    fk_roleType: string;
    firstName: string;
    fk_serviceCity: string;
    phoneNumber: string;
    archive: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
}

const EditAdminTeams: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('Edit Admin Teams'));
    }, [dispatch]);

    const { adminTeamsId }: { adminTeamsId?: string | undefined } = useParams();
    const initialFormValues: FormValues = {
        teamName: '',
        fk_reportingManager: '',
        teamManager: '',
        fk_serviceCity: '',
        remarks: '',
        status: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
    };

    // State to manage hidden columns
    const [adminTeamsDetails, setAdminTeamsDetails] = useState<FormValues>(initialFormValues);
    const [hiddenColumns_admin, setHiddenColumns_admin] = useState<string[]>(['reportsTo', 'teamManager', 'fk_serviceCity', 'Remarks']);
    const [AdminData_admin, setAdminData_admin] = useState<AdminData[]>([]);
    const [page_admin, setPage_admin] = useState(1);
    const PAGE_SIZES_admin = [10, 20, 30, 50, 100];
    const [pageSize_admin, setPageSize_admin] = useState(PAGE_SIZES_admin[0]);
    const [initialRecords_admin, setInitialRecords_admin] = useState<AdminData[]>([]);
    const [recordsData_admin, setRecordsData_admin] = useState<AdminData[]>([]);
    const [search_admin, setSearch_admin] = useState('');
    const [selectedRecords_admin, setSelectedRecords_admin] = useState<AdminData[]>([]);
    const [sortStatus_admin, setSortStatus_admin] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // State to manage hidden columns
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['reportsTo', 'teamManager', 'fk_serviceCity', 'Remarks']);
    const [AdminData, setAdminData] = useState<AdminData[]>([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AdminData[]>([]);
    const [recordsData, setRecordsData] = useState<AdminData[]>([]);
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<AdminData[]>([]);
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData: any = staticAdminTeamData.find((data) => data.id === adminTeamsId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setAdminTeamsDetails(specificData); // Set the entire form data
        }
    }, [adminTeamsId]);

    // useEffect(() => {
    //     const fetchAdminTeamsDetails = async () => {
    //         try {
    //             const response = await getAdminTeamsById(adminTeamsId);
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            navigate('/AdminModule/AdminTeams/ViewSpecificAdminTeams/1');

            // await updateAdminTeams(adminTeamsId, adminTeamsDetails);
            // console.log('Admin team details updated successfully!');
        } catch (error: any) {
            console.error('Error updating admin team details:', error.message);
        }
    };

    const handleCancel = () => {
        navigate('/AdminModule/AdminTeams/ViewAdminTeams');
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (AdminData.length > 0) {
            const sortedData = AdminData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AdminData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [AdminData, sortStatus, pageSize]);

    const sortedData = recordsData;

    const handleRowClick = (row: AdminData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: AdminData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/Admin/ViewSpecificAdmin/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/Admin/EditAdmin/${selectedRecords[0].id}`;
            navigate(editUrl);
        }
    };

    // Dynamic Data
    // useEffect(() => {
    //     const fetchAdminData = async () => {
    //         try {
    //             const { data } = await getAdminTicketsData();
    //             if (data?.adminTickets) {
    //                 const newData = data.adminTickets.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setAdminData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminData();
    // }, []);

    const columns: DataTableColumn<AdminData>[] = [
        {
            accessor: 'remove',
            title: 'remove',
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Remove">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    // handleRemoveAdminList(rowData);
                                }
                            }}
                        >
                            <IconTrash />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/AdminModule/AdminTeams/EditAdminTeams/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy>

                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/AdminModule/Admin/ViewSpecificAdmin/${rowData.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IconEye />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'ticketIdKey', title: 'Ticket Key', sortable: true, hidden: hiddenColumns.includes('ticketIdKey') },
        { accessor: 'title', title: 'Title', sortable: true, hidden: hiddenColumns.includes('title') },
        { accessor: 'ticketType', title: 'Ticket Type', sortable: true, hidden: hiddenColumns.includes('ticketType') },
        { accessor: 'priority', title: 'Priority', sortable: true, hidden: hiddenColumns.includes('priority') },
    ];

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { ticketIdKey = '', title = '', ticketType = '', priority = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase
            return (
                ticketIdKey?.toLowerCase().includes(searchString) ||
                title?.toLowerCase().includes(searchString) ||
                ticketType?.toLowerCase().includes(searchString) ||
                priority?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    useEffect(() => {
        setPage_admin(1);
    }, [pageSize_admin]);

    useEffect(() => {
        const from = (page_admin - 1) * pageSize_admin;
        const to = from + pageSize_admin;
        setRecordsData_admin([...initialRecords_admin.slice(from, to)]);
    }, [page_admin, pageSize_admin, initialRecords_admin]);

    useEffect(() => {
        if (AdminData_admin.length > 0) {
            const sortedData_admin = AdminData_admin.slice().sort((a, b) => {
                const accessor = sortStatus_admin.columnAccessor as keyof AdminData;
                if (a[accessor] < b[accessor]) return sortStatus_admin.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus_admin.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords_admin(sortedData_admin);
            setRecordsData_admin(sortedData_admin.slice(0, pageSize_admin));
        }
    }, [AdminData_admin, sortStatus_admin, pageSize_admin]);

    const sortedData_admin = recordsData_admin;

    const handleRowClick_admin = (row: AdminData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: AdminData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/Admin/ViewSpecificAdmin/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange_admin = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/AdminModule/Admin/EditAdmin/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete') {
            const confirmDelete = window.confirm('Do you really want to delete this team?');
        }
    };
    // Dynamic Data
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                if (adminTeamsId) {
                    const { data } = await getAdminListData(adminTeamsId);
                    if (data?.teamsList) {
                        const newData = data.teamsList.map(({ _id, ...rest }: { _id: string; [key: string]: any }) => ({
                            id: _id,
                            ...rest,
                        }));
                        setAdminData_admin(newData);
                    }
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminData();
    }, [adminTeamsId]);

    // handle remove admin from team list.
    const handleRemoveAdminList = async (rowData: any) => {
        try {
            // Display confirmation alert
            const confirmed = window.confirm('Do you really want to delete this team?');
            if (!confirmed) {
                return;
            }
            // If confirmed, proceed with deletion
            // const response = await deleteAdminListFromTeams(adminTeamsId, rowData);
            // if (response.message) {
            //     toast.error(response.message);
            //     window.location.reload();
            // }
        } catch (error) {
            console.log(error);
        }
    };

    const columns_admin: DataTableColumn<AdminData>[] = [
        {
            accessor: 'remove',
            title: 'remove',
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Remove">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    handleRemoveAdminList(rowData);
                                }
                            }}
                        >
                            <IconTrash />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/AdminModule/AdminTickets/EditAdminTickets/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy>
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/AdminModule/AdminTickets/ViewSpecificAdminTickets/${rowData.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IconEye />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'fk_roleType', title: ' fk_roleType ', sortable: true, hidden: hiddenColumns_admin.includes('fk_roleType') },
        { accessor: 'firstName', title: ' firstName ', sortable: true, hidden: hiddenColumns_admin.includes('firstName') },
        { accessor: 'fk_serviceCity', title: 'fk_serviceCity ', sortable: true, hidden: hiddenColumns_admin.includes('fk_serviceCity') },
        { accessor: 'phoneNumber', title: ' phoneNumber ', sortable: true, hidden: hiddenColumns_admin.includes('phoneNumber') },
        { accessor: 'archive', title: ' archive ', sortable: true, hidden: hiddenColumns_admin.includes('archive') },
        { accessor: 'createdAt', title: ' createdAt ', sortable: true, hidden: hiddenColumns_admin.includes('createdAt') },
        { accessor: 'updatedAt', title: ' updatedAt ', sortable: true, hidden: hiddenColumns_admin.includes('updatedAt') },
        { accessor: 'updatedBy', title: ' updatedBy ', sortable: true, hidden: hiddenColumns_admin.includes('updatedBy') },
    ];

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { fk_roleType = '', firstName = '', fk_serviceCity = '', phoneNumber = '', archive = '', createdAt = '', updatedAt = '', updatedBy = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase
            return (
                fk_roleType?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                phoneNumber?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search_admin, initialRecords_admin, pageSize_admin]);

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
                        currentPath === '/AdminModule/AdminTeams/ViewAdminTeams' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to="/AdminModule/AdminTeams/ViewAdminTeams" className={currentPage === 'AdminModule/AdminTeams/ViewAdminTeams' ? 'active' : ''} onClick={() => setCurrent('/viewAdminTeams')}>
                        Admin Teams
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === `/AdminModule/AdminTeams/EditAdminTeams/${adminTeamsId}` ? 'text-blue-600' : ''
                    }`}
                >
                    Edit Admin Teams
                </li>
            </ol>

            <div className="panel mt-2">
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <AdminTeamModule details={adminTeamsDetails} onInputChange={handleInputChange} showStatus={true} showApprovalFields={false} isEditPage={true} viewSpecific={false} />

                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-primary !mt-6 mr-4">
                                Submit
                            </button>
                            <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditAdminTeams;
