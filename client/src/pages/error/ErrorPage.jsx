import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-2">
      <div className="text-center shadow-2xl shadow-black max-w-[600px] w-full max-h-[400px] h-full flex justify-center items-center flex-col">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-2 text-xl font-semibold">Xatolik: Sahifa topilmadi</p>
        <br />
        <Link className="text-red-600 decoration-red-600 underline" to='/'>Bosh Sahifa</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
