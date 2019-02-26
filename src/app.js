/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './store';
import InputScreen from './input-screen';
import AuthorMapping from './author-mapping';
import ImportComplete from './import-complete';
import StepRedirect from './step-redirect';

class App extends PureComponent {
	render() {
		console.log( this.props.importStep );
		const step = this.props.importStep

		return (
			<Router>
				<Switch>
					<div>
						<Link to="/">/</Link><br />
						<Link to="/map">/map</Link><br />
						<Link to="/complete">/complete</Link><br />
						<Route exact path="/" component={ InputScreen } />
						{ false && step >= 2 && <Route path="/map" component={ AuthorMapping } /> }
						{ false && step >= 3 && <Route path="/complete" component={ ImportComplete } /> }
						{ true && <Route path="/map" render={ props => step >= 2 ? <AuthorMapping { ...props } /> : <Redirect to="/" /> } /> }
						{ true && <Route path="/complete" render={ props => step >= 3 ? <ImportComplete { ...props }/> : <Redirect to="/map" /> } /> }
						<Redirect from="*" to="/" />
					</div>
				</Switch>
			</Router>
		);
	}
}

// export default App;

export default withSelect(
	select => ( {
		importStep: select( 'wordpress-importer' ).getImportStep(),
	} )
)( App );