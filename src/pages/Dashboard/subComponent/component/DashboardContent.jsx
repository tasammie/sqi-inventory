import Dashboard from "./Dashboard/component"
import DashboardForm from "./UserProfile/componenet/DashboardLayout"


const DashboardContent = () => {
  return (
    <div>
      <Dashboard />
        <main className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
          <div className="container mx-auto">
      
            {/* <div className="flex space-x-4">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Card Title</h2>
                <p className="text-gray-600 dark:text-gray-400">Card content goes here. This is where you can add any text or additional components.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Card Title</h2>
                <p className="text-gray-600 dark:text-gray-400">Card content goes here. This is where you can add any text or additional components.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Card Title</h2>
                <p className="text-gray-600 dark:text-gray-400">Card content goes here. This is where you can add any text or additional components.</p>
              </div>
            </div> */}
            {/* New card ends here */}
            
            {/* Add your other main content here */}
          </div>
        </main> 
    </div>
  )
}

export default DashboardContent
