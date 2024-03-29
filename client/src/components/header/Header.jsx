import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'

const url = import.meta.env.VITE_APP_BACKEND_URL

// Menu
import Menu from "../menu/Menu"
import Search from "../search/Search"


export default function Header() {

  const [userData, setUserData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditName, setIsEditName] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [search, setSearch] = useState(false)

  const handleNameInput = (e) =>  {
    const { name, value } = e.target

    setUserData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function openSearch() {
    setSearch(!search)
  }

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      setToken(isToken);
    }
  }, []);

  async function editName() {
    try {
      setLoading(true)
      await axios.put(url + '/user', userData, {
        headers: {
          'x-auth-token': token
        }
      }).then(res => {
        localStorage.setItem('token', res.data)
      }).catch(err => {
        console.error(err);
      })
    }catch(err) {
      console.error(err);
    }finally {
      setIsEditName(false)
      setLoading(false)
    }
  }

  function logOut() {
    setToken(null)
    localStorage.removeItem('token')
    window.location = '/'
  }
  
  useEffect(() => {
    if(token) {
      try {
        setUserData(jwtDecode(token))
      }catch(err) {
        console.error(err);
      }
    }
  },[token])

  document.body.addEventListener('click', () => {
    setIsOpen(false)
  })

  return (
    <header className="fixed left-0 top-0 w-full border-b-2 h-16 bg-white flex items-center px-4">
      <div className="container mx-auto flex items-center">
        <nav className="flex justify-between w-full items-center">
          <Link className="font-bold font-serif text-xl" to="/"><span className="">TUITKF</span> <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-tr-3xl rounded-bl-3xl">beta</span></Link>
          <Menu />
          {
            userData ? (
              <>
                <button onClick={(e) => {
                  setIsOpen(!isOpen)
                  e.stopPropagation()
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                  </svg>
                </button>
                {
                  isOpen && (
                    <div className="absolute py-2 rounded-md max-w-[300px] w-full border-2 right-2 top-14 bg-white flex flex-col gap-2">
                      <div className="border-b-2 px-2 pb-2">
                        <div className="flex justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                          {
                            isEditName ? (
                              <>
                                <input maxLength={20} className="border-2 px-1 w-[70%]" type="text" name="name" value={userData?.name} onChange={handleNameInput}/>
                                <button className="rounded-md px-2 bg-slate-950 text-white" onClick={(e) => {
                                  editName()
                                  e.stopPropagation()
                                }}>{loading ? 'loading...' : 'Saqlash'}</button>
                              </>
                            ) : (
                              <>
                                <h4 className="font-bold">{userData?.name}</h4>
                                <button onClick={(e) => {
                                  setIsEditName(true)
                                  e.stopPropagation()
                                }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                  </svg>
                                </button>
                              </>
                            )
                          }
                        </div>
                        <p className="text-xs">+{userData?.phone}</p>
                      </div>
                      <Link to='/tests' className="px-2 flex items-center gap-2 hover:bg-slate-400 rounded-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                        <span>Testlar</span>
                      </Link>
                      <Link to='/faq' className="px-2 flex items-center gap-2 hover:bg-slate-400 rounded-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-octagon" viewBox="0 0 16 16">
                          <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                        </svg>
                        <span>Faq</span>
                      </Link>
                      <Link target="_blanck" to='https://t.me/Tilavuz' className="px-2 flex items-center gap-2 hover:bg-slate-400 rounded-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-code-slash" viewBox="0 0 16 16">
                          <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
                        </svg>
                        <span>Dasturchi</span>
                      </Link>
                      <button onClick={openSearch} className="px-2 flex items-center gap-2 hover:bg-slate-400 rounded-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        <span>Qidiruv</span>
                      </button>
                      <div className="px-2 pt-4 pb-2 border-t-2">
                        <button className="text-white rounded px-4 py-1 font-bold bg-gray-950 w-full" onClick={logOut}>Chiqish</button>
                      </div>
                    </div>
                  )
                }
              </>
            ) : <Link to='/login' className="px-6 py-3 bg-slate-950 text-white rounded-md">Kirish</Link>
          }
        </nav>
      </div>
      {
        search && <Search openSearch={openSearch} />
      }
    </header>
  )
}

