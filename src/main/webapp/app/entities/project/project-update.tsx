import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICarrier } from 'app/shared/model/carrier.model';
import { getEntities as getCarriers } from 'app/entities/carrier/carrier.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectUpdate = (props: IProjectUpdateProps) => {
  const [programManagerId, setProgramManagerId] = useState('0');
  const [projectManagerId, setProjectManagerId] = useState('0');
  const [carrierId, setCarrierId] = useState('0');
  const [billingCompanyId, setBillingCompanyId] = useState('0');
  const [siteCompanyId, setSiteCompanyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { projectEntity, users, carriers, companies, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/project' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getCarriers();
    props.getCompanies();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.internalDue = convertDateTimeToServer(values.internalDue);

    if (errors.length === 0) {
      const entity = {
        ...projectEntity,
        ...values
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
          <h2 id="proTrackApp.project.home.createOrEditLabel">
            <Translate contentKey="proTrackApp.project.home.createOrEditLabel">Create or edit a Project</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : projectEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="project-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="project-name">
                  <Translate contentKey="proTrackApp.project.name">Name</Translate>
                </Label>
                <AvField id="project-name" type="text" name="name" />
              </AvGroup>
              <AvGroup check>
                <Label id="isSite360Label">
                  <AvInput id="project-isSite360" type="checkbox" className="form-check-input" name="isSite360" />
                  <Translate contentKey="proTrackApp.project.isSite360">Is Site 360</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="siteNumberLabel" for="project-siteNumber">
                  <Translate contentKey="proTrackApp.project.siteNumber">Site Number</Translate>
                </Label>
                <AvField id="project-siteNumber" type="string" className="form-control" name="siteNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="internalDueLabel" for="project-internalDue">
                  <Translate contentKey="proTrackApp.project.internalDue">Internal Due</Translate>
                </Label>
                <AvInput
                  id="project-internalDue"
                  type="datetime-local"
                  className="form-control"
                  name="internalDue"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.projectEntity.internalDue)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="towerTypeLabel" for="project-towerType">
                  <Translate contentKey="proTrackApp.project.towerType">Tower Type</Translate>
                </Label>
                <AvField id="project-towerType" type="text" name="towerType" />
              </AvGroup>
              <AvGroup>
                <Label id="pONumberLabel" for="project-pONumber">
                  <Translate contentKey="proTrackApp.project.pONumber">P O Number</Translate>
                </Label>
                <AvField id="project-pONumber" type="text" name="pONumber" />
              </AvGroup>
              <AvGroup>
                <Label id="towerLatitudeLabel" for="project-towerLatitude">
                  <Translate contentKey="proTrackApp.project.towerLatitude">Tower Latitude</Translate>
                </Label>
                <AvField id="project-towerLatitude" type="string" className="form-control" name="towerLatitude" />
              </AvGroup>
              <AvGroup>
                <Label id="towerLongitudeLabel" for="project-towerLongitude">
                  <Translate contentKey="proTrackApp.project.towerLongitude">Tower Longitude</Translate>
                </Label>
                <AvField id="project-towerLongitude" type="string" className="form-control" name="towerLongitude" />
              </AvGroup>
              <AvGroup>
                <Label id="memoLabel" for="project-memo">
                  <Translate contentKey="proTrackApp.project.memo">Memo</Translate>
                </Label>
                <AvField id="project-memo" type="text" name="memo" />
              </AvGroup>
              <AvGroup>
                <Label for="project-programManager">
                  <Translate contentKey="proTrackApp.project.programManager">Program Manager</Translate>
                </Label>
                <AvInput id="project-programManager" type="select" className="form-control" name="programManager.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="project-projectManager">
                  <Translate contentKey="proTrackApp.project.projectManager">Project Manager</Translate>
                </Label>
                <AvInput id="project-projectManager" type="select" className="form-control" name="projectManager.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="project-carrier">
                  <Translate contentKey="proTrackApp.project.carrier">Carrier</Translate>
                </Label>
                <AvInput id="project-carrier" type="select" className="form-control" name="carrier.id">
                  <option value="" key="0" />
                  {carriers
                    ? carriers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="project-billingCompany">
                  <Translate contentKey="proTrackApp.project.billingCompany">Billing Company</Translate>
                </Label>
                <AvInput id="project-billingCompany" type="select" className="form-control" name="billingCompany.id">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="project-siteCompany">
                  <Translate contentKey="proTrackApp.project.siteCompany">Site Company</Translate>
                </Label>
                <AvInput id="project-siteCompany" type="select" className="form-control" name="siteCompany.id">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/project" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
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
  users: storeState.userManagement.users,
  carriers: storeState.carrier.entities,
  companies: storeState.company.entities,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating,
  updateSuccess: storeState.project.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getCarriers,
  getCompanies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate);
