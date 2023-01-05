import { useRouter } from "next/router";
import { useRef, useState } from "react";

export type formType = {
  name: string;
  email: string;
  isMale: boolean;
  isActive: boolean;
};

const create = () => {

  const route = useRouter()

  const [form, setForm] = useState<formType>({
    name: "",
    email: "",
    isMale: false,
    isActive: false,
  } as formType);

  const submit = async (e: React.SyntheticEvent, data: formType) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/create", {
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((_) => {
        setForm({ name: "", email: "", isMale: false, isActive: false });
        route.push('/')
      })
      .catch((e) => console.log("e"));
  };
  return (
    <>
      <div className="bg-slate-800 text-white flex justify-center items-center py-[10px] text-xl tracking-wider">
        <h1> Employee Management system</h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="w-[400px]">
          <button onClick={() => route.push('/')} className="w-fit text-xs px-[15px] py-[7px] border rounded-lg tracking-wide">
            Back Home
          </button>
          <form onSubmit={(e) => submit(e, form)} className="mt-7">
            <div>
              <label
                className="block text-[15px] text-gray-600 mb-1"
                htmlFor=""
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                className="px-[10px] w-full py-[5px] rounded-md border text-[14px] outline-none"
                placeholder="Example"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mt-5">
              <label
                className="block text-[15px] text-gray-600 mb-1"
                htmlFor=""
              >
                Email
              </label>
              <input
                name="email"
                type="text"
                className="px-[10px] w-full py-[5px] rounded-md border text-[14px] outline-none"
                placeholder="example@gmail.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mt-5">
              <label
                className="w-[100px] inline-block text-[15px] text-gray-600 mb-1"
                htmlFor=""
              >
                isMale
              </label>
              <input
                onChange={(e) => setForm({ ...form, isMale: e.target.checked })}
                name="isMale"
                type="checkbox"
              />
            </div>
            <div className="mt-5">
              <label
                className="w-[100px] inline-block text-[15px] text-gray-600 mb-1"
                htmlFor=""
              >
                isActive
              </label>
              <input
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                type="checkbox"
                name="isActive"
              />
            </div>
            <button className="w-100 bg-emerald-600 w-full py-[5px] mt-5">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default create;
