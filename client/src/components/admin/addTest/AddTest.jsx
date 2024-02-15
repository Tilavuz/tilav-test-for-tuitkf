import { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_APP_BACKEND_URL;

function AddTest() {
  const [author, setAuthor] = useState({
    name: "",
    science: "",
  });

  const [authorId, setAuthorId] = useState(null);
  const [token, setToken] = useState(null);
  const [file, setFile] = useState(null);
  const [isAdded, setIsAdded] = useState(false)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      setToken(isToken);
    }
  }, []);

  function handleFile(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  function handleInput(e) {
    const { name, value } = e.target;

    setAuthor((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function addTest(e) {
    e.preventDefault();
    try {
      setIsPending(true)
      if (!file) {
        console.error("Fayl tanlanmagan");
        return;
      }
      if (!authorId) {
        console.error("Muallif aniqlanmagan");
        return;
      }

      const formData = {
        test: file,
        author: authorId._id,
      };

      await axios.post(url + "/test", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsAdded(true)
      setTimeout(() => {
        setIsAdded(false)
      },1500)

      
    } catch (err) {
      console.error(err);
    }finally {
      setIsPending(false)
    }
  }

  async function addAuthor(e) {
    e.preventDefault();
    try {
      const res = await axios.post(url + "/author", author, {
        headers: {
          "x-auth-token": token,
        },
      });
      setAuthorId(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 pb-20 border-b-2">
      <h3 className="font-bold text-2xl text-center">
        {authorId
          ? `Muallif: ${authorId.name}`
          : "Test qo'shish uchun muallifning malumotlarini kiriting!"}
      </h3>
      {authorId ? (
        <form
          onSubmit={addTest}
          className="flex flex-col gap-4 max-w-[600px] w-full items-start border-2 p-8"
        >
          <input
            className="border-2 px-2 py-1 rounded-md w-full"
            type="text"
            value={authorId._id}
            disabled
          />
          <label className="cursor-pointer border-2 px-2 py-1 flex items-center gap-2 font-bold">
            {file ? (
              <span>Selected file: {file.name}</span>
            ) : (
              <>
                <span>Choose File</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-folder2-open"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />
                </svg>
              </>
            )}
            <input
              type="file"
              name="file"
              className="hidden"
              onChange={handleFile}
            />
          </label>
          <button className="border-2 px-2 py-1" type="submit">
            {
              isPending ? 'loading...' : isAdded ? 'Biriktirildi ✅' : 'Biriktirish'
            }
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => addAuthor(e)}
          className="flex flex-col gap-4 max-w-[600px] w-full items-start border-2 p-8"
        >
          <input
            className="border-2 px-2 py-1 rounded-md w-full"
            value={author.name}
            onChange={handleInput}
            type="text"
            name="name"
            placeholder="Muallifning ism familyasi"
            autoComplete="off"
            required
          />
          <input
            className="border-2 px-2 py-1 rounded-md w-full"
            value={author.science}
            onChange={handleInput}
            type="text"
            name="science"
            placeholder="Fan nomi"
            autoComplete="off"
            required
          />
          <button className="border-2 px-2 py-1" type="submit">
            Kiritish
          </button>
        </form>
      )}
    </div>
  );
}

export default AddTest;
