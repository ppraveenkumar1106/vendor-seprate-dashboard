import React, {useState} from 'react'
import WebTrafficChart from './WebTrafficChart';

function WebTraffic() {
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter);
    };
  return (
    <div className='card'>
      <div className='card-body pb-0'>
        <h5 className='card-title'>
          WebSite Traffic <span>| {filter}</span>
        </h5>
        <WebTrafficChart />
      </div>
    </div>
  )
}

export default WebTraffic
