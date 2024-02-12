import { Outlet } from "react-router-dom"
import Menu from "../components/admin/menu/Menu"

export default function RootLayout() {
  return (
    <div className="flex"> 
      <Menu />
      <div className="ml-[300px] flex-grow">
        <Outlet />
      </div>
    </div>
  )
}