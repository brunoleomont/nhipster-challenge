import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getProfessionalTypes } from 'app/entities/professional-type/professional-type.reducer';
import { IRootState } from 'app/shared/reducers';
import { AvFeedback, AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { useEffect, useState } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { createEntity, getEntity, reset, updateEntity } from './professional.reducer';

export interface IProfessionalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfessionalUpdate = (props: IProfessionalUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { professionalEntity, professionalTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/professional' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProfessionalTypes();
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
        professionalType: professionalTypes.find(it => it.id.toString() === values.professionalType.id.toString()),
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
          <h2 id="Professional.home.createOrEditLabel" data-cy="ProfessionalCreateUpdateHeading">
            <Translate contentKey="Professional.home.createOrEditLabel">Create or edit a Professional</Translate>
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
                  <Translate contentKey="Professional.name">Name</Translate>
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
                  <Translate contentKey="Professional.phone">Phone</Translate>
                </Label>
                <AvField id="professional-phone" data-cy="phone" type="text" name="phone" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="professional-email">
                  <Translate contentKey="Professional.email">Email</Translate>
                </Label>
                <AvField id="professional-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup check>
                <Label id="activatedLabel">
                  <AvInput id="professional-activated" data-cy="activated" type="checkbox" className="form-check-input" name="activated" />
                  <Translate contentKey="Professional.activated">Activated</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="professional-professionalType">
                  <Translate contentKey="Professional.professionalType">Professional Type</Translate>
                </Label>
                <AvField
                  id="professional-professionalType"
                  data-cy="professionalType"
                  type="select"
                  className="form-control"
                  name="professionalType.id"
                  required
                >
                  {professionalTypes
                    ? professionalTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.description}
                        </option>
                      ))
                    : null}
                </AvField>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
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
  professionalTypes: storeState.professionalType.entities,
  professionalEntity: storeState.professional.entity,
  loading: storeState.professional.loading,
  updating: storeState.professional.updating,
  updateSuccess: storeState.professional.updateSuccess,
});

const mapDispatchToProps = {
  getProfessionalTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalUpdate);
