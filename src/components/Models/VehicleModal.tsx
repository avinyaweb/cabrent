import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface ServiceCityData {
    id: string;
    serviceProviderType: string;
    channelPartnerType: string;
    fleetManagementType: string;
    vehRegNumber: string;
    vehRTONumber: string;
    vehChasisNumber: string;
    vehCategory: string;
    seatCapacity: string;
    bootSpace: string;
    loadCapacity: string;
    bodyDimension: string;
    vehBrandName: string;
    vehType: string;
    vehBrandModel: string;
    vehColor: string;
    vehFuelType: string;
    fk_serviceCity: string;
    vehicleRegistrationDate: string;
    vehicleManufacturingDate: string;
    vehicleAge: string;
    loanBanker: string;
    loanAccNumber: string;
    emiAmt: string;
    emiDate: string;
    currLocation: string;
    archive: string;
}

// Define static data
export const staticServiceCityData: ServiceCityData[] = [
    {
        id: '1',
        serviceProviderType: 'Type A',
        channelPartnerType: 'Partner X',
        fleetManagementType: 'Management 1',
        vehRegNumber: 'ABC123',
        vehRTONumber: 'RTO456',
        vehChasisNumber: 'CHS789',
        vehCategory: 'Category XYZ',
        seatCapacity: '5',
        bootSpace: 'Large',
        loadCapacity: '1000 kg',
        bodyDimension: '4.5m x 2m x 1.8m',
        vehBrandName: 'Brand 1',
        vehType: 'SUV',
        vehBrandModel: 'Model XYZ',
        vehColor: 'Red',
        vehFuelType: 'Petrol',
        fk_serviceCity: 'City A',
        vehicleRegistrationDate: '2023-05-20',
        vehicleManufacturingDate: '2023-04-15',
        vehicleAge: '1 year 8 months',
        loanBanker: 'Bank X',
        loanAccNumber: 'Loan789',
        emiAmt: '5000',
        emiDate: '25th',
        currLocation: 'Location ABC',
        archive: 'No',
    },
    {
        id: '2',
        serviceProviderType: 'Type B',
        channelPartnerType: 'Partner Y',
        fleetManagementType: 'Management 2',
        vehRegNumber: 'DEF456',
        vehRTONumber: 'RTO789',
        vehChasisNumber: 'CHS123',
        vehCategory: 'Category ABC',
        seatCapacity: '4',
        bootSpace: 'Medium',
        loadCapacity: '800 kg',
        bodyDimension: '4m x 1.8m x 1.5m',
        vehBrandName: 'Brand 2',
        vehType: 'Sedan',
        vehBrandModel: 'Model ABC',
        vehColor: 'Blue',
        vehFuelType: 'Diesel',
        fk_serviceCity: 'City B',
        vehicleRegistrationDate: '2022-10-10',
        vehicleManufacturingDate: '2022-08-05',
        vehicleAge: '1 year 3 months',
        loanBanker: 'Bank Y',
        loanAccNumber: 'Loan456',
        emiAmt: '4000',
        emiDate: '20th',
        currLocation: 'Location XYZ',
        archive: 'Yes',
    },
    {
        id: '3',
        serviceProviderType: 'Type C',
        channelPartnerType: 'Partner Z',
        fleetManagementType: 'Management 3',
        vehRegNumber: 'GHI789',
        vehRTONumber: 'RTO123',
        vehChasisNumber: 'CHS456',
        vehCategory: 'Category PQR',
        seatCapacity: '7',
        bootSpace: 'Small',
        loadCapacity: '1200 kg',
        bodyDimension: '5m x 2.2m x 1.9m',
        vehBrandName: 'Brand 3',
        vehType: 'Hatchback',
        vehBrandModel: 'Model PQR',
        vehColor: 'Black',
        vehFuelType: 'Electric',
        fk_serviceCity: 'City C',
        vehicleRegistrationDate: '2024-01-01',
        vehicleManufacturingDate: '2023-12-01',
        vehicleAge: '1 month',
        loanBanker: 'Bank Z',
        loanAccNumber: 'Loan123',
        emiAmt: '6000',
        emiDate: '15th',
        currLocation: 'Location PQR',
        archive: 'No',
    },
];

