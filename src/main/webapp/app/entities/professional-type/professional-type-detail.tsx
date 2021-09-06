import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './professional-type.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfessionalTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfessionalTypeDetail = (props: IProfessionalTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { professionalTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="professionalTypeDetailsHeading">
          <Translate contentKey="ProfessionalType.detail.title">ProfessionalType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{professionalTypeEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ProfessionalType.description">Description</Translate>
            </span>
          </dt>
          <dd>{professionalTypeEntity.description}</dd>
          <dt>
            <span id="activated">
              <Translate contentKey="ProfessionalType.activated">Activated</Translate>
            </span>
          </dt>
          <dd>{professionalTypeEntity.activated ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/professional-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/professional-type/${professionalTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ professionalType }: IRootState) => ({
  professionalTypeEntity: professionalType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalTypeDetail);
