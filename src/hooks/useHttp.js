import { useState, useEffect } from 'react';

export function useHttp ({ url }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData()
    }, [url]);

    async function getData() {
        try {
            setIsLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { data, isLoading, error };
}