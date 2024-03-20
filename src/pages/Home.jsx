import { useEffect, useState } from 'react'
import { randomColor } from '../utils/randomColor.js'
export default function Home() {
    const [colors] = useState(Array(80).fill(null).map(randomColor.hex))
    useEffect(() => {
        fetch('/api').then(res => res.text()).then(console.log)
    }, [])

    return (
        <div className='home'>
            {colors.map((color) =>
                <div className='card' style={{ background: `#${color}` }} key={color}></div>
            )}
        </div>
    )
}
