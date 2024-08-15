import { IRootState } from '@/store';
import { setPageTitle } from '@/store/themeConfigSlice';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IconCaretDown from '../Icon/IconCaretDown';
import Dropdown from '../Dropdown';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface ReportManagerData {
    id: string;
    fk_roleType?: number;
    fk_serviceCity?: any;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    status?: string;
    fk_reportsTo?: number;
    fk_adminTeam?: number;
    approvedBy?: number;
    approvedTime?: string; // Assuming date-time string format
    archive?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'HOLD' | 'SUSPENDED';
    createdAt?: string; // Assuming date-time string format
    updatedAt?: string; // Assuming date-time string format
    createdBy?: number;
    updatedBy?: number;
}

interface RisedAgainstModalProps {
    event: any;
    closeModal: () => void;
    onRisedByData: (data: string[], userID: string) => void; // Updated function signature
}

// Define static data
export const staticReportManager: ReportManagerData[] = [
    {
        id: '1',
        fk_roleType: 1,
        fk_serviceCity: 1,
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
        status: 'Active',
        fk_reportsTo: 2,
        fk_adminTeam: 1,
        approvedBy: 3,
        approvedTime: '2024-03-26T12:00:00',
        archive: 'APPROVED',
        createdAt: '2024-03-26T12:00:00',
        updatedAt: '2024-03-26T12:00:00',
        createdBy: 4,
        updatedBy: 4,
    },
    {
        id: '2',
        fk_roleType: 2,
        fk_serviceCity: 2,
        firstName: 'Alice',
        middleName: 'Marie',
        lastName: 'Jones',
        email: 'alice@example.com',
        phoneNumber: '987-654-3210',
        status: 'Active',
        fk_reportsTo: 1,
        fk_adminTeam: 2,
        approvedBy: 4,
        approvedTime: '2024-03-27T09:00:00',
        archive: 'PENDING',
        createdAt: '2024-03-27T09:00:00',
        updatedAt: '2024-03-27T09:00:00',
        createdBy: 3,
        updatedBy: 3,
    },
    {
        id: '3',
        fk_roleType: 3,
        fk_serviceCity: 3,
        firstName: 'Emma',
        middleName: 'Grace',
        lastName: 'Brown',
        email: 'emma@example.com',
        phoneNumber: '555-123-4567',
        status: 'Inactive',
        fk_reportsTo: 1,
        fk_adminTeam: 1,
        approvedBy: 2,
        approvedTime: '2024-03-25T15:00:00',
        archive: 'REJECTED',
        createdAt: '2024-03-25T15:00:00',
        updatedAt: '2024-03-25T15:00:00',
        createdBy: 4,
        updatedBy: 2,
    },
];

