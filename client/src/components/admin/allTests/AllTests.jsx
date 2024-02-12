import { useEffect, useState } from "react"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'

// Url
const url = import.meta.env.VITE_APP_BACKEND_URL


function AllTests() {

  const [tests, setTests] = useState(null)

  useEffect(() => {
    (async () => {
      await axios.get(url + '/authors', {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      }).then(res => {
        setTests(res.data);
      }).catch(err => {
        console.error(err);
      })
    })()
  }, [])

  async function deleteTest(id) {
    try {
      await axios.delete(url + `/author/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      })
    }catch(err) {
      console.error(err);
    }
  }


  return (
    <div className="flex gap-x-4 gap-y-8 flex-wrap">
      {
        tests?.map(test => {
          return <div className="shadow" key={uuidv4()}>
            <h6 className="h-[200px] w-[300px] border-b-2 text-4xl font-bold flex justify-center items-center bg-slate-300 text-center"><span>{test.science}</span></h6>
            <ul className="px-2 py-4">
                <li><span className="font-bold">Muallif: </span>{test.name}</li>
                <li><span className="font-bold">Sanasi: </span>{test.date.slice(0,10)}</li>
            </ul>
            <div className="flex gap-2 px-2 pb-2">
              <button className="px-1 py-2 flex w-full justify-center gap-3 font-bold items-center bg-red-500 rounded-md" onClick={() => deleteTest(test._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default AllTests