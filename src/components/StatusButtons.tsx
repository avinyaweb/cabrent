import React from 'react';

interface StatusButtonProp {
    title: string;
}

const StatusButtons: React.FC<StatusButtonProp> = ({ title }) => {
    // future code -->>
    // const [approved, setApproved] = useState(false);
    // const [pending, setPending] = useState(false);
    // const [reject, setReject] = useState(false);
    // const [hold, setHold] = useState(false);
    // const [suspendedArchive, setSuspendedArchive] = useState(false);

    return (
        <div className="grid grid-cols-1 sm:flex justify-between gap-5">
            <div className="lg:w-1/2 ">
                <label htmlFor="roleName" className="block mb-1">
                    {title}
                </label>
                <div className="flex gap-3 items-center ">
                    <button type="button" className="btn btn-success text-xs ">
                        APPROVED
                    </button>

                    <button type="button" className="btn btn-warning text-xs opacity-60 ">
                        PENDING
                    </button>

                    <button type="button" className="btn btn-secondary text-xs opacity-60 ">
                        REJECT
                    </button>

                    <button type="button" className="btn btn-danger text-xs opacity-60 ">
                        HOLD
                    </button>

                    <button type="button" className="btn btn-dark text-xs opacity-60">
                        SUSPENDED/ARCHIVE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusButtons;
