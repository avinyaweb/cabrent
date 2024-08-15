import { IRootState } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import toast from 'react-hot-toast';

interface SubscriptionAmtDistributionData {
    id: string;
    cgst: string;
    sgst: string;
    processingFee: string;
    planAmount: string;
    isChPartCommisionApplicable: string;
    platformFee: string;
    pgCharges: string;
    vehicleType: string;
    totalAmount: string;
    fk_serviceCity: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

interface SubsAmtDistributionModalProps {
    event: any;
    closeModal: () => void;
    onAddSubsDistributionAmt: (data: any, userID: any) => void; // Update the function signature
}

export const staticSubscriptionAmtDistributionData = [
    {
        id: '1',
        cgst: '5%',
        sgst: '5%',
        processingFee: '$10',
        planAmount: '$100',
        isChPartCommisionApplicable: 'yes',
        platformFee: '$5',
        pgCharges: '$8',
        vehicleType: 'Sedan',
        totalAmount: '$138',
        fk_serviceCity: 'NYC',
        archive: 'false',
        approvedBy: 'Admin',
        approvedAt: '2024-01-05T12:00:00Z',
        createdBy: 'User123',
        createdAt: '2024-01-05T08:30:00Z',
        updatedBy: 'User456',
        updatedAt: '2024-01-05T11:45:00Z',
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
        cgst: '7%',
        sgst: '7%',
        processingFee: '$12',
        planAmount: '$150',
        isChPartCommisionApplicable: 'yes',
        platformFee: '$6',
        pgCharges: '$10',
        vehicleType: 'SUV',
        totalAmount: '$205',
        fk_serviceCity: 'LA',
        archive: 'false',
        approvedBy: 'Manager',
        approvedAt: '2024-01-06T09:30:00Z',
        createdBy: 'User789',
        createdAt: '2024-01-06T08:45:00Z',
        updatedBy: 'UserABC',
        updatedAt: '2024-01-07T11:20:00Z',
    },
    {
        id: '3',
        cgst: '9%',
        sgst: '9%',
        processingFee: '$15',
        planAmount: '$170',
        isChPartCommisionApplicable: 'yes',
        platformFee: '$5',
        pgCharges: '$10',
        vehicleType: 'Mini',
        totalAmount: '$221',
        fk_serviceCity: 'LA',
        archive: 'false',
        approvedBy: 'Manager',
        approvedAt: '2024-01-06T09:30:00Z',
        createdBy: 'User789',
        createdAt: '2024-01-06T08:45:00Z',
        updatedBy: 'UserABC',
        updatedAt: '2024-01-07T11:20:00Z',
    },
    {
        id: '4',
        cgst: '3%',
        sgst: '3%',
        processingFee: '$8',
        planAmount: '$200',
        isChPartCommisionApplicable: 'yes',
        platformFee: '$7',
        pgCharges: '$12',
        vehicleType: 'Sedan',
        totalAmount: '$255',
        fk_serviceCity: 'SF',
        archive: 'false',
        approvedBy: 'Supervisor',
        approvedAt: '2024-01-07T15:00:00Z',
        createdBy: 'UserXYZ',
        createdAt: '2024-01-07T07:30:00Z',
        updatedBy: 'User123',
        updatedAt: '2024-01-08T10:15:00Z',
    },
];
 
const SubsAmtDistributionModal: React.FC<SubsAmtDistributionModalProps> = ({ event, closeModal, onAddSubsDistributionAmt }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [SubscriptionAmtDistData, setSubscriptionAmtDistData] = useState<SubscriptionAmtDistributionData[]>(staticSubscriptionAmtDistributionData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SubscriptionAmtDistributionData[]>([]);
    const [recordsData, setRecordsData] = useState<SubscriptionAmtDistributionData[]>([]);
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const [selectedRecords, setSelectedRecords] = useState<SubscriptionAmtDistributionData[]>([]);
    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [vehicleType, setVehicleType] = useState<string>('');
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

    // service city based filtering.
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };
    // service city based filtering.
    useEffect(() => {
        if (selectedCity.trim() !== '') {
            const filteredData = staticSubscriptionAmtDistributionData.filter((item) => item.fk_serviceCity.toLowerCase() === selectedCity.toLowerCase());
            setSubscriptionAmtDistData(filteredData);
        } else {
            setSubscriptionAmtDistData(staticSubscriptionAmtDistributionData);
        }
    }, [selectedCity]);

    //
    // Vehicle ty based filtering.
    const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVehicleType(e.target.value);
    };
    // Vehicle ty based filtering.
    useEffect(() => {
        if (vehicleType.trim() !== '') {
            const filteredData = staticSubscriptionAmtDistributionData.filter((item) => item.vehicleType.toLowerCase() === vehicleType.toLowerCase());
            filteredData.length > 0 ? setSubscriptionAmtDistData(filteredData) : setSubscriptionAmtDistData(staticSubscriptionAmtDistributionData);
        } else {
            setSubscriptionAmtDistData(staticSubscriptionAmtDistributionData);
        }
    }, [vehicleType]);
    //

