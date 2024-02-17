import { useEffect, useState } from "react";
import Test from "../../components/test/Test";
import axios from 'axios'
const url = import.meta.env.VITE_APP_BACKEND_URL
import Loading from '../../components/loading/Loading'

export default function Tests() {

  const [authorsData, setAuthorsData] = useState([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    (async () => {
      setIsPending(true)
      try {
        const res = await axios.get(url + '/authors')
        setAuthorsData(res.data)
      }catch (error) {
        console.error(error);
      }finally {
        setIsPending(false)
      }
    })()
  }, [])

  return (
    <div className="py-20 px-2">
      <div className="flex container mx-auto flex-wrap gap-2">
        {
          !isPending ? (
            <>
              {            
                  authorsData?.map((author) => {
                    return <Test key={author._id} id={author._id} name={author.name} science={author?.science} date={author?.date} />
                  })
              }
              {
                authorsData.length === 0 && (
                  <div className="w-full h-[80vh] flex justify-center items-center">
                    <h4 className="font-bold text-2xl text-center">Hali birorta ham test mavjut emas!</h4>
                  </div>
                )
              }
            </>
          ) : (
            <div className="absolute -z-10 top-0 left-0 w-screen h-screen">
              <Loading />
            </div>
          )
        }
      </div>
    </div>
  )
}