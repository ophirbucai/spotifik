import { useParams } from 'react-router-dom'
import { useGetEntity } from '../hooks/useGetEntity'

export default function Artist() {
    const { id } = useParams()
    const { artist } = useGetEntity('artist', id)
    console.log(artist)

    return (
        <>
            {artist && <div><h1>{artist.name}</h1>{'Haven\'t you heard? Listen to her songs:'}</div>}
            {/* TODO: Add a list of songs by this artist */}
        </>
    )
}
