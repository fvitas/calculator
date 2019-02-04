import './assets/index.styl'
import { h, render } from 'preact'
import { App } from './components/app'
import './assets/fonts/font.styl'

render(<App/>, document.querySelector('#app'))

if ('serviceWorker' in navigator) {
    window.addEventListener('load',
        () => {
            navigator.serviceWorker.register('/sw.js')
                     .then(() => console.log('Service Worker registration successful'))
        },
        { once: true }
    )
}
