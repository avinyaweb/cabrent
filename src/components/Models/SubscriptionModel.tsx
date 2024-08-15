import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface ServiceCityData {
    id: string;
    fk_serviceCity: string;
    planName: string;
    planDetails: string;
    planDuration: string;
    planAmount: string;
    planDescription: string;
    planDistance: string;
    planLiveStartTime: string;
    planLiveEndTime: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

interface SubscriptionModelProps {
    event: any;
    closeModal: () => void;
    onAddServiceCity: (data: string[], userID: string) => void; // Assuming ServiceCityData is the type for subscription data
}

// Define static data
export const staticServiceCityData: ServiceCityData[] = [
    {
        id: 'a1b2c3d4',
        fk_serviceCity: 'NYC123',
        planName: 'Premium Plan',
        planDetails: 'Unlimited access to all premium features',
        planDuration: '12 months',
        planAmount: '999.99',
        planDescription: 'A comprehensive plan offering all premium services for one year.',
        planDistance: 'Unlimited',
        planLiveStartTime: '2024-05-03T08:00:00Z',
        planLiveEndTime: '2025-05-03T08:00:00Z',
        archive: 'false',
        approvedBy: 'AdminUser',
        approvedAt: '2024-05-02T15:30:00Z',
        createdBy: 'User123',
        createdAt: '2024-05-02T10:00:00Z',
        updatedBy: 'User123',
        updatedAt: '2024-05-02T12:30:00Z',
    },
    {
        id: 'e5f6g7h8',
        fk_serviceCity: 'LA456',
        planName: 'Standard Plan',
        planDetails: 'Access to most features with some limitations',
        planDuration: '6 months',
        planAmount: '499.99',
        planDescription: 'A mid-tier plan offering access to most features for six months.',
        planDistance: '50 miles',
        planLiveStartTime: '2024-06-01T09:00:00Z',
        planLiveEndTime: '2024-12-01T09:00:00Z',
        archive: 'false',
        approvedBy: 'Admin456',
        approvedAt: '2024-05-15T14:00:00Z',
        createdBy: 'User456',
        createdAt: '2024-05-14T09:00:00Z',
        updatedBy: 'User456',
        updatedAt: '2024-05-14T12:00:00Z',
    },
    {
        id: 'i9j0k1l2',
        fk_serviceCity: 'SF789',
        planName: 'Basic Plan',
        planDetails: 'Limited access to features',
        planDuration: '3 months',
        planAmount: '199.99',
        planDescription: 'A basic plan offering limited features for three months.',
        planDistance: '20 miles',
        planLiveStartTime: '2024-07-01T10:00:00Z',
        planLiveEndTime: '2024-10-01T10:00:00Z',
        archive: 'false',
        approvedBy: 'Admin789',
        approvedAt: '2024-05-20T10:30:00Z',
        createdBy: 'User789',
        createdAt: '2024-05-19T11:00:00Z',
        updatedBy: 'User789',
        updatedAt: '2024-05-19T13:00:00Z',
    },
];

const SubscriptionModel: React.FC<SubscriptionModelProps> = ({ event, closeModal, onAddServiceCity }) => {
    // future code -->>>
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [ServiceCityData, setServiceCityData] = useState<ServiceCityData[]>(staticServiceCityData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ServiceCityData[]>([]);
    const [recordsData, setRecordsData] = useState<ServiceCityData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<ServiceCityData[]>([]);
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
        if (ServiceCityData.length > 0 && sortStatus.columnAccessor) {
            const sortedData = ServiceCityData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ServiceCityData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ServiceCityData, sortStatus.columnAccessor, sortStatus.direction, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                fk_serviceCity = '',
                planName = '',
                planDetails = '',
                planDuration = '',
                planAmount = '',
                planDescription = '',
                planDistance = '',
                planLiveStartTime = '',
                planLiveEndTime = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                planName?.toLowerCase().includes(searchString) ||
                planDetails?.toLowerCase().includes(searchString) ||
                planDuration?.toLowerCase().includes(searchString) ||
                planAmount?.toLowerCase().includes(searchString) ||
                planDescription?.toLowerCase().includes(searchString) ||
                planDistance?.toLowerCase().includes(searchString) ||
                planLiveStartTime?.toLowerCase().includes(searchString) ||
                planLiveEndTime?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    // Function to toggle column visibility
    // const toggleColumnVisibility = (columnAccessor: string) => {
    //     setHiddenColumns((prevHiddenColumns) => {
    //         if (prevHiddenColumns.includes(columnAccessor)) {
    //             return prevHiddenColumns.filter((col) => col !== columnAccessor);
    //         } else {
    //             return [...prevHiddenColumns, columnAccessor];
    //         }
    //     });
    // };

    const columns: DataTableColumn<ServiceCityData>[] = [
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'planName', title: 'Plan Name', sortable: true, hidden: hiddenColumns.includes('planName') },
        { accessor: 'planDetails', title: 'Plan Details', sortable: true, hidden: hiddenColumns.includes('planDetails') },
        { accessor: 'planDuration', title: 'Plan Duration', sortable: true, hidden: hiddenColumns.includes('planDuration') },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true, hidden: hiddenColumns.includes('planAmount') },
        { accessor: 'planDescription', title: 'Plan Description', sortable: true, hidden: hiddenColumns.includes('planDescription') },
        { accessor: 'planDistance', title: 'Plan Distance', sortable: true, hidden: hiddenColumns.includes('planDistance') },
        { accessor: 'planLiveStartTime', title: 'Plan Live Start Time', sortable: true, hidden: hiddenColumns.includes('planLiveStartTime') },
        { accessor: 'planLiveEndTime', title: 'Plan Live End Time', sortable: true, hidden: hiddenColumns.includes('planLiveEndTime') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData;

    // handle function
    const handleAddCHPartner = async () => {
        try {
            const serviceCityData = [];
            const userID = 'serviceCityAdded';
            for (let i = 0; i < selectedRecords.length; i++) {
                serviceCityData.push(selectedRecords[i]?.id);
            }
            await onAddServiceCity(serviceCityData, userID);
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
    // service city based filtering.
    useEffect(() => {
        if (selectedCity.trim() !== '') {
            const filteredData = ServiceCityData.filter((item) => item?.fk_serviceCity.toLowerCase() === selectedCity.toLowerCase());
            setServiceCityData(filteredData);
        } else {
            setServiceCityData(ServiceCityData);
        }
    }, [selectedCity]);

    return (
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
                                            <h1 className="text-2xl mt-2 p-5 font-bold text-center">Add Subscription</h1>
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
                                                                totalRecords={ServiceCityData.length}
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
                                                        <button disabled={selectedRecords.length === 0} type="button" className="btn btn-primary" onClick={handleAddCHPartner}>
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
    );
};

export default SubscriptionModel;
