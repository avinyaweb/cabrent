import React, { ChangeEvent, useState } from 'react';
import CarouselModel from '@/components/Carousel/CarouselModel';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import UpdateStatus from '@/components/Models/UpdateStatus';
import { successAlert } from '@/utils/Toast';
import { FaTimesCircle } from 'react-icons/fa';
import { MdCheckBox } from 'react-icons/md';

interface VehicleProfileProps {
    details: {
        id: string;
        serviceProviderType: string;
        channelPartnerType: string;
        fleetManagementType: string;
        vehRegNumber: string;
        vehRTONumber: string;
        vehChasisNumber: string;
        vehCategory: string;
        seatCapacity: string;
        bootSpace: string;
        loadCapacity: string;
        bodyDimension: string;
        vehBrandName: string;
        vehType: string;
        vehBrandModel: string;
        vehColor: string;
        vehFuelType: string;
        fk_serviceCity: string;
        vehicleRegistrationDate: Date | string;
        vehicleAge: string;
        loanBanker: string;
        loanAccNumber: string;
        emiAmt: string;
        emiDate: string;
        currLocation: string;
        archive: string;
        vehManufacturer: string;
        country: string;
        state: string;
        city: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const VehicleDocLayout: React.FC<VehicleProfileProps> = ({ details, onInputChange, showStatus, viewSpecific }) => {
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [modal6, setModal6] = useState(false);
    const [modal7, setModal7] = useState(false);
    const [modal8, setModal8] = useState(false);
    const [modal9, setModal9] = useState(false);
    const [modal10, setModal10] = useState(false);
    const [modal11, setModal11] = useState(false);
    const [modal12, setModal12] = useState(false);
    const maxNumber = 69;

    // image preview and static img data.
    const vehicleFrontImages = [
        'https://t3.ftcdn.net/jpg/02/65/54/68/360_F_265546841_zrzknvVywiY4y0ViGxurjzMavIb0FOo4.jpg',
        // Add more image URLs as needed
    ];
    // image preview and static img data.
    const vehicleBackImages = [
        'https://www.shutterstock.com/image-illustration/unbranded-red-car-rear-view-260nw-689596849.jpg',
        // Add more image URLs as needed
    ];
    // image preview and static img data.
    const vehicleDriverSideImages = [
        'https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=612x612&w=0&k=20&c=ecrvXZhimUHnYES-kx7L5b-TDtRU5kAFPpNm0ZtAp1Y=',
        // Add more image URLs as needed
    ];
    // image preview and static img data.
    const vehicleCoDriverSideImages = [
        'https://img.freepik.com/premium-vector/realistic-cool-red-car-with-detail_8980-201.jpg',
        // Add more image URLs as needed
    ];

    // image preview and static img data.
    const vehicleRtoRcImages = [
        'https://static.toiimg.com/thumb/msid-107486895,width-1280,height-720,resizemode-4/107486895.jpg',
        // Add more image URLs as needed
    ];
    const vehicleFcImages = [
        'https://5.imimg.com/data5/SELLER/Default/2021/7/IR/DS/GD/77664500/vehicle-rc-services-500x500.JPG',
        // Add more image URLs as needed
    ];

    const vehicleInsuranceImages = [
        'https://imgv2-2-f.scribdassets.com/img/document/424608013/original/8a9b139932/1612724021?v=1',
        // Add more image URLs as needed
    ];
    const vehicleEmissionImages = [
        'https://www.epa.gov/sites/default/files/2014-06/vehicle-emission-control-info-label-rdu.jpg',
        // Add more image URLs as needed
    ];
    const vehicleRoadTaxImages = [
        'https://gomechanic.in/blog/wp-content/uploads/2022/01/Road-Tax-Receipt.jpg',
        // Add more image URLs as needed
    ];
    const vehiclePermitImages = [
        'https://img.yumpu.com/29712884/1/500x640/application-for-annual-vehicle-permit-etc-haldia-dock-complex.jpg',
        // Add more image URLs as needed
    ];
    const vehicleLoanImages = [
        'https://imgv2-2-f.scribdassets.com/img/document/80230389/original/792cd307f0/1708503665?v=1',
        // Add more image URLs as needed
    ];
    const vehicleTaxImages = [
        'https://www.team-bhp.com/forum/attachments/indian-car-scene/1857561d1552194612-west-bengal-issues-paying-road-tax-online-mparivahan2.jpg',
        // Add more image URLs as needed
    ];

    const [vehicleRtoRcImg, setvehicleRtoRcImg] = useState<any>([]);
    const [vehicleFcImg, setVehicleIconImg] = useState<any>([]);
    const [vehicleInsuranceImg, setvehicleInsuranceImg] = useState<any>([]);
    const [vehicleEmissionImg, setvehicleEmissionImg] = useState<any>([]);
    const [vehicleRoadTaxImg, setvehicleRoadTaxImg] = useState<any>([]);
    const [vehiclePermitImg, setvehiclePermitImg] = useState<any>([]);
    const [vehicleLoanImg, setvehicleLoanImg] = useState<any>([]);
    const [vehicleTaxImg, setvehicleTaxImg] = useState<any>([]);
    const [vehicleFrontImg, setvehicleFrontImg] = useState<any>([]);
    const [vehicleBackImg, setvehicleBackImg] = useState<any>([]);
    const [vehicleDriverSideImg, setvehicleDriverSideImg] = useState<any>([]);
    const [vehicleCoDriverSideImg, setvehicleCoDriverSideImg] = useState<any>([]);

    // handle image upload.
    const handlevehicleRtoRcImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleRtoRcImg(imageList as never[]);
    };
    const handlevehicleFcImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setVehicleIconImg(imageList as never[]);
    };
    const handlevehicleInsuranceImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleInsuranceImg(imageList as never[]);
    };
    const handlevehicleEmissionImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleEmissionImg(imageList as never[]);
    };
    const handlevehicleRoadTaxImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleRoadTaxImg(imageList as never[]);
    };
    const handlevehiclePermitImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehiclePermitImg(imageList as never[]);
    };
    const handlevehicleLoanImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleLoanImg(imageList as never[]);
    };
    const handlevehicleTaxImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleTaxImg(imageList as never[]);
    };
    const handlevehicleFrontImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleFrontImg(imageList as never[]);
    };
    const handlevehicleBackImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleBackImg(imageList as never[]);
    };
    const handlevehicleDriverSideImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleDriverSideImg(imageList as never[]);
    };
    const handlevehicleCoDriverSideImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setvehicleCoDriverSideImg(imageList as never[]);
    };

    //update status popup

    // State and handle method for Vehicle RTO RC
    const [modalRC, setModalRC] = useState(false);
    const [updatedStatusRC, setUpdatedStatusRC] = useState(false);

    const handleAddUpdateStatusRC = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusRC(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusRC(false);
        }
        setModalRC(false); // Close the modal after selection
    };
    // State and handle method for Vehicle FC
    const [modalFc, setModalFc] = useState(false);
    const [updatedStatusFc, setUpdatedStatusFc] = useState(false);

    const handleAddUpdateStatusFc = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusFc(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusFc(false);
        }
        setModalFc(false); // Close the modal after selection
    };

    // State and handle method for Vehicle Insurance
    const [modalInsurance, setModalInsurance] = useState(false);
    const [updatedStatusInsurance, setUpdatedStatusInsurance] = useState(false);

    const handleAddUpdateStatusInsurance = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusInsurance(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusInsurance(false);
        }
        setModalInsurance(false); // Close the modal after selection
    };

    // State and handle method for Vehicle Emission
    const [modalEmission, setModalEmission] = useState(false);
    const [updatedStatusEmission, setUpdatedStatusEmission] = useState(false);

    const handleAddUpdateStatusEmission = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusEmission(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusEmission(false);
        }
        setModalEmission(false); // Close the modal after selection
    };

    // State and handle method for Vehicle Road Tax
    const [modalRoadTax, setModalRoadTax] = useState(false);
    const [updatedStatusRoadTax, setUpdatedStatusRoadTax] = useState(false);

    const handleAddUpdateStatusRoadTax = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusRoadTax(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusRoadTax(false);
        }
        setModalRoadTax(false); // Close the modal after selection
    };

    // State and handle method for Vehicle Permit
    const [modalPermit, setModalPermit] = useState(false);
    const [updatedStatusPermit, setUpdatedStatusPermit] = useState(false);

    const handleAddUpdateStatusPermit = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusPermit(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusPermit(false);
        }
        setModalPermit(false); // Close the modal after selection
    };

    // State and handle method for Vehicle Loan
    const [modalLoan, setModalLoan] = useState(false);
    const [updatedStatusLoan, setUpdatedStatusLoan] = useState(false);

    const handleAddUpdateStatusLoan = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusLoan(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusLoan(false);
        }
        setModalLoan(false); // Close the modal after selection
    };

    // State and handle method for Vehicle Tax
    const [modalTax, setModalTax] = useState(false);
    const [updatedStatusTax, setUpdatedStatusTax] = useState(false);

    const handleAddUpdateStatusTax = (selectedItem: any) => {
        if (selectedItem === 'Approved') {
            setUpdatedStatusTax(true);
        } else if (selectedItem === 'Reject') {
            setUpdatedStatusTax(false);
        }
        setModalTax(false); // Close the modal after selection
    };

    return (
        <>
            <div className="space-y-2 prose dark:prose-headings:text-white-dark mt-6 mb-6">
                <h2>Documents</h2>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="vehicleFrontImages" className="block mb-1 text-md font-bold">
                                Vehicle Front Image
                            </label>
                            {vehicleFrontImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleFrontImages"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal9(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Front Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleFrontImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleFrontImg} onChange={handlevehicleFrontImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal9} closeModal={() => setModal9(false)} title={'Vehicle Front Image'} files={vehicleFrontImages} />
                </div>
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="vehicleBackImages" className="block mb-1 text-md font-bold">
                                Vehicle Back Image
                            </label>
                            {vehicleBackImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleBackImages"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal10(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Back Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleBackImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleBackImg} onChange={handlevehicleBackImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal10} closeModal={() => setModal10(false)} title={'Vehicle Back Image'} files={vehicleBackImages} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-6">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="vehicleDriverSideImages" className="block mb-1 text-md font-bold">
                                Vehicle Driver Side Image
                            </label>
                            {vehicleDriverSideImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleDriverSideImages"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal11(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Driver Side Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleDriverSideImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleDriverSideImg} onChange={handlevehicleDriverSideImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal11} closeModal={() => setModal11(false)} title={'Vehicle Driver Side Image'} files={vehicleDriverSideImages} />
                </div>
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="vehicleCoDriverSideImages" className="block mb-1 text-md font-bold">
                                Vehicle Co-Driver Side Image
                            </label>
                            {vehicleCoDriverSideImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleCoDriverSideImages"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal12(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Co-Driver Side Image</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleCoDriverSideImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleCoDriverSideImg} onChange={handlevehicleCoDriverSideImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal12} closeModal={() => setModal12(false)} title={'Vehicle Co-Driver Side Image'} files={vehicleCoDriverSideImages} />
                </div>
            </div>

            {/* Rc */}
            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-[80%]  flex gap-2">
                    <div className="w-1/4">
                        <label htmlFor="vehicleRTORCYear" className="block mb-1 text-md font-bold">
                            Vehicle RTO RC Year
                        </label>
                        {viewSpecific ? (
                            <input
                                name="vehicleRTORCYear"
                                type="text"
                                id="vehicleRTORCYear"
                                className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={`5 Years`}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark mt-3" required>
                                <option value="">Select your year</option>
                                <option value={'5yrs'}>5 Years</option>
                                <option value={'10yr'}>10 Years</option>
                                <option value={'15yrs'}>15 Years</option>
                            </select>
                        )}
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleRC" className="block mb-1 text-md font-bold">
                            Vehicle RTO RC No
                        </label>
                        <input
                            name="vehicleRtoRc"
                            type="text"
                            id="vehicleRtoRc"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle RTO RC`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `3216541354616854` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleNumberInRC" className="block mb-1 text-md font-bold">
                            Vehicle Number In RC
                        </label>
                        <input
                            name="vehicleNumberInRC"
                            type="text"
                            id="vehicleNumberInRC"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Number In RC`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `KA-52-3546` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="RCExpiryDate" className="block mb-1 text-md font-bold">
                            RC Expiry Date
                        </label>
                        <input
                            name="RCExpiryDate"
                            type="date"
                            id="RCExpiryDate"
                            placeholder={`${viewSpecific ? `` : `Enter RC Expiry Date`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `2024-01-01T09:40:05.000Z` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="lg:w-[20%] ">
                    {viewSpecific ? (
                        <div>
                            <div className="flex gap-1">
                                <label htmlFor="vehicleRtoRc" className="block mb-1 text-md font-bold">
                                    Vehicle Rto Rc
                                </label>
                                {viewSpecific && (
                                    <>
                                        {updatedStatusRC ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                        <button className="btn ml-5 btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalRC(true)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                            {vehicleRtoRcImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleRtoRc"
                                        key={ind}
                                        className="w-[90%] object-cover mt-2 cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
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
                                        Upload <span className="text-black text-md font-bold"> - Vehicle vehicle Rc</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleRtoRcImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleRtoRcImg} onChange={handlevehicleRtoRcImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal1} closeModal={() => setModal1(false)} title={'Vehicle Rto Rc'} files={vehicleRtoRcImages} />
                </div>
                <UpdateStatus event={modalRC} closeModal={() => setModalRC(false)} onSubmit={handleAddUpdateStatusRC} />
            </div>

            {/* Fc */}
            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-[80%]  flex gap-2">
                    <div className="w-1/4">
                        <label htmlFor="vehicleFCYear" className="block mb-1 text-md font-bold">
                            Vehicle FC Year
                        </label>
                        {viewSpecific ? (
                            <input
                                name="vehicleFCYear"
                                type="text"
                                id="vehicleFCYear"
                                className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={`10 Years`}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark mt-3" required>
                                <option value="">Select your year</option>
                                <option value={'5yrs'}>5 Years</option>
                                <option value={'10yr'}>10 Years</option>
                                <option value={'15yrs'}>15 Years</option>
                            </select>
                        )}
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleFc" className="block mb-1 text-md font-bold">
                            Vehicle FC
                        </label>
                        <input
                            name="vehicleFc"
                            type="text"
                            id="vehicleFc"
                            placeholder={`${viewSpecific ? `` : `Enter vehicle FC`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `321654xxxxx` : ``}`}
                            // value={aadharDetails.vehicleFc}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleNumberInFc" className="block mb-1 text-md font-bold">
                            Vehicle Number In FC
                        </label>
                        <input
                            name="vehicleNumberInFc"
                            type="text"
                            id="vehicleNumberInFc"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Number In FC`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `KA-52-4561` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="RCExpiryDate" className="block mb-1 text-md font-bold">
                            FC Expiry Date
                        </label>
                        <input
                            name="RCExpiryDate"
                            type="date"
                            id="RCExpiryDate"
                            placeholder={`${viewSpecific ? `` : `Enter RC Expiry Date`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `2024-01-01T09:40:05.000Z` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="lg:w-[20%]">
                    {viewSpecific ? (
                        <div>
                            <div className="flex gap-1">
                                <label htmlFor="vehicleFc" className="block mb-1 text-md font-bold">
                                    Vehicle Fc Image
                                </label>
                                {viewSpecific && (
                                    <>
                                        {updatedStatusFc ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalFc(true)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                            {vehicleFcImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleFc"
                                        key={ind}
                                        className="w-[90%] object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal2(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle FC</span>{' '}
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
                                <ImageUploading multiple value={vehicleFcImg} onChange={handlevehicleFcImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal2} closeModal={() => setModal2(false)} title={'Vehicle Fc'} files={vehicleFcImages} />
                </div>
                <UpdateStatus event={modalFc} closeModal={() => setModalFc(false)} onSubmit={handleAddUpdateStatusFc} />
            </div>

            {/* Insurance */}
            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-[80%]  flex gap-2">
                    <div className="w-1/4">
                        <label htmlFor="insuranceProviderName" className="block mb-1 text-md font-bold">
                            Insurance Provider Name
                        </label>
                        {viewSpecific ? (
                            <input
                                name="insuranceProviderName"
                                type="text"
                                id="insuranceProviderName"
                                className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={`ICICI`}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark mt-3" required>
                                <option value="">Select your provider</option>
                                <option value={'ICICI'}>ICICI</option>
                                <option value={'Federal'}>Federal</option>
                            </select>
                        )}
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleInsurance" className="block mb-1 text-md font-bold">
                            Vehicle Insurance No
                        </label>
                        <input
                            name="vehicleInsurance"
                            type="text"
                            id="vehicleInsurance"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Insurance No`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `321654xxxxx` : ``}`}

                            // value={aadharDetails.vehicleInsurance}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleNumberInsurance" className="block mb-1 text-md font-bold">
                            Vehicle Number Insurance
                        </label>
                        <input
                            name="vehicleNumberInsurance"
                            type="text"
                            id="vehicleNumberInsurance"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Number In Insurance`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `KA-52-4561` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="InsuranceExpiryDate" className="block mb-1 text-md font-bold">
                            Insurance Expiry Date
                        </label>
                        <input
                            name="InsuranceExpiryDate"
                            type="date"
                            id="InsuranceExpiryDate"
                            placeholder={`${viewSpecific ? `` : `Enter Insurance Expiry Date`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `2024-01-01T09:40:05.000Z` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="lg:w-[20%]">
                    {viewSpecific ? (
                        <div>
                            <div className="flex gap-1">
                                <label htmlFor="cancelledCQImages" className="block mb-1 text-md font-bold">
                                    Vehicle Insurance
                                </label>
                                {viewSpecific && (
                                    <>
                                        {updatedStatusInsurance ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalInsurance(true)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                            {vehicleInsuranceImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleInsurance"
                                        key={ind}
                                        className="w-[90%] object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal3(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Insurance</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleInsuranceImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleInsuranceImg} onChange={handlevehicleInsuranceImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal3} closeModal={() => setModal3(false)} title={'Vehicle Icon'} files={vehicleInsuranceImages} />
                </div>
                <UpdateStatus event={modalInsurance} closeModal={() => setModalInsurance(false)} onSubmit={handleAddUpdateStatusInsurance} />
            </div>

            {/* Emission */}
            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-[80%]  flex gap-2">
                    <div className="w-1/4">
                        <label htmlFor="vehicleEmissionType" className="block mb-1 text-md font-bold">
                            Vehicle Emission Type
                        </label>
                        {viewSpecific ? (
                            <input
                                name="vehicleEmissionType"
                                type="text"
                                id="vehicleEmissionType"
                                className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={`Type 1`}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark mt-3" required>
                                <option value="">Select your type</option>
                                <option value={'Type1'}>Type 1</option>
                                <option value={'Type2'}>Type 2</option>
                                <option value={'Type3'}>Type 3</option>
                            </select>
                        )}
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleEmission" className="block mb-1 text-md font-bold">
                            Vehicle Emission No
                        </label>
                        <input
                            name="vehicleEmission"
                            type="text"
                            id="vehicleEmission"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Emission No`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `321654xxxxx` : ``}`}

                            // value={aadharDetails.vehicleEmission}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleNumberInEmission" className="block mb-1 text-md font-bold">
                            Vehicle Number In Emission
                        </label>
                        <input
                            name="vehicleNumberInEmission"
                            type="text"
                            id="vehicleNumberInEmission"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Number In Emission`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `KA-52-6254` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="emissionExpiryDate" className="block mb-1 text-md font-bold">
                            Emission Expiry Date
                        </label>
                        <input
                            name="emissionExpiryDate"
                            type="date"
                            id="emissionExpiryDate"
                            placeholder={`${viewSpecific ? `` : `Enter Emission Expiry Date`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `2024-01-01T09:40:05.000Z` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="lg:w-[20%]">
                    {viewSpecific ? (
                        <div>
                            <div className="flex gap-1 ">
                                <label htmlFor="vehicleEmission" className="block mb-1 text-md font-bold">
                                    Vehicle Emission
                                </label>
                                {viewSpecific && (
                                    <>
                                        {updatedStatusEmission ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalEmission(true)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                            {vehicleEmissionImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleEmission"
                                        key={ind}
                                        className="w-[90%] object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal4(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Emission</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleEmissionImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleEmissionImg} onChange={handlevehicleEmissionImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal4} closeModal={() => setModal4(false)} title={'Vehicle Emission'} files={vehicleEmissionImages} />
                </div>
                <UpdateStatus event={modalEmission} closeModal={() => setModalEmission(false)} onSubmit={handleAddUpdateStatusEmission} />
            </div>

            {/* Permit */}
            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-[80%] flex gap-2">
                    <div className="w-1/4">
                        <label htmlFor="vehiclePermitType" className="block mb-1 text-md font-bold">
                            Vehicle Permit Type
                        </label>
                        {viewSpecific ? (
                            <input
                                name="vehiclePermitType"
                                type="text"
                                id="vehiclePermitType"
                                className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={`10 Years`}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark mt-3" required>
                                <option value="">Select your type</option>
                                <option value={'allIndia'}>All India</option>
                                <option value={'allState'}>All State</option>
                            </select>
                        )}
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehiclePermit" className="block mb-1 text-md font-bold">
                            Vehicle Permit No
                        </label>
                        <input
                            name="vehiclePermit"
                            type="text"
                            id="vehiclePermit"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Permit No`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `321654xxxxx` : ``}`}

                            // value={aadharDetails.vehiclePermit}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleNumberInPermit" className="block mb-1 text-md font-bold">
                            Vehicle Number In Permit
                        </label>
                        <input
                            name="vehicleNumberInPermit"
                            type="text"
                            id="vehicleNumberInPermit"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Number In Permit`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `KA-52-8987` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="permitExpiryDate" className="block mb-1 text-md font-bold">
                            Permit Expiry Date
                        </label>
                        <input
                            name="permitExpiryDate"
                            type="date"
                            id="permitExpiryDate"
                            placeholder={`${viewSpecific ? `` : `Enter Permit Expiry Date`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `2024-01-01T09:40:05.000Z` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="lg:w-[20%]">
                    {viewSpecific ? (
                        <div>
                            <div className="flex gap-1">
                                <label htmlFor="vehiclePermit" className="block mb-1 text-md font-bold">
                                    Vehicle Permit
                                </label>
                                {viewSpecific && (
                                    <>
                                        {updatedStatusPermit ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalPermit(true)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                            {vehiclePermitImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehiclePermit"
                                        key={ind}
                                        className="w-[90%] object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal6(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Permit</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehiclePermitImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehiclePermitImg} onChange={handlevehiclePermitImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal6} closeModal={() => setModal6(false)} title={'Vehicle Permit'} files={vehiclePermitImages} />
                </div>

                <UpdateStatus event={modalPermit} closeModal={() => setModalPermit(false)} onSubmit={handleAddUpdateStatusPermit} />
            </div>

            {/* Loan*/}
            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-[80%] flex gap-2">
                    <div className="w-1/4">
                        <label htmlFor="vehicleLoanYear" className="block mb-1 text-md font-bold">
                            Vehicle Loan Year
                        </label>
                        {viewSpecific ? (
                            <input
                                name="vehicleLoanYear"
                                type="text"
                                id="vehicleLoanYear"
                                className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={`10 Years`}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark mt-3" required>
                                <option value="">Select your year</option>
                                <option value={'5yrs'}>5 Years</option>
                                <option value={'10yr'}>10 Years</option>
                                <option value={'15yrs'}>15 Years</option>
                            </select>
                        )}
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleLoan" className="block mb-1 text-md font-bold">
                            Vehicle Loan Amount
                        </label>
                        <input
                            name="vehicleLoan"
                            type="text"
                            id="vehicleLoan"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Loan Amount`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `321654xxxxx` : ``}`}

                            // value={aadharDetails.vehicleLoan}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleNumberInLoanDoc" className="block mb-1 text-md font-bold">
                            Vehicle Number In Loan Doc
                        </label>
                        <input
                            name="vehicleNumberInLoanDoc"
                            type="text"
                            id="vehicleNumberInLoanDoc"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Number In LoanDoc`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `KA-52-2587` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="loanExpiryDate" className="block mb-1 text-md font-bold">
                            Loan Expiry Date
                        </label>
                        <input
                            name="loanExpiryDate"
                            type="date"
                            id="loanExpiryDate"
                            placeholder={`${viewSpecific ? `` : `Enter Loan Expiry Date`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `2024-01-01T09:40:05.000Z` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="lg:w-[20%]">
                    {viewSpecific ? (
                        <div>
                            <div className="flex gap-1">
                                <label htmlFor="vehicleLoan" className="block mb-1 text-md font-bold">
                                    Vehicle Loan
                                </label>
                                {viewSpecific && (
                                    <>
                                        {updatedStatusLoan ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalLoan(true)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                            {vehicleLoanImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleLoan"
                                        key={ind}
                                        className="w-[90%] object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal7(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Loan</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleLoanImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleLoanImg} onChange={handlevehicleLoanImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal7} closeModal={() => setModal7(false)} title={'Vehicle Loan'} files={vehicleLoanImages} />
                </div>
                <UpdateStatus event={modalLoan} closeModal={() => setModalLoan(false)} onSubmit={handleAddUpdateStatusLoan} />
            </div>

            {/* Veh Tax */}
            <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-[80%] flex gap-2">
                    <div className="w-1/4">
                        <label htmlFor="vehicleTaxRto" className="block mb-1 text-md font-bold">
                            Vehicle Tax RTO
                        </label>
                        {viewSpecific ? (
                            <input
                                name="vehicleTaxRto"
                                type="text"
                                id="vehicleTaxRto"
                                className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={`Karnataka RTO`}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark mt-3" required>
                                <option value="">Select your RTO</option>
                                <option value={'KarnatakaRTO'}>Karnataka RTO</option>
                                <option value={'TamilnaduRTO'}>Tamilnadu RTO</option>
                                <option value={'KeralaRTO'}>Kerala RTO</option>
                            </select>
                        )}
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleTax" className="block mb-1 text-md font-bold">
                            Vehicle Tax
                        </label>
                        <input
                            name="vehicleTax"
                            type="text"
                            id="vehicleTax"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Tax`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `321654xxxxx` : ``}`}

                            // value={aadharDetails.vehicleTax}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehicleNumberInTaxDoc" className="block mb-1 text-md font-bold">
                            Vehicle Number In Tax Doc
                        </label>
                        <input
                            name="vehicleNumberInTaxDoc"
                            type="text"
                            id="vehicleNumberInTaxDoc"
                            placeholder={`${viewSpecific ? `` : `Enter Vehicle Number In Tax Doc`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `KA-52-3587` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                    <div className="w-1/4">
                        <label htmlFor="vehTaxExpiryDate" className="block mb-1 text-md font-bold">
                            Vehicle Tax Expiry Date
                        </label>
                        <input
                            name="vehTaxExpiryDate"
                            type="date"
                            id="vehTaxExpiryDate"
                            placeholder={`${viewSpecific ? `` : `Enter Expiry Date`}`}
                            className={`form-input w-full mt-3 ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={`${viewSpecific ? `2024-01-01T09:40:05.000Z` : ``}`}
                            // onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="lg:w-[20%]">
                    {viewSpecific ? (
                        <div>
                            <div className="flex gap-1">
                                <label htmlFor="vehicleTax" className="block mb-1 text-md font-bold">
                                    Vehicle Tax
                                </label>
                                {viewSpecific && (
                                    <>
                                        {updatedStatusTax ? <MdCheckBox className="text-green-600 text-lg" /> : <FaTimesCircle className="text-red-600 text-lg" />}
                                        <button className="btn btn-primary block sm:inline-block text-center mt-0 px-2 py-1 text-xs" onClick={() => setModalTax(true)}>
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                            {vehicleTaxImages?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="vehicleTax"
                                        key={ind}
                                        className="w-[90%] object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal8(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-md font-bold"> - Vehicle Tax</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setvehicleTaxImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleTaxImg} onChange={handlevehicleTaxImg} maxNumber={maxNumber}>
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
                    <CarouselModel event={modal8} closeModal={() => setModal8(false)} title={'Vehicle Icon'} files={vehicleTaxImages} />
                </div>
                <UpdateStatus event={modalTax} closeModal={() => setModalTax(false)} onSubmit={handleAddUpdateStatusTax} />
            </div>
        </>
    );
};

export default VehicleDocLayout;
