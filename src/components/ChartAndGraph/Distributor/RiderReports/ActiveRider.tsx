import Dropdown from '@/components/Dropdown';
import IconEye from '@/components/Icon/IconEye';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import IconTrendingUp from '@/components/Icon/IconTrendingUp';
import { IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

const ActiveRider = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <>
            {/* <div className="panel h-full">
                <div className="flex justify-between dark:text-white-light mb-5">
                    <h5 className="font-semibold text-lg ">Total Rides</h5>

                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="hover:text-primary"
                            button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                        >
                            <ul>
                                <li>
                                    <button type="button">This Week</button>
                                </li>
                                <li>
                                    <button type="button">Last Week</button>
                                </li>
                                <li>
                                    <button type="button">This Month</button>
                                </li>
                                <li>
                                    <button type="button">Last Month</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className=" text-[#e95f2b] text-3xl font-bold my-10">
                    <span>10,141 </span>
                    <span className="text-black text-sm dark:text-white-light ltr:mr-2 rtl:ml-2">this week</span>
                    <IconTrendingUp className="text-success inline" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                        <div
                            className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                            style={{ width: '65%' }}
                        ></div>
                    </div>
                    <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                </div>
            </div> */}
            <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400  text-white">
                <div className="flex justify-between">
                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Today Rides</div>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="hover:opacity-80"
                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                        >
                            <ul className="text-black dark:text-white-dark">
                                <li>
                                    <button type="button">View Report</button>
                                </li>
                                <li>
                                    <button type="button">Edit Report</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 325 </div>
                    <div className="badge bg-white/30">+ 3.35% </div>
                </div>
                <div className="flex items-center font-semibold mt-5">
                    <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                    Last Week 31,702
                </div>
            </div>
        </>
    );
};

export default ActiveRider;
