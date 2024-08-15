// import React, { useState, ChangeEvent } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
// import ServiceCityModal from '@/components/Models/ServiceCityModal';

// interface ViewChannelPartnerAPIReportProps {
//     details: {
//         archiveName: string;
//         archive: string;
//     };
//     onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     showStatus?: boolean;
//     viewSpecific?: boolean;
//     create?: string;
// }

// const ViewChannelPartnerAPIReport = () => {
//     const [quileContent, setQuileContent] = useState('hello');
//     const handleRemarksChange = (content: string) => {
//         setQuileContent(content);
//     };

//     const location = useLocation();
//     const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

//     // Extract the pathname from the location object
//     const currentPath = location.pathname;

//     // Function to set the current page based on the path
//     const setCurrent = (path: string) => {
//         setCurrentPage(path);
//     };

//     const [modal6, setModal6] = useState(false);

//     const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
//     const [ServiceCityData, setServiceCityData] = useState<any>();

//     const handleAddServiceCitySubmit = (selectedServiceCity: any, userID: string) => {
//         setServiceCityData(selectedServiceCity);
//         setAddedServiceCityType(userID);
//         console.error('onInputChange is not defined.');
//     };

//     return (
//         <>
//             <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
//                 <li className="">
//                     <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
//                         Home
//                     </Link>
//                 </li>
//                 <li
//                     className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
//                         currentPath === '/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPIReport' ? 'text-blue-600' : ''
//                     }`}
//                 >
//                     Channel Partner API Report
//                 </li>
//             </ol>

//             <div className="panel mt-6">
//                 <h1 className="text-2xl p-2 font-bold">Channel Partner API Report</h1>
//                 <form>
//                     <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
//                         <div className="lg:w-1/3">
//                             <label htmlFor="bookingType" className="block mb-1">
//                                 Booking Type
//                             </label>
//                             <select id="bookingType" name="bookingType" className="form-select text-white-dark" required>
//                                 <option value="">Select</option>
//                                 <option value={'Online Booking'}>Online Booking</option>
//                                 <option value={'Schedule Booking'}>Schedule Booking</option>
//                                 <option value={'QR Code Booking'}>QR Code Booking</option>
//                             </select>
//                         </div>

//                         <div className="lg:w-1/3">
//                             <label htmlFor="serviceType" className="block mb-1">
//                                 Service Type
//                             </label>
//                             <select id="serviceType" name="serviceType" className="form-select text-white-dark" required>
//                                 <option value="">Select</option>
//                                 <option value={'Daily'}>Daily</option>
//                                 <option value={'Rental'}>Rental</option>
//                                 <option value={'Outstation'}>Outstation</option>
//                             </select>
//                         </div>

//                         {/* <div className="lg:w-1/3">
//                             <label htmlFor="serviceCity" className="block mb-1">
//                                 Service City
//                             </label>
//                             <select id="serviceCity" name="serviceCity" className="form-select text-white-dark" required>
//                                 <option value="">Select</option>
//                                 <option value="Bangalore">Bangalore</option>
//                                 <option value="Chennai">Chennai</option>
//                                 <option value="Madurai">Madurai</option>
//                             </select>
//                         </div> */}

//                         <div className={`w-1/3`}>
//                             <div className="flex items-center gap-2 cursor-pointer">
//                                 <label htmlFor="serviceCity" className="block mb-1 font-bold text-md">
//                                     Service City
//                                 </label>
//                                 {/* <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
//             <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
//         </Link> */}
//                             </div>
//                             {addedserviceCityType === 'serviceCityAdded' ? (
//                                 <button type="button" className="btn btn-success w-full">
//                                     Added
//                                 </button>
//                             ) : (
//                                 <div>
//                                     {addedserviceCityType === 'serviceCityAdded' ? (
//                                         <button type="button" onClick={() => setModal6(true)} className="btn btn-success w-full">
//                                             Added
//                                         </button>
//                                     ) : (
//                                         <button type="button" onClick={() => setModal6(true)} className="btn btn-primary w-full">
//                                             Add Service City
//                                         </button>
//                                     )}
//                                     <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
//                                 </div>
//                             )}
//                             <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
//                         <div className="lg:w-1/3">
//                             <label htmlFor="subscriptionType" className="block mb-1">
//                                 Subscription Type
//                             </label>
//                             <select id="subscriptionType" name="subscriptionType" className="form-select text-white-dark" required>
//                                 <option value="">Select</option>
//                                 <option value={'Flat'}>Flat</option>
//                                 <option value={'Percentage'}>Percentage</option>
//                             </select>
//                         </div>

