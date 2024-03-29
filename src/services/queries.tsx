import { getRoles } from "./api"
import {  useQuery } from "@tanstack/react-query"

export function useGetRoles() {
  return useQuery({
    queryKey: ['get-roles'],
    queryFn: getRoles,
  })
}

