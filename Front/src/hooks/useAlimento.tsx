import { useCallback } from "react";
import { useFetch } from "./useFetch";
import { Alimento } from "../models/alimento/alimento.model";


export function useAlimento() {
  const { data, loading, error, fetchData } = useFetch<Alimento[]>();

  const getAlimentos = useCallback(async (id?: number): Promise<Alimento[]> => {
    return await fetchData('/alimentos', 'GET');
  }, [fetchData])
  return {
    data,
    loading,
    error,
    getAlimentos
  };
}
