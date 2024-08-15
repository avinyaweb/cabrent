import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { getAllVehicleProfileData } from '@/services/BusinessProfileServices/VehicleProfileService';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';
import PurchaseSubscriptionModal from '@/components/Models/PurchaseSubscriptionModal';
import { errorAlert, successAlert } from '@/utils/Toast';
import { downloadExcel } from '@/utils/Excel';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CommonPopUp from '@/components/Models/CommonPopUp';

interface VehicleProfileData {
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
    vehicleAge: string;
    loanBanker: string;
    loanAccNumber: string;
    emiAmt: string;
    emiDate: string;
    currLocation: string;
    ProfileStatus: string;
}

export const staticVehicleProfileData = [
    {
        id: '1',
        serviceProviderType: 'Owner',
        channelPartnerType: 'Techno agency',
        fleetManagementType: 'Ansar Agency',
        vehRegNumber: 'KL 41 K 2890',
        vehRTONumber: 'KERALA Aluva',
        vehChasisNumber: 'CHS789',
        vehCategory: 'Category XYZ',
        seatCapacity: '5',
        bootSpace: 'Large',
        loadCapacity: '1000 kg',
        bodyDimension: '4.5m x 2m x 1.8m',
        vehBrandName: 'Brand 1',
        vehType: 'SUV',
        vehBrandModel: 'Bajaj',
        vehColor: 'Red',
        vehFuelType: 'Petrol',
        fk_serviceCity: 'Kozhikode',
        vehicleRegistrationDate: '2023-05-20',
        vehicleManufacturingDate: '2023-04-15',
        vehicleAge: '1 year 8 months',
        loanBanker: 'Bank X',
        loanAccNumber: 'Loan789',
        emiAmt: '5000',
        emiDate: '25th',
        currLocation: 'Location ABC',
        ProfileStatus: 'No',
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
        serviceProviderType: 'Owner cum driver',
        channelPartnerType: 'Fingent Privite limit',
        fleetManagementType: 'Junaid Agency',
        vehRegNumber: 'KL 40 Q 1926',
        vehRTONumber: 'KERALA perumbavoor',
        vehChasisNumber: 'CHS123',
        vehCategory: 'Category ABC',
        seatCapacity: '4',
        bootSpace: 'Medium',
        loadCapacity: '800 kg',
        bodyDimension: '4m x 1.8m x 1.5m',
        vehBrandName: 'Brand 2',
        vehType: 'Sedan',
        vehBrandModel: 'Hero',
        vehColor: 'Blue',
        vehFuelType: 'Diesel',
        fk_serviceCity: 'Kochi',
        vehicleRegistrationDate: '2022-10-10',
        vehicleAge: '1 year 3 months',
        loanBanker: 'Bank Y',
        loanAccNumber: 'Loan456',
        emiAmt: '4000',
        emiDate: '20th',
        currLocation: 'Location XYZ',
        ProfileStatus: 'Yes',
    },
    {
        id: '3',
        serviceProviderType: 'Owner',
        channelPartnerType: 'Conitor pvt limited',
        fleetManagementType: 'Fayiz Agency',
        vehRegNumber: 'KA 09 K 2222',
        vehRTONumber: 'KARNATAKA JAYANAGAR',
        vehChasisNumber: 'CHS456',
        vehCategory: 'Category PQR',
        seatCapacity: '7',
        bootSpace: 'Small',
        loadCapacity: '1200 kg',
        bodyDimension: '5m x 2.2m x 1.9m',
        vehBrandName: 'Brand 3',
        vehType: 'Hatchback',
        vehBrandModel: 'Honda',
        vehColor: 'Black',
        vehFuelType: 'Electric',
        fk_serviceCity: 'Banglore',
        vehicleRegistrationDate: '2024-01-01',
        vehicleAge: '1 month',
        loanBanker: 'Bank Z',
        loanAccNumber: 'Loan123',
        emiAmt: '6000',
        emiDate: '15th',
        currLocation: 'Location PQR',
        ProfileStatus: 'No',
    },
];

