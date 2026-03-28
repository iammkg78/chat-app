import React from 'react'
import Sidebar from '../Components/Sidebar.jsx'
import Messages from '../Components/Messages.jsx'

function Home() {
  return (
   <div className='min-w-full h-full flex'> 
<Sidebar/>
<Messages />
    </div>
  )
}

export default Home