import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './professional.reducer';
import { IProfessional } from 'app/shared/model/professional.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfessionalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfessionalUpdate = (props: IProfessionalUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { professionalEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/professional' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...professionalEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crudApp.professional.home.createOrEditLabel" data-cy="ProfessionalCreateUpdateHeading">
            <Translate contentKey="crudApp.professional.home.createOrEditLabel">Create or edit a Professional</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : professionalEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="nameLabel" for="professional-name">
                  <Translate contentKey="crudApp.professional.name">Name</Translate>
                </Label>
                <AvField
                  id="professional-name"
                  data-cy="name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="professional-phone">
                  <Translate contentKey="crudApp.professional.phone">Phone</Translate>
                </Label>
                <AvField id="professional-phone" data-cy="phone" type="text" name="phone" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="professional-email">
                  <Translate contentKey="crudApp.professional.email">Email</Translate>
                </Label>
                <AvField id="professional-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup check>
                <Label id="activatedLabel">
                  <AvInput id="professional-activated" data-cy="activated" type="checkbox" className="form-check-input" name="activated" />
                  <Translate contentKey="crudApp.professional.activated">Activated</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/professional" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  professionalEntity: storeState.professional.entity,
  loading: storeState.professional.loading,
  updating: storeState.professional.updating,
  updateSuccess: storeState.professional.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalUpdate);
