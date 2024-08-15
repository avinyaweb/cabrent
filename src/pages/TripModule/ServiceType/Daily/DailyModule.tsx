import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticServiceCityData } from '@/components/Models/ServiceCityModal';
import { DataTableColumn } from 'mantine-datatable';
import React, { useState, ChangeEvent } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

interface DailyModuleProps {
    details: {
        packageName: string;
        packageDistunce: string;
        packageDuration: string;
        fk_serviceCity: string;
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    isEditPage: boolean;
}

const DailyModule: React.FC<DailyModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    // service city pop-up
    const [modal2, setmodal2] = useState(false);
    const [fk_serviceCityData, setfk_serviceCityData] = useState<any[]>([]);
    const [fk_serviceCityType, setfk_serviceCityType] = useState<any>();
    // popup service city
    const handleAddfk_serviceCitySubmit = (selectedfk_serviceCity: any[], id: string) => {
        setfk_serviceCityData(selectedfk_serviceCity);
        setfk_serviceCityType(id);
    };

    const fk_serviceCityColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'country', title: 'country' },
        { accessor: 'state', title: 'state' },
        { accessor: 'city', title: 'city' },
        { accessor: 'dailyReqRadius', title: 'Daily Req Radius' },
        { accessor: 'DailyReqRadius', title: 'Daily Req Radius' },
        { accessor: 'outstationReqRadius', title: 'Outstation Req Radius' },
        { accessor: 'cityCentreLat', title: 'City Centre Lat' },
        { accessor: 'cityCentreLong', title: 'City Centre Long' },
        { accessor: 'cityBoundary', title: 'City Boundary' },
        { accessor: 'archive', title: 'Archive' },
    ];

    const renderEditPage = () => {
        if (fk_serviceCityType === 'service city') {
            return (
                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
                    Added
                </button>
            );
        } else {
            return (
                <div className="flex">
                    <input name="fk_serviceCity" type="text" id="fk_serviceCity" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_serviceCity} readOnly />
                    <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-1/3">
                        Edit
                    </button>
                </div>
            );
        }
    };

    const renderNonEditPage = () => {
        if (fk_serviceCityType === 'service city') {
            return (
                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
                    Added
                </button>
            );
        } else {
            return (
                <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-full">
                    Add Service City
                </button>
            );
        }
    };

    return (
        <div className="grid grid-cols-1 sm:flex justify-between gap-5">
            <div className="lg:w-1/3">
                <label htmlFor="packageName" className="block mb-1">
                    Package Name
                </label>
                <input
                    name="packageName"
                    type="text"
                    id="packageName"
                    placeholder="Enter Package Name"
                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                    readOnly={viewSpecific}
                    value={details?.packageName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="lg:w-1/3">
                <label htmlFor="packageDistunce" className="block mb-1">
                    Package Distunce
                </label>
                <input
                    name="packageDistunce"
                    type="text"
                    id="packageDistunce"
                    placeholder="Enter Package Distunce"
                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                    readOnly={viewSpecific}
                    value={details?.packageDistunce}
                    onChange={handleInputChange}
                />
            </div>

            <div className="lg:w-1/3">
                <label htmlFor="packageDuration" className="block mb-1">
                    Package Duration
                </label>
                <input
                    name="packageDuration"
                    type="text"
                    id="packageDuration"
                    placeholder="Enter Package Duration"
                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                    readOnly={viewSpecific}
                    // value={details?.packageDuration}
                    value={`${viewSpecific ? `123456798` : ``}`}
                    onChange={handleInputChange}
                />
            </div>

            <div className={`lg:w-1/3`}>
                <div className="flex items-center gap-2 cursor-pointer">
                    <label htmlFor="fk_serviceCity" className="block mb-1">
                        Service City
                    </label>
                    {viewSpecific && (
                        <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
                            <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" />
                        </Link>
                    )}
                </div>
                {viewSpecific ? (
                    <input name="fk_serviceCity" type="text" id="fk_serviceCity" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_serviceCity} readOnly />
                ) : isEditPage ? (
                    renderEditPage()
                ) : (
                    renderNonEditPage()
                )}
            </div>

            <CommonPopUp
                title={'Service City'}
                columns={fk_serviceCityColumns}
                data={staticServiceCityData}
                event={modal2}
                closeModal={() => setmodal2(false)}
                onSubmit={handleAddfk_serviceCitySubmit}
            />
        </div>
    );
};

export default DailyModule;
