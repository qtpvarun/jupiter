import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sub-task.reducer';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ISubTaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SubTask = (props: ISubTaskProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  useEffect(() => {
    getAllEntities();
  }, []);

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const { subTaskList, match, totalItems } = props;
  return (
    <div>
      <h2 id="sub-task-heading">
        <Translate contentKey="proTrackApp.subTask.home.title">Sub Tasks</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="proTrackApp.subTask.home.createLabel">Create new Sub Task</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {subTaskList && subTaskList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="proTrackApp.subTask.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="proTrackApp.subTask.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="proTrackApp.subTask.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('assignedDate')}>
                  <Translate contentKey="proTrackApp.subTask.assignedDate">Assigned Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('estimatedCompletionDate')}>
                  <Translate contentKey="proTrackApp.subTask.estimatedCompletionDate">Estimated Completion Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('closedDate')}>
                  <Translate contentKey="proTrackApp.subTask.closedDate">Closed Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('priority')}>
                  <Translate contentKey="proTrackApp.subTask.priority">Priority</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isOverdue')}>
                  <Translate contentKey="proTrackApp.subTask.isOverdue">Is Overdue</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('inProgress')}>
                  <Translate contentKey="proTrackApp.subTask.inProgress">In Progress</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="proTrackApp.subTask.assignedTo">Assigned To</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="proTrackApp.subTask.assignedBy">Assigned By</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="proTrackApp.subTask.sourceUser">Source User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="proTrackApp.subTask.targetUser">Target User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="proTrackApp.subTask.parentTask">Parent Task</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subTaskList.map((subTask, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${subTask.id}`} color="link" size="sm">
                      {subTask.id}
                    </Button>
                  </td>
                  <td>{subTask.name}</td>
                  <td>{subTask.description}</td>
                  <td>
                    <Translate contentKey={`proTrackApp.SubTaskStatus.${subTask.status}`} />
                  </td>
                  <td>
                    <TextFormat type="date" value={subTask.assignedDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={subTask.estimatedCompletionDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={subTask.closedDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`proTrackApp.Priority.${subTask.priority}`} />
                  </td>
                  <td>{subTask.isOverdue ? 'true' : 'false'}</td>
                  <td>{subTask.inProgress ? 'true' : 'false'}</td>
                  <td>{subTask.assignedTo ? subTask.assignedTo.login : ''}</td>
                  <td>{subTask.assignedBy ? subTask.assignedBy.login : ''}</td>
                  <td>{subTask.sourceUser ? subTask.sourceUser.login : ''}</td>
                  <td>{subTask.targetUser ? subTask.targetUser.login : ''}</td>
                  <td>{subTask.parentTask ? <Link to={`task/${subTask.parentTask.id}`}>{subTask.parentTask.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${subTask.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${subTask.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${subTask.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="proTrackApp.subTask.home.notFound">No Sub Tasks found</Translate>
          </div>
        )}
      </div>
      <div className={subTaskList && subTaskList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({ subTask }: IRootState) => ({
  subTaskList: subTask.entities,
  totalItems: subTask.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubTask);
