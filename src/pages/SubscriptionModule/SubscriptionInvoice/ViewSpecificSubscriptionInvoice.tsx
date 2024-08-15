import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconPrinter from '../../../components/Icon/IconPrinter';
import IconDownload from '../../../components/Icon/IconDownload';
import IconEdit from '../../../components/Icon/IconEdit';
import { staticSubscriptionInvoiceData } from './ViewSubscriptionInvoice';
import logo from '@/assets/images/logo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Tab } from '@headlessui/react';
import 'tippy.js/dist/tippy.css';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import './invoice.css';
import { MdHistory } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';

interface FormValues {
    id: string;
    subHistoryId: string;
    amount: string;
    paymentStatus: string;
    archive: string;
    cgst: string;
    sgst: string;
    processingFee: string;
    planAmount: string;
    fk_serviceCity: string;
    status: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    planDuration: string;
    planDescription: string;
    planDistance: string;
    city: string;
    planLiveStartTime: string;
    planLiveEndTime: string;
    subscriptionAmtDistribution: string;
    purchasedBy: string;
    planId: string;
    purchasedByRolesId: string | number;
    driverId: string | number;
    vehicleId: string | number;
    planStatus: string;
    subscriptionStartDate: string; // Or Date if using a date type
    subscriptionEndDate: string; // Or Date if using a date type
    couponHistoryId: string | number;
    walletHistoryId: string;
    transactionHistoryId: string;
    paymentType: string;

    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string;
    }[];
    invoice: string;
    bookingId: string;
}

interface ViewSpecificInvoice {
    viewSpecific: boolean;
}

