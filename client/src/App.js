import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form.jsx";
import { BrowserRouter, Route, useLocation } from "react-router-dom";
import Landing from "./views/Landing/components/Landing";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && <NavBar />}
      <BrowserRouter>
        <Route path="/" exact component={Landing} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/forms" exact component={Form} />
        <Route path="/home" exact component={Home} />
      </BrowserRouter>
    </>
  );
}

export default App;
