import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const url = import.meta.env.VITE_APP_BACKEND_URL
import { v4 as uuidv4 } from 'uuid'

// Components
import QuestionCard from "../../components/questionCard/QuestionCard"


function AuthorTest() {
    const { authorId } = useParams()
    const [testsData, setTestsData] = useState(null)
    const [beginCounter, setBeginCounter] = useState(0)
    const [endCounter, setEndCounter] = useState(25)
    const [currentPage, setCurrentPage] = useState(0); 
    const testsPerPage = 25
    const countPage = Math.round(testsData?.length / testsPerPage)
    const poginationArr = Array.from({ length: countPage }, (_, i) => i + 1)
    const datas = testsData?.slice(beginCounter, endCounter)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(url + `/authors/${authorId}/tests`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                })
                setTestsData(res.data[0].test)
            }catch(error) {
                console.error(error);
            }
        })()
    }, [authorId])

  return (
    <div className="py-20 flex flex-col gap-8">
        {
            localStorage.getItem('token') ? (
                <>
                    <div className="flex gap-2 justify-center flex-wrap">
                        {
                            poginationArr.map((_, i) => {
                                return <button className={`px-4 py-2 border-2 ${i === currentPage ? 'bg-slate-600 text-white' : ''}`} key={uuidv4()} onClick={() => {
                                    setCurrentPage(i)
                                    setBeginCounter(i * testsPerPage)
                                    setEndCounter((i * testsPerPage) + testsPerPage)
                                }}>{i + 1}</button>
                            })
                        }
                    </div>
                    <div className="container mx-auto flex flex-col gap-4">
                        {
                            datas?.map((test,i) => {
                                return <QuestionCard key={uuidv4()} question={`${i + 1}) ${test.question}`} options={test.options.sort(() => Math.random() - 0.5)} correct_answer={test.correct_answer} />
                            })
                        }
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full h-[80vh] flex justify-center items-center">
                        <h4 className="font-bold text-2xl">Test yechish uchun saytga kirishingiz kerak!</h4>
                    </div>
                </>
            )
        }
    </div>
  )
}

export default AuthorTest