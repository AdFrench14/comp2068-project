COMP2068 Project: ChitChat - the greenest chat room on the net

Group Members:
- Adrien French
- Allie Adams
- Bethany Belbin

Part 1 - Work Distribution:

Allie- created models, researched options for realt-time display, worked a bit with usersControllers to enable profile and contacts functionality, minor fixes here and there

Bethany - created the views, routes and styles. Worked a little with conversationsControllers to populate users in a div in the conversations. Researched html, css and ways to get the userController to populate in the profile.  

Adrien - created controllers and ensured that views & models were communicating properly. Modifications to views, models and routes as necessary. Testing and bug fixes. 

Notes:
- Changing a user password does not currently work. It will write the new password in plain text to the DB without hashing first, so logging in after password change is impossible. Tried to add hook for password update, but mongo/mongoose does not support hooks on update. Ran out of time to figure this one out.

- Did not implement socket system. We should have started the project with that part, but we didn't quite understand it at the time. Chat system works, but other users will need to refresh their page before seeing any messages you send.




