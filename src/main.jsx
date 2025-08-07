import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout  from './components/Layout.jsx'
import Login from './components/Login.jsx'
import AllPosta from './pages/AllPosta.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import Signup from './components/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
const router =createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/login',
        element:(
          <Layout authenticated={false}>
            <Login/>
          </Layout>
        )
      },
      {
        path:'/signup',
        element:(
          <Layout authenticated={false}>
            <Signup/>
          </Layout>
        )
      },
      {
        path:'/all-post',
        element:(
          <Layout authenticated>
            <AllPosta />
          </Layout>
        )
      },
      {
        path:'/add-post',
        element:(
          <Layout authenticated>
            <AddPost/>
          </Layout>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <Layout authenticated>
              <EditPost />
          </Layout>
        )
      },
      {
        path : '/post/:slug',
        element:<Post />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router ={router} />
    </Provider>
  </StrictMode>,
)
