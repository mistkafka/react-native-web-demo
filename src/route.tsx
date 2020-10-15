import React from "react";
import { RouteConfig } from 'react-router-config';

import Home from './Pages/Home';
import ConsumersAdvocateForm from './Pages/ConsumersAdvocateForm';


const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/consumers-advocate-form',
        exact: true,
        render: (props) => {
            return (
                <ConsumersAdvocateForm vertical={'life-insurance'}/>
            )
        }
    },
];

export default routes;

