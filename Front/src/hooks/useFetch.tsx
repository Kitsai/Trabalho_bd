import axios from 'axios';
import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../lib/axios';

export function useFetch<T = any>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      controllerRef.current?.abort();
    }
  }, [])

  const fetchData = useCallback(async (url: string, method = 'GET', payload: any = null, config: any = {}) => {

    controllerRef.current = new AbortController();

    try {
      if (isMounted.current) {
        setLoading(true);
        setError(null);
      }

      const response = await api.request({
        url,
        method,
        data: payload,
        ...config,
        signal: config.signal || controllerRef.current.signal
      });

      if (isMounted.current) {
        setData(response.data);
      }
      return response.data;
    } catch (err: any) {
      if (!axios.isCancel(err) && isMounted.current) {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      if (isMounted.current)
        setLoading(false);
    }
  }, [])

  useEffect(() => {
    return () => controllerRef.current?.abort()
  }, [])

  return { data, loading, error, fetchData };
}
