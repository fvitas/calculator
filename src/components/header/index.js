import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'

export const Header = () => (
	<header className={style.header}>
		<nav>
			<Link activeClassName={style.active} href='/'>Calculator</Link>
			<Link activeClassName={style.active} href='/profile'>Me</Link>
			<Link activeClassName={style.active} href='/profile/john'>John</Link>
		</nav>
	</header>
)
