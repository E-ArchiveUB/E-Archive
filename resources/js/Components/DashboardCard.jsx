import React from 'react'

const DashboardCard = ( {title, icon, point, description}) => {
  return (
      <div className="bg-white shadow-md p-4 rounded-lg border-[0.1px] border-customBlue border-opacity-80 flex flex-col gap-2">
          <div className='flex flex-row justify-between'>
              <h3 className="text-gray-700 text-md font-semibold">{title}</h3>
              <div>{icon}</div>
          </div>

          <p className="text-2xl font-bold">{point}</p>
          <p className="text-gray-400 text-xs font-semibold">{description}</p>
      </div>
  );
}

export default DashboardCard
