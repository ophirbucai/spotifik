import { useEffect, useState } from "react"

const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16)

export default function Home() {
    const [colors] = useState(Array(80).fill(null).map(generateRandomColor))
    useEffect(() => {
        fetch('/api').then(res => res.text()).then(console.log)
    }, [])

    return (
        <div className="home">
            {colors.map((color) =>
                <div className="card" style={{ background: `#${color}` }} key={color}>Hex #{color}</div>
            )}
        </div>
    )
}
