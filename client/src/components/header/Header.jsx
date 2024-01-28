// Menu
import { Link } from "react-router-dom"
import Menu from "../menu/Menu"
import { useEffect, useState } from "react"

import {jwtDecode} from 'jwt-decode'

export default function Header() {

  const [userData, setUserData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      try {
        setUserData(jwtDecode(localStorage.getItem('token')))
      }catch(err) {
        console.error(err);
      }
    }

  },[])

  return (
    <header className="fixed left-0 top-0 w-full border-b-2 h-16 bg-white flex items-center px-4">
      <div className="container mx-auto flex items-center">
        <nav className="flex justify-between w-full items-center">
          <Link className="font-bold text-xl" to="/">TUITKF test</Link>
          <Menu />
          {
            userData ? (
              <>
                <button onClick={() => {
                  setIsOpen(!isOpen)
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                  </svg>
                </button>
                {
                  isOpen && (
                    <div className="absolute py-2 rounded-md max-w-[300px] w-full border-2 right-2 top-14 bg-white flex flex-col gap-2">
                      <div className="border-b-2 px-2 pb-2">
                        <h4 className="font-bold">{userData?.name}</h4>
                        <p className="text-xs">{userData?.phone}</p>
                      </div>
                      <div className="px-2 flex items-center gap-2 hover:bg-slate-400 rounded-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                        <Link to='/tests'>Testlar</Link>
                      </div>
                      <div className="px-2 flex items-center gap-2 hover:bg-slate-400 rounded-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
                          <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
                        </svg>
                        <Link target="_blanck" to='https://t.me/Tilavuz'>Developer</Link>
                      </div>
                    </div>
                  )
                }
              </>
            ) : <Link to='/login' className="px-6 py-3 bg-slate-950 text-white rounded-md">Kirish</Link>
          }
        </nav>
      </div>
    </header>
  )
}

