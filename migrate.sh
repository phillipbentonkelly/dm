#!/bin/sh

clear
proceedVar=false
tempDirName='GH-page-content'

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

if [[ $proceedVar =~ ^[Yy]$ ]]
	then
		cd ..
		mkdir $tempDirName

		pwd
fi