const ViewSpecificSubscriptionInvoice: React.FC<ViewSpecificInvoice> = ({ viewSpecific }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { subscriptionInvoiceId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        subHistoryId: '',
        amount: '',
        paymentStatus: '',
        fk_serviceCity: '',
        archive: '',
        cgst: '',
        sgst: '',
        processingFee: '',
        planAmount: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        planDuration: '',
        planDescription: '',
        planDistance: '',
        city: '',
        planLiveStartTime: '',
        planLiveEndTime: '',
        subscriptionAmtDistribution: '',
        planStatus: '',
        subscriptionStartDate: '',
        subscriptionEndDate: '',
        couponHistoryId: '',
        purchasedByRolesId: '',
        driverId: '',
        vehicleId: '',
        purchasedBy: '',
        planId: '',
        walletHistoryId: '',
        transactionHistoryId: '',
        status: '',
        paymentType: '',
        invoice: '',
        bookingId: '',
        updatedHistory: [],
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    useEffect(() => {
        const specificData = staticSubscriptionInvoiceData.find((data) => data.id === subscriptionInvoiceId);

        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [subscriptionInvoiceId]);

    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });

    // print invoice
    const exportTable = () => {
        window.print();
    };

    // download invoice
    const downloadPDF = () => {
        const pdf = new jsPDF();
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);

        // Add content to PDF
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Logo
        const imgData = logo;
        pdf.addImage(imgData, 'PNG', pageWidth - 50, 10, 30, 30);

        // Title
        pdf.setFontSize(18);
        pdf.text('Invoice', 20, 20);

        // Address
        pdf.setFontSize(8);
        pdf.text('Jp Nagar, Bangalore, Karnataka, India', 20, 30);
        pdf.text('CARRENT@gmail.com', 20, 35);
        pdf.text('+91 1234567890', 20, 40);

        pdf.line(20, 50, pageWidth - 20, 50);

        pdf.setFontSize(8);
        pdf.text(`Invoice : ${formData.invoice}`, 20, 65);
        pdf.text(`Issue Date : ${formData.createdAt}`, 20, 70);
        pdf.text(`Booking ID : ${formData.bookingId}`, 20, 75);
        pdf.text(`Vehicle Id : ${formData.vehicleId}`, 20, 80);
        pdf.text(`Driver ID : ${formData.driverId}`, 20, 85);

        pdf.setFontSize(8);
        pdf.text(`Issue For:`, pageWidth - 50, 65);
        pdf.text(`${formData.createdBy}`, pageWidth - 50, 70);
        pdf.text(`Jp Nagar, Bangalore`, pageWidth - 50, 75);
        pdf.text(`CARRENT@gmail.com`, pageWidth - 50, 80);
        pdf.text(`+91 1234567890`, pageWidth - 50, 85);

        const tableData = [[formData.fk_serviceCity, formData.status, formData.city, formData.amount]];

        const tableColumns = [
            { title: 'From Location', dataKey: 'fromLocation' },
            { title: 'status', dataKey: 'tripStatus' },
            { title: 'City', dataKey: 'ServiceCity' },
            { title: 'Amount', dataKey: 'amount' },
        ];

        pdf.autoTable({
            head: [tableColumns.map((column) => column.title)],
            body: tableData,
            startY: 100,
            styles: {
                fillColor: [222, 220, 220],
                textColor: [0, 0, 0],
            },
        });

        const startY = 125;
        const lineHeight = 2;
        pdf.setFontSize(10);
        pdf.text(`Subtotal`, pageWidth - 80, startY);
        pdf.text(`$${formData.amount}`, pageWidth - 45, startY);
        pdf.text(`Tax`, pageWidth - 80, startY + lineHeight * 3);
        pdf.text(`$10`, pageWidth - 45, startY + lineHeight * 3);
        pdf.text(`Shipping Rate`, pageWidth - 80, startY + lineHeight * 6);
        pdf.text(`$0`, pageWidth - 45, startY + lineHeight * 6);
        pdf.text(`Discount`, pageWidth - 80, startY + lineHeight * 9);
        pdf.text(`$10`, pageWidth - 45, startY + lineHeight * 9);
        pdf.setFontSize(12);
        pdf.text(`Grand Total`, pageWidth - 80, startY + lineHeight * 12);
        pdf.text(`$${formData.amount}`, pageWidth - 45, startY + lineHeight * 12);

        pdf.save('invoice.pdf');
    };

    const columns = [
        {
            key: 'createdAt',
            label: 'Created At',
            class: 'font-bold text-lg',
        },
        {
            key: 'createdBy',
            label: 'Created By',
            class: 'font-bold text-lg',
        },
        {
            key: 'paymentStatus',
            label: 'Payment Status',
            class: 'font-bold text-lg',
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            class: 'ltr:text-right rtl:text-left font-bold text-lg',
        },
    ];

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const totalTabs = 4;

    const handleNext = () => {
        const nextIndex = Math.min(currentTabIndex + 1, totalTabs - 1);
        setCurrentTabIndex(nextIndex);
    };

    const handlePrevious = () => {
        const previousIndex = Math.max(currentTabIndex - 1, 0);
        setCurrentTabIndex(previousIndex);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/viewOutstationsTnc/viewOutstationsTnc' ? 'text-blue-600' : ''
                    }`}
                >
                    <Link to={'/SubscriptionModule/SubscriptionInvoice/ViewSubscriptionInvoice'}>Subscription Invoice</Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '' ? 'text-blue-600' : ''
                    }`}
                >
                    Invoice Preview
                </li>
            </ol>

            <div className="panel mt-6 mb-4">
                <Tab.Group selectedIndex={currentTabIndex} onChange={setCurrentTabIndex}>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <LiaFileInvoiceSolid className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Invoice</span>
                                </button>
                            )}
                        </Tab>
                        {/* <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <RiMoneyDollarCircleLine className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Subscription Details</span>
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <MdHistory className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold"> Subscription History</span>
                                </button>
                            )}
                        </Tab>

                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <MdHistory className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit log</span>
                                </button>
                            )}
                        </Tab> */}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                                    <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                                        <IconPrinter />
                                        Print
                                    </button>
                                    <button type="button" className="btn btn-primary gap-2" onClick={downloadPDF}>
                                        <IconDownload />
                                        Download
                                    </button>
                                </div>
                                <div id="invoice-preview" className="panel">
                                    <div className="flex justify-between flex-wrap gap-4 px-4">
                                        <div className="text-2xl font-semibold uppercase">Invoice</div>
                                        <div className="shrink-0">
                                            <img src={logo} alt="img" className="w-24 ltr:ml-auto rtl:mr-auto" />
                                        </div>
                                    </div>
                                    <div className="ltr:text-right rtl:text-left px-4">
                                        <div className="space-y-1 mt-6 text-white-dark">
                                            <div>Jp Nagar, Bangalore, Karnataka, India</div>
                                            <div>CARRENT@gmail.com</div>
                                            <div>+91 1234567890</div>
                                        </div>
                                    </div>

                                    <div>
                                        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />

                                        <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap ">
                                            <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                                                <div className="xl:1/2 lg:w-2/5 sm:w-1/2">
                                                    {/* Amount */}
                                                    <div className="flex items-center w-full justify-between mb-2">
                                                        <div className="text-white-dark">Amount:</div>
                                                        <div>{formData?.amount}</div>
                                                    </div>
                                                    {/* ServiceCity */}
                                                    <div className="flex items-center w-full justify-between mb-2">
                                                        <div className="text-white-dark">Service City:</div>
                                                        <div>{formData?.fk_serviceCity}</div>
                                                    </div>
                                                    {/* Payment Status */}
                                                    <div className="flex items-center w-full justify-between mb-2">
                                                        <div className="text-white-dark">Payment Status:</div>
                                                        <div>{formData?.paymentStatus}</div>
                                                    </div>
                                                    {/* Approved At */}
                                                    <div className="flex items-center w-full justify-between">
                                                        <div className="text-white-dark">Approved At:</div>
                                                        <div>{formData?.approvedAt}</div>
                                                    </div>
                                                    {/* Created By */}
                                                    <div className="flex items-center w-full justify-between">
                                                        <div className="text-white-dark">Created By:</div>
                                                        <div>{formData?.createdBy}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1 print:hidden">
                                                <div className="xl:1/2 lg:w-2/5 sm:w-1/2">
                                                    {/* CGST */}
                                                    <div className="flex items-center w-full justify-between mb-2">
                                                        <div className="text-white-dark">CGST:</div>
                                                        <div>23</div>
                                                    </div>
                                                    {/* SGST */}
                                                    <div className="flex items-center w-full justify-between mb-2">
                                                        <div className="text-white-dark">SGST:</div>
                                                        <div>40</div>
                                                    </div>
                                                    {/* Processing Fee */}
                                                    <div className="flex items-center w-full justify-between">
                                                        <div className="text-white-dark">Processing Fee:</div>
                                                        <div>10</div>
                                                    </div>
                                                    {/* Plan Amount */}
                                                    <div className="flex items-center w-full justify-between">
                                                        <div className="text-white-dark">Plan Amount:</div>
                                                        <div>15</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                {/* Issue For */}
                                                <div className="space-y-1 text-white-dark ">
                                                    <div>Issue For:</div>
                                                    <div className="text-black dark:text-white font-semibold">{formData?.createdBy}</div>
                                                    <div>Bangalore, India</div>
                                                    <div>sample@gmail.com</div>
                                                    <div>+91 1234567890</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive mt-6">
                                        <table className="table-striped">
                                            <thead>
                                                <tr>
                                                    {columns.map((column) => {
                                                        return (
                                                            <th key={column.key} className={column?.class}>
                                                                {column.label}
                                                            </th>
                                                        );
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={formData?.id}>
                                                    <td>{formData?.createdAt}</td>
                                                    <td className="text-lime-600">{formData?.createdBy}</td>
                                                    <td>{formData?.paymentStatus}</td>
                                                    <td className="ltr:text-right rtl:text-left">₹{formData?.amount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                                        <div></div>
                                        <div className="ltr:text-right rtl:text-left space-y-2">
                                            <div className="flex items-center">
                                                <div className="flex-1">Subtotal</div>
                                                <div className="w-[37%]">₹{formData?.amount}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-1">Tax</div>
                                                <div className="w-[37%]">₹10</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-1">Shipping Rate</div>
                                                <div className="w-[37%]">₹0</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-1">Discount</div>
                                                <div className="w-[37%]">₹10</div>
                                            </div>
                                            <div className="flex items-center font-semibold text-lg">
                                                <div className="flex-1">Grand Total</div>
                                                <div className="w-[37%]">₹{formData?.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        {/* <Tab.Panel>
                            <div className="mt-5">
                                <div>
                                    <div className="flex items-center justify-end gap-4 relative  ">
                                        <div className="flex items-center  gap-5">
                                            <div
                                                className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                                onClick={() => {
                                                    const viewUrl = `/SubscriptionModule/SubscriptionAmtDistribution/ViewSpecificSubscriptionAmtDistribution/1`;
                                                    navigate(viewUrl);
                                                }}
                                            >
                                                <h3>View More</h3>
                                                <FaArrowUpRightFromSquare />
                                            </div>

                                            <div
                                                className="cursor-pointer  text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                                onClick={() => {
                                                    const viewUrl = `/SubscriptionModule/Subscription/EditSubscription/1`;
                                                    navigate(viewUrl);
                                                }}
                                            >
                                                <h3>Edit</h3>
                                                <IconEdit />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="planName" className="block mb-1">
                                                Plan Name
                                            </label>
                                            {viewSpecific && (
                                                <input
                                                    name="planName"
                                                    type="text"
                                                    id="planName"
                                                    placeholder="Enter Vehicle Registration Number"
                                                    className="form-input w-full pointer-events-none"
                                                    value={'Basic Plan'}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="purchasedBy" className="block mb-1">
                                                plan Details
                                            </label>
                                            {viewSpecific && (
                                                <input
                                                    name="planDetails"
                                                    type="text"
                                                    id="planDetails"
                                                    placeholder="Enter Plan details"
                                                    className="form-input w-full pointer-events-none"
                                                    value={'Includes standard features'}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="planDuration" className="block mb-1">
                                                plan Duration
                                            </label>
                                            {viewSpecific && (
                                                <input
                                                    name="planDuration"
                                                    type="text"
                                                    id="planDuration"
                                                    placeholder="Enter Vehicle Chassis Number"
                                                    className="form-input w-full pointer-events-none"
                                                    value={'30 days'}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <div>
                                                <label htmlFor="planAmount" className="block mb-1">
                                                    plan Amount
                                                </label>
                                                {viewSpecific && <input id="planAmount" className="form-input text-white-dark w-full pointer-events-none" value={'$50'} readOnly />}
                                            </div>
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                           
                                            <label htmlFor="planDescription" className="block mb-1">
                                                plan Description
                                            </label>
                                            {viewSpecific && (
                                                <input name="planDescription" type="text" id="planDescription" className="form-input w-full pointer-events-none" value={'5 passengers'} readOnly />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                          
                                            <div>
                                                <label htmlFor="startDate" className="block mb-1">
                                                    plan Distance
                                                </label>
                                                {viewSpecific && (
                                                    <input name="planDistance" type="text" id="planDistance" className="form-input w-full pointer-events-none" value={' 33.9 cubic feet'} readOnly />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="planDistance" className="block mb-1">
                                                City
                                            </label>
                                            {viewSpecific && <input name="planDistance" type="text" id="planDistance" className="form-input w-full pointer-events-none" value={'BMW'} readOnly />}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="endDate" className="block mb-1">
                                                planLive Start Time
                                            </label>
                                            {viewSpecific && (
                                                <input name="planLiveStartTime" type="text" id="planLiveStartTime" className="form-input w-full pointer-events-none" value={'SUV'} readOnly />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="planLiveEndTime" className="block mb-1">
                                                planLive End Time
                                            </label>
                                            {viewSpecific && (
                                                <input name="planLiveEndTime" type="text" id="planLiveEndTime" className="form-input w-full pointer-events-none" value={'BMW X5'} readOnly />
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                                            <label htmlFor="subscriptionAmtDistribution" className="block mb-1">
                                                Subscription Amt Distribution
                                            </label>
                                            {viewSpecific && (
                                                <input
                                                    name="subscriptionAmtDistribution"
                                                    type="text"
                                                    id="subscriptionAmtDistribution"
                                                    className="form-input w-full pointer-events-none"
                                                    value={'50% Initial, 50% Monthly'}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                                            <label htmlFor="planDuration" className="block mb-1">
                                                Plan Duration
                                            </label>
                                            {viewSpecific && <input name="planDuration" type="text" id="planDuration" className="form-input w-full pointer-events-none" value={'1 year'} readOnly />}
                                        </div>
                                       
                                        <div className="lg:w-1/3 flex justify-center items-center" />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div>
                                    <div className="flex items-center justify-end gap-4 relative">
                                        <div className="flex items-center gap-5">
                                            <div
                                                className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                                onClick={() => {
                                                    const viewUrl = `/SubscriptionModule/SubscriptionAmtDistribution/ViewSpecificSubscriptionAmtDistribution/1`;
                                                    navigate(viewUrl);
                                                }}
                                            >
                                                <h3>View More</h3>
                                                <FaArrowUpRightFromSquare />
                                            </div>

                                            <div
                                                className="cursor-pointer  text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                                                onClick={() => {
                                                    const viewUrl = `/SubscriptionModule/Subscription/EditSubscription/1`;
                                                    navigate(viewUrl);
                                                }}
                                            >
                                                <h3>Edit</h3>
                                                <IconEdit />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="planId" className="block mb-1">
                                                Plan Id
                                            </label>
                                            {viewSpecific && (
                                                <input name="planId" type="text" id="planId" placeholder="Plan details" className="form-input w-full pointer-events-none" value={'P001'} readOnly />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="purchasedBy" className="block mb-1">
                                                purchased By
                                            </label>
                                            {viewSpecific && (
                                                <input
                                                    name="purchasedBy"
                                                    type="text"
                                                    id="purchasedBy"
                                                    placeholder="Plan purchasedBy"
                                                    className="form-input w-full pointer-events-none"
                                                    value={'John Doe'}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="purchasedByRolesId" className="block mb-1">
                                                purchasedBy RolesId
                                            </label>
                                            {viewSpecific && (
                                                <input
                                                    name="purchasedByRolesId"
                                                    type="text"
                                                    id="purchasedByRolesId"
                                                    placeholder="Enter Vehicle Chassis Number"
                                                    className="form-input w-full pointer-events-none"
                                                    value={'R001'}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <div>
                                                <label htmlFor="driverId" className="block mb-1">
                                                    driverId
                                                </label>
                                                {viewSpecific && <input id="driverId" className="form-input text-white-dark w-full pointer-events-none" value={'$50'} readOnly />}
                                            </div>
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                       
                                            <label htmlFor="vehicleId" className="block mb-1">
                                                vehicleId
                                            </label>
                                            {viewSpecific && <input name="vehicleId" type="text" id="vehicleId" className="form-input w-full pointer-events-none" value={'5 passengers'} readOnly />}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            
                                            <div>
                                                <label htmlFor="planStatus" className="block mb-1">
                                                    plan Status
                                                </label>
                                                {viewSpecific && (
                                                    <input name="planStatus" type="text" id="planStatus" className="form-input w-full pointer-events-none" value={' 33.9 cubic feet'} readOnly />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="startDate" className="block mb-1">
                                                Subscription start Date
                                            </label>
                                            {viewSpecific && <input name="startDate" type="text" id="startDate" className="form-input w-full pointer-events-none" value={'BMW'} readOnly />}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="endDate" className="block mb-1">
                                                Subscription end Date
                                            </label>
                                            {viewSpecific && <input name="endDate" type="text" id="endDate" className="form-input w-full pointer-events-none" value={'SUV'} readOnly />}
                                        </div>
                                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                                            <label htmlFor="couponHistoryId" className="block mb-1">
                                                couponHistoryId
                                            </label>
                                            {viewSpecific && (
                                                <input name="couponHistoryId" type="text" id="couponHistoryId" className="form-input w-full pointer-events-none" value={'BMW X5'} readOnly />
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                                            <label htmlFor="walletHistoryId" className="block mb-1">
                                                Wallet History ID
                                            </label>
                                            {viewSpecific && (
                                                <input name="walletHistoryId" type="text" id="walletHistoryId" className="form-input w-full pointer-events-none" value={'Wallet123'} readOnly />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                                            <label htmlFor="transactionHistoryId" className="block mb-1">
                                                Transaction History ID
                                            </label>
                                            {viewSpecific && (
                                                <input
                                                    name="transactionHistoryId"
                                                    type="text"
                                                    id="transactionHistoryId"
                                                    className="form-input w-full pointer-events-none"
                                                    value={'Transaction456'}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                        <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                                            <label htmlFor="paymentType" className="block mb-1">
                                                Payment Type
                                            </label>
                                            {viewSpecific && <input name="paymentType" type="text" id="paymentType" className="form-input w-full pointer-events-none" value={'Wallet'} readOnly />}
                                        </div>
                                    </div>

                                    <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                                        <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                                            <label htmlFor="transactionStatus" className="block mb-1">
                                                Transaction Status
                                            </label>
                                            {viewSpecific && (
                                                <input name="transactionStatus" type="text" id="transactionStatus" className="form-input w-full pointer-events-none" value={'Success'} readOnly />
                                            )}
                                        </div>
                                        <div className="lg:w-1/3 flex justify-center items-center" />
                                        <div className="lg:w-1/3 flex justify-center items-center" />
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="mt-5">
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark">
                                    <h2>Audit logs</h2>
                                </div>
                                <AuditLogsTable />
                            </div>
                        </Tab.Panel> */}
                    </Tab.Panels>
                </Tab.Group>
                <div className="flex justify-end mt-4">
                    <div className="flex gap-6 mt-4">
                        <button className="btn btn-primary" onClick={handlePrevious} disabled={currentTabIndex === 0}>
                            Previous
                        </button>
                        <button className="btn btn-primary" onClick={handleNext} disabled={currentTabIndex === totalTabs - 1}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewSpecificSubscriptionInvoice;
