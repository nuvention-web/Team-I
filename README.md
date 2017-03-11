## Team-I ##
Repo for Team-I 

#Wiki link: https://github.com/nuvention-web/Team-I/wiki

#Docs folder: 

This folder contains everything that is on our static team website. 

#Activid8 folder:

This folder is contains a react native project that is set up to run on both 
iOS and Android simulators/phones.

#Installation
To run, first install react-native (https://facebook.github.io/react-native/docs/getting-started.html) and make sure your Node version is at least 6.6. 
Then run `npm install`.

We're pretty sure we saved all of the packages required, but if we missed a package you will get a runtime error that won't allow you to build. Should this happen, simply run `npm install package-x`, where package-x is the missing package.

For security reasons, we haven't included our Firebase keys in our pushes, so we will email them to you separately. Simply place them in the Firebase folder (Activid8/app/services/firebase).

When you are ready to run, navigate to the Activid8 folder in your terminal enter `react-native run-ios` or `react-native run-android`, for iOS and Android builds respectively. 
