'use client'

import { Check, Pencil, Search, X } from "lucide-react";
import { useGetRoles } from "@/services/queries";
import { CreateRoleForm } from "@/components/CreateRoleForm";
import { useEffect, useState } from "react";
import { useDeleteRole, useUpdateRole } from "@/services/mutations";
import { RoleIdSchema } from "@/types/roleIdSchema";
import { RolesSchema } from "@/types/rolesSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRole, createRoleSchema } from "@/types/createRoleSchema";


export default function Roles() {
  const rolesQuery = useGetRoles()
  const deleteRoleMutation = useDeleteRole()
  const updateRoleMutation = useUpdateRole()
  
  const [ search, setSearch ] = useState('')
  const [ filteredItems, setFilteredItems ] = useState<RolesSchema[]>()
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ updateRoleData, setUpdateRoleData ] = useState<RolesSchema>({
    id: '',
    description: ''
  })

  const { handleSubmit, register, formState: { errors }, reset } = useForm<CreateRole>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      description: ''
    }
  })

  const handleDeleteRole = (data: RoleIdSchema) => {
    console.log(data)
    deleteRoleMutation.mutate(data)
  }

  const handleOpenModal = (data :RolesSchema) => {
    console.log(data)
    setUpdateRoleData(data)
    setModalIsOpen(true)
  }

  const handleUpdateSubmit: SubmitHandler<CreateRole> = (data) => {
    console.log(data)
    const editedRole = {
      id: updateRoleData.id,
      description: data.description
    }

    updateRoleMutation.mutate(editedRole)
   
    reset()
    setModalIsOpen(false)
  }
  

  useEffect(() => {
    if (rolesQuery.data) {
      const filtered = rolesQuery.data.filter(role =>
        role.description.includes(search.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [rolesQuery.data, search]);

  return(
    <main className="max-w-2xl max-h-[720px] mx-auto flex flex-col gap-4 pt-6">
      <h1 className='font-bold text-2xl'>Cargos</h1>

      <div className='flex justify-between items-end gap-6'>
        <CreateRoleForm />
        
        <div className="flex gap-2">
          <input 
            onChange={(e) => setSearch(e.target.value)}
            className='border rounded-md p-2'
            type="text" 
            placeholder="Pesquisar um cargo" 
          />
        </div>
      </div>
    
      <div className="overflow-auto" >
        <ul className='divide-y-2 py-2 relative'>
          {filteredItems &&
            filteredItems.map((role) => {
              return (
                <li 
                  key={role.id} 
                  className="flex justify-between items-center p-3 capitalize"
                >
                  {role.description}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenModal(role)} 
                      className="p-2 rounded-md bg-slate-600 text-slate-50 hover:bg-slate-700"
                    >
                      <Pencil />
                    </button>

                    <button 
                      onClick={() => handleDeleteRole(role)} 
                      className="p-2 rounded-md bg-red-500 text-slate-50 hover:bg-red-600"
                    >
                      <X />
                    </button>
                  </div>
                </li>
                
              )
          })}
          {modalIsOpen &&
            <div className="bg-zinc-800 bg-opacity-60 fixed top-0 left-0 z-50 w-screen h-screen flex">
              <div className="m-auto p-12 bg-slate-100 rounded-md">
                <form 
                    className="flex gap-2"
                    onSubmit={handleSubmit(handleUpdateSubmit)}
                  >
                    <input 
                      {...register('description')}
                      className='border rounded-md p-2'
                      type="text" 
                      placeholder="Digite o novo cargo"
                    />
                  <div className="flex gap-2">
                    <button 
                      type="submit"
                      className=" p-2 rounded-md bg-green-500 text-slate-50 hover:bg-green-600"
                    >
                      <Check />
                    </button>
                    <button 
                      onClick={() => setModalIsOpen(false)} 
                      className="p-2 rounded-md bg-red-500 text-slate-50 hover:bg-red-600"
                    >
                      <X />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
        </ul>
      </div>

    </main>
  )
}