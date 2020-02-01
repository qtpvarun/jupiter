import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './carrier.reducer';
import { ICarrier } from 'app/shared/model/carrier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarrierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarrierDetail = (props: ICarrierDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { carrierEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="proTrackApp.carrier.detail.title">Carrier</Translate> [<b>{carrierEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="proTrackApp.carrier.name">Name</Translate>
            </span>
          </dt>
          <dd>{carrierEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="proTrackApp.carrier.description">Description</Translate>
            </span>
          </dt>
          <dd>{carrierEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/carrier" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carrier/${carrierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ carrier }: IRootState) => ({
  carrierEntity: carrier.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarrierDetail);
