import * as React from "react";
import {
    Toolbar,
    ToolbarIcon,
    ToolbarMenuIcon,
    ToolbarRow,
    ToolbarSection,
    ToolbarTitle,
} from "rmwc/Toolbar";

import TabList from "./TabList";

interface IProps {
    switchDrawer: () => void;
}

export default class NavMenu extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Toolbar fixed={true}>
                <ToolbarRow>
                    <ToolbarSection alignStart={true}>
                        <ToolbarMenuIcon use="menu" onClick={this.props.switchDrawer} />
                        <ToolbarTitle>Dashboard</ToolbarTitle>
                    </ToolbarSection>
                    <ToolbarSection alignEnd={true}><TabList /></ToolbarSection>
                </ToolbarRow>
            </Toolbar>
        );
    }
}
