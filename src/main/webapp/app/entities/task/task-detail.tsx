import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskDetail = (props: ITaskDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="proTrackApp.task.detail.title">Task</Translate> [<b>{taskEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="proTrackApp.task.name">Name</Translate>
            </span>
          </dt>
          <dd>{taskEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="proTrackApp.task.description">Description</Translate>
            </span>
          </dt>
          <dd>{taskEntity.description}</dd>
          <dt>
            <span id="erpProjectID">
              <Translate contentKey="proTrackApp.task.erpProjectID">Erp Project ID</Translate>
            </span>
          </dt>
          <dd>{taskEntity.erpProjectID}</dd>
          <dt>
            <span id="erpProjectSequence">
              <Translate contentKey="proTrackApp.task.erpProjectSequence">Erp Project Sequence</Translate>
            </span>
          </dt>
          <dd>{taskEntity.erpProjectSequence}</dd>
          <dt>
            <span id="erpProjectType">
              <Translate contentKey="proTrackApp.task.erpProjectType">Erp Project Type</Translate>
            </span>
          </dt>
          <dd>{taskEntity.erpProjectType}</dd>
          <dt>
            <span id="erpStatus">
              <Translate contentKey="proTrackApp.task.erpStatus">Erp Status</Translate>
            </span>
          </dt>
          <dd>{taskEntity.erpStatus}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="proTrackApp.task.status">Status</Translate>
            </span>
          </dt>
          <dd>{taskEntity.status}</dd>
          <dt>
            <span id="assignedDate">
              <Translate contentKey="proTrackApp.task.assignedDate">Assigned Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.assignedDate}</dd>
          <dt>
            <span id="estimatedCompletionDate">
              <Translate contentKey="proTrackApp.task.estimatedCompletionDate">Estimated Completion Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.estimatedCompletionDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="completedDate">
              <Translate contentKey="proTrackApp.task.completedDate">Completed Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.completedDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="draftDueDate">
              <Translate contentKey="proTrackApp.task.draftDueDate">Draft Due Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.draftDueDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="internalDueDate">
              <Translate contentKey="proTrackApp.task.internalDueDate">Internal Due Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskEntity.internalDueDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="priority">
              <Translate contentKey="proTrackApp.task.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{taskEntity.priority}</dd>
          <dt>
            <span id="isOverdue">
              <Translate contentKey="proTrackApp.task.isOverdue">Is Overdue</Translate>
            </span>
          </dt>
          <dd>{taskEntity.isOverdue ? 'true' : 'false'}</dd>
          <dt>
            <span id="inProgress">
              <Translate contentKey="proTrackApp.task.inProgress">In Progress</Translate>
            </span>
          </dt>
          <dd>{taskEntity.inProgress ? 'true' : 'false'}</dd>
          <dt>
            <span id="grade">
              <Translate contentKey="proTrackApp.task.grade">Grade</Translate>
            </span>
          </dt>
          <dd>{taskEntity.grade}</dd>
          <dt>
            <Translate contentKey="proTrackApp.task.assignedTo">Assigned To</Translate>
          </dt>
          <dd>{taskEntity.assignedTo ? taskEntity.assignedTo.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.task.assignedBy">Assigned By</Translate>
          </dt>
          <dd>{taskEntity.assignedBy ? taskEntity.assignedBy.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.task.assignedQC">Assigned QC</Translate>
          </dt>
          <dd>{taskEntity.assignedQC ? taskEntity.assignedQC.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.task.parentProject">Parent Project</Translate>
          </dt>
          <dd>{taskEntity.parentProject ? taskEntity.parentProject.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