const RisedAgainstModal: React.FC<RisedAgainstModalProps> = ({ event, closeModal, onRisedByData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ReportManagerData, setReportManagerData] = useState<ReportManagerData[]>(staticReportManager);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ReportManagerData[]>([]);
    const [recordsData, setRecordsData] = useState<ReportManagerData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<ReportManagerData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (ReportManagerData.length > 0) {
            const sortedData = ReportManagerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ReportManagerData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ReportManagerData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                fk_roleType = 0,
                fk_serviceCity = 0,

                firstName = '',
                middleName = '',
                lastName = '',
                email = '',
                phoneNumber = '',
                status = '',
                fk_reportsTo = 0,
                fk_adminTeam = 0,
                approvedBy = 0,
                approvedTime = '',
                archive = '',
                createdAt = '',
                updatedAt = '',
                createdBy = 0,
                updatedBy = 0,
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_roleType?.toString().toLowerCase().includes(searchString) ||
                fk_serviceCity?.toString().toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                phoneNumber?.toLowerCase().includes(searchString) ||
                status?.toLowerCase().includes(searchString) ||
                fk_reportsTo?.toString().toLowerCase().includes(searchString) ||
                fk_adminTeam?.toString().toLowerCase().includes(searchString) ||
                approvedBy?.toString().toLowerCase().includes(searchString) ||
                approvedTime?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toString().toLowerCase().includes(searchString) ||
                updatedBy?.toString().toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    // Function to toggle column visibility
    const toggleColumnVisibility = (columnAccessor: string) => {
        setHiddenColumns((prevHiddenColumns) => {
            if (prevHiddenColumns.includes(columnAccessor)) {
                return prevHiddenColumns.filter((col) => col !== columnAccessor);
            } else {
                return [...prevHiddenColumns, columnAccessor];
            }
        });
    };

    const columns: DataTableColumn<ReportManagerData>[] = [
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'fk_roleType', title: 'Role Type', sortable: true, hidden: hiddenColumns.includes('fk_roleType') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },

        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'phoneNumber', title: 'Phone Number', sortable: true, hidden: hiddenColumns.includes('phoneNumber') },
        { accessor: 'status', title: 'Status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'fk_reportsTo', title: 'Reports To', sortable: true, hidden: hiddenColumns.includes('fk_reportsTo') },
        { accessor: 'fk_adminTeam', title: 'Admin Team', sortable: true, hidden: hiddenColumns.includes('fk_adminTeam') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedTime', title: 'Approved Time', sortable: true, hidden: hiddenColumns.includes('approvedTime') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
    ];

    const sortedData = recordsData;

    // handle function
    const handleteamManagerData = async () => {
        try {
            const ReportManagerData = [];
            const userID = 'risedAgainst';
            for (let i = 0; i < selectedRecords.length; i++) {
                ReportManagerData.push(selectedRecords[i]?.id);
            }
            console.log(ReportManagerData);

            await onRisedByData(ReportManagerData, userID);
            closeModal();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const [selectedCity, setSelectedCity] = useState<string>('');

    // service city based filtering.
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };
    useEffect(() => {
        if (selectedCity.trim() !== '') {
            const filteredData = ReportManagerData.filter((item) => item?.fk_serviceCity.toLowerCase() === selectedCity.toLowerCase());
            setReportManagerData(filteredData);
        } else {
            setReportManagerData(ReportManagerData);
        }
    }, [selectedCity]);

    return (
        <>
            <div className="mb-5">
                <div className="flex items-center justify-center gap-2">
                    <div>
                        <Transition appear show={event} as={Fragment}>
                            <Dialog as="div" open={event} onClose={closeModal}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0" />
                                </Transition.Child>
                                <div className="fixed inset-0 bg-[black]/60 z-[999]">
                                    <div className="flex items-center justify-center min-h-screen px-4">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl my-8 text-black dark:text-white-dark">
                                                <h1 className="text-2xl mt-2 p-5 font-bold text-center">Rised Against</h1>
                                                <div>
                                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5 px-5 mt-2">
                                                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                            <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                                Service City
                                                            </label>
                                                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={handleCityChange} value={selectedCity}>
                                                                <option value="">Show all</option>
                                                                <option value="NYC">NYC</option>
                                                                <option value="LA">LA</option>
                                                                <option value="SF">SF</option>
                                                            </select>
                                                        </div>

                                                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                            <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                                Date sort
                                                            </label>
                                                            <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
                                                        </div>
                                                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                            <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                                Actions
                                                            </label>
                                                            <select id="ctnSelect1" className="form-select text-white-dark">
                                                                <option value="">Action Dropdown</option>
                                                                <option value="edit">Edit</option>
                                                                <option value="delete">Delete</option>
                                                            </select>
                                                        </div>

                                                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                            <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                                Search
                                                            </label>

                                                            <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="overflow-x-auto">
                                                        <div className="panel">
                                                            <div className="datatables">
                                                                <DataTable
                                                                    className="whitespace-nowrap table-hover lg:h-[300px] h-[200]"
                                                                    records={sortedData}
                                                                    columns={columns}
                                                                    highlightOnHover
                                                                    totalRecords={ReportManagerData.length}
                                                                    recordsPerPage={pageSize}
                                                                    page={page}
                                                                    onPageChange={(p) => setPage(p)}
                                                                    recordsPerPageOptions={PAGE_SIZES}
                                                                    onRecordsPerPageChange={setPageSize}
                                                                    sortStatus={sortStatus}
                                                                    onSortStatusChange={setSortStatus}
                                                                    selectedRecords={selectedRecords}
                                                                    onSelectedRecordsChange={(selectedRows) => {
                                                                        setSelectedRecords(selectedRows.slice(-1));
                                                                    }}
                                                                    minHeight={200}
                                                                    paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                                                                    // onRowClick={(row) => handleRowClick(row)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <div className="flex justify-end items-center gap-5">
                                                            <button onClick={closeModal} type="button" className="btn btn-outline-danger">
                                                                Discard
                                                            </button>
                                                            <button disabled={selectedRecords.length === 0} type="button" className="btn btn-primary" onClick={handleteamManagerData}>
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RisedAgainstModal;
