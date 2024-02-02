import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

 function Test({ name, id, science, date }) {

  return (
    <Link to={`/authors/${id}/tests`} className='shadow'>
        <h6 className="h-[200px] w-[300px] border-b-2 text-4xl font-bold flex justify-center items-center bg-slate-300"><span>{science}</span></h6>
        <ul className="px-2 py-4">
            <li><span className="font-bold">Muallif: </span>{name}</li>
            <li><span className="font-bold">Sanasi: </span>{date.slice(0,10)}</li>
        </ul>
    </Link>
  )
}

Test.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  science: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};


export default Test