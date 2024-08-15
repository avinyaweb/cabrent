import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import CouponMasterModule from './CouponMasterModule';
import { staticCouponMasterData } from './ViewCouponMaster';

interface FormValues {
    id: string;
    couponCode: string;
    couponName: string;
    couponDesc: string;
    usage: string;
    amount: string;
    benefit: string;
    archive: string;
}

const EditCouponMaster: React.FC = () => {
    const { couponMasterId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        couponCode: '',
        couponName: '',
        couponDesc: '',
        usage: '',
        amount: '',
        benefit: '',
        archive: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [currentPage, setCurrentPage] = useState<string>('');

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    useEffect(() => {
        // Find the specific data based on the serviceProviderId
        const specificData = staticCouponMasterData.find((data) => data.id === couponMasterId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData); // Set the entire form data
        }
    }, [couponMasterId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Coupon Master',
            to: '/PromotionModule/CouponMaster/ViewCouponMaster',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/CouponMaster/ViewCouponMaster' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Coupon Master',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    {
        /* 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createAdminTicketsData(formData);
            console.log('API Response:', response);
            console.log('Admin Tickets created successfully!');
            setFormData(initialFormValues);
        } catch (error: any) {
            console.error('Error creating admin tickets:', error.message);
        }
    };
    */
    }

    const handleSubmit = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <form onSubmit={handleSubmit}>
                    <CouponMasterModule details={formData} onInputChange={handleInputChange} showStatus={true} />

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

export default EditCouponMaster;
