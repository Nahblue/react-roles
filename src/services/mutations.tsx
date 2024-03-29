import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole, deleteRole, updateRole } from "./api";
import { CreateRole } from "@/types/createRoleSchema";
import { RoleIdSchema } from "@/types/roleIdSchema";
import { RolesSchema } from "@/types/rolesSchema";

export function useCreateRole () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRole) => createRole(data),
    onError: () => console.log('error'),
    onSuccess: () => console.log('success'),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['get-roles'] })
      }
    }
  })
}

export function useDeleteRole () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RoleIdSchema) => deleteRole(data),
    onError: () => console.log('error'),
    onSuccess: () => console.log('success'),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['get-roles'] })
      }
    }
  })
}

export function useUpdateRole () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RolesSchema) => updateRole(data),
    onError: () => console.log('error'),
    onSuccess: () => console.log('success'),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['get-roles'] })
      }
    }
  })
}