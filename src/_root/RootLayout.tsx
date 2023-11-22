import AuthContext from "@/context/AuthProvider"
import { useContext } from "react"


const RootLayout = () => {
  const { userData } = useContext(AuthContext)
  return (
    <img src={userData?.user.avatar} className="rounded-full w-24 h-24" alt={`${userData?.user.username} avatar`} />
  )
}

export default RootLayout