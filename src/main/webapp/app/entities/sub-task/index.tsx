import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubTask from './sub-task';
import SubTaskDetail from './sub-task-detail';
import SubTaskUpdate from './sub-task-update';
import SubTaskDeleteDialog from './sub-task-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SubTaskDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubTaskUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubTaskUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubTaskDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubTask} />
    </Switch>
  </>
);

export default Routes;
