import { h, Component } from 'preact'
import { Router } from 'preact-router'

import { Header } from './header'
import { Profile } from '../routes/profile'
import { Calculator } from '../routes/calculator'

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
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		)
	}
}
