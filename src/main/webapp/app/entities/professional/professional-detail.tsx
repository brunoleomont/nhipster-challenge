import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './professional.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfessionalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfessionalDetail = (props: IProfessionalDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { professionalEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="professionalDetailsHeading">
          <Translate contentKey="crudApp.professional.detail.title">Professional</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{professionalEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="crudApp.professional.name">Name</Translate>
            </span>
          </dt>
          <dd>{professionalEntity.name}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="crudApp.professional.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{professionalEntity.phone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="crudApp.professional.email">Email</Translate>
            </span>
          </dt>
          <dd>{professionalEntity.email}</dd>
          <dt>
            <span id="activated">
              <Translate contentKey="crudApp.professional.activated">Activated</Translate>
            </span>
          </dt>
          <dd>{professionalEntity.activated ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/professional" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/professional/${professionalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ professional }: IRootState) => ({
  professionalEntity: professional.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDetail);
