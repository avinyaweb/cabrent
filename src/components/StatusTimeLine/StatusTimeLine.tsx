import Tippy from '@tippyjs/react';
import React from 'react';

const StatusTimeLine = () => {
    return (
        <Tippy content="Currently Ticket is Closed">
            <div className="flex items-center justify-center space-x-1">
                <div className="timeline-item flex flex-col items-center text-center">
                    <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                    <p className="text-xs mt-1 text-white-dark dark:text-white-light font-semibold">Open</p>
                    <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">24 hrs ago</p>
                </div>
                <div className="h-0.5 bg-gray-300 w-2 my-auto"></div>
                <div className="timeline-item flex flex-col items-center text-center">
                    <div className="w-5 h-5 rounded-full bg-yellow-300"></div>
                    <p className="text-xs mt-1 text-white-dark dark:text-white-light font-semibold">Inprogress</p>
                    <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">4 hrs ago</p>
                </div>
                <div className="h-0.5 bg-gray-300 w-2 my-auto"></div>
                <div className="timeline-item flex flex-col items-center text-center">
                    <div className="w-5 h-5 rounded-full bg-blue-300"></div>
                    <p className="text-xs mt-1 text-[#3b3f5c] text-md font-bold dark:text-white-light">Closed</p>
                    <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">2 hrs ago</p>
                </div>
                <div className="h-0.5 bg-gray-300 w-2 my-auto"></div>
                <div className="timeline-item flex flex-col items-center text-center">
                    <div className="w-5 h-5 rounded-full bg-green-300"></div>
                    <p className="text-xs mt-1 text-white-dark dark:text-white-light font-semibold">Re Open</p>
                    <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">N/A</p>
                </div>
                <div className="h-0.5 bg-gray-300 w-2 my-auto"></div>
                <div className="timeline-item flex flex-col items-center text-center">
                    <div className="w-5 h-5 rounded-full bg-green-300"></div>
                    <p className="text-xs mt-1 text-white-dark dark:text-white-light font-semibold">Completed</p>
                    <p className="text-xs text-white-dark font-bold self-center min-w-[100px] max-w-[100px]">N/A</p>
                </div>
            </div>
        </Tippy>
    );
};

export default StatusTimeLine;
