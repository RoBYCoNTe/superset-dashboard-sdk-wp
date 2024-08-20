<?php
function sds_enqueue_styles()
{
	wp_enqueue_style('sds-dashboard-block-style', plugins_url('superset-dashboard-sdk.block.css', __FILE__));
}

function sds_enqueue_scripts()
{
	// I need to add react and react-dom to the page
	wp_enqueue_script('sds-dashboard-react', 'https://unpkg.com/react@17/umd/react.production.min.js');
	wp_enqueue_script('sds-dashboard-react-dom', 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js');
	wp_enqueue_script('sds-dashboard-script', plugins_url('superset-dashboard-sdk.js', __FILE__));
}

function sds_enqueue_block_editor_assets()
{
	wp_enqueue_script(
		'sds-dashboard-block',
		plugins_url('superset-dashboard-sdk.block.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n')
	);
	wp_enqueue_style('sds-dashboard-block-editor-style', plugins_url('superset-dashboard-sdk.block.css', __FILE__));
}

function sds_get_boolean_attribute($attributes, $attribute, $default = true)
{
	$b = isset($attributes[$attribute]) && $attributes[$attribute] === true ? true : $default;
	return $b;
}

function sds_map_kv_list($attributes, $source)
{
	$source = isset($attributes[$source]) ? $attributes[$source] : [];
	$source = array_reduce($source, function ($acc, $item) {
		if (empty($item['key']) || empty($item['value'])) {
			return $acc;
		}
		return array_merge($acc, [$item['key'] => $item['value']]);
	}, []);
	return $source;
}

function sds_render_dashboard($attributes)
{
	$dashboard_id = isset($attributes['dashboardId']) ? $attributes['dashboardId'] : '';
	$autosize = sds_get_boolean_attribute($attributes, 'autosize', false);
	$hide_title = sds_get_boolean_attribute($attributes, 'hideTitle', false);
	$hide_tab = sds_get_boolean_attribute($attributes, 'hideTab', false);
	$hide_chart_controls = sds_get_boolean_attribute($attributes, 'hideChartControls', false);
	$placeholder = isset($attributes['placeholder']) ? $attributes['placeholder'] : 'Loading...';
	$url_params = sds_map_kv_list($attributes, 'urlParams');
	$filters = sds_map_kv_list($attributes, 'filters');
	$filtersVisible = sds_get_boolean_attribute($attributes, 'filtersVisible', false);
	$filtersExpanded = sds_get_boolean_attribute($attributes, 'filtersExpanded', false);
	$filtersNativeFilters = isset($attributes['filtersNativeFilters']) ? $attributes['filtersNativeFilters'] : [];

	$uiConfig = json_encode([
		"hideTitle" => $hide_title,
		"hideTab" => $hide_tab,
		"hideChartControls" => $hide_chart_controls,
		"urlParams" => $url_params,
		"filters" => [
			...$filters,
			"visible" => $filtersVisible,
			"expanded" => $filtersExpanded,
			"nativeFilters" => $filtersNativeFilters
		]
	]);

	$username = get_option('sds_settings')['username'];
	$password = get_option('sds_settings')['password'];
	$endpoint = get_option('sds_settings')['endpoint'];
	$autosize = $autosize ? 'true' : 'false';

	$template = "<div class='sds-dashboard-container' id='sds-dashboard-{$dashboard_id}'>{$placeholder}</div>";
	$function = "SDS.render(
		'sds-dashboard-{$dashboard_id}',
		'{$endpoint}',
		'{$username}',
		'{$password}',
		'{$dashboard_id}',
		'{$placeholder}',
		{$autosize},
		{$uiConfig})";

	return $template . "<script type='text/javascript' language='javascript'>{$function}
		// " . json_encode($attributes) . "
	</script>";
}
