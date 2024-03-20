import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='not-found'>
            <div className='icon'>
                <img src='/vite.svg' alt='Vite icon' />
            </div>
            <div className='content'>
                <h1>Page not available</h1>
                <p>Something went wrong, please try again later.</p>
                <div role='navigation'>
                    <Link className='btn-primary' to='/'>Home</Link>
                    <Link className='btn' to='/help'>Help</Link>
                </div>
            </div>
        </div>
    )
}
