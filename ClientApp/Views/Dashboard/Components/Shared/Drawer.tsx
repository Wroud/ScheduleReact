import * as React from "react";
import { matchPath, RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
} from "rmwc/Drawer";

import {
    ListItem,
    ListItemGraphic,
    ListItemText,
} from "rmwc/List";

import { connectState, connectWithComponentId, IComponentId, ILocalReducer } from "@app/middlewares/redux-subreducer";
import { compose } from "redux";
import { moduleActions } from "../../actions";
import Module from "../../module";

interface IProps {
    onClose?: () => void;
    onOpen?: () => void;
}

interface IState {
    open: boolean;
}

type Props = IProps;

interface IMenuLink {
    key: number;
    title: string;
    url: string;
    path: string;
    exact?: boolean;
    strict?: boolean;
}

const initState: IState = {
    open: true,
};

export class DrawerWraperClass extends React.Component<IProps & RouteComponentProps<{}>, IState> {
    links: IMenuLink[];

    constructor(props: IProps & RouteComponentProps<{}>) {
        super(props);
        this.state = initState;

        this.links = Module.navigation.map<IMenuLink>(({ title, url, path, exact }, key) => ({
            key,
            title: title || "?",
            url,
            path: path || url,
            exact,
        }));
    }
    switchDrawer = () => {
        this.setState({
            open: !this.state.open,
        });
    }
    closeDrawer = () => {
        this.setState({
            open: false,
        });
    }
    openDrawer = () => {
        this.setState({
            open: true,
        });
    }
    render() {
        return (
            <Drawer persistent={true} open={this.state.open} onClose={this.closeDrawer} onOpen={this.openDrawer}>
                <DrawerContent>
                    {this.getElements()}
                </DrawerContent>
            </Drawer>
        );
    }

    private getElements = () =>
        this.links.map(({ title, url }, index) => (
            <ListItem key={title} wrap={false}>
                {/* <Link to={url}> */}
                <ListItemGraphic>star_border</ListItemGraphic>
                <ListItemText>{title}</ListItemText>
                {/* </Link> */}
            </ListItem>
        ))

    private getActive = () => {
        let pathname = "/";
        if (!!this.props.location) {
            pathname = this.props.location.pathname;
        }
        const match = this.links.find(link => !!matchPath(pathname, link));
        if (match) {
            return match.key;
        }
        return 0;
    }
}

const switchDrawer = (props, prevState) => ({ open: !prevState.open });

const stateReducer = (reducer: ILocalReducer<Props & IComponentId, IState>) => reducer
    .on(moduleActions.actions.drawer.switchDrawer, switchDrawer);

const enhance = compose<React.ComponentClass>(
    withRouter,
    connectState<Props, IState>(
        initState,
        stateReducer,
        "drawer",
    ),
);

export const DrawerWrapper = enhance(DrawerWraperClass);
