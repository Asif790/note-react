
import './App.css';
import { useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';

function App() {
  const [notes, setNotes]=useState([
    {
      id:nanoid(),
      text:"first note",
      date:"09/05/2021",
  },
  {
    id:nanoid(),
    text:"Second note",
    date:"09/05/2021",
},
{
  id:nanoid(),
  text:"third note",
  date:"10/05/2021",
},
]);
const [searchText,setSearchText]=useState('');

useEffect(() => {
  const savedNotes=JSON.parse(
    localStorage.getItem('notes-data')
  );
  if(savedNotes)
  {
    setNotes(savedNotes)
  }

},[])


useEffect(() => {
  localStorage.setItem('notes-data',JSON.stringify(notes));
},[ notes ])

const addNote = (text) => {
  const date=new Date();
  const newNote= {
    id:nanoid(),
    text: text,
    date: date.toLocaleDateString()
  }
  const newNotes=[...notes,newNote];
  setNotes(newNotes);
}
const deleteNote = (id) => {
  const newNotes=notes.filter((note ) => note.id!==id );
  setNotes(newNotes);
}

  return (

      <div className="container">

<Header />
<Search  handleSearchNote={setSearchText}/>
<NotesList notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText)
)}
handleAddNote={addNote}
handleDeleteNote={deleteNote}/>

    </div>
  );
}

export default App;
