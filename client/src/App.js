import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from "~/layouts";
import PrivateRoutes from "./routes/PrivateRoutes";



function App() {
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
