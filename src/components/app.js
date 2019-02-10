import { h, Component } from 'preact'
import { Router } from 'preact-router'

import { Header } from './header'
import { Calculator } from '../routes/calculator'
import { CurrencyConverter } from '../routes/currency/converter'

export class App extends Component {

	handleRoute = e => {
		this.currentUrl = e.url
	}

	render() {
		return (
			<div>
				<Header />
				<Router onChange={this.handleRoute}>
					<Calculator path="/"/>
					<CurrencyConverter path="/currency" />
				</Router>
			</div>
		)
	}
}
