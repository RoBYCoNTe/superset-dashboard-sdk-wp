<?php
/*
Plugin Name: Superset Dashboard SDK
Description: Plugin to integrate Superset Dashboards in WordPress easy and fast.
Version: 1.0
Min WP Version: 5.8
Author: Roberto Conte Rosito
*/

require_once __DIR__ . '/superset-dashboard-sdk.settings.php';
require_once __DIR__ . '/superset-dashboard-sdk.block.php';

add_action('admin_init', 'sds_register_settings');
add_action('admin_menu', 'sds_add_settings_menu');
add_action('wp_enqueue_scripts', 'sds_enqueue_styles');
add_action('wp_enqueue_scripts', 'sds_enqueue_scripts');
add_action('enqueue_block_editor_assets', 'sds_enqueue_block_editor_assets');
register_block_type('superset-dashboard-sdk/dashboard-block', array('render_callback' => 'sds_render_dashboard'));
