#!/bin/sh

clear
proceedVar=false
useDefaultLocalhostPath=true
defaultLocalhostPath='http://localhost/dm/dist/'
tempDirName='GH-page-content'
root=$(pwd)
yourLocalhost=''
localhost=''
framesetString='frameset.php?page-type='
pages=("articles" "neighborhood" "serp" "home" "property-listings" "category" "category-details" "property-listings-premium")

echo "Welcome ... you are currently in: " 
pwd

echo "This script will do the following:"
echo "- Copy several directories in the dist folder to a new temporary folder one level above."
echo "- After the copy has been made it will change the github branch from master to gh-pages."
echo "- The contents of the temporary folder will be copied to the gh-pages branch and then the (the temporary) folder will be deleted."
echo "Please make sure you are in the correct directory and that you are on the master branch of the dm repo?"
echo ""
echo "Would you like to proceed? Y or N | "
read proceedVar

echo "In order to proceed we need the path to the localhost of your repo. By default, if you are using PHP or other local dev environments, it would be something like this ... http://localhost/dm/dist/. Is http://localhost/dm/dist/ the path to your localhost? Y or N | "
read useDefaultLocalhostPath

echo 'yourLocalhost 1: $yourLocalhost'

if [[ $useDefaultLocalhostPath =~ ^[Yy]$ ]]
	then
		yourLocalhost="$defaultLocalhostPath"
else
	echo "Please enter/paste the path to the repo's localhost URL: ex. http://localhost/dm/dist/"
	read yourLocalhost
fi

if [[ $proceedVar =~ ^[Yy]$ ]]
	then
		git checkout gh-pages
		echo "- Switched to Pages branch"

		sleep 6
		git stash
		echo "- Stashed any local changes"

		sleep 3
		git pull
		echo "- Pulled most recent"
		git status

		git checkout master

		sleep 6
		if [[ $yourLocalhost ]]
		then
			cd ..
			mkdir $tempDirName
			root=$(pwd)
			localhost="$yourLocalhost$framesetString"

			cp -a -f $root/dm/dist/images/. $root/$tempDirName/images
			cp -a -f $root/dm/dist/fonts/. $root/$tempDirName/fonts
			cp -a -f $root/dm/dist/js/. $root/$tempDirName/js
			cp -a -f $root/dm/dist/styles/. $root/$tempDirName/styles

			sleep 3
			for i in "${pages[@]}"
			do
				echo $localhost$i
				wget $localhost$i
				sleep 1
				mv -f $framesetString$i $root/$tempDirName/$i.html

				echo ""
				echo "---------------------------------------------"
				echo ""
			done

			cd $tempDirName
			cp -f home.html index.html
			cd ..

			sleep 5
			cd dm
			git checkout gh-pages
			git status
			git pull
			git status
			cd ..
			
			echo "Removing the several resources from the gh-pages repo folder (folders and html pages)."
			sleep 5
			rm -r $root/dm/images
			rm -r $root/dm/fonts
			rm -r $root/dm/js
			rm -r $root/dm/styles
			rm -f $root/dm/articles.html
			rm -f $root/dm/property-listings.html
			rm -f $root/dm/property-listing.html
			rm -f $root/dm/serp.html
			rm -f $root/dm/category.html
			rm -f $root/dm/category-details.html
			rm -f $root/dm/index.html
			rm -f $root/dm/home.html
			rm -f $root/dm/neighborhood.html

			echo "Copying the content of the temporary folder into the gh-pages repo folder."
			sleep 5
			cp -a -f $root/$tempDirName/. $root/dm

			sleep 5
			echo "Removing temporary folder"
			rm -r $root/$tempDirName

			sleep 5
			cd dm
			git status
			git add --all
			git status
			git commit -a -m "Updated GH-Pages with the latest version of this repo that can be used for QA."
			git push

			sleep 5
			git checkout master

			echo ""
			echo $root

			sleep 6
			echo "DONE! Check your repo to make sure all folders match what is suppose to be in that branch."
		fi
fi

