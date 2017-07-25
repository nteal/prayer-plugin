<?php
/*
Plugin Name: PrayerList Plugin
Description: React.JS Prayers in WordPress!
Author: Alice
Author URI: aplai168@gmail.com
*/

add_shortcode( 'prayer', 'prayer_function' );
function prayer_function() {
	return '<div id="quiz">here is the prayer plugin</div>';
}

add_action( 'wp_enqueue_scripts', 'wpshout_react_quiz_enqueue_scripts' );
function wpshout_react_quiz_enqueue_scripts() {
	// if( ! is_single( 10742 ) ) {
	// 	return;
	// }

	wp_enqueue_script( 'react', plugin_dir_url( __FILE__ ) . 'react/build/react.js' );
	wp_enqueue_script( 'react-dom', plugin_dir_url( __FILE__ ) . 'react/build/react-dom.min.js' );
	wp_enqueue_script( 'babel', 'https://npmcdn.com/babel-core@5.8.38/browser.min.js', '', null, false );
	wp_enqueue_script( 'style', plugin_dir_url( __FILE__ ) . 'src/style.js' );
	wp_enqueue_script( 'quiz', plugin_dir_url( __FILE__ ) . 'src/index.js' );
	wp_enqueue_script( 'axios', plugin_dir_url( __FILE__ ) . 'node_modules/axios/dist/axios.js' );

	wp_enqueue_style( 'quiz', plugin_dir_url( __FILE__ ) . 'src/prayer.css' );
}

// Add "babel" type to quiz script
add_filter( 'script_loader_tag', 'wpshout_react_quiz_add_babel_type', 10, 3 );
function wpshout_react_quiz_add_babel_type( $tag, $handle, $src ) {
	if ( $handle !== 'quiz' ) {
		return $tag;
	}

	return '<script src="' . $src . '" type="text/babel"></script>' . "\n";
}
