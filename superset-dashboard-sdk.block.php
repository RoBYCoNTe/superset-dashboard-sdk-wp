<?php
function sds_enqueue_styles()
{
	wp_enqueue_style('sds-dashboard-block-style', plugins_url('block.css', __FILE__));
}

function sds_enqueue_scripts()
{
	// I need to add react and react-dom to the page
	wp_enqueue_script('sds-dashboard-react', 'https://unpkg.com/react@17/umd/react.production.min.js');
	wp_enqueue_script('sds-dashboard-react-dom', 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js');
	wp_enqueue_script('sds-dashboard-script', plugins_url('scripts.js', __FILE__));
}

function sds_enqueue_block_editor_assets()
{
	wp_enqueue_script(
		'sds-dashboard-block',
		plugins_url('block.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n')
	);
}

function sds_render_dashboard($attributes)
{
	$dashboard_id = $attributes['dashboardId'];
	// $custom_parameters = $attributes['customParameters'];

	$username = get_option('sds_settings')['username'];
	$password = get_option('sds_settings')['password'];
	$endpoint = get_option('sds_settings')['endpoint'];

	$template = "<div class='sds-dashboard-container' id='sds-dashboard-{$dashboard_id}'>Loading...</div>";
	$template .= "<script type='text/javascript'>SDS.render('sds-dashboard-{$dashboard_id}', '{$endpoint}', '{$username}', '{$password}', '{$dashboard_id}', true);</script>";

	return $template;
}
