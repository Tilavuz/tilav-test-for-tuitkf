import { NavLink } from "react-router-dom"

function Menu() {
  return (
    <menu className="fixed left-0 top-0 w-[300px] h-screen bg-black flex flex-col gap-4 p-2">
        <div className="border-b-2 p-2">
            <h4 className="text-white text-4xl font-bold">Root</h4>
        </div>
        <ul className="flex flex-col gap-y-4 text-white">
            <li><NavLink className="px-2 hover:bg-white hover:text-black transition-all block" to='/admin/users'>Users</NavLink></li>
            <li><NavLink className="px-2 hover:bg-white hover:text-black transition-all block" to='/admin/tests'>Tests</NavLink></li>
        </ul>
    </menu>
  )
}

export default Menu