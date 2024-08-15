import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import CarouselModel from '@/components/Carousel/CarouselModel';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';

interface VehicleFareMasterProps {
    details: {
        id: string;
        vehicleType: string;
        type: string;
        baseDailyFee: string;
        dailyExtraKMRate: string;
        dailyExtraTimeRate: string;
        baseRentalFee: string;
        rentalExtraKMRate: string;
        rentalExtraTimeRate: string;
        baseOutstationFeeOneWay: string;
        outstationExtraKMRateOneWay: string;
        outstationExtraTimeRateOneWay: string;
        outstationExtraKMRateTwoeWay: string;
        outstationExtraTimeRateTwoWay: string;
        status: string;
        features: string;
        vehicleIcon: string;
        conveyanceAvail: string;
        conveyanceCharge: string;
        taxApplicable: string;
        cgst: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const VehicleFareMasterModule: React.FC<VehicleFareMasterProps> = ({ details, onInputChange, viewSpecific, showStatus = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Dynamic roles data fetching
    {
        /*
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoleData();
                const rolesData = response.data.roles;

                if (Array.isArray(rolesData)) {
                    // Extract role names from the fetched data and update roleOptions state
                    const roles = rolesData.map((fk_roleType: any) => ({
                        label: fk_roleType.roleName,
                        value: fk_roleType.roleId // Assuming roleId exists to uniquely identify the role
                    }));
                    setRoleOptions(roles);
                } else {
                    console.error('Invalid data format:', rolesData);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []); 
    */
    }

    const [modal1, setModal1] = useState(false);
    const maxNumber = 69;
    // image preview and static img data.
    const vehicleIconImage = [
        'https://cdn-icons-png.flaticon.com/512/2059/2059213.png',
        // Add more image URLs as needed
    ];
    const [vehicleIconImg, setVehicleIconImg] = useState<any>([]);
    // handle image upload.
    const handlevehicleIconImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setVehicleIconImg(imageList as never[]);
    };

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                        Vehicle Type
                    </label>
                    <input
                        name="vehicleType"
                        type="text"
                        id="vehicleType"
                        placeholder="Enter Vehicle Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.vehicleType}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="type" className="block mb-1 text-md font-bold">
                        Type
                    </label>
                    <input
                        name="type"
                        type="text"
                        id="type"
                        placeholder="Enter Type"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.type}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="baseDailyFee" className="block mb-1 text-md font-bold">
                        Base Daily Fee
                    </label>
                    <input
                        name="baseDailyFee"
                        type="text"
                        id="baseDailyFee"
                        placeholder="Enter Base Daily Fee"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.baseDailyFee}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="dailyExtraKMRate" className="block mb-1 text-md font-bold">
                        Daily Extra KM Rate
                    </label>
                    <input
                        name="dailyExtraKMRate"
                        type="text"
                        id="dailyExtraKMRate"
                        placeholder="Enter Daily Extra KM Rate"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.dailyExtraKMRate}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="dailyExtraTimeRate" className="block mb-1 text-md font-bold">
                        Daily Extra Time Rate
                    </label>
                    <input
                        name="dailyExtraTimeRate"
                        type="text"
                        id="dailyExtraTimeRate"
                        placeholder="Enter Daily Extra Time Rate"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.dailyExtraTimeRate}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="baseRentalFee" className="block mb-1 text-md font-bold">
                        Base Rental Fee
                    </label>
                    <input
                        name="baseRentalFee"
                        type="text"
                        id="baseRentalFee"
                        placeholder="Enter Base Rental Fee"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.baseRentalFee}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="rentalExtraKMRate" className="block mb-1 text-md font-bold">
                        Rental Extra KM Rate
                    </label>
                    <input
                        name="rentalExtraKMRate"
                        type="text"
                        id="rentalExtraKMRate"
                        placeholder="Enter Rental Extra KM Rate"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.rentalExtraKMRate}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="rentalExtraTimeRate" className="block mb-1 text-md font-bold">
                        Rental Extra Time Rate
                    </label>
                    <input
                        name="rentalExtraTimeRate"
                        type="text"
                        id="rentalExtraTimeRate"
                        placeholder="Enter Rental Extra Time Rate"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.rentalExtraTimeRate}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="baseOutstationFeeOneWay" className="block mb-1 text-md font-bold">
                        Base Outstation Fee One Way
                    </label>
                    <input
                        name="baseOutstationFeeOneWay"
                        type="text"
                        id="baseOutstationFeeOneWay"
                        placeholder="Enter Base Outstation Fee One Way"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.baseOutstationFeeOneWay}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="outstationExtraKMRateOneWay" className="block mb-1 text-md font-bold">
                        Outstation Extra KM Rate One Way
                    </label>
                    <input
                        name="outstationExtraKMRateOneWay"
                        type="text"
                        id="outstationExtraKMRateOneWay"
                        placeholder="Enter Outstation Extra KM Rate One Way"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.outstationExtraKMRateOneWay}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="outstationExtraTimeRateOneWay" className="block mb-1 text-md font-bold">
                        Outstation Extra Time Rate One Way
                    </label>
                    <input
                        name="outstationExtraTimeRateOneWay"
                        type="text"
                        id="outstationExtraTimeRateOneWay"
                        placeholder="Enter Outstation Extra Time Rate One Way"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.outstationExtraTimeRateOneWay}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="outstationExtraKMRateTwoeWay" className="block mb-1 text-md font-bold">
                        Outstation Extra KM Rate Two Way
                    </label>
                    <input
                        name="outstationExtraKMRateTwoeWay"
                        type="text"
                        id="outstationExtraKMRateTwoeWay"
                        placeholder="Enter Outstation Extra KM Rate Two Way"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.outstationExtraKMRateTwoeWay}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="outstationExtraTimeRateTwoWay" className="block mb-1 text-md font-bold">
                        Outstation Extra Time Rate Two Way
                    </label>
                    <input
                        name="outstationExtraTimeRateTwoWay"
                        type="text"
                        id="outstationExtraTimeRateTwoWay"
                        placeholder="Enter Outstation Extra Time Rate Two Way"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.outstationExtraTimeRateTwoWay}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="cgst" className="block mb-1 text-md font-bold">
                        CGST
                    </label>
                    <input
                        name="cgst"
                        type="text"
                        id="cgst"
                        placeholder="Enter CGST"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.cgst}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="features" className="block mb-1 text-md font-bold">
                        Features
                    </label>
                    <input
                        name="features"
                        type="text"
                        id="features"
                        placeholder="Enter Features"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.features}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="taxApplicable" className="block mb-1 text-md font-bold">
                        Tax Applicable
                    </label>
                    <input
                        name="taxApplicable"
                        type="text"
                        id="taxApplicable"
                        placeholder="Enter Tax Applicable"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.taxApplicable}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="conveyanceAvail" className="block mb-1 text-md font-bold">
                        Conveyance Available
                    </label>
                    {viewSpecific ? (
                        <input
                            name="conveyanceAvail"
                            type="text"
                            id="conveyanceAvail"
                            placeholder="Enter Conveyance Available"
                            className="form-input w-full pointer-events-none"
                            readOnly
                            value={details.conveyanceAvail}
                        />
                    ) : (
                        <select id="status" className="form-select text-white-dark" required value={details.archive}>
                            <option value="">Select your Conveyance Available</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="conveyanceCharge" className="block mb-1 text-md font-bold">
                        Conveyance Charge
                    </label>
                    <input
                        name="conveyanceCharge"
                        type="text"
                        id="conveyanceCharge"
                        placeholder="Enter Conveyance Charge"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.conveyanceCharge}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="distanceFrom" className="block mb-1 text-md font-bold">
                        Distance From (in KM)
                    </label>
                    <input
                        name="distanceFrom"
                        type="text"
                        id="distanceFrom"
                        placeholder={`${viewSpecific ? `` : `Enter Distance From`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        //   value={details.distanceFrom}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="distanceTo" className="block mb-1 text-md font-bold">
                        Distance To (in KM)
                    </label>
                    <input
                        name="distanceTo"
                        type="text"
                        id="distanceTo"
                        placeholder={`${viewSpecific ? `` : `Enter Distance To`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        //   value={details.distanceTo}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="totalMins" className="block mb-1 text-md font-bold">
                        Total Mins
                    </label>
                    <input
                        name="totalMins"
                        type="text"
                        id="totalMins"
                        placeholder={`${viewSpecific ? `` : `Enter Total Mins`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        //   value={details.totalMins}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/2`}>
                    {' '}
                    {/* Ensure a specific width for consistency */}
                    <label htmlFor="distanceFareType" className="block mb-1 text-md font-bold">
                        Distance Fare Type
                    </label>
                    <select
                        id="distanceFareType"
                        className="form-select w-full"
                        // value={details.distanceFareType}
                        // onChange={onInputChange}
                    >
                        <option value="flatRate">Flat Rate</option>
                        <option value="kmRate">KM Rate</option>
                    </select>
                </div>

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/2">
                        <label htmlFor="archive" className="block mb-1 text-md font-bold">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                value={details.archive}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark" required value={details.archive}>
                                <option value="">Select your Status</option>
                                <option value={'PENDING'}>PENDING</option>
                                <option value={'APPROVED'}>APPROVED</option>
                                <option value={'REJECTED'}>REJECTED</option>
                                <option value={'HOLD'}>HOLD</option>
                                <option value={'SUSPENDED'}>SUSPENDED</option>
                            </select>
                        )}
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )}
            </div>

            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-lg font-bold">
                                Vehicle Icon
                            </label>
                            {vehicleIconImage?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="Aadhar"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal1(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-lg font-bold"> - Vehicle Icon</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setVehicleIconImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleIconImg} onChange={handlevehicleIconImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </button>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <button
                                                            type="button"
                                                            className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                            title="Clear Image"
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            <IconX className="w-3 h-3" />
                                                        </button>
                                                        <img src={image.dataURL} alt="img" className="object-cover shadow rounded w-full !max-h-48" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    )}
                    <CarouselModel event={modal1} closeModal={() => setModal1(false)} title={'Vehicle Icon'} files={vehicleIconImage} />
                </div>
            </div>
        </>
    );
};

export default VehicleFareMasterModule;
