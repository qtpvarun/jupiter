import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Carrier from './carrier';
import CarrierDetail from './carrier-detail';
import CarrierUpdate from './carrier-update';
import CarrierDeleteDialog from './carrier-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CarrierDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarrierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarrierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarrierDetail} />
      <ErrorBoundaryRoute path={match.url} component={Carrier} />
    </Switch>
  </>
);

export default Routes;
