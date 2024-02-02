import PropTypes from 'prop-types';
import { useState } from 'react';


function QuestionCard({ question, options, correct_answer }) {

  const [clickButton, setClickButton] = useState(true)

  function correctAnswer(option, e) {
    if(correct_answer !== option) {
      e.target.classList.add('bg-red-600')
    }else {
      e.target.classList.add('bg-lime-500')
    }
    setClickButton(false)
  }

  return (
    <div className='p-2 shadow w-full rounded-md flex flex-col gap-2'>
        <h5 className='font-bold'>{question}</h5>
        <div className='p-2 rounded-md flex flex-col gap-2'>
          {
            options?.map((option, i) => {
              return (
                <button key={i} className='flex cursor-pointer' onClick={(e) => {
                  clickButton && correctAnswer(option, e)
                }}>
                  <span>{i + 1})</span>
                  <span className='w-full text-start rounded-sm px-2'>{option}</span>
                </button>
              )
            })
          }
        </div>
    </div>
  )
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  correct_answer: PropTypes.string.isRequired
}

export default QuestionCard