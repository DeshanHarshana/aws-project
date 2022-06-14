import { library } from '@fortawesome/fontawesome-svg-core';

import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter, Route } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";

import Dashboard from './components/Dashboard/Dashboard';
import Index from './components/Index/Index';
import NotFound from './components/NotFound/NotFound';
import Register from './components/Register/Register';
import Test from './components/testCompnent/Test';

library.add( faCheckSquare, faCoffee)
function App() {
  return (


    
      <BrowserRouter>
        <div>
      
        
            <Route exact path='/' component={Index} />
            <Route path="/sign-in/:id" component={Login} />
            <Route path="/sign-up/:id" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/kk" component={NotFound} />
            <Route path="/test" component={Test} />
            
           
            </div>
    </BrowserRouter>
  );
}

export default App;
