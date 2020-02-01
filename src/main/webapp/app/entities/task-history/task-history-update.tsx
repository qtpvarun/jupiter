import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { getEntities as getSubTasks } from 'app/entities/sub-task/sub-task.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task-history.reducer';
import { ITaskHistory } from 'app/shared/model/task-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskHistoryUpdate = (props: ITaskHistoryUpdateProps) => {
  const [parentTaskId, setParentTaskId] = useState('0');
  const [parentSubTaskId, setParentSubTaskId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { taskHistoryEntity, tasks, subTasks, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task-history' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTasks();
    props.getSubTasks();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.eventDate = convertDateTimeToServer(values.eventDate);

    if (errors.length === 0) {
      const entity = {
        ...taskHistoryEntity,
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
          <h2 id="proTrackApp.taskHistory.home.createOrEditLabel">
            <Translate contentKey="proTrackApp.taskHistory.home.createOrEditLabel">Create or edit a TaskHistory</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-history-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="task-history-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="eventDateLabel" for="task-history-eventDate">
                  <Translate contentKey="proTrackApp.taskHistory.eventDate">Event Date</Translate>
                </Label>
                <AvInput
                  id="task-history-eventDate"
                  type="datetime-local"
                  className="form-control"
                  name="eventDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? null : convertDateTimeFromServer(props.taskHistoryEntity.eventDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="eventTypeLabel" for="task-history-eventType">
                  <Translate contentKey="proTrackApp.taskHistory.eventType">Event Type</Translate>
                </Label>
                <AvInput
                  id="task-history-eventType"
                  type="select"
                  className="form-control"
                  name="eventType"
                  value={(!isNew && taskHistoryEntity.eventType) || 'Change'}
                >
                  <option value="Change">{translate('proTrackApp.EventType.Change')}</option>
                  <option value="Message">{translate('proTrackApp.EventType.Message')}</option>
                  <option value="Approval">{translate('proTrackApp.EventType.Approval')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="eventTopicLabel" for="task-history-eventTopic">
                  <Translate contentKey="proTrackApp.taskHistory.eventTopic">Event Topic</Translate>
                </Label>
                <AvField id="task-history-eventTopic" type="text" name="eventTopic" />
              </AvGroup>
              <AvGroup>
                <Label id="eventDetailLabel" for="task-history-eventDetail">
                  <Translate contentKey="proTrackApp.taskHistory.eventDetail">Event Detail</Translate>
                </Label>
                <AvField id="task-history-eventDetail" type="text" name="eventDetail" />
              </AvGroup>
              <AvGroup>
                <Label id="redlineLabel" for="task-history-redline">
                  <Translate contentKey="proTrackApp.taskHistory.redline">Redline</Translate>
                </Label>
                <AvField id="task-history-redline" type="text" name="redline" />
              </AvGroup>
              <AvGroup>
                <Label for="task-history-parentTask">
                  <Translate contentKey="proTrackApp.taskHistory.parentTask">Parent Task</Translate>
                </Label>
                <AvInput id="task-history-parentTask" type="select" className="form-control" name="parentTask.id">
                  <option value="" key="0" />
                  {tasks
                    ? tasks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="task-history-parentSubTask">
                  <Translate contentKey="proTrackApp.taskHistory.parentSubTask">Parent Sub Task</Translate>
                </Label>
                <AvInput id="task-history-parentSubTask" type="select" className="form-control" name="parentSubTask.id">
                  <option value="" key="0" />
                  {subTasks
                    ? subTasks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/task-history" replace color="info">
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
  tasks: storeState.task.entities,
  subTasks: storeState.subTask.entities,
  taskHistoryEntity: storeState.taskHistory.entity,
  loading: storeState.taskHistory.loading,
  updating: storeState.taskHistory.updating,
  updateSuccess: storeState.taskHistory.updateSuccess
});

const mapDispatchToProps = {
  getTasks,
  getSubTasks,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskHistoryUpdate);
