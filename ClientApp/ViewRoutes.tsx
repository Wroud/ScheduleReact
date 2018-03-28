import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Route } from "react-router-dom";

export interface IViewRoute {
    title: string;
    path: string;
    exact?: boolean;
    component?: React.ComponentClass<RouteComponentProps<any> | undefined>;
    layout?: React.ComponentClass;
    routes?: IViewRoute[];
}

export const mapRoutes = (routes: IViewRoute[]) =>
    routes.map((route, id) => {
        const { title, path, exact, component, layout } = route;
        return route.routes ?
            (
                <Route key={id} {... { path, exact }}>
                    {route.layout ? <route.layout>{mapRoutes(route.routes)}</route.layout> : mapRoutes(route.routes)}
                </Route>
            )
            : <Route key={id} {... { path, exact, component }} />;
    });
