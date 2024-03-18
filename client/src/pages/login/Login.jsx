import { useState } from "react"
import axios from 'axios'
const url = import.meta.env.VITE_APP_BACKEND_URL

export default function Login() {


  const [code, setCode] = useState({
    loginCode: ''
  })
  const [isPending, setIsPending] = useState(false)
  const [notification, setNotification] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setIsPending(true)
      const res = await axios.post(url + '/login', code)
      localStorage.setItem('token', res.data)
      window.location = '/tests'
    }catch(err) {
      setNotification("Kodda xatolik bor!")
      setTimeout(() => {
        setNotification('')
      }, 2500)
    }finally {
      setIsPending(false)
    }
  }



  function handleInput(e) {
    const { name, value } = e.target

    setCode((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  return (
    <form onSubmit={handleSubmit} className="flex pt-20 md:pt-0 flex-col justify-center items-center h-screen px-4 gap-4">
      <h3 className="font-bold text-4xl">Kodni kiring</h3>
      <p className="text-center max-w-[600px]"><a className="underline decoration-red-700 underline-offset-4" href="https://t.me/tuitkf_login_bot">Tuitkf login bot</a> ga kiring va 6 xonali kodingizni oling. Eslatma: Kodingiz eskirmaydi agar zarurat tug'ilmasa kodingizni yangilamang. </p>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <input maxLength={6} name="loginCode" onChange={handleInput} className="border-2 py-2 px-4 rounded-md outline-slate-950" type="password" placeholder="Enter code" required autoComplete="off" disabled={isPending}/>
          <button type="submit" className="bg-slate-950 text-white py-2 px-4 rounded-md">
            {
              isPending ? 'loading...' : 'Tasdiqlash'
            }
          </button>
        </div>
        <p className="text-red-500 rounded-md font-bold text-sm">{notification}</p>
      </div>
    </form>
  )
}
