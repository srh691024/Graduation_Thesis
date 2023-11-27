import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from "~/layouts";
import PrivateRoutes from "./routes/PrivateRoutes";
import { io } from 'socket.io-client';
import { useSelector } from "react-redux";

const socket = io('http://localhost:5000', {
  reconnection: true,
})


function App() {
  const { current } = useSelector(state => state.user)
  useEffect(() => {
    socket.emit("authenticate", current?._id);
  }, [current]); // Chạy một lần sau khi component được mount

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            if (route.logginRequired === false) return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            return <Route key={index} path={route.path} element={<PrivateRoutes><Layout><Page /></Layout></PrivateRoutes>} />
          })
          }

        </Routes>
      </div>
    </Router>
  );
}

export default App;
