import Dropdown from '@/components/Dropdown';
import IconCircleCheck from '@/components/Icon/IconCircleCheck';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import { IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

const TripTicketsReports = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <>
            <div className="panel overflow-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg font-bold">Trip Tickets</div>
                        <div className="text-success"> This Week</div>
                    </div>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="hover:opacity-80"
                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                        >
                            <ul>
                                <li>
                                    <button type="button">This Month</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="relative mt-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-primary">Rased Tickets</div>
                            <div className="mt-2 font-semibold text-2xl">150</div>
                        </div>
                        <div>
                            <div className="text-primary">Resolved Tickets</div>
                            <div className="mt-2 font-semibold text-2xl">125</div>
                        </div>
                        <div>
                            <div className="text-primary">Pending Tickets</div>
                            <div className="mt-2 font-semibold text-2xl">25</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TripTicketsReports;
