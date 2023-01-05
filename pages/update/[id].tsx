import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { formType } from "../create";
import { prisma } from "./../../lib/prisma";

type PropType = {
  employee: formType;
};

type fetchContextType = {
  params: { id: string };
};

const create = ({ employee }: PropType) => {
  const route = useRouter();

  const [form, setForm] = useState<formType>({
    name: employee.name,
    email: employee.email,
    isMale: employee.isMale,
    isActive: employee.isActive,
  } as formType);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/api/${route.query.id}/update`, {
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((_) => {
        route.push("/");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      <div className="bg-slate-800 text-white flex justify-center items-center py-[10px] text-xl tracking-wider">
        <h1> Employee Management system</h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="w-[400px]">
          <button
            onClick={() => route.push("/")}
            className="w-fit text-xs px-[15px] py-[7px] border rounded-lg tracking-wide"
          >
            Back Home
          </button>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-7">
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
                defaultValue={employee.name}
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
                defaultValue={employee.email}
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
                defaultChecked={employee.isMale}
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
                defaultChecked={employee.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
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

export async function getServerSideProps({ params }: fetchContextType) {
  const emp = await prisma.employee.findUnique({
    where: {
      id: params.id,
    },
  });


  return {
    props: {
      employee: emp,
    },
  };
}
