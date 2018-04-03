import * as React from "react";
import {
    Link,
    matchPath,
    NavLink,
    Route,
    RouteComponentProps,
    withRouter,
} from "react-router-dom";
import {
    Tab,
    TabBar,
    TabBarScroller,
    TabIcon,
    TabIconText,
} from "rmwc/Tabs";

import { view } from "../../view";

interface IMenuLink {
    key: number;
    title: string;
    url: string;
    path: string;
    exact?: boolean;
    strict?: boolean;
}

type Props = RouteComponentProps<{}>;

class TabListClass extends React.PureComponent<Props, {}> {
    links: IMenuLink[];

    constructor(props: Props) {
        super(props);

        this.links = view.navigation.map<IMenuLink>(({ title, url, path, exact }, key) => ({
            key,
            title: title || "?",
            url,
            path: path || url,
            exact,
        }));

    }

    onChange = ({ target: { value } }: any) => {
        const { url } = this.links[value];
        this.props.history.push(url);
    }

    render() {
        return (
            <TabBar activeTabIndex={this.getActive()} onChange={this.onChange}>
                {this.getElements()}
            </TabBar>
        );
    }

    private getElements = () =>
        this.links.map(({ title, url }, index) => (
            <Tab theme={"primary"} key={title} wrap={true}><Link to={url}>{title}</Link></Tab>
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

export const TabList = withRouter<{}>(TabListClass);
