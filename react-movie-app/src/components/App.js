import React, { useState, useEffect } from 'react';
import Header from './elements/Header';
import Home from './Home';
import { GlobalStyle } from './styles/GlobalStyle';
import Register from '../components/pages/Register';
import Login from '../components/pages/Login';
import AuthState from '../components/context/authContext/AuthState';
import Movie from './Movie';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { element } from 'prop-types';
import RateMovie from './elements/RateMovie';

function App() {
    return (
        <React.Fragment>
            <GlobalStyle />
            <AuthState>
                <Router>
                    <Switch>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/" component={Login} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/ratethismovie" component={RateMovie} />
                            <Route exact path="/:movieId" component={Movie} />
                            <Route component={NotFound} />
                    </Switch>
                </Router>
            </AuthState>
        </React.Fragment>
    )
}
export default App;


// const App = () => (

//     <React.Fragment>
//         <GlobalStyle />
//         <AuthState>
//             <Router>
//                 {/* <Header /> */}
//                 <Switch>
//                     <Route exact path="/register" component={Register} />
//                     {/* <Route exact path="/login" component={Login} /> */}
//                     <Route exact path="/" component={Login} />
//                     <Route exact path="/home" component={Home} />
//                     <Route exact path="/:movieId" component={Movie} />
//                     <Route component={NotFound} />
//                 </Switch>
//             </Router>
//         </AuthState>
//     </React.Fragment>
// )

{/* <React.Fragment>
<GlobalStyle />
<Header />
<Home />
</React.Fragment> */}
