import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconPrinter from '../../../components/Icon/IconPrinter';
import IconDownload from '../../../components/Icon/IconDownload';
import { staticTripsInvoiceData } from './ViewTripsInvoice';
import logo from '@/assets/images/logo.png';
import jsPDF from 'jspdf'; // Import jsPDF library
import 'jspdf-autotable';
import '../../../assets/css/invoice.css';

interface FormValues {
    id: string;
    bookingId: string;
    driverId: string;
    vehicleId: string;
    fromLocation: string;
    tripStatus: string;
    ServiceCity: string;
    amount: string;
    invoice: string;
    archive: string;
    approvedAt: string;
    approvedBy: string;
    createdAt: string;
    createdBy: string;
    updatedHistory: {
        updatedTime: string;
        _id: string;
        updatedByObjectId?: string; // Optional field
    }[];
}

const ViewSpecificTripsInvoice = () => {
    const dispatch = useDispatch();
    // future code --->>>
    // const navigate = useNavigate();
    const location = useLocation();

    const { tripsInvoiceId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        bookingId: '',
        driverId: '',
        vehicleId: '',
        fromLocation: '',
        tripStatus: '',
        ServiceCity: '',
        amount: '',
        invoice: '',
        archive: '',
        approvedAt: '',
        approvedBy: '',
        createdAt: '',
        createdBy: '',
        updatedHistory: [], // Initialize as an empty array
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    useEffect(() => {
        const specificData: any = staticTripsInvoiceData.find((data) => data.id === tripsInvoiceId);

        if (specificData) {
            setFormData(specificData);
        }
    }, [tripsInvoiceId]);

    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });

    // print invoice
    const exportTable = () => {
        window.print();
    };

    // download invoice as PDF
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

        const tableData = [[formData.fromLocation, formData.tripStatus, formData.ServiceCity, formData.amount]];

        const tableColumns = [
            { title: 'From Location', dataKey: 'fromLocation' },
            { title: 'Status', dataKey: 'tripStatus' },
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
            key: 'fromLocation',
            label: 'From Location',
            class: 'font-bold text-lg',
        },
        {
            key: 'tripStatus',
            label: 'Trip Status',
            class: 'font-bold text-lg',
        },
        {
            key: 'ServiceCity',
            label: 'City',
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
                    <Link to={''}>Trips</Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '' ? 'text-blue-600' : ''
                    }`}
                >
                    Invoice Preview
                </li>
            </ol>

            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>

                <button type="button" className="btn btn-primary gap-2" onClick={downloadPDF}>
                    <IconDownload />
                    Download
                </button>

                {/* <Link to={`/tripModule/tripsInvoice/editTripsInvoice/${tripsInvoiceId}`} className="btn btn-primary gap-2">
                    <IconEdit />
                    Edit
                </Link> */}
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

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap ">
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/2 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Invoice :</div>
                                <div>{formData?.invoice}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Issue Date :</div>
                                <div>{formData?.createdAt}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Booking ID :</div>
                                <div>{formData?.bookingId}</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">Vehicle Id :</div>
                                <div>{formData?.vehicleId}</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">Driver ID :</div>
                                <div>{formData?.driverId}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark ">
                            <div>Issue For:</div>
                            <div className="text-black dark:text-white font-semibold">{formData?.createdBy}</div>
                            <div>Bangalore, India</div>
                            <div>sample@gmail.com</div>
                            <div>+91 1234567890</div>
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
                                <td>{formData?.fromLocation}</td>
                                <td className="text-lime-600">{formData?.tripStatus}</td>
                                <td>{formData?.ServiceCity}</td>
                                <td className="ltr:text-right rtl:text-left">${formData?.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">${formData?.amount}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Tax</div>
                            <div className="w-[37%]">$10</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Shipping Rate</div>
                            <div className="w-[37%]">$0</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            <div className="w-[37%]">$10</div>
                        </div>
                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">${formData?.amount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewSpecificTripsInvoice;
