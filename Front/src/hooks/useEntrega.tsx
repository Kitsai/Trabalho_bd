import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { PedidoEntrega } from "../models/entrega/entrega.model";
import { PedidoEntregaCreateDTO, PedidoEntregaUpdateDTO } from "../models/entrega/entrega.dto";


export function useEntrega() {
  const { data, loading, error, fetchData } = useFetch<PedidoEntrega[]>();

  const getEntrega = useCallback(async (id?: number): Promise<PedidoEntrega | PedidoEntrega[]> => {
    const endpoint = id ? `/entrega/${id}` : '/entrega';
    return await fetchData(endpoint, 'GET');
  }, [fetchData])

  const createEntrega = useCallback(async (entregaData: PedidoEntregaCreateDTO): Promise<PedidoEntrega> => {
    return await fetchData('/entrega', 'POST', entregaData)
  }, [fetchData])

  const updateEntrega = useCallback(async (entregaData: PedidoEntregaUpdateDTO): Promise<PedidoEntrega> => {
    return await fetchData('/entrega', 'PUT', entregaData);
  }, [fetchData])

  const deleteEntrega = useCallback(async (id: number): Promise<PedidoEntrega> => {
    return await fetchData(`/entrega/${id}`, 'DELETE');
  }, [fetchData])

  return {
    data,
    loading,
    error,
    getEntrega,
    createEntrega,
    updateEntrega,
    deleteEntrega,
  };
}

