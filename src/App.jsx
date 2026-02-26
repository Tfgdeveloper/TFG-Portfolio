import { BrowserRouter } from "react-router";
import Header from './components/Header';
import Home from "./pages/Home";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
      <Header />
      <Home/>
      </SmoothScroll>
      
    </BrowserRouter>
  );
}

export default App;