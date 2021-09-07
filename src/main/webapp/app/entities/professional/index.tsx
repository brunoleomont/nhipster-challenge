import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Professional from './professional';
import ProfessionalDetail from './professional-detail';
import ProfessionalUpdate from './professional-update';
import ProfessionalDeleteDialog from './professional-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfessionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfessionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfessionalDetail} />
      <ErrorBoundaryRoute path={match.url} component={Professional} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProfessionalDeleteDialog} />
  </>
);

export default Routes;
