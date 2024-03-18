import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import { useState, useEffect } from 'react'
const url = import.meta.env.VITE_APP_BACKEND_URL;



function Form() {

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    phone: '',
    message: '',
    ip: ''

  })
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      setUserData(jwtDecode(isToken));
    }
  }, []);

  function handleUserMsg(e) {
    const {name, value} = e.target
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(url + '/user/faq', userData)
      setNotification(res.data.msg);
      setTimeout(() => {
        setNotification(null)
      },3000)
      setUserData(prev => {
        return {
          ...prev,
          message: ''
        }
      })
    }catch (err) {
      console.log(err);
      setNotification('Habaringiz yuborilmadi');
      setTimeout(() => {
        setNotification(null)
      },3000)
    }finally {
      setLoading(false)
    }

  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start">
      <p className="py-4 font-bold text-4xl">Savolingiz bormi?</p>
      <input className="px-2 py-1 border rounded-md border-black" value={userData?.name} onChange={handleUserMsg} name="name" type="text" placeholder="Ismingiz ?" autoComplete="off" disabled={!userData?.id}/>
      <textarea className="border rounded-md border-black px-2 py-1" name="message" value={userData?.message} onChange={handleUserMsg} cols="30" rows="10" placeholder="Savolingiz ?" disabled={!userData?.id}></textarea>
      <p className={`${notification ? 'font-bold text-xs text-lime-500' : 'none'}`}>{notification ? notification : ''}</p>  
      <button type='submit' className={`border px-2 py-1 rounded bg-slate-950 text-white ${userData?.id ? '' : 'opacity-70'}`} disabled={!userData?.id}>{`${loading ? 'loading...' : 'Yuborish'}`}</button>
    </form>
  )
}

export default Form