import React, { useState, ChangeEvent, useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import ServiceCityModule from './ServiceCityModule';
import { staticServiceCityData } from './ViewServiceCity';
import { FaArrowRightToCity } from 'react-icons/fa6';
import { Tab } from '@headlessui/react';
import { AiOutlineAudit } from 'react-icons/ai';
import AuditLogsTable from '@/components/CommonTables/AuditLogsTable';
import UpdatedHistoryTable from '@/components/CommonTables/UpdatedHistoryTable';
import VerificationHistory from '@/components/CommonTables/VerificationHistory';
import GoogleMapComponent from '@/components/GoogleMap/GoogleMapComponent';

interface FormValues {
    country: string;
    state: string;
    city: string;
    dailyReqRadius: string;
    serviceType: string;
    rentalReqRadius: string;
    outstationReqRadius: string;
    cityCentreLat: string;
    cityCentreLong: string;
    cityBoundary: string;
    ApproxCityKMCenter: string;
    driverPrefixCode: string;
    tripPrefixCode: string;
    archive: string;
}

const ViewSpecificCountry: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { serviceCityId } = useParams();
    const viewSpecific = true;
    const initialFormValues: FormValues = {
        country: '',
        state: '',
        city: '',
        dailyReqRadius: '',
        serviceType: '',
        rentalReqRadius: '',
        outstationReqRadius: '',
        cityCentreLat: '',
        cityCentreLong: '',
        cityBoundary: '',
        ApproxCityKMCenter: '',
        driverPrefixCode: '',
        tripPrefixCode: '',
        archive: '',
    };

    const [serviceCityDetails, setServiceCityDetails] = useState<FormValues>(initialFormValues);

    useEffect(() => {
        const specificData: any = staticServiceCityData.find((data) => data.id === serviceCityId);
        if (specificData) {
            setServiceCityDetails(specificData);
        }
    }, [serviceCityId]);

    // useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //       try {
    //         const response = await getServiceCityById(serviceCityId);
    //         console.log('Fetched Data', response);
    //         setCountryDetails(response.data.ServiceCity);
    //       } catch (error: any) {
    //         console.error('Error fetching channel partner details:', error.message);
    //       }
    //     };

    //     fetchChannelPartnerDetails();
    //   }, [countryId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // future code -->>
        // const { name, value } = e.target;
        //setChannelPartnerDetails({ ...channelPartnerDetails, [name]: value });
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Service City',
            to: '/TripModule/TripSettings/ServiceCity/ViewServiceCity',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/TripSettings/ServiceCity/ViewSpecificServiceCity' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'View Service City',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === ` /TripModule/TripSettings/ServiceCity/ViewSpecificServiceCity/${serviceCityId}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${
                                        selected ? 'text-secondary !outline-none before:!w-full' : ''
                                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                >
                                    <FaArrowRightToCity className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Service City</span>
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
                                    <AiOutlineAudit className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    <span className="text-md font-bold">Audit Log</span>
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-5">
                                <ServiceCityModule details={serviceCityDetails} onInputChange={handleInputChange} showStatus={true} viewSpecific={viewSpecific} isEdit={false} />
                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedAt" className="block mb-1">
                                            Approved At
                                        </label>
                                        <input name="approvedAt" type="text" id="approvedAt" className=" form-input w-full pointer-events-none " readOnly={viewSpecific} value={'2024-01-01'} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="approvedBy" className="block mb-1">
                                            Approved By
                                        </label>
                                        <input name="approvedBy" type="text" id="approvedBy" className=" form-input w-full pointer-events-none " readOnly={viewSpecific} value={'Ramu'} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdAt" className="block mb-1">
                                            Created At
                                        </label>
                                        <input name="createdAt" type="text" id="createdAt" className=" form-input w-full pointer-events-none " readOnly={viewSpecific} value={'2024-01-01'} />
                                    </div>
                                    <div className="lg:w-1/3">
                                        <label htmlFor="createdBy" className="block mb-1">
                                            Created By
                                        </label>
                                        <input name="createdBy" type="text" id="createdBy" className=" form-input w-full pointer-events-none " readOnly={viewSpecific} value={'akshay'} />
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
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Updated Hisory</h2>
                                </div>
                                <UpdatedHistoryTable />
                                <div className="text-2xl font-bold dark:prose-headings:text-white-dark mt-6">
                                    <h2>Verification Hisory</h2>
                                </div>
                                <VerificationHistory />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                <div className="panel mt-6 overflow-hidden">
                    <GoogleMapComponent />
                </div>
            </div>
        </>
    );
};

export default ViewSpecificCountry;
