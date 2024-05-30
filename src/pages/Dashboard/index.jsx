import { useGetCurrentUser } from "@/shared/hooks/useGetCurrentUser"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const {currentUser} = useGetCurrentUser
  const navigate = useNavigate()
  console.log(currentUser, "nanana");

  useEffect(() => {
    if (currentUser && !currentUser.email) {
      navigate('auth/login');
    }
  }, [currentUser]);
  
  return (
    <div>hello {currentUser?.firstName + " " + currentUser?.lastName}</div>
  )
}

export default Dashboard