//                         <div className="lg:w-1/3">
//                             <label htmlFor="taxPercentage" className="block mb-1">
//                                 Tax Percentage
//                             </label>
//                             <input name="taxPercentage" type="number" id="taxPercentage" placeholder="Enter Tax Percentage" className="form-input w-full" />
//                         </div>
//                         <div className="lg:w-1/3"></div>
//                     </div>

//                     <div className="flex justify-center mt-6">
//                         <button type="submit" className="btn btn-primary !mt-6 mr-4">
//                             Update
//                         </button>
//                         <button type="button" className="btn btn-danger !mt-6">
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default ViewChannelPartnerAPIReport;

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getAllPriority } from '@/services/UtilityServices/PriorityService';

import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import 'rsuite/dist/rsuite-no-reset.min.css';

interface PriorityData {
    id: string;
    channelPartnerId: string;
    userId: string;
    requestDateTime: string;
    bookingType: string;
    vehicleType: string;
    serviceType: string;
    serviceCity: string;
    pickupLocation: string;
    dropLocation: string;
    basedOn: string;
    leadTax: string;
    totalBookingCost: string;
    apiName: string;
    apiUrl: string;
    partnerId: string;
}

const staticPriorityData: PriorityData[] = [
    {
        id: '1',
        channelPartnerId: 'Bookmy show',
        userId: 'Shabuk',
        requestDateTime: '2024-05-20T10:00:00',
        bookingType: 'QR code',
        vehicleType: 'Sedan',
        serviceType: 'Rental',
        serviceCity: 'New York',
        pickupLocation: 'JFK Airport',
        dropLocation: 'Manhattan',
        basedOn: 'Distance',
        leadTax: '10%',
        totalBookingCost: '$100',
        apiName: 'BookingAPI',
        apiUrl: 'https://api.example.com/booking',
        partnerId: 'PART567',
    },
    {
        id: '2',
        channelPartnerId: 'BookCabLite',
        userId: 'Sabhush',
        requestDateTime: '2024-05-21T15:30:00',
        bookingType: 'Online',
        vehicleType: 'SUV',
        serviceType: 'Daily',
        serviceCity: 'Los Angeles',
        pickupLocation: 'Hotel A',
        dropLocation: 'Beach',
        basedOn: 'Hourly',
        leadTax: '15%',
        totalBookingCost: '$200',
        apiName: 'ReservationAPI',
        apiUrl: 'https://api.example.com/reservation',
        partnerId: 'PART890',
    },

    // Add more dummy data as needed
];

