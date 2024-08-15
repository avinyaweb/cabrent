import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { getAdminTeamsData } from '@/services/AdminTeamsService';
import { staticAdminTeamData } from '@/pages/AdminModule/AdminTeams/ViewAdminTeams';

interface ReportManagerData {
    id: string;
    teamName: string;
    fk_reportingManager: string;
    teamLead: string;
    teamMemberCount: string;
    role: string;
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

interface AdminTeamsModalProps {
    event: boolean | undefined;
    closeModal: () => void;
    onAddAdminTeams: (teamIds: string[], userId: string) => Promise<void> | void;
}

const AdminTeamsModal: React.FC<AdminTeamsModalProps> = ({ event, closeModal, onAddAdminTeams }) => {
    const [ReportManagerData, setReportManagerData] = useState<ReportManagerData[]>(staticAdminTeamData);
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

    // Dynamic Data
    useEffect(() => {
        const fetchAdminTeamsData = async () => {
            try {
                const { data } = await getAdminTeamsData();
                if (data?.teams) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.teams.map(({ _id, ...rest }: { _id: string }) => ({
                        id: _id,
                        ...rest,
                    }));
                    setReportManagerData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminTeamsData();
    }, []);

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
                teamName = '',
                fk_reportingManager = '',
                teamLead = '',
                teamMemberCount = '',
                role = '',
                fk_serviceCity = '',
                remarks = '',
                status = '',
                approvedAt = '',
                approvedBy = '',
                createdAt = '',
                createdBy = '',
                updatedAt = '',
                updatedBy = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                teamName?.toLowerCase().includes(searchString) ||
                fk_reportingManager?.toLowerCase().includes(searchString) ||
                teamLead?.toLowerCase().includes(searchString) ||
                teamMemberCount?.toLowerCase().includes(searchString) ||
                role?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                remarks?.toLowerCase().includes(searchString) ||
                status?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString)
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
        { accessor: 'teamName', title: 'Team Name', sortable: true, hidden: hiddenColumns.includes('teamName') },
        { accessor: 'reportingManager', title: 'Reporting Manager', sortable: true, hidden: hiddenColumns.includes('reportingManager') },
        { accessor: 'teamManager', title: 'Team Manager', sortable: true, hidden: hiddenColumns.includes('teamManager') },
        { accessor: 'role', title: 'Role', sortable: true, hidden: hiddenColumns.includes('role') },
        { accessor: 'status', title: 'Status', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedTime', title: 'Approved Time', sortable: true, hidden: hiddenColumns.includes('approvedTime') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'remarks', title: 'Remarks', sortable: true, hidden: hiddenColumns.includes('remarks') },
    ];

    const sortedData = recordsData;
    // handle function
    // const handleteamManagerData = async (): Promise<void> => {
    //     type adminTeamsRecord = {
    //         id: string | undefined;
    //         value: string | undefined;
    //     };
    //     try {
    //         const ReportManagerData: adminTeamsRecord[] = [];
    //         const userID: string = 'AdminTeams';
    //         for (let i = 0; i < selectedRecords.length; i++) {
    //             const record: adminTeamsRecord = {
    //                 id: selectedRecords[i]?.id,
    //                 value: selectedRecords[i]?.teamName,
    //             };
    //             ReportManagerData.push(record);
    //         }
    //         await onAddAdminTeams(ReportManagerData, userID);
    //         closeModal();
    //     } catch (error) {
    //         console.error('Error submitting data:', error);
    //     }
    // };

    // handle function
    const handleteamManagerData = async () => {
        try {
            const adminTeamsData = [];
            const userID = 'AdminTeams';
            for (let i = 0; i < selectedRecords.length; i++) {
                adminTeamsData.push(selectedRecords[i]?.id);
            }
            await onAddAdminTeams(adminTeamsData, userID);
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
                                                <h1 className="text-2xl mt-2 p-5 font-bold text-center">Add Admin Team</h1>
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

export default AdminTeamsModal;
