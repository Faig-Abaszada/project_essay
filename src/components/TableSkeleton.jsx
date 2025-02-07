import React from 'react';
import { Skeleton } from '@mui/material';
import '../assets/styles/components/tableSkeleton.scss';

const TableSkeleton = ({ loading, rowsPerPage = 5, columns = 3 }) => {
    if (!loading) return null;

    return (
            <div className="skeleton-overlay">
                {/* Header Skeleton */}
                <div className="header-skeleton">
                    {Array.from({ length: columns }).map((_, index) => (
                        <Skeleton key={index} variant="rounded" width={150} height={30} className="skeleton-item" />
                    ))}
                </div>

                {/* Row Skeleton */}
                {Array.from({ length: rowsPerPage }).map((_, rowIndex) => (
                    <div key={rowIndex} className="row-skeleton">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Skeleton key={colIndex} variant="rounded" width={150} height={40} className="skeleton-item" />
                        ))}
                    </div>
                ))}
            </div>
    );
};

export default TableSkeleton;
