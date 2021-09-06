import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import React, { useEffect, useState } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { createEntity, getEntity, reset, updateEntity } from './professional-type.reducer';

export interface IProfessionalTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfessionalTypeUpdate = (props: IProfessionalTypeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { professionalTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/professional-type' + props.location.search);
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
        ...professionalTypeEntity,
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
          <h2 id="ProfessionalType.home.createOrEditLabel" data-cy="ProfessionalTypeCreateUpdateHeading">
            <Translate contentKey="ProfessionalType.home.createOrEditLabel">Create or edit a ProfessionalType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : professionalTypeEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="descriptionLabel" for="professional-type-description">
                  <Translate contentKey="ProfessionalType.description">Description</Translate>
                </Label>
                <AvField
                  id="professional-type-description"
                  data-cy="description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="activatedLabel">
                  <AvInput
                    id="professional-type-activated"
                    data-cy="activated"
                    type="checkbox"
                    className="form-check-input"
                    name="activated"
                  />
                  <Translate contentKey="ProfessionalType.activated">Activated</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/professional-type" replace color="info">
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
  professionalTypeEntity: storeState.professionalType.entity,
  loading: storeState.professionalType.loading,
  updating: storeState.professionalType.updating,
  updateSuccess: storeState.professionalType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalTypeUpdate);
