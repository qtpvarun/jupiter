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
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskUpdate = (props: ITaskUpdateProps) => {
  const [assignedToId, setAssignedToId] = useState('0');
  const [assignedById, setAssignedById] = useState('0');
  const [assignedQCId, setAssignedQcId] = useState('0');
  const [parentProjectId, setParentProjectId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { taskEntity, users, projects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getProjects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.estimatedCompletionDate = convertDateTimeToServer(values.estimatedCompletionDate);
    values.completedDate = convertDateTimeToServer(values.completedDate);
    values.draftDueDate = convertDateTimeToServer(values.draftDueDate);
    values.internalDueDate = convertDateTimeToServer(values.internalDueDate);

    if (errors.length === 0) {
      const entity = {
        ...taskEntity,
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
          <h2 id="proTrackApp.task.home.createOrEditLabel">
            <Translate contentKey="proTrackApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="task-name">
                  <Translate contentKey="proTrackApp.task.name">Name</Translate>
                </Label>
                <AvField
                  id="task-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="task-description">
                  <Translate contentKey="proTrackApp.task.description">Description</Translate>
                </Label>
                <AvField id="task-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="erpProjectIDLabel" for="task-erpProjectID">
                  <Translate contentKey="proTrackApp.task.erpProjectID">Erp Project ID</Translate>
                </Label>
                <AvField id="task-erpProjectID" type="text" name="erpProjectID" />
              </AvGroup>
              <AvGroup>
                <Label id="erpProjectSequenceLabel" for="task-erpProjectSequence">
                  <Translate contentKey="proTrackApp.task.erpProjectSequence">Erp Project Sequence</Translate>
                </Label>
                <AvField id="task-erpProjectSequence" type="text" name="erpProjectSequence" />
              </AvGroup>
              <AvGroup>
                <Label id="erpProjectTypeLabel" for="task-erpProjectType">
                  <Translate contentKey="proTrackApp.task.erpProjectType">Erp Project Type</Translate>
                </Label>
                <AvField id="task-erpProjectType" type="text" name="erpProjectType" />
              </AvGroup>
              <AvGroup>
                <Label id="erpStatusLabel" for="task-erpStatus">
                  <Translate contentKey="proTrackApp.task.erpStatus">Erp Status</Translate>
                </Label>
                <AvField id="task-erpStatus" type="text" name="erpStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="task-status">
                  <Translate contentKey="proTrackApp.task.status">Status</Translate>
                </Label>
                <AvInput
                  id="task-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && taskEntity.status) || 'Open'}
                >
                  <option value="Open">{translate('proTrackApp.TaskStatus.Open')}</option>
                  <option value="Closed">{translate('proTrackApp.TaskStatus.Closed')}</option>
                  <option value="InProgress">{translate('proTrackApp.TaskStatus.InProgress')}</option>
                  <option value="OnHold">{translate('proTrackApp.TaskStatus.OnHold')}</option>
                  <option value="NeedInfo">{translate('proTrackApp.TaskStatus.NeedInfo')}</option>
                  <option value="Approved">{translate('proTrackApp.TaskStatus.Approved')}</option>
                  <option value="Rejected">{translate('proTrackApp.TaskStatus.Rejected')}</option>
                  <option value="ReOpen">{translate('proTrackApp.TaskStatus.ReOpen')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="assignedDateLabel" for="task-assignedDate">
                  <Translate contentKey="proTrackApp.task.assignedDate">Assigned Date</Translate>
                </Label>
                <AvField id="task-assignedDate" type="text" name="assignedDate" />
              </AvGroup>
              <AvGroup>
                <Label id="estimatedCompletionDateLabel" for="task-estimatedCompletionDate">
                  <Translate contentKey="proTrackApp.task.estimatedCompletionDate">Estimated Completion Date</Translate>
                </Label>
                <AvInput
                  id="task-estimatedCompletionDate"
                  type="datetime-local"
                  className="form-control"
                  name="estimatedCompletionDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.taskEntity.estimatedCompletionDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="completedDateLabel" for="task-completedDate">
                  <Translate contentKey="proTrackApp.task.completedDate">Completed Date</Translate>
                </Label>
                <AvInput
                  id="task-completedDate"
                  type="datetime-local"
                  className="form-control"
                  name="completedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.taskEntity.completedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="draftDueDateLabel" for="task-draftDueDate">
                  <Translate contentKey="proTrackApp.task.draftDueDate">Draft Due Date</Translate>
                </Label>
                <AvInput
                  id="task-draftDueDate"
                  type="datetime-local"
                  className="form-control"
                  name="draftDueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.taskEntity.draftDueDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="internalDueDateLabel" for="task-internalDueDate">
                  <Translate contentKey="proTrackApp.task.internalDueDate">Internal Due Date</Translate>
                </Label>
                <AvInput
                  id="task-internalDueDate"
                  type="datetime-local"
                  className="form-control"
                  name="internalDueDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.taskEntity.internalDueDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="priorityLabel" for="task-priority">
                  <Translate contentKey="proTrackApp.task.priority">Priority</Translate>
                </Label>
                <AvInput
                  id="task-priority"
                  type="select"
                  className="form-control"
                  name="priority"
                  value={(!isNew && taskEntity.priority) || 'Low'}
                >
                  <option value="Low">{translate('proTrackApp.Priority.Low')}</option>
                  <option value="Medium">{translate('proTrackApp.Priority.Medium')}</option>
                  <option value="High">{translate('proTrackApp.Priority.High')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="isOverdueLabel">
                  <AvInput id="task-isOverdue" type="checkbox" className="form-check-input" name="isOverdue" />
                  <Translate contentKey="proTrackApp.task.isOverdue">Is Overdue</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="inProgressLabel">
                  <AvInput id="task-inProgress" type="checkbox" className="form-check-input" name="inProgress" />
                  <Translate contentKey="proTrackApp.task.inProgress">In Progress</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="gradeLabel" for="task-grade">
                  <Translate contentKey="proTrackApp.task.grade">Grade</Translate>
                </Label>
                <AvInput id="task-grade" type="select" className="form-control" name="grade" value={(!isNew && taskEntity.grade) || 'A'}>
                  <option value="A">{translate('proTrackApp.Grade.A')}</option>
                  <option value="B">{translate('proTrackApp.Grade.B')}</option>
                  <option value="C">{translate('proTrackApp.Grade.C')}</option>
                  <option value="D">{translate('proTrackApp.Grade.D')}</option>
                  <option value="E">{translate('proTrackApp.Grade.E')}</option>
                  <option value="F">{translate('proTrackApp.Grade.F')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="task-assignedTo">
                  <Translate contentKey="proTrackApp.task.assignedTo">Assigned To</Translate>
                </Label>
                <AvInput id="task-assignedTo" type="select" className="form-control" name="assignedTo.id">
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
                <Label for="task-assignedBy">
                  <Translate contentKey="proTrackApp.task.assignedBy">Assigned By</Translate>
                </Label>
                <AvInput id="task-assignedBy" type="select" className="form-control" name="assignedBy.id">
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
                <Label for="task-assignedQC">
                  <Translate contentKey="proTrackApp.task.assignedQC">Assigned QC</Translate>
                </Label>
                <AvInput id="task-assignedQC" type="select" className="form-control" name="assignedQC.id">
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
                <Label for="task-parentProject">
                  <Translate contentKey="proTrackApp.task.parentProject">Parent Project</Translate>
                </Label>
                <AvInput id="task-parentProject" type="select" className="form-control" name="parentProject.id">
                  <option value="" key="0" />
                  {projects
                    ? projects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/task" replace color="info">
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
  projects: storeState.project.entities,
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpdate);
