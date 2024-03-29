'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Plus } from "lucide-react";
import { useCreateRole } from "@/services/mutations";
import { CreateRole, createRoleSchema } from "@/types/createRoleSchema";
import { ToastContainer, toast } from "react-toastify";



export function CreateRoleForm() {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<CreateRole>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      description: ''
    }
  })
  const createRoleMutation = useCreateRole()

  const handleCreateSubmit: SubmitHandler<CreateRole> = (data) => {
    console.log(data)
    createRoleMutation.mutate(data)
   
    reset()
    toast.success("Cargo criado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
  

  return(
    <div>
      <form onSubmit={handleSubmit(handleCreateSubmit)} className='flex'>
        <input 
          {...register('description')}
          className='border rounded-l-md p-2'
          type="text" 
          placeholder="Criar um cargo" 
        />

        <button 
          type="submit"
          className='flex gap-1 items-center justify-center p-2 bg-slate-600 hover:bg-slate-700 text-slate-50 rounded-r-md'
        >
          Criar
          <Plus />
        </button>
      </form>
      <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  )
}