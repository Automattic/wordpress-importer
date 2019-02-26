/**
 * External dependencies
 */
import React, { memo } from 'react';
import { withRouter } from 'react-router'
import { withSelect } from '@wordpress/data';
import { Link, Redirect } from 'react-router-dom';

const STEPS = {
	ROOT: 'ROOT',
	AUTHOR_MAPPING: 'AUTHOR_MAPPING',
	IMPORT_COMPLETED: 'IMPORT_COMPLETED',
};
const STEP_ROUTES = {
	ROOT: '/',
	AUTHOR_MAPPING: '/map',
	IMPORT_COMPLETED: '/complete',
};
const STEP_ORDER = [ STEP_ROUTES.ROOT, STEP_ROUTES.AUTHOR_MAPPING, STEP_ROUTES.IMPORT_COMPLETED ];

// const isRouteAllowed = ( { importStep, routeStep } ) => STEP_ORDER.indexOf( routeStep ) <= STEP_ORDER.indexOf( importStep );
const isRouteAllowed = ( { importStep, route } ) => console.log( STEP_ORDER.indexOf( route ), STEP_ORDER.indexOf( STEP_ROUTES[ importStep ] ) ) ||
	STEP_ORDER.indexOf( route ) <= STEP_ORDER.indexOf( STEP_ROUTES[ importStep ] );

const getRedirectTarget = ( { importStep, route } ) => STEP_ROUTES[ importStep || STEPS.ROOT ];

const getRoute = ( location = {} ) => location.pathname;

const StepRedirect = ( { importStep, ...props } ) => {
	const route = getRoute( props.location );
	const isAllowed = isRouteAllowed( { importStep, route } );

	console.log( {
		props,
		isRouteAllowed: isAllowed,
		importStep,
		redirectTarget: getRedirectTarget( { importStep, route } ),
		route: getRoute( props.location ),
	} );

	alert( 'isAllowed: ' + isAllowed )

	return isAllowed
		? null
		: <Redirect to={ getRedirectTarget( { importStep, route } ) } />;
}


export default withSelect(
	select => ( {
		importStep: select( 'wordpress-importer' ).getImportStep(),
	} )
)( withRouter( StepRedirect ) );