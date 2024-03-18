import Form from "../../components/faq/Form"
import Questions from "../../components/faq/Questions"


// Componentns

function Faq() {

  

  return (
    <div className="container pt-32 px-2 pb-12 items-start mx-auto flex flex-col gap-8">
        <Questions />
        <Form />
    </div>
  )
}

export default Faq