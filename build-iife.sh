# This script is used to build the iife version of the library and assumes
# that your are working with this project structure:
# - superset
# - superset-dashboard-sdk
# - wordpress/wp-content/plugins/superset-dashboard-sdk (superset-dashboard-sdk-wp)

cd ../../../../superset-dashboard-sdk
npm run build:iife
mv dist/superset-dashboard-sdk.js ../wordpress/wp-content/plugins/superset-dashboard-sdk/superset-dashboard-sdk.js
cd ../wordpress/wp-content/plugins/superset-dashboard-sdk

echo "IIFE build completed, file is available at superset-dashboard-sdk.js"
