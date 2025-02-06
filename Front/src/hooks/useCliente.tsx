import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { Cliente } from "../models/cliente/cliente.model";
import { ClienteDTO } from "../models/cliente/cliente.dto";


export function useCliente() {
  const { data, loading, error, fetchData } = useFetch<Cliente[]>();

  const getCliente = useCallback(async (id?: number): Promise<Cliente | Cliente[]> => {
    const endpoint = id ? `/cliente/${id}` : '/cliente';
    return await fetchData(endpoint, 'GET');
  }, [fetchData])

  const createCliente = useCallback(async (clienteData: ClienteDTO): Promise<Cliente> => {
    return await fetchData('/cliente', 'POST', clienteData)
  }, [fetchData])

  const updateCliente = useCallback(async (clienteData: Cliente): Promise<Cliente> => {
    return await fetchData('/cliente', 'PUT', clienteData);
  }, [fetchData])

  const deleteCliente = useCallback(async (id: number): Promise<Cliente> => {
    return await fetchData(`/cliente/${id}`, 'DELETE');
  }, [fetchData])

  return {
    data,
    loading,
    error,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
  };
}
