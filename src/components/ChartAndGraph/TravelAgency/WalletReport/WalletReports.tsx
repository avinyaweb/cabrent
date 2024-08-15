import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '@/components/Dropdown';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconPlus from '@/components/Icon/IconPlus';
import IconEye from '@/components/Icon/IconEye';
import IconCreditCard from '@/components/Icon/IconCreditCard';
import IconChrome from '@/components/Icon/IconChrome';
import IconSafari from '@/components/Icon/IconSafari';
import IconGlobe from '@/components/Icon/IconGlobe';

const WalletReports = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    return (
        <>
            <h5 className="font-semibold text-lg">Wallet Details</h5>
            <div className="grid xl:grid-cols-3 gap-6 mb-6">
                <div className=" h-full sm:col-span-3 xl:col-span-2">
                    <div className="flex items-start justify-between mb-5">
                        <h5 className="">Payment Type</h5>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="flex items-center">
                            <div className="w-9 h-9">
                                <div className="bg-primary/10 text-primary rounded-xl w-9 h-9 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                    <IconChrome className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="px-3 flex-initial w-full">
                                <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                    <h6>Bank Withdraw</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto text-xs">658₹</p>
                                </div>
                                <div>
                                    <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                        <div
                                            className="bg-gradient-to-r from-[#009ffd] to-[#2a2a72] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                            style={{ width: '65%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-9 h-9">
                                <div className="bg-danger/10 text-danger rounded-xl w-9 h-9 flex justify-center items-center dark:bg-danger dark:text-white-light">
                                    <IconSafari className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="px-3 flex-initial w-full">
                                <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                    <h6>Subscription</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto text-xs">400₹</p>
                                </div>
                                <div>
                                    <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                        <div
                                            className="bg-gradient-to-r from-[#a71d31] to-[#3f0d12] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                            style={{ width: '40%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-9 h-9">
                                <div className="bg-warning/10 text-warning rounded-xl w-9 h-9 flex justify-center items-center dark:bg-warning dark:text-white-light">
                                    <IconGlobe className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="px-3 flex-initial w-full">
                                <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                    <h6>Trip payment Recived</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto text-xs">254₹</p>
                                </div>
                                <div>
                                    <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                        <div
                                            className="bg-gradient-to-r from-[#fe5f75] to-[#fc9842] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                            style={{ width: '25%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-9 h-9">
                                <div className="bg-warning/10 text-warning rounded-xl w-9 h-9 flex justify-center items-center dark:bg-warning dark:text-white-light">
                                    <IconGlobe className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="px-3 flex-initial w-full">
                                <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                    <h6>Money Added</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto text-xs">155₹</p>
                                </div>
                                <div>
                                    <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                        <div
                                            className="bg-gradient-to-r from-[#fe5f75] to-[#fc9842] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                            style={{ width: '15%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                    style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                >
                    <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                        <h5 className="font-semibold text-lg">Walllet Balance </h5>

                        <div className="relative text-xl whitespace-nowrap">
                            3564₹
                            <span className="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto">Today</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between z-10">
                        <div className="flex items-center justify-between">
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                <IconPlus />
                            </button>
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                <IconCreditCard />
                            </button>
                        </div>
                        <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#4361ee] z-10">
                            Active
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WalletReports;