const ViewVehicleProfile: React.FC<{ tabs: boolean; userManagementPage?: boolean }> = ({ tabs, userManagementPage = true }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [VehicleProfileData, setVehicleProfileData] = useState<VehicleProfileData[]>(staticVehicleProfileData);
    const [modal3, setmodal3] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<VehicleProfileData[]>([]);
    const [recordsData, setRecordsData] = useState<VehicleProfileData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<VehicleProfileData[]>([]);
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
        if (VehicleProfileData.length > 0) {
            const sortedData = VehicleProfileData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof VehicleProfileData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [VehicleProfileData, sortStatus, pageSize]);

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
                vehicleAge = '',
                loanBanker = '',
                loanAccNumber = '',
                emiAmt = '',
                emiDate = '',
                currLocation = '',
                ProfileStatus = '',
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
                // vehicleManufacturingDate?.toLocaleLowerCase().includes(searchString) ||
                vehicleAge?.toLowerCase().includes(searchString) ||
                loanBanker?.toLowerCase().includes(searchString) ||
                loanAccNumber?.toLowerCase().includes(searchString) ||
                emiAmt?.toLowerCase().includes(searchString) ||
                emiDate?.toLowerCase().includes(searchString) ||
                currLocation?.toLowerCase().includes(searchString) ||
                ProfileStatus?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<VehicleProfileData>[] = [
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
                                if (rowData?.id) {
                                    const editUrl = `/BusinessModule/VehicleProfile/EditVehicleProfile/${rowData.id}`;
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
                                if (rowData?.id) {
                                    const viewUrl = `/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/${rowData.id}`;
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
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'serviceProviderType', title: 'Driver Type', sortable: true, hidden: hiddenColumns.includes('serviceProviderType') },
        { accessor: 'channelPartnerType', title: 'Distributor', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'fleetManagementType', title: 'Travel Agency', sortable: true, hidden: hiddenColumns.includes('fleetManagementType') },
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
        // { accessor: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', sortable: true, hidden: hiddenColumns.includes('vehicleManufacturingDate') },
        { accessor: 'vehicleAge', title: 'Vehicle Age', sortable: true, hidden: hiddenColumns.includes('vehicleAge') },
        { accessor: 'loanBanker', title: 'Loan Banker', sortable: true, hidden: hiddenColumns.includes('loanBanker') },
        { accessor: 'loanAccNumber', title: 'Loan Acc Number', sortable: true, hidden: hiddenColumns.includes('loanAccNumber') },
        { accessor: 'emiAmt', title: 'EMI Amt', sortable: true, hidden: hiddenColumns.includes('emiAmt') },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true, hidden: hiddenColumns.includes('emiDate') },
        { accessor: 'currLocation', title: 'Curr Location', sortable: true, hidden: hiddenColumns.includes('currLocation') },
        { accessor: 'ProfileStatus', title: 'ProfileStatus', sortable: true, hidden: hiddenColumns.includes('ProfileStatus') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: VehicleProfileData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
        let updatedSelectedRecords: VehicleProfileData[] = [];
        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }
        setSelectedRecords(updatedSelectedRecords);
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    // purchase Subscription -------->>>
    const [modal1, setModal1] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState<any[]>([]);
    // handle subscription pop-up
    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setSubscriptionData(selectedServiceCity);
        if (userID === 'subscriptionAdded') {
            successAlert('Subscription Added Succesfully');
        } else {
            errorAlert('Subscription Not Added');
        }
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/VehicleProfile/EditVehicleProfile/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            const confirmDelete = window.confirm('Do you really want to delete this Vehicle Profile?');
        } else if (selectedOption === 'uploadDocument' && selectedRecords.length === 1) {
            const editUrl = `/BusinessModule/VehicleProfile/EditVehicleProfile/1${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateProfileStatus' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        } else if (selectedOption === 'removeVehicle' && selectedRecords.length === 1) {
            errorAlert('Vehicle Removed Succesfully');
        } else if (selectedOption === 'purchaseSubscription' && selectedRecords.length === 1) {
            setModal1(true);
        }
    };

    // add update ProfileStatus
    const handleAddUpdateProfileStatus = (selectedProfileStatus: any[], id: string) => {
        successAlert('ProfileStatus Updated Succesfully');
        // handle update ProfileStatus
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Vehicle ',
            to: '/BusinessModule/VehicleProfile/ViewVehicleProfile',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/BusinessModule/VehicleProfile/ViewVehicleProfile' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* {!tabs && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <Link to="/BusinessModule/VehicleProfile/CreateVehicleProfile" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                                Create Vehicle
                            </Link>
                        </div>
                    )} */}
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                    </div>
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <div className="dropdown">
                            {/* Dropdown content */}
                            <Dropdown
                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                btnClassName="w-full !flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                button={
                                    <>
                                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                        <div className="flex items-center ml-auto">
                                            <IconCaretDown className="w-5 h-5" />
                                        </div>
                                    </>
                                }
                            >
                                <ul className="!min-w-[300px] max-h-60 overflow-y-auto">
                                    {' '}
                                    {columns.map((col, index) => (
                                        <li
                                            key={index}
                                            className="flex flex-col"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <div className="flex items-center px-4 py-1">
                                                <label className="cursor-pointer mb-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={!hiddenColumns.includes(col.accessor)}
                                                        className="form-checkbox"
                                                        defaultValue={col.accessor}
                                                        onChange={() => toggleColumnVisibility(col.accessor)}
                                                    />
                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title || col.accessor}</span>
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {userManagementPage && (
                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                            <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                                <option value="">Action Dropdown</option>
                                <option value="edit">Edit</option>
                                <option value="uploadDocument">Upload Document</option>
                                {<option value="purchaseSubscription">Purchase Subscription</option>}
                                {tabs && <option value="removeVehicle">Remove Vehicle</option>}
                                <option value="updateProfileStatus">Update ProfileStatus</option>
                                <option value="export">Export</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={VehicleProfileData.length}
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
            <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateProfileStatus} />
            <PurchaseSubscriptionModal event={modal1} closeModal={() => setModal1(false)} onAddSubscription={handleAddServiceCitySubmit} />
        </>
    );
};

export default ViewVehicleProfile;
