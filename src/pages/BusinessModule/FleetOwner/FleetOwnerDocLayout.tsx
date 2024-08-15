import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import CarouselModel from '@/components/Carousel/CarouselModel';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import UpdateStatus from '@/components/Models/UpdateStatus';
import { FaTimesCircle } from 'react-icons/fa';
import { MdCheckBox } from 'react-icons/md';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';

interface AdminProps {
    details: {
        companyType: string;
        distributor: string;
        TravelAgencyType: string;
        TravelAgencyName: string;
        mobileNumber: string;
        altMobileNumber: string;
        firstName: string;
        middleName: string;
        lastName: string;
        dob: string;
        gender: string;
        email: string;
        country: string;
        state: string;
        city: string;
        regAddress: string;
        commAddress: string;
        companyName: string;

        archive: string;
        fk_serviceCity: string;
        fatherName: string;
        // Added fleet management details
        ProfileStatus: string;
        leasedVehicle: string;
        agreedSaasContract: boolean;
        digitalTravelAgencyOwner: boolean;
        leasedAgreementImg: string;

        //new fields:
        numberOfVehicle: string;
        numberOfDriver: string;
        activeDriver: string;
        inactiveDriver: string;
        activeVehicle: string;
        inactiveVehicle: string;
        Password: string;
        uniqueId: string;
        vehicleNumber: string;
        driverMobileNumber: string;
        driverName: string;
        driverPassword: string;
        referralCode: string;
        referredBy: string;
        distributorCode: string;
        ownerAddress: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    viewSpecific?: boolean;
}

const FleetOwnerDocLayout: React.FC<AdminProps> = ({ details, onInputChange, viewSpecific }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal1, setModal1] = useState(false);
    const [modal2, setmodal2] = useState(false);
    const [modal3, setmodal3] = useState(false);

    const [modal4, setmodal4] = useState(false);

    const profileImage = [
        'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992568/Towner/xoz8nrrc8zqcg3ptxhn0.webp',
        // Add more image URLs as needed
    ];
    // static datas.
    const aadhaarImages = [
        { title: 'Front Image', url: 'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992305/Towner/vzbvqyl0kdm9tfjuhdi7.png' },
        { title: 'Back Image', url: 'https://res.cloudinary.com/do4lbzbdo/image/upload/v1714992304/Towner/vinpc4laditmom8agjlu.png' },
        // Add more image URLs as needed
    ];
    const gstImage = [{ title: 'Front Image', url: 'https://www.indiafilings.com/learn/wp-content/uploads/2017/07/GST-Registration-Certificate-Sample-Annexure-A.png' }];

    const LeasedAgreementImage = [{ title: 'Front Image', url: 'https://www.lawdepot.com/images/sample-documents/vehicle-leasing-agreement-sample.svg' }];

    // states.
    const [profileImg, setprofileImg] = useState<any>([]);
    const [aadharImages, setAadharImg] = useState<any>([]);
    const [gstImg, setgstImg] = useState<any>([]);

    const [leasedAgreementImg, setLeasedAgreementImg] = useState<any>([]);
    const maxNumber = 69;

