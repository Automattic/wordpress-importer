<?php
/*
 * Load code specific to importing content
 */
function jetpack_site_importer_init() {
	// @TODO probably move this to a dedicated redirects module...?
	if ( ! post_type_exists( 'jetpack-redirect' ) ) {
		register_post_type( 'jetpack-redirect', array( 'rewrite' => false ) );
	}

	add_action( 'rest_api_init', function() {
		require plugin_dir_path( __FILE__ ) . 'class-wp-rest-imports-controller.php';

		register_post_type( 'jetpack_file_import', array(
			'public'                => false,
			'rest_controller_class' => 'WP_REST_Jetpack_Imports_Controller',
			'rest_base'             => 'jetpack-file-imports',
			'show_in_rest'          => true,
		) );

	} );
}

add_action( 'init', 'jetpack_site_importer_init' );
