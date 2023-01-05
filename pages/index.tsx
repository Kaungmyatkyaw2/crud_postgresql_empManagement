import { GetServerSideProps } from "next";
import { prisma } from "../lib/prisma";
import { formType } from "./create";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";

type empType = formType & { id: number };

type PropType = {
  employee: empType[];
};

export default function Home({ employee }: PropType) {
  const route = useRouter();

  const refreshPage = () => {
    route.push(route.asPath);
  };

  const del = (id: number) => {
    fetch(`http://localhost:3000/api/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((_) => refreshPage())
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="bg-slate-800 text-white flex justify-center items-center py-[10px] text-xl tracking-wider">
        <h1> Employee Management system</h1>
      </div>

      <div className="flex justify-center mt-12">
        <div>
          <button
            onClick={() => route.push("/create")}
            className="w-fit text-xs px-[15px] py-[7px] border rounded-lg tracking-wide"
          >
            Add Employee
          </button>

          <table className="w-auto border mt-5">
            <thead className="bg-slate-800 text-white">
              <tr>
                <td className="px-10 py-[10px]">Id</td>
                <td className="px-10 py-[10px]">Name</td>
                <td className="px-10 py-[10px]">Email</td>
                <td className="px-10 py-[10px]">Gender</td>
                <td className="px-10 py-[10px]">Status</td>
                <td className="px-10 py-[10px]">Actions</td>
              </tr>
            </thead>
            <tbody>
              {employee.map((i, index) => (
                <tr key={index} className="border-b hover:bg-emerald-500 hover:text-white">
                <td className="px-10 text-light text-sm py-[15px]">
                  {index + 1}
                </td>
                <td className="px-10 text-light text-sm py-[15px]">
                  {i.name}
                </td>
                <td className="px-10 text-light text-sm py-[15px]">
                  {i.email}
                </td>
                <td className="px-10 text-light text-sm py-[15px]">
                  {i.isMale ? "Male" : "Female"}
                </td>
                <td className="px-10 text-light text-sm py-[15px]">
                  {i.isActive ? "Active" : "Offline"}
                </td>
                <td>
                  <div className="flex justify-center space-x-[20px]">
                    <div className="bg-slate-800 text-white p-[5px] rounded-md" onClick={() => del(i.id)}>
                      <AiOutlineDelete className="cursor-pointer text-[17px]" />
                    </div>
                    <div className="bg-slate-800 text-white p-[5px] rounded-md" onClick={() => route.push(`/update/${i.id}`)}>
                      <AiOutlineEdit className="cursor-pointer text-[17px]" />
                    </div>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const em = await prisma.employee.findMany({
    select: { id: true, email: true, isMale: true, isActive: true, name: true,order : true },
    orderBy : {order : "asc"}
  });
  return { props: { employee: em } };
};
