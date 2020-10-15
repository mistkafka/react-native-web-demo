import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './route';
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
    return (
        <Router>
            {renderRoutes(routes)}
        </Router>
    );
};

export default App;
