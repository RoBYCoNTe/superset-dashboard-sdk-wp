# This script zip the project as wordpress plugin
# Get the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Get the plugin name
PLUGIN_NAME=$(basename $DIR)
# Get the version
VERSION=$(grep "Version:" $DIR/$PLUGIN_NAME.php | awk '{print $2}')
# Get the zip file name
ZIP_FILE=$PLUGIN_NAME-$VERSION.zip
# Remove the old zip file
rm -f $DIR/$ZIP_FILE
# Zip the project
zip -r $DIR/$ZIP_FILE $DIR \
		-x "*.git*" \
		-x "*.DS_Store" \
		-x "*.zip" \
		-x "*.sh" \
		-x "*.md"
# Done
echo "The plugin has been zipped as $ZIP_FILE"
