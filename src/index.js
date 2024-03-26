import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Body from "./components/Body";
// import About from './components/About'; 
import Contact from './components/Contact';
import Error from './components/Error';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RestrauntMenu from './components/RestrauntMenu';
import reportWebVitals from './reportWebVitals';
import Shimmer from './components/Shimmer';
//import InstaMart from './components/InstaMart';


const InstaMart = lazy(() => import("./components/InstaMart"));
const About = lazy(() => import("./components/About"));
//upon on demand loading -> upon render ->suspend loading
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/about",
    element: <Suspense fallback={<h1>About us page is Loading ..........</h1>}><About /></Suspense>,
    errorElement: <Error />,
      },
      {
        path: "/",
    element: <Body />,
    errorElement: <Error />,
      },
      {
        path: "/Contact",
    element: <Contact />,
    errorElement: <Error />,
      },
      {
        path: "/restaurant/:resId",
        element:<RestrauntMenu/>
      },
      {
        path: "/InstaMart",
        element: <Suspense fallback={<Shimmer/>}>
          <InstaMart />
        </Suspense>
      }
    ]
  },
  
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
