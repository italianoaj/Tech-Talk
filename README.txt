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

    My first request when people sign in to their account on friday will be to change thier password to something they can easily remember.