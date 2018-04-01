import * as React from "react";
import { connect } from "react-redux";
import {
    List,
} from "rmwc/List";
import { actionCreators, actions, actionsMaps } from "../../actions";
import { lecturersReducer } from "../../reducers";
import { getLecturers } from "../../selectors";
import { ILecturersState } from "../../store";
import Lecturer from "./Lecturer";

type Props = { lecturers: string[] } & typeof actionCreators.lecturers.lecturers;

export class LecturersList extends React.PureComponent<Props> {
    componentWillMount() {
        if (!this.props.lecturers || this.props.lecturers.length === 0) {
            this.props.actions.load();
        }
    }
    render() {
        const { lecturers } = this.props;
        return (
            <List twoLine={true}>
                {this.renderList(lecturers)}
            </List>
        );
    }
    private renderList = (lecturers: string[]) => lecturers.map(element => (<Lecturer id={element} key={element} />));
}

export default connect(
    state => ({ lecturers: getLecturers(state) }),
    actionsMaps.lecturers.lecturers,
)(LecturersList);
