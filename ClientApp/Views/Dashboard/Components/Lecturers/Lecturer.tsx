import { IApplicationState } from "@app/store";
import { ILecturer } from "@app/store/database";
import * as React from "react";
import { connect } from "react-redux";
import {
    ListItem,
    ListItemGraphic,
    ListItemMeta,
    ListItemSecondaryText,
    ListItemText,
    SimpleListItem,

} from "rmwc/List";
import { actionCreators, actions, actionsMaps } from "../../actions";
import { makeGetLecturer } from "../../selectors";

interface IOwnProps {
    id: string;
}

type Props = ILecturer & typeof actionCreators.lecturers.lecturer;

export class Lecturer extends React.PureComponent<Props> {
    render() {
        const { fullName, firstName, lastName, secondName, children } = this.props;
        return (
            <ListItem>
                <ListItemGraphic>star_border</ListItemGraphic>
                <ListItemText>
                    {fullName}
                    <ListItemSecondaryText>{`${firstName} ${lastName}`}</ListItemSecondaryText>
                </ListItemText>

                <span className="mdc-list-item__end-detail">
                    <i className="material-icons mdc-list-item__meta" onClick={this.handleEdit}>edit</i>
                    <i className="material-icons mdc-list-item__meta" onClick={this.handleDelete}>delete</i>
                </span>
                {children}
            </ListItem>
        );
    }
    private handleEdit = () => {
        this.props.actions.edit(this.props.id);
    }
    private handleDelete = () => {
        this.props.actions.delete(this.props.id);
    }
}

const mapStateToProps = (state: IApplicationState, props?: IOwnProps): ILecturer => {
    const getLecturer = makeGetLecturer();
    const id = props ? props.id : "";
    return getLecturer(state, id);
};

export default connect(
    mapStateToProps,
    actionsMaps.lecturers.lecturer,
)(Lecturer);
