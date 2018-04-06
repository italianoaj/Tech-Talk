Anthony Italiano
Louis Oliphant
Web Programming
6 April 2018


	For my final project of the class I have implemented node, express, mongodb, views, html, css, and js in order to create an online chat room for Hiram College computer
science majors. I struggled at thie beginning of this project with a few things. At first, i wanted to implement the use of socket.io to make each client "listen" for updates
from the server to recieve messages in real time. While I was not able to accomplish this because of the actual cs server settings, i was able to control a simulation type 
work around for the time being. Another problem i ran into came with sending my requests from the client to the server I created. I honestly struggled with this for about 3 days.
I was only able to accomplish the sending of POST requests when Professor Oliphant had time to assist me. I was not sending the obj as a string, which was causing me to recieve
an error for an unexpected token. When I fixed this, along with my parser, I was then able to read the json object I was sending. Once I had this all figured out, I was able to set up mongodb in order to log message information along with user information. The user list with passwords started with the following:

Admin – admin:<pass>
Alex – bowsera:0000
Alexis – wojtowiczak:0001
Anthony – italianoaj:<pass>
Brian – barbianbm:0002
Joe – rozalskiji:0003
Kevin – whitekj:0004
Lance – hendersonl:0005
Louis – oliphantlt:0006
Manaki – ikedam:0007
Roger – bountsebese:0008
Stephane – nouafowankosj:0009
Tom – topaliant:0010
Zak – martinjakozd:0011
Test - test:test

    My first request when people sign in to their account on Friday will be to change thier password to something they can easily remember. After this is accomplished, I will have the class have some fun my messenging each other for whatever alloted period of time I am given. Each user is also given a type along with their username and password. The purpose of the type is to distinguish who is an admin and which accounts are just users. As one would expect, the only account with the type "admin" is the admin account. All of the others have the type "user" with the test account being the only exception, holding the value "test" for the username, password, and type fields. The purpose of the test account is to demo to the students the admin's ability to delete and add users. 
    If I would start this project over, there are definately things I would have done differently. The first thing would be to start earlier so that I may have actually been able to figure out the socket.io portion of my project. Instead I had to settle with a timed javascript event that would ask for any new messages every 1000 milliseconds to simulate real time. I would have also liked to have constructed a users collection in my mongodb so that the user data could be stored forever. Right now i just have it all stored in an array of json objects. Because of this, all changed to the user information such as added users, deleted users, and password changed are wiped out as soon as the server shutsdown and restarts. I just simply did not have time to implement this portion of that database because I started late and because I was down for 3 days with my POST error. 
    If I had more time i would have corrected the mistakes I made above and also tried to implement a few additional features such as a way to display users that are online along with a way to directly message other users. All in all, I am proud of the progress I made on this assignment and enjoyed the class throughtout the semester as a whole. 