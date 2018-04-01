import * as React from "react";
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

interface IProps {
    open?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
}

export default class Counter extends React.PureComponent<IProps, { open: boolean }> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: props.open || true,
        };
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
                    <ListItem>
                        <ListItemGraphic>star_border</ListItemGraphic>
                        <ListItemText>Counter</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemGraphic>star_border</ListItemGraphic>
                        <ListItemText>Pizza</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemGraphic>star_border</ListItemGraphic>
                        <ListItemText>Icecream</ListItemText>
                    </ListItem>
                </DrawerContent>
            </Drawer>
        );
    }
}
