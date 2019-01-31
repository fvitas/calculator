import './style/index.css'
import { h, render } from 'preact'
import App from './components/app'

render(<App />, document.querySelector('#app'))

if ('serviceWorker' in navigator) {
    window.addEventListener('load',
        () => {
            navigator.serviceWorker.register('/sw.js')
                     .then(() => console.log('Service Worker registration successful'))
        },
        { once: true }
    )
}
