Sockify
=======

Using Socket.io to show PNotify push notifications

###Application flow:
1. Random messages (random content, id, and error) are created on the server
2. New message pushed to cliet over socket every 1-10 (random) seconds
3. The client shows a visible notification, colored to reflect error or success
4. The user can stop/continue the flow of notifications, by clicking a button, which emits a 'flow' order to the server
5. The user can acknowledge seeing a message by clicking its 'Close' button, which emits an 'acknowledge' order to the server

###Technologies used:
1. Node.js
2. Express
3. Socket.io
4. PNotify
5. Require.js
6. jQuery
7. Bootstrap 3