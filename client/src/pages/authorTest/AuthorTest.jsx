import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// Components
import QuestionCard from "../../components/questionCard/QuestionCard";

const url = import.meta.env.VITE_APP_BACKEND_URL;

function AuthorTest() {
    const { authorId } = useParams();
    const [token, setToken] = useState(null);
    const [testsData, setTestsData] = useState(null);
    const [beginCounter, setBeginCounter] = useState(0);
    const [endCounter, setEndCounter] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);
    const testsPerPage = 25;

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const fetchTestsData = async () => {
            try {
                const res = await axios.get(url + `/authors/${authorId}/tests`, {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setTestsData(res.data[0].test);
            } catch (error) {
                console.error(error);
            }
        };
        
        if (token) {
            fetchTestsData();
        }
    }, [authorId, token]);

    // Pagination logikasi
    const handlePaginationClick = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        setBeginCounter(pageNumber * testsPerPage);
        setEndCounter((pageNumber * testsPerPage) + testsPerPage);
    }, [testsPerPage]);

    return (
        <div className="py-20 flex flex-col gap-8">
            {
                token ? (
                    <>
                        <div className="flex gap-2 justify-center flex-wrap">
                            {Array.from({ length: Math.ceil(testsData?.length / testsPerPage) }, (_, i) => (
                                <button
                                    key={uuidv4()}
                                    className={`px-4 py-2 border-2 ${i === currentPage ? 'bg-slate-600 text-white' : ''}`}
                                    onClick={() => handlePaginationClick(i)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <div className="container mx-auto flex flex-col gap-4">
                            {testsData?.slice(beginCounter, endCounter)?.map((test, i) => (
                                <QuestionCard key={uuidv4()} question={`${i + 1}) ${test.question}`} options={test.options.sort(() => Math.random() - 0.5)} correct_answer={test.correct_answer} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="w-full h-[80vh] flex justify-center items-center">
                        <h4 className="font-bold text-2xl">Test yechish uchun saytga kirishingiz kerak!</h4>
                    </div>
                )
            }
        </div>
    );
}

export default AuthorTest;
