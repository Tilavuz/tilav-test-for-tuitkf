import { useState } from "react"
import axios from 'axios'
const url = import.meta.env.VITE_APP_BACKEND_URL

export default function Login() {


  const [code, setCode] = useState({
    loginCode: ''
  })

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await axios.post(url + '/login', code)
      localStorage.setItem('token', res.data)
      window.location = '/'
    }catch(err) {
      console.error(err);
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
    <form onSubmit={handleSubmit} className="flex pt-20 flex-col justify-center items-center h-screen px-4 gap-4">
      <h3 className="font-bold text-4xl">Kodni kiring</h3>
      <p className="text-center max-w-[600px]"><a className="underline decoration-red-700 underline-offset-4" href="https://t.me/tuitkf_login_bot">Tuitkf login bot</a> ga kiring va 6 xonali kodingizni oling. Eslatma: Kodingiz eskirmaydi agar zarurat tug'ilmasa kodingizni yangilamang. </p>
      <div className="flex gap-2">
        <input name="loginCode" onChange={handleInput} className="border-2 py-2 px-4 rounded-md outline-slate-950" type="text" placeholder="Enter code" />
        <button type="submit" className="bg-slate-950 text-white py-2 px-4 rounded-md">Tasdiqlash</button>
      </div>
    </form>
  )
}
