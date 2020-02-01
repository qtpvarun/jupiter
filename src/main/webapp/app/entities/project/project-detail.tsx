import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectDetail = (props: IProjectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { projectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="proTrackApp.project.detail.title">Project</Translate> [<b>{projectEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="proTrackApp.project.name">Name</Translate>
            </span>
          </dt>
          <dd>{projectEntity.name}</dd>
          <dt>
            <span id="isSite360">
              <Translate contentKey="proTrackApp.project.isSite360">Is Site 360</Translate>
            </span>
          </dt>
          <dd>{projectEntity.isSite360 ? 'true' : 'false'}</dd>
          <dt>
            <span id="siteNumber">
              <Translate contentKey="proTrackApp.project.siteNumber">Site Number</Translate>
            </span>
          </dt>
          <dd>{projectEntity.siteNumber}</dd>
          <dt>
            <span id="internalDue">
              <Translate contentKey="proTrackApp.project.internalDue">Internal Due</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={projectEntity.internalDue} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="towerType">
              <Translate contentKey="proTrackApp.project.towerType">Tower Type</Translate>
            </span>
          </dt>
          <dd>{projectEntity.towerType}</dd>
          <dt>
            <span id="pONumber">
              <Translate contentKey="proTrackApp.project.pONumber">P O Number</Translate>
            </span>
          </dt>
          <dd>{projectEntity.pONumber}</dd>
          <dt>
            <span id="towerLatitude">
              <Translate contentKey="proTrackApp.project.towerLatitude">Tower Latitude</Translate>
            </span>
          </dt>
          <dd>{projectEntity.towerLatitude}</dd>
          <dt>
            <span id="towerLongitude">
              <Translate contentKey="proTrackApp.project.towerLongitude">Tower Longitude</Translate>
            </span>
          </dt>
          <dd>{projectEntity.towerLongitude}</dd>
          <dt>
            <span id="memo">
              <Translate contentKey="proTrackApp.project.memo">Memo</Translate>
            </span>
          </dt>
          <dd>{projectEntity.memo}</dd>
          <dt>
            <Translate contentKey="proTrackApp.project.programManager">Program Manager</Translate>
          </dt>
          <dd>{projectEntity.programManager ? projectEntity.programManager.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.project.projectManager">Project Manager</Translate>
          </dt>
          <dd>{projectEntity.projectManager ? projectEntity.projectManager.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.project.carrier">Carrier</Translate>
          </dt>
          <dd>{projectEntity.carrier ? projectEntity.carrier.name : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.project.billingCompany">Billing Company</Translate>
          </dt>
          <dd>{projectEntity.billingCompany ? projectEntity.billingCompany.name : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.project.siteCompany">Site Company</Translate>
          </dt>
          <dd>{projectEntity.siteCompany ? projectEntity.siteCompany.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
