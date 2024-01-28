import { NavLink } from "react-router-dom"


const menu = [
    {
        title: 'Bosh sahifa',
        link: '/'
    },
    {
        title: 'Testlar',
        link: '/tests'
    }
]


function Menu() {
  return (
    <ul className=" hidden md:flex md:gap-x-8 md:items-center">
        {
            menu.map((item, i) => {
                return <li key={i}><NavLink className="py-2 px-4 rounded-md" to={item.link}>{item.title}</NavLink></li>
            })
        }
    </ul>
  )
}

export default Menu