    useEffect(() => {
        if (SubscriptionAmtDistData.length > 0) {
            const sortedData = SubscriptionAmtDistData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof SubscriptionAmtDistributionData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [SubscriptionAmtDistData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                cgst = '',
                sgst = '',
                processingFee = '',
                planAmount = '',
                isChPartCommisionApplicable = '',
                platformFee = '',
                pgCharges = '',
                totalAmount = '',
                fk_serviceCity = '',
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
                cgst?.toLowerCase().includes(searchString) ||
                sgst?.toLowerCase().includes(searchString) ||
                processingFee?.toLowerCase().includes(searchString) ||
                planAmount?.toLowerCase().includes(searchString) ||
                isChPartCommisionApplicable?.toLowerCase().includes(searchString) ||
                platformFee?.toLowerCase().includes(searchString) ||
                pgCharges?.toLowerCase().includes(searchString) ||
                totalAmount?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLocaleLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    const columns: DataTableColumn<SubscriptionAmtDistributionData>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'cgst', title: 'CGST', sortable: true },
        { accessor: 'sgst', title: 'SGST', sortable: true },
        { accessor: 'processingFee', title: 'Processing Fee', sortable: true },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'isChPartCommisionApplicable', title: 'CH Partner Comm Applicable', sortable: true },
        { accessor: 'platformFee', title: 'Platform Fee', sortable: true },
        { accessor: 'pgCharges', title: 'PG Charges', sortable: true },
        { accessor: 'vehicleType', title: 'Vehicle Type', sortable: true },
        { accessor: 'totalAmount', title: 'Total Amount', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: SubscriptionAmtDistributionData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: SubscriptionAmtDistributionData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    const handleSubsDistributionAmtSubmit = async () => {
        try {
            const subsDistAmtData = [];
            const userID = 'subsDistributionAmt';
            for (let i = 0; i < selectedRecords.length; i++) {
                subsDistAmtData.push(selectedRecords[i]?.id);
            }
            await onAddSubsDistributionAmt(subsDistAmtData, userID);

            // Show success toast
            toast.success('Subscription distribution amount submitted successfully!', {
                duration: 3000, // 3 seconds
                position: 'top-right',
                style: {
                    background: '#48BB78',
                    color: 'white',
                },
            });

            closeModal();
        } catch (error) {
            console.error('Error submitting data:', error);

            // Show error toast
            toast.error('Error submitting subscription distribution amount!', {
                duration: 3000, // 3 seconds
                position: 'top-right',
                style: {
                    background: '#F56565',
                    color: 'white',
                },
            });
        }
    };

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
                                            <h1 className="text-2xl mt-2 p-5 font-bold text-center">Subscription Amt Distribution</h1>
                                            <div>
                                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 px-5 mt-2">
                                                    <div className="lg:w-1/2 sm:w-full mb-4 sm:mb-0">
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

                                                    <div className="lg:w-1/3 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Vehicle type
                                                        </label>
                                                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={handleVehicleTypeChange} value={vehicleType}>
                                                            <option value="">Show all</option>
                                                            <option value={'Mini'}>Mini</option>
                                                            <option value={'Sedan'}>Sedan</option>
                                                            <option value={'Maxi cab'}>Maxi cab</option>
                                                            <option value={'Toyota'}>Toyota</option>
                                                            <option value={'Honda'}>Honda</option>
                                                            <option value={'SUV'}>SUV</option>
                                                        </select>
                                                    </div>

                                                    <div className="lg:w-1/3 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Date Range
                                                        </label>

                                                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                                                    </div>

                                                    <div className="lg:w-1/2 sm:w-full mb-4 sm:mb-0">
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
                                                                totalRecords={SubscriptionAmtDistData.length}
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
                                                        <button disabled={selectedRecords.length === 0} type="button" className="btn btn-primary" onClick={handleSubsDistributionAmtSubmit}>
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

export default SubsAmtDistributionModal;
