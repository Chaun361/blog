import './App.css'
import PostDetailsPage from './components/PostDetailsPage';

import Layout from './components/Layout';
import AddPostForm from './features/post/AddPostForm';
import PostList from './features/post/PostList';


import {Routes , Route} from 'react-router-dom';


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
            <Route index element={
              <>
                <AddPostForm></AddPostForm>
                <PostList></PostList>
              </>
            }>
            </Route>
        </Route>

        <Route path='post/:postId' element={<PostDetailsPage></PostDetailsPage>}></Route>

      </Routes>
      
    </>
  )
}

export default App
