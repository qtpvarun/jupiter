import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task-history.reducer';
import { ITaskHistory } from 'app/shared/model/task-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskHistoryDetail = (props: ITaskHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { taskHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="proTrackApp.taskHistory.detail.title">TaskHistory</Translate> [<b>{taskHistoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="eventDate">
              <Translate contentKey="proTrackApp.taskHistory.eventDate">Event Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={taskHistoryEntity.eventDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="eventType">
              <Translate contentKey="proTrackApp.taskHistory.eventType">Event Type</Translate>
            </span>
          </dt>
          <dd>{taskHistoryEntity.eventType}</dd>
          <dt>
            <span id="eventTopic">
              <Translate contentKey="proTrackApp.taskHistory.eventTopic">Event Topic</Translate>
            </span>
          </dt>
          <dd>{taskHistoryEntity.eventTopic}</dd>
          <dt>
            <span id="eventDetail">
              <Translate contentKey="proTrackApp.taskHistory.eventDetail">Event Detail</Translate>
            </span>
          </dt>
          <dd>{taskHistoryEntity.eventDetail}</dd>
          <dt>
            <span id="redline">
              <Translate contentKey="proTrackApp.taskHistory.redline">Redline</Translate>
            </span>
          </dt>
          <dd>{taskHistoryEntity.redline}</dd>
          <dt>
            <Translate contentKey="proTrackApp.taskHistory.parentTask">Parent Task</Translate>
          </dt>
          <dd>{taskHistoryEntity.parentTask ? taskHistoryEntity.parentTask.name : ''}</dd>
          <dt>
            <Translate contentKey="proTrackApp.taskHistory.parentSubTask">Parent Sub Task</Translate>
          </dt>
          <dd>{taskHistoryEntity.parentSubTask ? taskHistoryEntity.parentSubTask.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/task-history" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task-history/${taskHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ taskHistory }: IRootState) => ({
  taskHistoryEntity: taskHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskHistoryDetail);
