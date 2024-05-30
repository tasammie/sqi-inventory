import DashboardContent from '@/pages/Dashboard/subComponent/component/DashboardContent'
import DashboardLayout from '@/pages/Dashboard/subComponent/component/DashboardLayout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardRoute = () => {
  return (
    <div >
      <DashboardLayout>
      <Outlet />
      </DashboardLayout>

      
    </div>
  )
}

export default DashboardRoute
