import { useCallback, useEffect, useState } from 'react'
import { searchService } from '../services/search.service.js'


/**
 *
 * @param type {'track' | 'album' | 'artist' | 'playlist'}
 * @param id {string}
 */
export const useGetEntity = (type, id) => {
    const [entity, setEntity] = useState(null)
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)
    const onError = (msg) => {
        setEntity(null)
        setStatus('error')
        setError(msg)
    }

    const fetchEntity = useCallback(async () => {
        if (id) {
            const { data, status, error } = await searchService.getEntityById(type, id)
            switch (status) {
                case 'error':
                    onError(error)
                    break
                case 'success':
                    setEntity(data)
                    setStatus(status)
                    break
            }
        }

    }, [type, id])

    useEffect(() => {
        fetchEntity()

    }, [id, fetchEntity])

    return {
        [type]: entity,
        status,
        error,
        refetch: fetchEntity
    }
}


