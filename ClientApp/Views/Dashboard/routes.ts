import { IViewRoute, mapRoutes } from "@app/ViewRoutes";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";
import { Counter, Home, Layout, Lecturers } from "./Components/";

export const Routes: IViewRoute[] = [
    {
        title: "Dashboard",
        path: "/Dashboard/",
        layout: Layout,
        routes: [
            {
                title: "Lecturers",
                path: "/Dashboard/",
                exact: true,
                component: Home,
            },
            {
                title: "Lecturers",
                path: "/Dashboard/Lecturers/",
                component: Lecturers,
            },
        ],
    },
];

// export const Routes = mapRoutes(Rroutes);
