import * as React from "react";
import { connect } from "react-redux";
import {
    List,
} from "rmwc/List";
import { lecturersActions } from "../../actions";
import { getLecturers } from "../../selectors";
import Lecturer from "./Lecturer";

type Props = { lecturers: string[] } & typeof lecturersActions.mapCreators.lecturers;

export class LecturersList extends React.PureComponent<Props> {
    componentWillMount() {
        if (!this.props.lecturers || this.props.lecturers.length === 0) {
            this.props.actions.requestLoad();
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
    lecturersActions.mapDispatch.lecturers,
)(LecturersList);
