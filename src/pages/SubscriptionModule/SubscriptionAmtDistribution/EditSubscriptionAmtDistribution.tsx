import React, { useState, ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '@/pages/Auth/Breadcrumb';
import SubscriptionAmtDistributionModule from './SubscriptionAmtDistributionModule';
import { staticSubscriptionAmtDistributionData } from './ViewSubscriptionAmtDistribution';

interface FormValues {
    id: string;
    cgst: string;
    sgst: string;
    processingFee: string;
    planAmount: string;
    distributorcommision: string;
    platformFee: string;
    platformName: string;
    platformAmount: string;
    amountAddOrSub: string;
    vehicleTypeName: string;
    vehicleTypeAmount: string;
    pgCharges: string;
    totalAmount: string;
    fk_serviceCity: string;
    isChPartCommisionApplicable: string;
    fk_platformFee: string;
    fk_vehicleTypeFee: string;
    city: string;
    archive: string;
    changeType: string;
}

const EditSubscriptionAmtDistribution: React.FC = () => {
    const { subscriptionAmtDistributionId } = useParams();
    const initialFormValues: FormValues = {
        id: '',
        cgst: '',
        sgst: '',
        processingFee: '',
        planAmount: '',
        distributorcommision: '',
        platformFee: '',
        platformName: '',
        platformAmount: '',
        vehicleTypeName: '',
        vehicleTypeAmount: '',
        amountAddOrSub: '',
        pgCharges: '',
        totalAmount: '',
        fk_serviceCity: '',
        isChPartCommisionApplicable: '',
        fk_platformFee: '',
        fk_vehicleTypeFee: '',
        city: '',
        archive: '',
        changeType: '',
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
        // Find the specific data based on the SubscriptionAmtDistributionId
        const specificData = staticSubscriptionAmtDistributionData.find((data) => data.id === subscriptionAmtDistributionId);

        // If specificData is found, update the formData state with its values
        if (specificData) {
            setFormData(specificData as unknown as FormValues);
        }
    }, [subscriptionAmtDistributionId]);

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Subscription Amt Distribution',
            to: '/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution' ? 'text-blue-600' : ''
            }`,
        },
        {
            label: 'Edit Subscription Amt Distribution',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === `` ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                    <SubscriptionAmtDistributionModule details={formData} onInputChange={handleInputChange} showStatus={true} />
                </form>
            </div>

            <div className="panel mt-6">
                <h1 className="text-4xl font-bold">Platform</h1>

                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="fk_platformFee" className="block mb-1 text-md font-bold">
                            Platform Fee
                        </label>
                        <input name="fk_platformFee" type="number" id="fk_platformFee" placeholder="Enter Platform Fee" className="form-input w-full" onChange={handleInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="platformName" className="block mb-1 text-md font-bold">
                            Platform Name
                        </label>
                        <input name="platformName" type="text" id="platformName" placeholder="Enter Platform Name" className="form-input w-full" onChange={handleInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="platformAmount" className="block mb-1 text-md font-bold">
                            Platform Amount
                        </label>
                        <input
                            name="platformAmount"
                            type="number"
                            id="platformAmount"
                            placeholder="Enter Platform Amount"
                            className="form-input w-full"
                            value={formData.platformAmount} // Make sure to update this value based on your state management
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="panel mt-6">
                <h1 className="text-4xl font-bold">Vehicle</h1>
                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="vehicleTypeName" className="block mb-1 text-md font-bold">
                            Vehicle Type Name
                        </label>
                        <input
                            name="vehicleTypeName"
                            type="text"
                            id="vehicleTypeName"
                            placeholder="Enter Vehicle Type Name"
                            className="form-input w-full"
                            value={formData.vehicleTypeName} // Make sure to update this value based on your state management
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="vehicleTypeAmount" className="block mb-1 text-md font-bold">
                            Vehicle Fee
                        </label>
                        <input
                            name="vehicleTypeAmount"
                            type="number"
                            id="vehicleTypeAmount"
                            placeholder="Enter Vehicle Type Amount"
                            className="form-input w-full"
                            value={formData.vehicleTypeAmount} // Make sure to update this value based on your state management
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="amountAddOrSub" className="block mb-1 text-md font-bold">
                            Amount Add Or Sub
                        </label>
                        <input
                            name="amountAddOrSub"
                            type="number"
                            id="amountAddOrSub"
                            placeholder="Enter Amount Add Or Sub"
                            className="form-input w-full"
                            value={formData.amountAddOrSub} // Make sure to update this value based on your state management
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className="btn btn-primary !mt-6 mr-4">
                        Submit
                    </button>
                    <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditSubscriptionAmtDistribution;
