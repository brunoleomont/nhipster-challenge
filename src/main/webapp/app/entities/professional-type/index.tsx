import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfessionalType from './professional-type';
import ProfessionalTypeDetail from './professional-type-detail';
import ProfessionalTypeUpdate from './professional-type-update';
import ProfessionalTypeDeleteDialog from './professional-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfessionalTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfessionalTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfessionalTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfessionalType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProfessionalTypeDeleteDialog} />
  </>
);

export default Routes;
