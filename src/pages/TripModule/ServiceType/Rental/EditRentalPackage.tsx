import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import RentalPackageModule from './RentalPackageModule';

interface FormValues {
    packageName: string;
    packageDistunce: string;
    packageDuration: string;
    fk_serviceCity: string;
}

const EditRental: React.FC = () => {
    // future code -->>
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { RentalID }: { RentalID?: any } = useParams();

    console.log(RentalID);

    const initialFormValues: FormValues = {
        packageName: '',
        packageDistunce: '',
        packageDuration: '',
        fk_serviceCity: '',
    };

    const [RentalDetails, setRentalDetails] = useState<FormValues>(initialFormValues);

    // useEffect(() => {
    //     const fetchChannelPartnerDetails = async () => {
    //         try {
    //             const response = await getRentalById(RentalID);
    //             console.log('Fetched Data', response);
    //             setRentalDetails(response.data.Rental);
    //         } catch (error: any) {
    //             console.error('Error fetching channel partner details:', error.message);
    //         }
    //     };
    //     fetchChannelPartnerDetails();
    // }, [RentalID]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRentalDetails({ ...RentalDetails, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // try {
        //     await updateRental(RentalID, RentalDetails);
        //     console.log('Channel Partner details updated successfully!');
        //     navigate('/TripModule/ServiceType/Rental/ViewRental');
        // } catch (error: any) {
        //     console.error('Error updating channel partner details:', error.message);
        // }
    };

    // const handleSubmit = () => {
    //   window.location.reload();
    // };

    const handleCancel = () => {
        window.location.reload();
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
            label: 'Rental Package',
            to: '/TripModule/ServiceType/Rental/ViewRental',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/TripModule/ServiceType/Rental/ViewRental' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Rental Package',
            to: '/TripModule/ServiceType/Rental/EditRental',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `/TripModule/ServiceType/Rental/EditRental/${RentalID}` ? 'text-blue-600' : ''
            }`,
        },
    ];

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <RentalPackageModule details={RentalDetails} onInputChange={handleInputChange} showStatus={false} isEditPage={true} />

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditRental;
