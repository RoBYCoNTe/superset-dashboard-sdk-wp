<?php

function sds_settings_section()
{
?>
	<p>Enter your Superset API settings below (configurations of these parameters requires basic <a href="#setup">configuration</a> in Superset).</p>
	<p>If you have already configured your Superset instance, you can find these settings in your Superset configuration file.</p>
<?php
}

function sds_settings_setup_section()
{
?>
	<div class="wrap" id="setup">
		<p> Before you can embed a dashboard in your WordPress site, <b>you need to enable embedding in Superset</b>. <br />
			To do this, you have to:</p>
		<ul class="ul-disc">
			<li>Enable <code>CORS</code> in your Superset configuration file.</li>
			<li>Enable <code>EMBEDDED_SUPERSET</code> in your Superset <code>FEATURE_FLAGS</code> configuration.</li>
			<li>Configure <em>roles</em>, <em>permissions</em> and <em>account</em> to use as guest user.</li>
		</ul>

		<h3>Enable CORS</h3>
		<p>Open your Superset configuration file and set <code>ENABLE_CORS</code> to <code>True</code>.</p>
		<pre class="code">
	ENABLE_CORS = True
	CORS_OPTIONS = {
		"supports_credentials": True,
		"allow_headers": ["*"],
		"resources": ["*"],
		"origins": ["*"],
	}
</pre>
		<p class="warning notice-warning">
			You should change the <code>origins</code> to allow requests from your WordPress site only.</p>

		<h3>Enable Embedded Superset</h3>
		<p> Open your Superset configuration file and set <code>EMBEDDED_SUPERSET</code> to <code>True</code>.<br />
			Please, refer to the example below:</p>

		<pre class="code">
	FEATURE_FLAGS = {"ALERT_REPORTS": True <b style="background-color: yellow">, "EMBEDDED_SUPERSET": True</b>}
	PUBLIC_ROLE_LIKE="Public"
	GUEST_TOKEN_JWT_SECRET="YourAwesomeSecret"</pre>

		<h3>Configure roles, permissions and account</h3>
		<p> You need to change permissions of <em>Public</em> role to meet these permissions:</p>
		<ul class="ul-disc">
			<li>can read on Chart</li>
			<li>can read on Dataset</li>
			<li>can read on Dashboard</li>
			<li>can read on Database</li>
			<li>can write on DashboardFilterStateRestApi</li>
			<li>can read on DashboardfilterStateRestApi</li>
			<li>can dashboard on Superset</li>
			<li>can explore json on Superset</li>
			<li>can grant guest token on SecurityRestApi</li>
			<li>all database access on all_database_access</li>
		</ul>

		<p>

			<b>Warning:</b> without these permissions you will not be able to publish your dashboard
			(you will get a 403 error when you will try to access the dashboard).
		</p>

		<p> Now you are ready to configure guest account that will be used to access dashboard without username and password.
			Go in Settings/List Users and create a new user, the most important part is the Roles field, you have to select
			Public and Gamma roles.
		</p>
	</div>
<?php
}

function sds_setting_endpoint()
{
	$options = get_option('sds_settings');
	$endpoint = isset($options['endpoint']) ? $options['endpoint'] : 'http://localhost:8088';
	echo "<input id='sds_settings_endpoint' name='sds_settings[endpoint]' type='text' value='{$endpoint}' />";
}

function sds_setting_username()
{
	$options = get_option('sds_settings');
	$username = isset($options['username']) ? $options['username'] : 'guest';
	echo "<input id='sds_settings_username' name='sds_settings[username]' type='text' value='{$username}' />";
}

function sds_setting_password()
{
	$options = get_option('sds_settings');
	$password = isset($options['password']) ? $options['password'] : '';
	echo "<input id='sds_settings_password' name='sds_settings[password]' type='password' value='{$password}' />";
}

function sds_register_settings()
{
	register_setting('sds_settings', 'sds_settings');
	add_settings_section('sds_settings_section', 'API Settings', 'sds_settings_section', 'sds-settings');
	add_settings_section('sds_settings_setup_section', 'How to configure Superset properly', 'sds_settings_setup_section', 'sds-settings');
	add_settings_field('sds_settings_endpoint', 'Endpoint', 'sds_setting_endpoint', 'sds-settings', 'sds_settings_section');
	add_settings_field('sds_settings_username', 'Username', 'sds_setting_username', 'sds-settings', 'sds_settings_section');
	add_settings_field('sds_settings_password', 'Password', 'sds_setting_password', 'sds-settings', 'sds_settings_section');
}

function sds_render_settings_page()
{
?>
	<div class="wrap">
		<h2>Superset Dashboard SDK Settings</h2>
		<form method="post" action="options.php">
			<?php
			settings_fields('sds_settings');
			do_settings_sections('sds-settings');
			submit_button();
			?>
		</form>
	</div>
<?php
}

function sds_add_settings_menu()
{
	add_options_page('Superset Dashboard SDK Settings', 'Superset', 'manage_options', 'sds-settings', 'sds_render_settings_page');
}
