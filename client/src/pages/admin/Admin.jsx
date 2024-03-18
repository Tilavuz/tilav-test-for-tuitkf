import axios from "axios";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_APP_BACKEND_URL;

function Admin() {

  const [token, setToken] = useState(null)
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    const isToken = localStorage.getItem('token')
    if(isToken) {
      setToken(isToken)
    }
  }, [])

  useEffect(() => {
    async function getMessage() {
      try {
        await axios.get(url + '/admin/msg', {
            headers: {
                'x-auth-token': token
            }
        }).then((res) => {
          setMessages(res.data)
        })
    }catch (err) {
        console.error(err);
    }
    }
    if(token) {
      getMessage()
    }
  }, [token])


  return (
    <div className="min-h-screen flex flex-col gap-4 p-4">
        <h2>Habarlar: {messages?.length}</h2>
        <ul className="flex gap-4 flex-wrap">
          {
            messages?.map((message, i) => {
              return <li className="shadow p-2 rounded w-[300px] flex flex-col" key={i}>
                <span className="font-bold">{message.name}</span>
                <span className="text-xs">+{message.phone}</span>
                <span>{message.message}</span>
              </li>
            })
          }
        </ul>
    </div>
  )
}

export default Admin