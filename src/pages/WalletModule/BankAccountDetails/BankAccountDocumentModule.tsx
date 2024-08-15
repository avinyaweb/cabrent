import React, { useState, ChangeEvent } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
interface BankAccountProps {
    details: {
        accountNumber: string;
        panNumber: string;
        voterId: string;
        aadhar: string;
        verificationHistory: string;
        archive: string;
        approvedBy: string;
        approvedAt: string;
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const BankAccountDocumentModule: React.FC<BankAccountProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const BankPBImages = [{ title: 'Front Image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj8HRvBHJ7gTR4U0iUTOyF3gY7IILn2f-YsxKEiXO3ZlJDSD2KPceOk0owJ2cBwsFYGAY&usqp=CAU' }];
    const cancelledCQImages = [{ title: 'Front Image', url: 'https://d6xcmfyh68wv8.cloudfront.net/learn-content/uploads/2024/02/cancelled-cheque-image.webp' }];

    // states.
    const [bankPBImage, setBankPBImage] = useState<any>([]);
    const [cancelledCQImage, setCancelledCQImage] = useState<any>([]);
    const maxNumber = 69;

    // handle image upload.
    const handleBankPBImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setBankPBImage(imageList as never[]);
    };
    // handle image upload.
    const handleChequeImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setCancelledCQImage(imageList as never[]);
    };
    return (
        <>
            {/* Documents.  Cancelled Cheque*/}
            <div>
                <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 ">
                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="panNumber" className="block mb-1">
                            PAN Number
                        </label>
                        <input
                            name="panNumber"
                            type="text"
                            id="panNumber"
                            placeholder="Enter PAN Number"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={`${viewSpecific ? `PAN321651` : ``}`}
                            // value="ABCDE1234F"
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div>

                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="voterId" className="block mb-1">
                            Voter ID
                        </label>
                        <input
                            name="voterId"
                            type="text"
                            id="voterId"
                            placeholder="Enter Voter ID"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={`${viewSpecific ? `ID321654` : ``}`}
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div>

                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="aadhar" className="block mb-1">
                            Aadhar Number
                        </label>
                        <input
                            name="aadhar"
                            type="text"
                            id="aadhar"
                            placeholder="Enter Aadhar Number"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={`${viewSpecific ? `5876 6544 1234` : ``}`}
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:flex justify-between items-start gap-5 mt-6 mb-6">
                    {viewSpecific ? (
                        <div className="lg:w-1/2 ">
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-lg font-bold">
                                Cancelled Cheque Image
                            </label>
                            {BankPBImages?.map((data, ind) => {
                                return (
                                    <div className="w-1/2" key={data?.title}>
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
                        <div className="lg:w-1/2">
                            <div className="mb-5">
                                <div className="custom-file-container" data-upload-id="mySecondImage">
                                    <div className="label-container">
                                        <label>
                                            Upload <span className="text-black font-bold text-lg"> - Bank Pass Book Image</span>{' '}
                                        </label>
                                        {bankPBImage.length > 0 ? (
                                            <button
                                                type="button"
                                                className="custom-file-container__image-clear"
                                                title="Clear Image"
                                                onClick={() => {
                                                    setBankPBImage([]);
                                                }}
                                            >
                                                ×
                                            </button>
                                        ) : null}
                                    </div>
                                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <ImageUploading multiple value={bankPBImage} onChange={handleBankPBImg} maxNumber={maxNumber}>
                                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                            <div className="upload__image-wrapper">
                                                <div className="custom-file-container__custom-file__custom-file-control cursor-pointer " onClick={onImageUpload}>
                                                    Choose File
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
                        </div>
                    )}
                    {/* ==== */}

                    {viewSpecific ? (
                        <div className="lg:w-1/2">
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-lg font-bold">
                                Cancelled Cheque Image
                            </label>
                            {cancelledCQImages?.map((data, ind) => {
                                return (
                                    <div className="w-1/2" key={data?.title}>
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
                        <div className="lg:w-1/2">
                            <div className="mb-5">
                                <div className="custom-file-container" data-upload-id="mySecondImage">
                                    <div className="label-container">
                                        <label>
                                            Upload <span className="text-black font-bold text-lg"> - Cancelled Cheque Image</span>{' '}
                                        </label>
                                        {cancelledCQImage.length > 0 ? (
                                            <button
                                                type="button"
                                                className="custom-file-container__image-clear"
                                                title="Clear Image"
                                                onClick={() => {
                                                    setCancelledCQImage([]);
                                                }}
                                            >
                                                ×
                                            </button>
                                        ) : null}
                                    </div>
                                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <ImageUploading multiple value={cancelledCQImage} onChange={handleChequeImg} maxNumber={maxNumber}>
                                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                            <div className="upload__image-wrapper">
                                                <div className="custom-file-container__custom-file__custom-file-control cursor-pointer " onClick={onImageUpload}>
                                                    Choose File
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
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BankAccountDocumentModule;
