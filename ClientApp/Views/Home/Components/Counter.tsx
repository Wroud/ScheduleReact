import { addTask, fetch } from "domain-task";
import * as React from "react";
import { connect, ReactNode } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Typography } from "rmwc/Typography";

import * as Actions from "../actions";
import Module from "../module";
import * as Store from "../Store";

type CounterProps =
    Store.IState
    & { children?: ReactNode }
    & typeof Actions.actionCreators
    & (RouteComponentProps<any> | undefined);

class Counter extends React.PureComponent<CounterProps> {
    render() {
        return (
            <div>
                <Typography use="display1" tag={"h1"}>Counter</Typography>

                <p>This is a simple example of a React component.</p>

                <p>Current count: <strong>{this.props.count}</strong></p>

                <button onClick={this.props.increment}>Increment</button>
                <button onClick={this.props.decrement}>Decrement</button>
            </div>
        );
    }
}

export default withRouter<RouteComponentProps<any> | undefined>(connect(
    Module.stateSelector,
    Actions.actionCreators,
)(Counter as any) as any);
