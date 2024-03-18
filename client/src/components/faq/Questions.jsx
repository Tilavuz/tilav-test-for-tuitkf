import { useState } from "react";
import { questions } from "./questions";
import { v4 as uuidv4 } from "uuid";
function Questions() {
  const [number, setNumber] = useState(null);

  function handleBtn(e, i) {
    if (i === number) {
      setNumber(null);
    } else {
      setNumber(i);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-3xl font-bold">Ko'p Beriladigan Savollar</p>
        <span className="font-thin">Yana savolingiz bo'lsa bizga yuboring!</span>
      </div>
      <div className="flex flex-col gap-4">
        {questions?.map((question, i) => {
          return (
            <button
              onClick={(e) => handleBtn(e, i)}
              className={`text-left px-2 flex flex-col gap-2 overflow-hidden ${
                number === i ? "anime" : "h-[30px]"
              } border-b transition-all`}
              key={uuidv4()}
            >
              <span className="font-bold">{question.question}</span>
              <p className="font-thin">{question.answer}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
