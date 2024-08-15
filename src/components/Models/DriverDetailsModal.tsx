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

interface ServiceProviderData {
    id: string;
    serviceProviderType: string;
    channelPartnerType: string;
    fleetManagementType: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    fatherName: string;
    mobileNumber: string;
    altMobileNumber: string;
    country: string;
    state: string;
    city: string;
    dlNumber: string;
    dlValidity: string;
    policeVerNumber: string;
    batchNumber: string;
    batchValidity: string;
    pass: string;
    permanentAddress: string;
    presentAddress: string;
    fk_serviceCity: string;
    archive: string;
}

interface DriverDetailsModalProps {
    event: any;
    closeModal: () => void;
    onAddDriver: (data: string[], userID: string) => void; // Updated function signature
}

export const staticServiceProviderData = [
    {
        id: '1',
        serviceProviderType: 'Type A',
        channelPartnerType: 'Partner A',
        fleetManagementType: 'Management A',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        email: 'john@example.com',
        dob: '1990-05-15',
        gender: 'Male',
        fatherName: 'Michael Doe',
        mobileNumber: '1234567890',
        altMobileNumber: '9876543210',
        country: 'Country A',
        state: 'State A',
        city: 'City A',
        dlNumber: 'DL123456',
        dlValidity: '2025-12-31',
        policeVerNumber: 'PV7890',
        batchNumber: 'B12345',
        batchValidity: '2024-06-30',
        pass: 'Pass123',
        permanentAddress: '123 Street, City A',
        presentAddress: '456 Avenue, City B',
        fk_serviceCity: 'Service City A',
        archive: 'No',
        updatedHistory: [
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T09:40:05.000Z',
                _id: '65928875e10d341487baa93a',
            },
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T10:28:30.000Z',
                _id: '659293cee10d341487baa9fa',
            },
        ],
    },
    {
        id: '2',
        serviceProviderType: 'Type B',
        channelPartnerType: 'Partner B',
        fleetManagementType: 'Management B',
        firstName: 'Jane',
        middleName: 'Johnson',
        lastName: 'Doe',
        email: 'jane@example.com',
        dob: '1992-08-20',
        gender: 'Female',
        fatherName: 'David Johnson',
        mobileNumber: '9876543210',
        altMobileNumber: '1234567890',
        country: 'Country B',
        state: 'State B',
        city: 'City B',
        dlNumber: 'DL654321',
        dlValidity: '2026-10-15',
        policeVerNumber: 'PV4567',
        batchNumber: 'B67890',
        batchValidity: '2023-09-30',
        pass: 'Pass456',
        permanentAddress: '789 Road, City C',
        presentAddress: '012 Lane, City D',
        fk_serviceCity: 'Service City B',
        archive: 'Yes',
    },
    {
        id: '3',
        serviceProviderType: 'Type C',
        channelPartnerType: 'Partner C',
        fleetManagementType: 'Management C',
        firstName: 'Alice',
        middleName: 'Williams',
        lastName: 'Brown',
        email: 'alice@example.com',
        dob: '1988-12-10',
        gender: 'Female',
        fatherName: 'Robert Williams',
        mobileNumber: '8765432109',
        altMobileNumber: '1098765432',
        country: 'Country C',
        state: 'State C',
        city: 'City C',
        dlNumber: 'DL987654',
        dlValidity: '2024-11-20',
        policeVerNumber: 'PV3456',
        batchNumber: 'B23456',
        batchValidity: '2025-04-15',
        pass: 'Pass789',
        permanentAddress: '345 Boulevard, City E',
        presentAddress: '678 Park, City F',
        fk_serviceCity: 'Service City C',
        archive: 'No',
    },
];

