import { useEffect, useState } from 'react'

export const useColorBlotter = (id) => {
    const [color, setColor] = useState(getColorFromLocalStorage())

    const onImageLoad = (e) => {
        const untaintedImage = e.target
        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.src = untaintedImage.src
        image.onload = () => !color && getDominantColor(image)
        image.onerror = () => setColor('18 18 18')
    }
    const getDominantColor = (image) => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = image.width
        canvas.height = image.height
        context.drawImage(image, 0, 0)
        const data = context.getImageData(0, 0, image.width, image.height).data
        const r = []
        const g = []
        const b = []
        data.forEach((v, i) => {
            if (v < 24 || i % 4 === 3) return
            if (i % 4 === 0) r.push(v)
            if (i % 4 === 1) g.push(v)
            if (i % 4 === 2) b.push(v)
        })
        const avg = (arr) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
        const dominantColor = [avg(r), avg(g), avg(b)]
        saveColorToLocalStorage(dominantColor)
        setColor(`${dominantColor[0]} ${dominantColor[1]} ${dominantColor[2]}`)
    }

    function saveColorToLocalStorage(dominantColor) {
        localStorage.setItem('idColorPair', JSON.stringify({
            ...JSON.parse(localStorage.getItem('idColorPair')),
            [id]: dominantColor
        }))
    }

    function getColorFromLocalStorage() {
        const idColorPair = JSON.parse(localStorage.getItem('idColorPair'))
        if (idColorPair && idColorPair[id]) {
            return `${idColorPair[id][0]} ${idColorPair[id][1]} ${idColorPair[id][2]}`
        }
    }

    useEffect(() => {
        setColor(getColorFromLocalStorage())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return { onImageLoad, color }
}