    // handle image upload.
    const handleProfileImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setprofileImg(imageList as never[]);
    };
    // handle image upload.
    const handleAadharImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setAadharImg(imageList as never[]);
    };
    // handle image upload.
    const handlegstImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setgstImg(imageList as never[]);
    };

    // handle image upload.
    const handleLeasedAgreementImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setgstImg(imageList as never[]);
    };

    const [modal9, setmodal9] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(false);

    const handleAddUpdateStatus = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatus(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatus(false);
        }
        setmodal9(false); // Close the modal after selection
    };

    // State for GST number update status
    const [modalGSTNum, setModalGSTNum] = useState(false);
    const [updatedStatusGSTNum, setUpdatedStatusGSTNum] = useState(false);

    const handleAddUpdateStatusGSTNum = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusGSTNum(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusGSTNum(false);
        }
        // setModalGSTNum(false); // Close the modal after selection
    };

    const [modalLeesNum, setModalLeesNum] = useState(false);
    const [updatedStatusLeesNum, setUpdatedStatusLeesNum] = useState(false);

    const handleAddUpdateStatusLeesAgreNum = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusLeesNum(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusLeesNum(false);
        }
        // setModalGSTNum(false); // Close the modal after selection
    };

    return (
        <>
            {!viewSpecific && (
                <div className="space-y-2 prose dark:prose-headings:text-white-dark mt-6 mb-6">
                    <h2>Travel Agency Documents</h2>
                </div>
            )}
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific && (
                        <label htmlFor="cancelledCQImages" className="block mb-1 text-xl font-bold">
                            Profile
                        </label>
                    )}
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                Profile Image
                            </label>
                            {profileImage?.map((imgUrl, ind) => {
                                return (
                                    <div className="relative w-1/3">
                                        <img src={imgUrl} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                        <a href={imgUrl} target="_blank" rel="noopener">
                                            <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-center hover:underline">
                                                View in Detail <FaArrowUpRightFromSquare />
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Profile Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setprofileImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={profileImg} onChange={handleProfileImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
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
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <>
                            <label htmlFor="aadharCard" className="mb-1 text-xl font-bold flex flex-row gap-4">
                                Aadhar
                            </label>
                            <div className="flex flex-row items-center justify-between h-5">
                                <label htmlFor="aadharCard" className="mb-1 text-md font-bold flex flex-row gap-4">
                                    Aadhar Card Number
                                    <div className="flex flex-row items-center justify-between">
                                        {updatedStatus ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                    </div>
                                </label>
                                <div className="flex flex-row gap-3">
                                    {/* <div className="cursor-pointer text-blue-500 text-1xl " onClick={() => setmodal9(true)}>
                                        <IconEdit />
                                    </div> */}

                                    <>
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatus('Approved')}>
                                            Approved
                                        </button>
                                        <button className="btn btn-danger block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatus('Reject')}>
                                            Reject
                                        </button>
                                    </>
                                </div>
                            </div>
                        </>
                    ) : (
                        <label htmlFor="aadharCard" className="block mb-1 text-md font-bold">
                            Aadhar Card Number
                        </label>
                    )}

                    <input
                        name="aadharCard"
                        type="text"
                        id="aadharCard"
                        placeholder={viewSpecific ? '' : 'Enter Aadhar Card Number'}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={`1273512635127162`}
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/2 ">
                    {viewSpecific ? (
                        <div className="flex gap-3">
                            {aadhaarImages?.map((data, ind) => {
                                return (
                                    <div className="w-1/2">
                                        <label htmlFor={data.title} className="block mb-1 text-md font-bold">
                                            {data.title}
                                        </label>
                                        <div className="w-full  mt-3 relative">
                                            <img src={data.url} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                            <a href={data.url} target="_blank" rel="noopener">
                                                <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:font-bold text-center hover:underline">
                                                    View in Detail <FaArrowUpRightFromSquare />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold "> - Aadhar Card Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setAadharImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={aadharImages} onChange={handleAadharImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
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
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <>
                            <label htmlFor="aadharCard" className="mb-1 text-xl font-bold flex flex-row gap-4">
                                GST
                            </label>
                            <div className="flex flex-row items-center justify-between h-5">
                                <label htmlFor="aadharCard" className="mb-1 text-md font-bold flex flex-row gap-4">
                                    GST Number
                                    <div className="flex flex-row items-center justify-between">
                                        {updatedStatusGSTNum ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                    </div>
                                </label>
                                {/* <div className="flex flex-row gap-3">
                                    <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalGSTNum(true)}>
                                        Update Status
                                    </button>
                                </div> */}

                                <div className="flex flex-row gap-3">
                                    <>
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatusGSTNum('Approved')}>
                                            Approved
                                        </button>
                                        <button className="btn btn-danger block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatusGSTNum('Reject')}>
                                            Reject
                                        </button>
                                    </>
                                </div>
                            </div>
                        </>
                    ) : (
                        <label htmlFor="aadharCard" className="block mb-1 text-md font-bold">
                            GST Number
                        </label>
                    )}

                    <input
                        name="gst"
                        type="text"
                        id="gst"
                        placeholder={`${viewSpecific ? `` : `Enter GST`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.gst}
                        value="22AAAAA0000A1Z5"
                        // onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2 ">
                    {viewSpecific ? (
                        <div className="flex gap-3">
                            {gstImage?.map((data, ind) => {
                                return (
                                    <div className="w-1/2">
                                        <label htmlFor={data.title} className="block mb-1 text-md font-bold">
                                            {data.title}
                                        </label>
                                        <div className="w-full  mt-3 relative">
                                            <img src={data.url} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                            <a href={data.url} target="_blank" rel="noopener">
                                                <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:font-bold text-center hover:underline">
                                                    View in Detail <FaArrowUpRightFromSquare />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - GST File</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setgstImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={gstImg} onChange={handlegstImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
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
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <>
                            <label htmlFor="leasedAgreement" className="mb-1 text-xl font-bold flex flex-row gap-4">
                                Leased Agreement
                            </label>
                            <div className="flex flex-row items-center justify-between h-5">
                                <label htmlFor="leasedAgreement" className="mb-1 text-md font-bold flex flex-row gap-4">
                                    Leased Number
                                    <div className="flex flex-row items-center justify-between">
                                        {updatedStatusLeesNum ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                    </div>
                                </label>
                                {/* <div className="flex flex-row gap-3">
                                    <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalGSTNum(true)}>
                                        Update Status
                                    </button>
                                </div> */}

                                <div className="flex flex-row gap-3">
                                    <>
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatusLeesAgreNum('Approved')}>
                                            Approved
                                        </button>
                                        <button className="btn btn-danger block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => handleAddUpdateStatusLeesAgreNum('Reject')}>
                                            Reject
                                        </button>
                                    </>
                                </div>
                            </div>
                        </>
                    ) : (
                        <label htmlFor="leasedAgreement" className="block mb-1 text-md font-bold">
                            Leased Vehicle
                        </label>
                    )}

                    <input
                        name="leasedVehicle"
                        type="text"
                        id="leasedVehicle"
                        placeholder={`${viewSpecific ? `` : `Leased Vehicle`}`}
                        className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.gst}
                        value="Yes"
                        // onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2 ">
                    {viewSpecific ? (
                        <div className="flex gap-3">
                            {LeasedAgreementImage?.map((data, ind) => {
                                return (
                                    <div className="w-1/2">
                                        <label htmlFor={data.title} className="block mb-1 text-md font-bold">
                                            {data.title}
                                        </label>
                                        <div className="w-full  mt-3 relative">
                                            <img src={data.url} alt="Pan" className="object-cover cursor-pointer rounded-md shadow-md border" />
                                            <a href={data.url} target="_blank" rel="noopener">
                                                <div className="absolute inset-0 flex items-center rounded-md cursor-pointer justify-center gap-2 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white hover:font-bold text-center hover:underline">
                                                    View in Detail <FaArrowUpRightFromSquare />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Leased Agreement File</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setLeasedAgreementImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={leasedAgreementImg} onChange={handleLeasedAgreementImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <div className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </div>
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
                </div>
            </div>
        </>
    );
};

export default FleetOwnerDocLayout;
