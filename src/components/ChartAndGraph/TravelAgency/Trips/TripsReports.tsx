import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/themeConfigSlice';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import IconCreditCard from '@/components/Icon/IconCreditCard';
import IconDollarSign from '@/components/Icon/IconDollarSign';
import IconTag from '@/components/Icon/IconTag';
import IconEye from '@/components/Icon/IconEye';

const TripsReports = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                <div className="panel bg-gradient-to-r  from-fuchsia-500 to-fuchsia-400  text-white">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Trips</div>
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
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 1084 </div>
                        <div className="badge bg-white/30">- 1.35% </div>
                    </div>
                    <div className="flex items-center font-semibold mt-5">
                        <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        This Week 30,789
                    </div>
                </div>

                <div className="panel bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">On-Going Trips</div>
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
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 1057 </div>
                        <div className="badge bg-white/30">+ 1.35% </div>
                    </div>
                    <div className="flex items-center font-semibold mt-5">
                        <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        This Week 37,894
                    </div>
                </div>

                {/* Sessions */}
                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400  text-white">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Scheduleded Trips</div>
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
                        This Week 1022
                    </div>
                </div>

                {/*  Time On-Site */}

                {/* Bounce Rate */}
                <div className="panel bg-gradient-to-r from-violet-500 to-violet-400  text-white">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Cancelled Trips</div>
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
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 15 </div>
                        <div className="badge bg-white/30">- 1.35% </div>
                    </div>
                    <div className="flex items-center font-semibold mt-5">
                        <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Last Week 150
                    </div>
                </div>
            </div>
        </>
    );
};

export default TripsReports;
