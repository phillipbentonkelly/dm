#!/bin/sh

clear
proceedVar=false
tempDirName='GH-page-content'
root=$(pwd)
yourLocalhost=''
localhost='http://localhost/dm/dist/frameset.php?page-type='
framesetString='frameset.php?page-type='
pages=("articles" "neighborhood" "serp" "home" "property-listings")

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
echo "Please enter/paste the path to the repo's localhost URL: ex. http://localhost/dm/dist/"
read yourLocalhost

if [[ $proceedVar =~ ^[Yy]$ ]]
	then

		if [[ $yourLocalhost ]]
		then
			cd ..
			mkdir $tempDirName
			root=$(pwd)

			cp -a $root/dm/dist/images/. $root/$tempDirName/images
			cp -a $root/dm/dist/fonts/. $root/$tempDirName/fonts
			cp -a $root/dm/dist/js/. $root/$tempDirName/js
			cp -a $root/dm/dist/styles/. $root/$tempDirName/styles

			sleep 2
			for i in "${pages[@]}"
			do
				echo $localhost$i
				wget $localhost$i
				sleep 1
				mv $framesetString$i $root/$tempDirName/$i.html

				echo ""
				echo "---------------------------------------------"
				echo ""
			done

			sleep 2
			cd dm
			git checkout gh-pages
			cd ..

			cp -a -f $root/$tempDirName/. $root/dm

			sleep 2
			echo "Removing temporary folder"
			rm -r $root/$tempDirName

			sleep 2
			cd dm
			git add .
			git commit -m "Updated GH-Pages with the latest version of this repo that can be used for QA."
			git push

			sleep 2
			git checkout master

			echo ""
			echo $root
		fi
fi

