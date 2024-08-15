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
import { getAllCityData } from '@/services/UtilityServices/CityService';
import { getAllCountry, getAllState } from '@/services/RolesService';

interface CityData {
    id: string;
    fk_stateOrProvince: string;
    cityName: string;
    archive: string;
    fk_country: string;
}

// Define serviceCityRecord type or interface
type serviceCityRecord = {
    id: string | undefined;
    value: string | undefined;
};

interface ServiceCityModalProps {
    event: any;
    closeModal: () => void;
    onAddServiceCity: (data: serviceCityRecord[], userID: string) => void;
}

export const staticServiceCityData: CityData[] = [
    {
        id: '1',
        fk_stateOrProvince: 'Kerala',
        cityName: 'Kochi',
        archive: 'PENDING',
        fk_country: 'IN',
    },
    {
        id: '2',
        fk_stateOrProvince: 'Tamil Nadu',
        cityName: 'Chennai',
        archive: 'APPROVED',
        fk_country: 'IN',
    },
    {
        id: '3',
        fk_stateOrProvince: 'Karnataka',
        cityName: 'Bangalore',
        archive: 'REJECTED',
        fk_country: 'IN',
    },
    {
        id: '4',
        fk_stateOrProvince: 'Telangana',
        cityName: 'Hyderabad',
        archive: 'HOLD',
        fk_country: 'IN',
    },
    {
        id: '5',
        fk_stateOrProvince: 'Maharashtra',
        cityName: 'Pune',
        archive: 'SUSPENDED',
        fk_country: 'IN',
    },
];

const ServiceCityModal: React.FC<ServiceCityModalProps> = ({ event, closeModal, onAddServiceCity }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [cityData, setCityData] = useState<CityData[]>(staticServiceCityData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<CityData[]>([]);
    const [recordsData, setRecordsData] = useState<CityData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<CityData[]>([]);
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
        const fetchAdminCityData = async () => {
            try {
                const { data } = await getAllCityData();
                if (data?.Cities) {
                    // pk-note: ask backend developer to change the accessor _id:id, remove the following later
                    const newData = data.Cities.map(({ _id: id, ...rest }: { _id: string }) => ({
                        id,
                        ...rest,
                    })) as CityData[]; // Cast the result to CityData[]
                    setCityData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminCityData();
    }, []);

    useEffect(() => {
        if (cityData.length > 0) {
            const sortedData = cityData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof CityData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [cityData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', fk_stateOrProvince = '', cityName = '', archive = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_stateOrProvince?.toLowerCase().includes(searchString) ||
                cityName?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // City to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };
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

    const columns: DataTableColumn<CityData>[] = [
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'fk_stateOrProvince', title: 'State Name', sortable: true, hidden: hiddenColumns.includes('fk_stateOrProvince') },
        { accessor: 'cityName', title: 'City Name', sortable: true, hidden: hiddenColumns.includes('cityName') },
        { accessor: 'archive', title: 'Status (Archive)', sortable: true, hidden: hiddenColumns.includes('archive') },
    ];

    const sortedData = recordsData;

    // handle function
    const handleAddCHPartner = async (): Promise<void> => {
        type serviceCityRecord = {
            id: string | undefined;
            value: string | undefined;
        };
        try {
            const serviceCityData: serviceCityRecord[] = [];
            const userID: string = 'serviceCityAdded';
            for (let i = 0; i < selectedRecords.length; i++) {
                const record: serviceCityRecord = {
                    id: selectedRecords[i]?.id,
                    value: selectedRecords[i]?.cityName,
                };
                serviceCityData.push(record);
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
            console.log('hello');

            // const filteredData = cityData.filter((item) => item?.fk_serviceCity.toLowerCase() === selectedCity.toLowerCase());
            // setCityData(filteredData);
        } else {
            console.log('hello');

            // setCityData(cityData);
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
                                                <h1 className="text-2xl mt-2 p-5 font-bold text-center">Add Service City</h1>
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
                                                                    totalRecords={cityData.length}
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
        </>
    );
};

export default ServiceCityModal;
