import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);
const startUrl = 'https://i.scdn.co/image/ab67fb8200005caf'
const imageUrls = [
    startUrl + '474a477debc822a3a45c5acb',
    startUrl + 'a862ab80dd85682b37c4e768',
    startUrl + '9e3dea60be755ccd97b7351f',
    startUrl + 'ae7e69beb88f16969641b53e',
    startUrl + '8ba1febbb4f77336b6f9aace',
    startUrl + '04faccb4f5e1828600921f37',
    startUrl + 'e53d71d0920a4f1f441d803c',
    startUrl + '9ed6e364e8839210dc4dbff7',
    startUrl + 'cc1499bbb8565f490858c2bc',
    startUrl + '2b1ff59a971dd399dea96009',
    startUrl + 'f005a355830c374754d32868',
]
const musicGenres = [
    'Rock',
    'Pop',
    'Hip Hop',
    'Jazz',
    'Classical',
    'Electronic',
    'Blues',
    'Country',
    'R&B',
    'Reggae',
    'Folk',
    'Metal',
    'Punk',
    'Indie',
    'Soul',
    'Funk',
    'Techno',
    'House',
    'Dubstep',
    'Disco'
]
export default function Home() {
    const [colors] = useState(Array(20).fill(null).map(generateRandomColor))

    useEffect(() => {
        fetch('/api')
            .then(res => res.text())
            .then(console.log)
            .catch(error => console.error('Error fetching data:', error))
    }, [])

    return (
        <div className='home'>
            {colors.map((color, index) => (
                <Link key={index} to={`/genre/${musicGenres[index]}`} className='card-link'> {/* Change this line */}
                    <div className='card' style={{ background: `#${color}` }}>
                        <img className='card__img' loading='lazy' src={imageUrls[index % imageUrls.length]} alt='' />
                        {musicGenres[index]}
                    </div>
                </Link>
            ))}
        </div>
    )
}
