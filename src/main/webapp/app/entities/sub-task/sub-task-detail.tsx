import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sub-task.reducer';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubTaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubTaskDetail = (props: ISubTaskDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subTaskEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="proTrackApp.subTask.detail.title">SubTask</Translate> [<b>{subTaskEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="proTrackApp.subTask.name">Name</Translate>
            </span>
          </dt>
          <dd>{subTaskEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="proTrackApp.subTask.description">Description</Translate>
            </span>
          </dt>
          <dd>{subTaskEntity.description}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="proTrackApp.subTask.status">Status</Translate>
            </span>
          </dt>
          <dd>{subTaskEntity.status}</dd>
          <dt>
            <span id="assignedDate">
              <Translate contentKey="proTrackApp.subTask.assignedDate">Assigned Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={subTaskEntity.assignedDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="estimatedCompletionDate">
              <Translate contentKey="proTrackApp.subTask.estimatedCompletionDate">Estimated Completion Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={subTaskEntity.estimatedCompletionDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="closedDate">
              <Translate contentKey="proTrackApp.subTask.closedDate">Closed Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={subTaskEntity.closedDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="priority">
              <Translate contentKey="proTrackApp.subTask.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{subTaskEntity.priority}</dd>
          <dt>
            <span id="isOverdue">
              <Translate contentKey="proTrackApp.subTask.isOverdue">Is Overdue</Translate>
            </span>
          </dt>
          <dd>{subTaskEntity.isOverdue ? 'true' : 'false'}</dd>
          <dt>
            <span id="inProgress">
              <Translate contentKey="proTrackApp.subTask.inProgress">In Progress</Translate>
            </span>
          </dt>
          <dd>{subTaskEntity.inProgress ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="proTrackApp.subTask.assignedTo">Assigned To</Translate>
          </dt>
          <dd>{subTaskEntity.assignedTo ? subTaskEntity.assignedTo.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.subTask.assignedBy">Assigned By</Translate>
          </dt>
          <dd>{subTaskEntity.assignedBy ? subTaskEntity.assignedBy.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.subTask.sourceUser">Source User</Translate>
          </dt>
          <dd>{subTaskEntity.sourceUser ? subTaskEntity.sourceUser.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.subTask.targetUser">Target User</Translate>
          </dt>
          <dd>{subTaskEntity.targetUser ? subTaskEntity.targetUser.login : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.subTask.parentTask">Parent Task</Translate>
          </dt>
          <dd>{subTaskEntity.parentTask ? subTaskEntity.parentTask.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/sub-task" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sub-task/${subTaskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subTask }: IRootState) => ({
  subTaskEntity: subTask.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubTaskDetail);
