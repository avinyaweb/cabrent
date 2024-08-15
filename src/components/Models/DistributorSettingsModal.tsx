// import { getDistributorSettingsData } from '@/services/ChannelPartnerService';
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

interface DistributorSettingsData {
    id: string;
    bookingType: string;
    serviceType: string;
    serviceCity: string;
    subscriptionType: string;
    taxPercentage: string;
    createdAt: string;
    updatedAt: string;
}

interface DistributorSettingsModalProps {
    event: any;
    closeModal: () => void;
    onAddChannelPartner: (data: string[], userID: string) => void; // Updated function signature
}

export const staticDistributorSettingsData = [
    {
        id: '1',
        bookingType: 'Online Booking',
        serviceType: 'Daily',
        serviceCity: 'Chicago',
        subscriptionType: 'Flat',
        taxPercentage: '10',
        createdAt: '2024-04-03T08:00:00Z',
        updatedAt: '2024-04-03T08:00:00Z',
    },
    {
        id: '2',
        bookingType: 'Scheduled Booking',
        serviceType: 'Rental',
        serviceCity: 'New York',
        subscriptionType: 'Percentage',
        taxPercentage: '8',
        createdAt: '2024-03-15T10:30:00Z',
        updatedAt: '2024-03-20T09:45:00Z',
    },
    {
        id: '3',
        bookingType: 'QR Code Booking',
        serviceType: 'Outstation',
        serviceCity: 'Los Angeles',
        subscriptionType: 'Fixed',
        taxPercentage: '12',
        createdAt: '2024-02-28T14:20:00Z',
        updatedAt: '2024-03-01T11:55:00Z',
    },
];
const DistributorSettingsModal: React.FC<DistributorSettingsModalProps> = ({ event, closeModal, onAddChannelPartner }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [DistributorSettingsData, setDistributorSettingsData] = useState<DistributorSettingsData[]>([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<DistributorSettingsData[]>([]);
    const [recordsData, setRecordsData] = useState<DistributorSettingsData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<DistributorSettingsData[]>([]);
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
    // useEffect(() => {
    //     dispatch(setPageTitle('View Channel Partner'));

    //     const fetchDistributorSettingsData = async () => {
    //         try {
    //             const { data } = await getDistributorSettingsData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id, ...rest }: { _id: string }) => ({
    //                     id: _id,
    //                     ...rest,
    //                 }));
    //                 setDistributorSettingsData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchDistributorSettingsData();
    // }, [dispatch]);

    useEffect(() => {
        if (DistributorSettingsData.length > 0) {
            const sortedData = DistributorSettingsData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof DistributorSettingsData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [DistributorSettingsData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', bookingType = '', serviceType = '', serviceCity = '', subscriptionType = '', taxPercentage = '', createdAt = '', updatedAt = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                bookingType?.toLowerCase().includes(searchString) ||
                serviceType?.toLowerCase().includes(searchString) ||
                serviceCity?.toLowerCase().includes(searchString) ||
                subscriptionType?.toLowerCase().includes(searchString) ||
                taxPercentage?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<DistributorSettingsData>[] = [
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'bussinessName', title: 'BussinessName', sortable: true, hidden: hiddenColumns.includes('bussinessName') },
        { accessor: 'channelPartnerType', title: 'ChannelPartnerType', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'mobile', title: 'Mobile', sortable: true, hidden: hiddenColumns.includes('mobile') },
        { accessor: 'firstName', title: 'FirstName', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'createdAt', title: 'CreatedAt', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedAt', title: 'UpdatedAt', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData;

    // handle function
    const handleAddCHPartner = async () => {
        try {
            const CHPartnerData = [];
            const userID = 'chPartnerAdded';
            for (let i = 0; i < selectedRecords.length; i++) {
                CHPartnerData.push(selectedRecords[i]?.id);
            }
            await onAddChannelPartner(CHPartnerData, userID);
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
    // useEffect(() => {
    //     if (selectedCity.trim() !== '') {
    //         const filteredData = DistributorSettingsData.filter((item) => item?.fk_serviceCity.toLowerCase() === selectedCity.toLowerCase());
    //         setDistributorSettingsData(filteredData);
    //     } else {
    //         setDistributorSettingsData(DistributorSettingsData);
    //     }
    // }, [selectedCity]);

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
                                            <h1 className="text-2xl mt-2 p-5 font-bold text-center">Add Distributor</h1>
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
                                                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                            <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                                Actions
                                                            </label>
                                                            <select id="ctnSelect1" className="form-select text-white-dark">
                                                                <option value="">Action Dropdown</option>
                                                                <option value="edit">Edit</option>
                                                                <option value="delete">Delete</option>
                                                            </select>
                                                        </div> */}

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
                                                                totalRecords={DistributorSettingsData.length}
                                                                recordsPerPage={pageSize}
                                                                page={page}
                                                                onPageChange={(p) => setPage(p)}
                                                                recordsPerPageOptions={PAGE_SIZES}
                                                                onRecordsPerPageChange={setPageSize}
                                                                sortStatus={sortStatus}
                                                                onSortStatusChange={setSortStatus}
                                                                selectedRecords={selectedRecords}
                                                                onSelectedRecordsChange={(selectedRows) => setSelectedRecords(selectedRows)}
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

export default DistributorSettingsModal;
