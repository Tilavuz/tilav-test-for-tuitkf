import { useEffect, useState } from "react";
import Test from "../../components/test/Test";
import axios from 'axios'
const url = import.meta.env.VITE_APP_BACKEND_URL

export default function Tests() {

  const [authorsData, setAuthorsData] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url + '/authors')
        setAuthorsData(res.data)
      }catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
    <div className="py-20 px-2">
      <div className="flex container mx-auto flex-wrap gap-2">
        {
          authorsData?.map((author, i) => {
            return <Test key={i} id={author._id} name={author.name} science={author.science} date={author.date} />
          })
        }
      </div>
    </div>
  )
}