#!/bin/sh

clear
rootHost='http://localhost/dm/dist/'
defaultLocalhostPath='http://localhost/dm/dist/'
tempDirName='GH-page-content'
root=$(pwd)
yourLocalhost='http://localhost/dm/dist/'
localhost=''
phpModules=("carousel" "gallery-dev" "mega-menu-dev")
tempModulueName=''
phpExtension='.php'
dist='/dist/'

terminal-notifier -sound default -title 'Git: Migrating Master to GH-Pages' -message 'Creating Module Pages'
for g in "${phpModules[@]}"
do
	echo "$rootHost$g$phpExtension"
	wget "$rootHost$g$phpExtension"

	echo ""
	echo "---------------------------------------------"
	echo ""
done