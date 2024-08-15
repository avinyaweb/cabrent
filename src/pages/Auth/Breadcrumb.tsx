import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
    label: string;
    to: string;
    className: string;
}

interface BreadcrumbProps {
    navItems: NavItem[];
    currentPage: string;
    setCurrent: (path: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ navItems, currentPage, setCurrent }) => {
    return (
        <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
            {navItems.map((item, index) => (
                <li key={index} className={item.className}>
                    <Link to={item.to} className={currentPage === item.to ? 'active' : ''} onClick={() => setCurrent(item.to)}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ol>
    );
};

export default Breadcrumb;
