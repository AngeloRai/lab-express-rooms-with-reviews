import Home from './Home'
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="container m-5">
  <BrowserRouter>
    
    <Route>
      
         <Home/>
    </Route>
  </BrowserRouter>
    </div>
  );  
}

export default App;
