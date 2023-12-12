import React from 'react';

type CardType = {
    title: any;
    content: any;
    icon?: any;
}

const DashboardCard = ({ title, content, icon }: CardType) => {
  // Your component logic here

  return (
    // Your JSX return statement here
    <div className='col-4'>
        <div className='border border-1 rounded-1 p-lg-5 p-md-3 p-2'>
            <div className='d-flex justify-content-center'>
                {icon ? icon && React.cloneElement(icon, { className: 'fs-1 mb-2' }) : <></>}
            </div>
            <p className='m-0 fw-medium text-center'>{title}</p>
            <p className='m-0 fs-4 text-center'>{content}</p>
        </div>
    </div>
  );
};

export default DashboardCard;