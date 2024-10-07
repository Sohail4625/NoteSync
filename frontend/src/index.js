import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CollaborativeNote from './Collab';
import NotesList from './home';
import NoteDetails from './noteview';
import NoteVersions from './noteVersions';
import CreateNote from './new';
import "./index.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/edit/:noteId' element={<CollaborativeNote/>}/>
        <Route path='/' element={<NotesList/>} />
        <Route path='/new' element={<CreateNote/>} />
        <Route path='/notes/:id' element={<NoteDetails/>} />
        <Route path='/versions/:id' element={<NoteVersions/>} />
      </Routes>
    </BrowserRouter>
  );
} 
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App/>);


