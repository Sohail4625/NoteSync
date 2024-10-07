# NoteSync
## Description
A real-time collaborative notes app where multiple users can create, edit, and update notes simultaneously. The app will store all versions of a note, allowing users to revert to a previous version.
## Features
- Create - Users can create new notes specifying the title, content, and collaborators.
- Read - Users can view all their notes in the home page, and click on them to view the whole content.
- Update - Multiple users can update the same note simultaneously. The previous version of the note is also saved , so that it can be restored if needed.
- Delete - Users can delete the notes if they don't want it anymore
- Version Control - All the previous versions of a given note can be viewed and can restore any version of their choice.
## Tools and Technologies 
- **Node.js:** To build the server and add the functionality of web sockets for collaborative editing. 
- **Express.js:** For apis routing and processing requests.
- **React.js:** For building the web pages and other frontend parts.
- **MongoDB:** To store all the notes and their previous versions in the database.
- **Socket.io:** To build web sockets so that multiple users can edit a note at the same time.

## Live link - [NoteSync](https://notesync-24it.onrender.com)
