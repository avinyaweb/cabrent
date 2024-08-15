import React, { useState, useEffect, ChangeEvent } from 'react'; // Add useEffect here
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface PasswordResetProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const PasswordReset = () => {
    // const [moduleDetails, setModuleDetails] = useState(details);

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     console.log('Input changed:', event.target.name, event.target.value);
    //     setModuleDetails({ ...moduleDetails, [event.target.name]: event.target.value });
    //     onInputChange(event);
    // };

    const location = useLocation();
    const navigate = useNavigate();

    const [seconds, setSeconds] = useState<number>(60);
    const [intervalId, setIntervalId] = useState<number | NodeJS.Timeout | null>(null);
    const [quileContent, setQuileContent] = useState<string>('');

    const setTimerDemo2 = () => {
        const id = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(id);
                    setQuileContent('OTP expired');
                    return 0; // Reset seconds to 0 when timer expires
                }
                return prevSeconds - 1; // Decrement seconds by 1
            });
        }, 1000); // Update every 1 second (1000 milliseconds)

        // Save the interval ID so it can be cleared later
        setIntervalId(id);
    };

    useEffect(() => {
        setTimerDemo2();
        return () => {
            if (typeof intervalId === 'number') {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    const [currentPage, setCurrentPage] = useState<string>('');
    const [showOTPInput, setShowOTPInput] = useState<boolean>(false);
    const [showNewPasswordInput, setShowNewPasswordInput] = useState<boolean>(false);

    const handleSendOTP = () => {
        setShowOTPInput(true);
    };

    const handleVerifyOTP = () => {
        setShowNewPasswordInput(true);
    };

    const handleSubmitForm = () => {
        navigate('/');
    };

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/PasswordReset/PasswordReset' ? 'text-blue-600' : ''
                    }`}
                >
                    Password Reset
                </li>
            </ol>

            {/* <div className="panel mt-6  ">
                <h1 className="text-2xl p-2 font-bold">Password Reset</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5  sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="archiveName" className="block mb-1">
                                Enter Email
                            </label>
                            <input name="email" id="email" type="text" placeholder="example@gmail.com" className="form-input w-full" />
                            <button type="submit" className="btn btn-primary mr-2 mt-3">
                                Send OTP
                            </button>
                        </div>
 
                        <div className="lg:w-1/3" />
                    </div>
 
                    <div className="grid grid-cols-1 mt-5  sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="archiveName" className="block mb-1">
                                Enter OTP
                            </label>
                            <input name="email" id="email" type="text" placeholder="example@gmail.com" className="form-input w-full" />
                            <button type="submit" className="btn btn-primary mr-2 mt-3">
                                Submit
                            </button>
                        </div>
 
                        <div className="lg:w-1/3" />
                    </div>
 
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                New Password
                            </label>
                            <input name="newPassword" type="password" id="newPassword" placeholder="New Password" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3" />
                    </div>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                Confirm Password
                            </label>
                            <input name="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm Password" className="form-input w-full" />
                        </div>
                    </div>
 
                    <div className="flex justify-start mt-6 ">
                        <button type="submit" className="btn btn-primary mr-2">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger">
                            Cancel
                        </button>
                    </div>
                </form>
            </div> */}

            <div className="panel mt-6  ">
                <h1 className="text-2xl p-2 font-bold">Password Reset</h1>
                <form onSubmit={handleSubmitForm}>
                    {!showOTPInput && (
                        <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                            <div className="lg:w-1/3">
                                <label htmlFor="archiveName" className="block mb-1">
                                    Enter Email
                                </label>
                                <input name="email" id="email" type="text" placeholder="example@gmail.com" className="form-input w-full" />
                                <button type="button" className="btn btn-primary mr-2 mt-3" onClick={handleSendOTP}>
                                    Send OTP
                                </button>
                            </div>
                        </div>
                    )}

                    {showOTPInput && !showNewPasswordInput && (
                        <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                            <div className="lg:w-1/3">
                                <label htmlFor="archiveName" className="block mb-1">
                                    Enter OTP
                                </label>

                                <input name="otp" id="otp" type="text" placeholder="Enter OTP" className="form-input w-full" />
                                {seconds > 0 && <h4 className="text-danger text-1xl sm:text-1xl mt-3">OTP will expire in {seconds} seconds</h4>}
                                {quileContent === 'OTP expired' && <p className="text-danger text-1xl sm:text-1xl mt-3">{quileContent}</p>}
                                <div className="flex flex-row">
                                    <button type="button" className="btn btn-primary mr-2 mt-3" onClick={handleVerifyOTP}>
                                        Verify OTP
                                    </button>
                                    <button type="button" className="btn btn-primary mr-2 mt-3" onClick={handleVerifyOTP}>
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showNewPasswordInput && (
                        <>
                            <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                                <div className="lg:w-1/3">
                                    <label htmlFor="archive" className="block mb-1">
                                        New Password
                                    </label>
                                    <input name="newPassword" type="password" id="newPassword" placeholder="New Password" className="form-input w-full" />
                                </div>
                                <div className="lg:w-1/3" />
                            </div>
                            <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                                <div className="lg:w-1/3">
                                    <label htmlFor="archive" className="block mb-1">
                                        Confirm Password
                                    </label>
                                    <input name="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm Password" className="form-input w-full" />
                                </div>
                            </div>
                        </>
                    )}

                    {showNewPasswordInput && (
                        <div className="flex justify-start mt-6 ">
                            <button type="submit" className="btn btn-primary mr-2">
                                Submit
                            </button>
                            <button type="button" className="btn btn-danger">
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};

export default PasswordReset;
