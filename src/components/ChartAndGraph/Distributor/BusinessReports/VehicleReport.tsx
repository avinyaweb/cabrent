import Dropdown from '@/components/Dropdown';
import IconEye from '@/components/Icon/IconEye';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import { IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

const VehicleReport = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <>
            <div className="panel bg-gradient-to-r from-violet-500 to-violet-400  text-white">
                <div className="flex justify-between">
                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Vehicles</div>
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
                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 1060 </div>
                    <div className="badge bg-white/30">- 1.35% </div>
                </div>
                <div className="flex items-center font-semibold mt-5">
                    <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                    Bangalore
                </div>
            </div>
        </>
    );
};

export default VehicleReport;
