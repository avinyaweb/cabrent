import React, { useEffect } from 'react';
import { FileUploadWithPreview } from 'file-upload-with-preview';

const MultyFileUpload = () => {
    useEffect(() => {
        // Initialize multiple image upload
        new FileUploadWithPreview('mySecondImage', {
            images: {
                baseImage: '',
                backgroundImage: '',
            },
            multiple: true,
        });
    }, []);

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="panel">
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultyFileUpload;
