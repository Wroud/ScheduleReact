import { IViewRoute, mapRoutes } from "@app/ViewRoutes";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import { Counter, Home, Layout } from "./Components/";

export const routes: IViewRoute[] = [
    {
        title: "Home",
        path: "/",
        layout: Layout,
        routes: [
            {
                title: "Schedule",
                path: "/",
                exact: true,
                component: Home,
            },
            {
                title: "Counter",
                path: "/Counter/:startDateIndex?",
                component: Counter,
            },
        ],
    },
];

// export const Routes = mapRoutes(Rroutes);
