import { CreateRole } from "@/types/createRoleSchema";
import { RoleIdSchema } from "@/types/roleIdSchema";
import { RolesSchema } from "@/types/rolesSchema";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333"
})

export const getRoles = async () => {
  return (await api.get<RolesSchema[]>('/cargos/list')).data
}

export const createRole = async (data: CreateRole) => {
  await api.post('/cargos/create', data)
}

export const deleteRole = async (data: RoleIdSchema) => {
  await api.delete(`/cargos/delete/${data.id}`)
}

export const updateRole = async (data: RolesSchema) => {
  await api.put(`/cargos/edit/${data.id}`, data)
}