const DriverDetailsModal: React.FC<DriverDetailsModalProps> = ({ event, closeModal, onAddDriver }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [currentPage, setCurrentPage] = useState<string>('');
    const [ServiceProviderData, setServiceProviderData] = useState<ServiceProviderData[]>(staticServiceProviderData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<ServiceProviderData[]>([]);
    const [recordsData, setRecordsData] = useState<ServiceProviderData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<ServiceProviderData[]>([]);
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

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    //handle date sorting
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Dynamic Data
    useEffect(() => {
        dispatch(setPageTitle('View Service Provider'));

        const fetchVehicleProfileData = async () => {
            // try {
            //     const { data } = await getAllVehicleProfileData();
            //     if (data?.ChannelPartners) {
            //         // pk-note: ask backend developer to change the accessor _id:id, remove the following later
            //         const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
            //             id,
            //             ...rest,
            //         }));
            //         //setVehicleProfileData(newData);
            //         setVehicleProfileData(staticVehicleProfileData);
            //     }
            // } catch (error: any) {
            //     console.error('Error fetching service provider data:', error.message);
            // }
        };
        fetchVehicleProfileData();
    }, [dispatch]);

    useEffect(() => {
        if (ServiceProviderData.length > 0) {
            const sortedData = ServiceProviderData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ServiceProviderData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ServiceProviderData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                serviceProviderType = '',
                channelPartnerType = '',
                fleetManagementType = '',
                firstName = '',
                middleName = '',
                lastName = '',
                email = '',
                dob = '',
                gender = '',
                fatherName = '',
                mobileNumber = '',
                altMobileNumber = '',
                country = '',
                state = '',
                city = '',
                dlNumber = '',
                dlValidity = '',
                policeVerNumber = '',
                batchNumber = '',
                batchValidity = '',
                pass = '',
                permanentAddress = '',
                presentAddress = '',
                fk_serviceCity = '',
                archive = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                serviceProviderType?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                fleetManagementType?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                dob?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                fatherName?.toLowerCase().includes(searchString) ||
                mobileNumber?.toLowerCase().includes(searchString) ||
                altMobileNumber?.toLowerCase().includes(searchString) ||
                country?.toLowerCase().includes(searchString) ||
                state?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                dlNumber?.toLowerCase().includes(searchString) ||
                dlValidity?.toLowerCase().includes(searchString) ||
                policeVerNumber?.toLowerCase().includes(searchString) ||
                batchNumber?.toLowerCase().includes(searchString) ||
                batchValidity?.toLowerCase().includes(searchString) ||
                pass?.toLowerCase().includes(searchString) ||
                permanentAddress?.toLowerCase().includes(searchString) ||
                presentAddress?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                archive?.toLocaleLowerCase().includes(searchString)
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

    const columns: DataTableColumn<ServiceProviderData>[] = [
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true, hidden: hiddenColumns.includes('serviceProviderType') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type', sortable: true, hidden: hiddenColumns.includes('fleetManagementType') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'dob', title: 'DOB', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'fatherName', title: 'Father Name', sortable: true, hidden: hiddenColumns.includes('fatherName') },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true, hidden: hiddenColumns.includes('mobileNumber') },
        { accessor: 'altMobileNumber', title: 'Alt Mobile Number', sortable: true, hidden: hiddenColumns.includes('altMobileNumber') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'dlNumber', title: 'DL Number', sortable: true, hidden: hiddenColumns.includes('dlNumber') },
        { accessor: 'dlValidity', title: 'DL Validity', sortable: true, hidden: hiddenColumns.includes('dlValidity') },
        { accessor: 'policeVerNumber', title: 'Police Verify No', sortable: true, hidden: hiddenColumns.includes('policeVerNumber') },
        { accessor: 'batchNumber', title: 'Batch No', sortable: true, hidden: hiddenColumns.includes('batchNumber') },
        { accessor: 'batchValidity', title: 'Batch Validity', sortable: true, hidden: hiddenColumns.includes('batchValidity') },
        { accessor: 'pass', title: 'Pass', sortable: true, hidden: hiddenColumns.includes('pass') },
        { accessor: 'permanentAddress', title: 'Permanent Add', sortable: true, hidden: hiddenColumns.includes('permanentAddress') },
        { accessor: 'presentAddress', title: 'Present Add', sortable: true, hidden: hiddenColumns.includes('presentAddress') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
    ];

    const sortedData = recordsData;

    // handle function
    const handleAddCHPartner = async () => {
        try {
            const serviceCityData = [];
            const userID = 'driverAdded';
            for (let i = 0; i < selectedRecords.length; i++) {
                serviceCityData.push(selectedRecords[i]?.id);
            }
            await onAddDriver(serviceCityData, userID);
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
            const filteredData = staticServiceProviderData.filter((item) => item?.fk_serviceCity.toLowerCase() === selectedCity.toLowerCase());
            setServiceProviderData(filteredData);
        } else {
            setServiceProviderData(staticServiceProviderData);
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
                                                <h1 className="text-2xl mt-2 p-5 font-bold text-center">Add Driver</h1>
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
                                                                    totalRecords={ServiceProviderData.length}
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
        </>
    );
};

export default DriverDetailsModal;
