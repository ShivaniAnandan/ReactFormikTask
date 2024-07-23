import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Authors from './components/Authors';
import EditBook from './components/EditBook';
import CreateBook from './components/CreateBook';
import CreateAuthor from './components/CreateAuthor';
import EditAuthor from './components/EditAuthor';


function App() {
  const [id, setId] = useState(0);

  return (
    <>
      <div>
        {/* <h1>App Comp</h1> */}
        <BrowserRouter>
        <div>
        <Navbar/>
        </div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/books' element={<Books setId={setId}/>}/>
          <Route path='/edit/:id' element={<EditBook id={id}/>} />
          <Route path='/create' element={<CreateBook/>} />
          <Route path='/authors' element={<Authors setId={setId}/>}/>
          <Route path='/createauthor' element={<CreateAuthor />} />
          <Route path='/editauthor/:id' element={<EditAuthor id={id}/>} />
        </Routes>
        </BrowserRouter>
        
      </div>
      
    </>
  )
}

export default App