const VehicleModal = (event: any, closeModal: any, onAddServiceCity: any) => {
    // future code --->>>
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
        if (ServiceCityData.length > 0) {
            const sortedData = ServiceCityData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof ServiceCityData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ServiceCityData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                serviceProviderType = '',
                channelPartnerType = '',
                fleetManagementType = '',
                vehRegNumber = '',
                vehRTONumber = '',
                vehChasisNumber = '',
                vehCategory = '',
                seatCapacity = '',
                bootSpace = '',
                loadCapacity = '',
                bodyDimension = '',
                vehBrandName = '',
                vehType = '',
                vehBrandModel = '',
                vehColor = '',
                vehFuelType = '',
                fk_serviceCity = '',
                vehicleRegistrationDate = '',
                vehicleManufacturingDate = '',
                vehicleAge = '',
                loanBanker = '',
                loanAccNumber = '',
                emiAmt = '',
                emiDate = '',
                currLocation = '',
                archive = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                serviceProviderType?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                fleetManagementType?.toLowerCase().includes(searchString) ||
                vehRegNumber?.toLowerCase().includes(searchString) ||
                vehRTONumber?.toLowerCase().includes(searchString) ||
                vehChasisNumber?.toLowerCase().includes(searchString) ||
                vehCategory?.toLowerCase().includes(searchString) ||
                seatCapacity?.toLowerCase().includes(searchString) ||
                bootSpace?.toLowerCase().includes(searchString) ||
                loadCapacity?.toLowerCase().includes(searchString) ||
                bodyDimension?.toLowerCase().includes(searchString) ||
                vehBrandName?.toLowerCase().includes(searchString) ||
                vehType?.toLowerCase().includes(searchString) ||
                vehBrandModel?.toLowerCase().includes(searchString) ||
                vehColor?.toLowerCase().includes(searchString) ||
                vehFuelType?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                vehicleRegistrationDate?.toLowerCase().includes(searchString) ||
                vehicleManufacturingDate?.toLocaleLowerCase().includes(searchString) ||
                vehicleAge?.toLowerCase().includes(searchString) ||
                loanBanker?.toLowerCase().includes(searchString) ||
                loanAccNumber?.toLowerCase().includes(searchString) ||
                emiAmt?.toLowerCase().includes(searchString) ||
                emiDate?.toLowerCase().includes(searchString) ||
                currLocation?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString)
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
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true, hidden: hiddenColumns.includes('serviceProviderType') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type', sortable: true, hidden: hiddenColumns.includes('fleetManagementType') },
        { accessor: 'vehRegNumber', title: 'Vehicle Registration No', sortable: true, hidden: hiddenColumns.includes('vehRegNumber') },
        { accessor: 'vehRTONumber', title: 'Vehicle RTO Number', sortable: true, hidden: hiddenColumns.includes('vehRTONumber') },
        { accessor: 'vehChasisNumber', title: 'Vehicle Chasis Number', sortable: true, hidden: hiddenColumns.includes('vehChasisNumber') },
        { accessor: 'vehCategory', title: 'Vehicle Category', sortable: true, hidden: hiddenColumns.includes('vehCategory') },
        { accessor: 'seatCapacity', title: 'Seat Capacity', sortable: true, hidden: hiddenColumns.includes('seatCapacity') },
        { accessor: 'bootSpace', title: 'Boot Space', sortable: true, hidden: hiddenColumns.includes('bootSpace') },
        { accessor: 'loadCapacity', title: 'Load Capacity', sortable: true, hidden: hiddenColumns.includes('loadCapacity') },
        { accessor: 'bodyDimension', title: 'Body Dimension', sortable: true, hidden: hiddenColumns.includes('bodyDimension') },
        { accessor: 'vehBrandName', title: 'Vehicle Brand Name', sortable: true, hidden: hiddenColumns.includes('vehBrandName') },
        { accessor: 'vehType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('vehType') },
        { accessor: 'vehBrandModel', title: 'Vehicle Brand Model', sortable: true, hidden: hiddenColumns.includes('vehBrandModel') },
        { accessor: 'vehColor', title: 'Vehicle Color', sortable: true, hidden: hiddenColumns.includes('vehColor') },
        { accessor: 'vehFuelType', title: 'Vehicle Fuel Type', sortable: true, hidden: hiddenColumns.includes('vehFuelType') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'vehicleRegistrationDate', title: 'Vehicle Registration Date', sortable: true, hidden: hiddenColumns.includes('vehicleRegistrationDate') },
        { accessor: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', sortable: true, hidden: hiddenColumns.includes('vehicleManufacturingDate') },
        { accessor: 'vehicleAge', title: 'Vehicle Age', sortable: true, hidden: hiddenColumns.includes('vehicleAge') },
        { accessor: 'loanBanker', title: 'Loan Banker', sortable: true, hidden: hiddenColumns.includes('loanBanker') },
        { accessor: 'loanAccNumber', title: 'Loan Acc Number', sortable: true, hidden: hiddenColumns.includes('loanAccNumber') },
        { accessor: 'emiAmt', title: 'EMI Amt', sortable: true, hidden: hiddenColumns.includes('emiAmt') },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true, hidden: hiddenColumns.includes('emiDate') },
        { accessor: 'currLocation', title: 'Curr Location', sortable: true, hidden: hiddenColumns.includes('currLocation') },
        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
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
                                            <h1 className="text-2xl mt-2 p-5 font-bold text-center">Add Vehicle</h1>
                                            <div>
                                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 px-5 mt-2">
                                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Vehicle
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

export default VehicleModal;