const ViewPriority = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPageTitle('View Status'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [PriorityData, setPriorityData] = useState<PriorityData[]>(staticPriorityData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<PriorityData[]>([]);
    const [recordsData, setRecordsData] = useState<PriorityData[]>([]);

    const [selectedRecords, setSelectedRecords] = useState<PriorityData[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // date vise sorting.
    //   useEffect(() => {
    //     const fetchAdminData = async () => {
    //       try {
    //         const { data } = await getAllPriority();
    //         if (data?.Archives) {
    //           const filteredData = data.Archives.filter((item: PriorityData) => {
    //             if (!selectedDateRange) return true;
    //             const createdAtTimestamp = new Date(item.createdAt).getTime();
    //             const startDate = selectedDateRange[0]?.getTime() || 0;
    //             const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
    //             return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
    //           });
    //           setPriorityData(filteredData);
    //         }
    //       } catch (error: any) {
    //         console.error('Error fetching admin data:', error.message);
    //       }
    //     };
    //     fetchAdminData();
    //   }, [selectedDateRange]);

    //   const handleDateChange = (date: Date | null) => {
    //     setPriorityData(date);
    //   };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     console.log('Fetching status data...');
    //     const fetchAdminStatesData = async () => {
    //         try {
    //             const { data } = await getAllPriority();
    //             if (data?.Archives) {
    //                 const newData = data.Archives.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setPriorityData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching status data:', error.message);
    //         }
    //     };
    //     fetchAdminStatesData();
    // }, [dispatch]);

    useEffect(() => {
        if (PriorityData.length > 0) {
            const sortedData = PriorityData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof PriorityData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [PriorityData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                channelPartnerId = '',
                userId = '',
                requestDateTime = '',
                bookingType = '',
                vehicleType = '',
                serviceType = '',
                serviceCity = '',
                pickupLocation = '',
                dropLocation = '',
                basedOn = '',
                leadTax = '',
                totalBookingCost = '',
                apiName = '',
                apiUrl = '',
                partnerId = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                channelPartnerId?.toLowerCase().includes(searchString) ||
                userId?.toLowerCase().includes(searchString) ||
                requestDateTime?.toLowerCase().includes(searchString) ||
                bookingType?.toLowerCase().includes(searchString) ||
                vehicleType?.toLowerCase().includes(searchString) ||
                serviceType?.toLowerCase().includes(searchString) ||
                serviceCity?.toLowerCase().includes(searchString) ||
                pickupLocation?.toLowerCase().includes(searchString) ||
                dropLocation?.toLowerCase().includes(searchString) ||
                basedOn?.toLowerCase().includes(searchString) ||
                leadTax?.toLowerCase().includes(searchString) ||
                totalBookingCost?.toLowerCase().includes(searchString) ||
                apiName?.toLowerCase().includes(searchString) ||
                apiUrl?.toLowerCase().includes(searchString) ||
                partnerId?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<PriorityData>[] = [
        // {
        //     accessor: 'actions',
        //     title: 'Actions',
        //     // eslint-disable-next-line react/display-name
        //     render: (rowData) => (
        //         <div className="flex items-center">
        //             <Tippy content="Edit">
        //                 <button
        //                     type="button"
        //                     className="mr-4"
        //                     onClick={() => {
        //                         if (rowData && rowData.id) {
        //                             const editUrl = `/UtilityModule/Priority/EditPriority/${rowData.id}`;
        //                             navigate(editUrl); // Navigate to the edit page URL
        //                         }
        //                     }}
        //                 >
        //                     <IconEdit />
        //                 </button>
        //             </Tippy>
        //             <Tippy content="View Specific">
        //                 <button
        //                     type="button"
        //                     onClick={() => {
        //                         if (rowData && rowData.id) {
        //                             const viewUrl = `/UtilityModule/Priority/ViewSpecificPriority/${rowData.id}`;
        //                             navigate(viewUrl);
        //                         }
        //                     }}
        //                 >
        //                     <IconEye />
        //                 </button>
        //             </Tippy>
        //         </div>
        //     ),
        // },
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'channelPartnerId', title: 'Channel Partner', sortable: true, hidden: hiddenColumns.includes('channelPartnerId') },
        { accessor: 'userId', title: 'Rider Name', sortable: true, hidden: hiddenColumns.includes('userId') },
        { accessor: 'requestDateTime', title: 'Request Date Time', sortable: true, hidden: hiddenColumns.includes('requestDateTime') },
        { accessor: 'bookingType', title: 'Booking Type', sortable: true, hidden: hiddenColumns.includes('bookingType') },
        { accessor: 'vehicleType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('vehicleType') },
        { accessor: 'serviceType', title: 'Service Type', sortable: true, hidden: hiddenColumns.includes('serviceType') },
        { accessor: 'serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('serviceCity') },
        { accessor: 'pickupLocation', title: 'Pickup Location', sortable: true, hidden: hiddenColumns.includes('pickupLocation') },
        { accessor: 'dropLocation', title: 'Drop Location', sortable: true, hidden: hiddenColumns.includes('dropLocation') },
        { accessor: 'basedOn', title: 'Based On', sortable: true, hidden: hiddenColumns.includes('basedOn') },
        { accessor: 'leadTax', title: 'Lead Tax', sortable: true, hidden: hiddenColumns.includes('leadTax') },
        { accessor: 'totalBookingCost', title: 'Total Booking Cost', sortable: true, hidden: hiddenColumns.includes('totalBookingCost') },
        { accessor: 'apiName', title: 'API Name', sortable: true, hidden: hiddenColumns.includes('apiName') },
        { accessor: 'apiUrl', title: 'API URL', sortable: true, hidden: hiddenColumns.includes('apiUrl') },
        { accessor: 'partnerId', title: 'Partner ID', sortable: true, hidden: hiddenColumns.includes('partnerId') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: PriorityData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: PriorityData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/adminModule/status/viewSpecificStatus/${row.id}`);
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/UtilityModule/Priority/EditPriority/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            // Add your delete logic here
            const deleteUrl = `/utilityModule/Priority/DeletePriority/${selectedRecords[0].id}`;
            // Perform the delete operation, navigate to delete URL, or show a confirmation modal
            console.log('Delete operation');
        }
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
            label: 'Priority',
            to: '/UtilityModule/Priority/ViewPriority',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/UtilityModule/Priority/ViewPriority' ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/UtilityModule/Priority/CreatePriority" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Priority
                        </Link>
                    </div> */}

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

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="export">Export</option>
                        </select>
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={PriorityData.length}
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
                        //onRowClick={(row) => handleRowClick(row)}
                    />
                </div>
            </div>
        </>
    );
};

export default ViewPriority;
