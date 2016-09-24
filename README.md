Eventkit mobile 
========
Mobile app for the [Eventkit](https://github.com/leoshtika/eventkit) (conference management framework)


REQUIREMENTS
------------

- First install [Node.js](https://nodejs.org/en/)
- Then, install the latest Cordova and Ionic command-line tools `npm install -g cordova ionic`
- Follow the [Android](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) and [iOS](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) platform guides to install required platform dependencies

Prepare your development environment
------------------------------------

### 1. Fork the 'eventkit-mobile' repository on GitHub and clone your fork to your development environment
```
git clone https://github.com/YOUR-GITHUB-USERNAME/eventkit-mobile.git
```

### 2. Add the main 'eventkit-mobile' repository as an additional git remote called "upstream"
```
git remote add upstream https://github.com/leoshtika/eventkit-mobile.git
```

### 3. Install dependencies
```
ionic state reset
```

### 4. Run the application in the (chrome) browser
```
ionic serve
```


Working on bugs and features
----------------------------
Having prepared your develop environment as explained above you can now start working on a feature or bugfix.

### 1. Make sure there is an issue created for the thing you are working on if it requires significant effort to fix
All new features and bug fixes should have an associated issue to provide a single point of reference for discussion 
and documentation.
If you do not find an existing issue matching what you intend to work on, please open a new issue or create 
a pull request directly if it is straightforward fix.

### 2. Fetch the latest code from the main 'eventkit-mobile' branch
You should start at this point for every new contribution to make sure you are working on the latest code.
```
git checkout master
git pull upstream master
```

### 3. Create a new branch for your feature based on the current master branch
Each separate bug fix or change should go in its own branch. Branch names should be descriptive and start with the 
number of the issue that your code relates to. If you aren't fixing any particular issue, just skip number. For example:
```
git checkout -b 999-name-of-your-branch
```

### 4. Do your magic, write your code
Make sure it works :)

### 5. Commit your changes
```
git add --all
git commit -m "Resolve #999: A brief description of this change"
```

### 6. Pull the latest code from upstream, rebase & squash your changes
Before pushing your code to GitHub make sure to integrate upstream changes into your local repository
```
git checkout master
git pull upstream master
git checkout 999-name-of-your-branch
git rebase master
```
This ensures that your changes can be merged with one click. 

**Squash commits** 
This step is not always necessary, but is required when your commit history is full of small, unimportant commits.
```
git rebase -i master
```

### 7. Push your code to GitHub
```
git push -u origin 999-name-of-your-branch
```

### 8. Open a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) against upstream
Go to your repository on GitHub and click "Pull Request", choose 'develop' as the base branch and your '999-name-of-your-branch' as the head branch and enter some more details in the comment box. To link the pull request to the issue put anywhere in the pull comment #999 where 999 is the issue number.
Note that each pull-request should fix a single change.

### 9. Someone will review your code
Someone will review your code, and you might be asked to make some changes, if so go to step #5 
(you don't need to open another pull request if your current one is still open). 
If your code is accepted it will be merged into the main branch and become part of the next release.

### 10. Cleaning it up
After your code was either accepted or declined you can delete branches you've worked with from your local repository and origin.
```
git checkout master
git branch -D 999-name-of-your-branch
git push origin --delete 999-name-of-your-branch
```
