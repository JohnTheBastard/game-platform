# Node Playground
Code 401: Advanced Software Development in Full-Stack JavaScript  
Code Fellows, January 2016  
Author: John Hearn  

I wanted a set up where I can quickly and easily create a new javascript 
file, execute it from the terminal, and see some console and/or browser output.
This playground has all of my commonly-used modules installed, though you 
probably won't need a lot of them most of the time.

Getting started:
After you fork or clone the repo to your machine, you probably want to  
1. install the node modules listed in the package with `npm i`  

2. checkout a new branch with `git checkout -b foo`  
   you'll edit the code in `www/js/index.js` that allowed you to run your old
   code, so this way you can always get it back by checking out the correct
   branch for whatever you were working on before.   

3. create a new js file to play with, e.g. `touch ./www/js/foo.js`
   or copy one of the templates, such as `cp ./templates/module_template.js 
   ./www/js/foo.js`

4. blow away whatever is in `www/js/index.js` include your new js file, and put
   your code to generate some output here.  

5. run your code with either `npm start`, `npm run webstart` or `npm test` as 
   appropriate.  
