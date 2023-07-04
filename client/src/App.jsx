import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './layouts/Layout';
import Home from './components/Home';
import Add from './components/Add/Add';
import View from './components/View/View';
import SinglePost from './components/View/SinglePost';
import Update from './components/Update/Update';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/view' element={<View />} />
          <Route path='/postById/:id' element={<SinglePost />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
