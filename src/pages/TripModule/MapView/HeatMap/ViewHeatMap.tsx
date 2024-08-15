import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';
import 'react-quill/dist/quill.snow.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import GoogleMapComponent from '@/components/GoogleMap/GoogleMapComponent';
import ReportManagerModal from '@/components/Models/ReportManagerModal';

interface ViewHeatMapProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewHeatMap = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    const [date1, setDate1] = useState<any>(formattedToday);
    const [date2, setDate2] = useState<any>(formattedToday);

    const [modal5, setModal5] = useState(false);

    const [addedDistributorType, setAddedDistributorType] = useState<any>();
    const [reportManagerData, setReportManagerData] = useState<any[]>([]);

    const [quileContent, setQuileContent] = useState('hello');

    const handleRemarksChange = (content: string) => {
        setQuileContent(content);
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const handleAddReportManagerData = (selectedReportManager: any[], userID: string) => {
        setReportManagerData(selectedReportManager);
        setAddedDistributorType(userID);
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
                        currentPath === '/MapViewModule/HeatMap/ViewHeatMap' ? 'text-blue-600' : ''
                    }`}
                >
                    Heat Map
                </li>
            </ol>

            <div className="panel mt-6 ">
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="from" className="block mb-1">
                                From
                            </label>
                            <Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="to" className="block mb-1">
                                To
                            </label>
                            <Flatpickr value={date2} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate2(date)} />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                Service Available City
                            </label>
                            <select id="archive" name="archive" className="form-select text-white-dark" required>
                                <option value={'PENDING'}>Karnataka</option>
                                <option value={'APPROVED'}>Banglore</option>
                                <option value={'APPROVED'}>Jp Nagar</option>
                                <option value={'REJECTED'}>Gurugram</option>
                            </select>
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="ProfileStatus" className="block mb-1">
                                Profile Status
                            </label>
                            <select id="ProfileStatus" name="ProfileStatus" className="form-select text-white-dark" required>
                                <option value={'PENDING'}>PENDING</option>
                                <option value={'APPROVED'}>APPROVED</option>
                                <option value={'HOLD'}>HOLD</option>
                                <option value={'REJECTED'}>REJECTED</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className={`w-1/3`}>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <label htmlFor="fk_reportsTo" className="block mb-1 font-bold text-md">
                                    Distributor
                                </label>
                            </div>
                            <div>
                                {addedDistributorType === 'distributorAdded' ? (
                                    <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                        Added
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => setModal5(true)} className="btn btn-primary w-full">
                                        Add Distributor
                                    </button>
                                )}
                                <ReportManagerModal event={modal5} closeModal={() => setModal5(false)} onAddReportManager={handleAddReportManagerData} />
                            </div>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="vehicletype" className="block mb-1">
                                Vehicle Type
                            </label>
                            <select id="vehicletype" name="vehicletype" className="form-select text-white-dark" required>
                                <option value={'PENDING'}>Mini</option>
                                <option value={'Sedan'}>Sedan</option>
                                <option value={'maxi'}>Maxi cab</option>
                                <option value={'Toyota'}>Toyota</option>
                                <option value={'Honda'}>Honda</option>
                                <option value={'SUV'}>SUV</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="Bookingtype" className="block mb-1">
                                Booking Type
                            </label>
                            <select id="Bookingtype" name="Bookingtype" className="form-select text-white-dark" required>
                                <option value="SelfBooking">SelfBooking</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Scheduled">QR</option>
                            </select>
                        </div>
                    </div>

                    <div className="lg:w-1/4 flex justify-center items-center">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div className="panel mt-6 overflow-hidden">
                <GoogleMapComponent />
            </div>
        </>
    );
};

export default ViewHeatMap;
