/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {
	nonce: null,
	importAuthors: [],
	// importStep: 'ROOT',
	importStep: 1,
};

const IMPORT_STEP_SET = 'IMPORT_STEP_SET';

registerStore( 'wordpress-importer', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'PROCESS_UPLOAD':
				return {
					...state,
					nonce: action.nonce,
					importAuthors: action.importAuthors,
				};
			case IMPORT_STEP_SET:
				return {
					...state,
					importStep: action.importStep,
				};
		}
		return state;
	},

	actions: {
		setUploadResult( result ) {
			return {
				type: 'PROCESS_UPLOAD',
				nonce: result.nonce,
				importAuthors: result.authors,
			};
		},
		setImportStep( importStep ) {
			console.log( {importStep} );
			return {
				type: IMPORT_STEP_SET,
				importStep,
			};
		},
	},

	selectors: {
		getNonce( state ) {
			return state.nonce;
		},
		getImportAuthors( state ) {
			return state.importAuthors;
		},
		getImportStep( state ) {
			return state.importStep;
		},
	}
} );
