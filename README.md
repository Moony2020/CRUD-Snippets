# A02 CRUD Code Snippets
***
### The only 2 commands you need to execute to run the application after cloning it from GitLab.

Script Dependencies.
---------------
### npm install

### npm start.

***
Server running at **http://localhost:8000**
***
In this assignment, a web application has been created for persistent handling of programming code snippets,
using an application framework and an object data modeling library for MongoDB.
***
The application is written in JavaScript application following the JavaScript Standard Style code standard, 
using the Express API, running on the Node.js platform. 
This application is has full CRUD functionality. Furthermore, Anonymous users are only able to view the snippets. 
**No one but ONLY the authenticated user are able to create, edit and delete their snippets.**
***
On the server side plain session express-session storage has been used. The application supports multiline text and
enabling the user to write real code snippets.
***
The user will get  status code 403 (Forbidden), 404 (Not Found) and 500(Internal Server Error), if tries to access
 a resource that requires the user to be logged in.
 
***
 # Answers to the given questions.
 ***
 1.	Describe the architecture of your application. How have you structured your code and what are your thoughts behind the architecture?
In this application the architecture was structured by depends on database and UI or I can call it user interface where I can run the code in console by install npm and start npm and see the output of localhost link and then copy paste url to the Google Chrome and see the application (web). Database where the data is store which is used in the back-end.
In my code I have created several JavaScript files where these files are handling the user registration, login, and logout, etc. Of course, I’m using some html files to handle the errors for example if user try to update, remove, or create a snippets page or code it should handle the errors and see if the user has access to do changes and where is router folder connected to the controller’s folder.
I think the code is organised well because I have used the same structure in all files which make it easier to work on it and easy to maintain or modify. 

2.	How was it to work with persistence data in this assignment, can you relate to other databases you might have learned before?

You’ll also need to know how to store dynamic data in a persistence layer like a database.
Actually, in database that I have learned it before I have used MySQL and, in that database, each individual records are stored as rows in the table but in mongoDB that I have used it I this assignment the individual records data are stored as documents in JSON. MongonDB is an open-source database.
I can see that MongonDB is NoSQL which means that pre-defined structure for the incoming data can be defined and adhered to but also, if required different documents in a collection can have different structures. It has a dynamic schema. 
MySQL uses structure query language the schema cannot be change.




3.	Are you satisfied with your application? Does it have some improvement areas? What are you especially satisfied with?
I’m satisfied with the application, because I have done well all the requirements and I organised the code well where I can update it or make it easy to understand. I’m satisfied as well with architecture for the application that I did.
4.	What is your TIL for this course part?
In this assignment I have learned how to connect database MongoDB to the code or to the website and make it work and get more knowledge about databases, Promises and asynchronous.  I have learned as well how to create, read , update and delete snippets and more .






**Video link** 
https://www.youtube.com/watch?v=-1PW3oFy_po




