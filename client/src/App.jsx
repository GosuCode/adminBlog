import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/Layout';
import Home from './components/Home';
import Add from './components/Add/Add';
import View from './components/View/View';
import SinglePost from './components/View/SinglePost';
import Update from './components/Update/Update';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import Stats from './components/pages/Stats';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add' element={<Add />} />
          <Route path='/view' element={<View />} />
          <Route path='/postById/:id' element={<SinglePost />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/stats' element={<Stats />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
