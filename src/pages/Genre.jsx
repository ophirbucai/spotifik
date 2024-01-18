import { useParams } from 'react-router-dom'

export default function Genre() {
    const { id } = useParams()
    return (
        <>{id}</>
    )
}
