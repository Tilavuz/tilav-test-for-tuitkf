import axios from "axios"
import { useEffect, useState } from "react"
import Test from "../test/Test"
import PropTypes from 'prop-types';

const url = import.meta.env.VITE_APP_BACKEND_URL



function Search({ openSearch }) {


    const [authorsData, setAuthorsData] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [value, setValue] = useState('')

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
    <div className="absolute w-screen h-screen top-0 left-0 backdrop-blur-sm rounded-lg flex justify-center items-start" onClick={(e) => {
        openSearch()
        e.stopPropagation()
    }}>
        <div className="bg-slate-50 mx-2 mt-4 md:mt-12 max-w-[600px] w-full min-h-[300px] shadow-lg flex flex-col" onClick={(e) => {
            e.stopPropagation()
        }}>
            <div className="flex border-b-2 items-center">
                <span className="w-16 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
                </span>
                <input className="bg-inherit w-full py-4 outline-none placeholder:italic" type="search" placeholder="Test qidirish" onChange={(e) => setValue(e.target.value)}/>
                <button onClick={openSearch} className="text-sm bg-slate-600 text-white py-1 px-2 rounded-md mx-2 font-bold">Esc</button>
            </div>
            <div className="flex flex-col p-4 gap-4">
                <h4 className="font-bold">Testlar</h4>
                <div className="flex flex-col min-h-[160px] py-4 items-center gap-2 border-2">
                    {
                        !isPending ? (
                            value && authorsData?.filter(author => {
                                return author.name.toLowerCase().includes(value.toLowerCase().trim()) || author.science.toString().toLowerCase().includes(value.toLowerCase().trim())
                            }).map(author => {
                                return <Test key={author._id} id={author._id} name={author.name} science={author?.science} date={author?.date} openSearch={openSearch} />;
                            })
                        ) : (
                            
                            <div className="flex w-full h-[160px] justify-center items-center" role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>

                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}


Search.propTypes = {
    openSearch: PropTypes.func.isRequired
  };

export default Search