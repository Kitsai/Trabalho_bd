import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { Entregador } from "../models/entregador/Entregador.model";
import { EntregadorDTO } from "../models/entregador/Entregador.dto";


export function useEntregador() {
  const { data, loading, error, fetchData } = useFetch<Entregador[]>();

  const getEntregador = useCallback(async (id?: number): Promise<Entregador | Entregador[]> => {
    const endpoint = id ? `/entregador/${id}` : '/entregador';
    return await fetchData(endpoint, 'GET');
  }, [fetchData])

  const createEntregador = useCallback(async (entregadorData: EntregadorDTO): Promise<Entregador> => {
    return await fetchData('/entregador', 'POST', entregadorData)
  }, [fetchData])

  const updateEntregador = useCallback(async (entregadorData: Entregador): Promise<Entregador> => {
    return await fetchData('/entregador', 'PUT', entregadorData);
  }, [fetchData])

  const deleteEntregador = useCallback(async (id: number): Promise<Entregador> => {
    return await fetchData(`/entregador/${id}`, 'DELETE');
  }, [fetchData])

  return {
    data,
    loading,
    error,
    getEntregador,
    createEntregador,
    updateEntregador,
    deleteEntregador,
  };
}
