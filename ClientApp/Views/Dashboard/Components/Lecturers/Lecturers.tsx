import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { Button, ButtonIcon } from "rmwc/Button";
import { Elevation } from "rmwc/Elevation";
import { Grid, GridCell, GridInner } from "rmwc/Grid";
import { LinearProgress } from "rmwc/LinearProgress";
import { Typography } from "rmwc/Typography";

import { lecturersActions } from "../../actions";
import { getLecturerForm, getLecturersState } from "../../selectors";
import { LecturerForm } from "./LecturerForm";
import LecturersList from "./LecturersList";

type LecturersProps =
    & typeof lecturersActions.mapCreators.lecturers
    & RouteComponentProps<any>;

class LecturersClass extends React.PureComponent<LecturersProps> {
    render() {
        return (
            <Grid>
                <GridCell span={12}>
                    <Typography use="title" tag={"div"}>
                        <Typography use="headline" tag={"div"}>Lecturers</Typography>
                        <Typography use="subheading1" tag={"div"}>Lecturers list, and adding form.</Typography>
                    </Typography>
                </GridCell>
                <GridCell span={12}>
                    <GridInner>
                        <GridCell span={12}>
                            <Button raised={true} onClick={this.props.actions.requestLoad}>Reload</Button>
                        </GridCell>
                        <GridCell span={4} className={"progress--box mdc-layout-grid__cell--align-top"}>
                            <FormProgress />
                            <LecturerForm />
                        </GridCell>
                        <Elevation z={4} wrap={true} className={"progress--box mdc-layout-grid__cell--align-top"}>
                            <GridCell span={8}>
                                <ListProgress />
                                <LecturersList />
                            </GridCell>
                        </Elevation>
                    </GridInner>
                </GridCell>
            </Grid>
        );
    }
}

export const ListProgress = connect(
    state => ({ determinate: !getLecturersState(state).isLoading }),
    () => ({}),
)(LinearProgress);

export const FormProgress = connect(
    state => ({ determinate: !getLecturerForm(state).isLoading }),
    () => ({}),
)(LinearProgress);

const enhance = compose<React.ComponentClass<RouteComponentProps<any> | undefined>>(
    withRouter,
    connect(
        null,
        lecturersActions.mapDispatch.lecturers,
    ),
);

export const Lecturers = enhance(LecturersClass);
