import React from 'react';
import './index.less';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

const ResumeSkeleton: React.FC<SkeletonProps> = ({ className, style }) => {
  return (
    <div className={`resume-skeleton ${className || ''}`} style={style}>
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-info">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
      <div className="skeleton-content">
        {[1, 2, 3].map(item => (
          <div key={item} className="skeleton-module">
            <div className="skeleton-module-title"></div>
            <div className="skeleton-module-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeSkeleton;
