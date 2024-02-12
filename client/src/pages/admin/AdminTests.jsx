

// Components
import AddTest from "../../components/admin/addTest/AddTest"
import AllTests from "../../components/admin/allTests/AllTests"

function AdminTests() {
  return (
    <div className="flex flex-col flex-grow gap-8 py-5 px-8">
        <AddTest />
        <AllTests />
    </div>
  )
}

export default AdminTests