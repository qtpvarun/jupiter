import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISubTask, defaultValue } from 'app/shared/model/sub-task.model';

export const ACTION_TYPES = {
  FETCH_SUBTASK_LIST: 'subTask/FETCH_SUBTASK_LIST',
  FETCH_SUBTASK: 'subTask/FETCH_SUBTASK',
  CREATE_SUBTASK: 'subTask/CREATE_SUBTASK',
  UPDATE_SUBTASK: 'subTask/UPDATE_SUBTASK',
  DELETE_SUBTASK: 'subTask/DELETE_SUBTASK',
  RESET: 'subTask/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISubTask>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SubTaskState = Readonly<typeof initialState>;

// Reducer

export default (state: SubTaskState = initialState, action): SubTaskState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUBTASK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUBTASK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SUBTASK):
    case REQUEST(ACTION_TYPES.UPDATE_SUBTASK):
    case REQUEST(ACTION_TYPES.DELETE_SUBTASK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SUBTASK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUBTASK):
    case FAILURE(ACTION_TYPES.CREATE_SUBTASK):
    case FAILURE(ACTION_TYPES.UPDATE_SUBTASK):
    case FAILURE(ACTION_TYPES.DELETE_SUBTASK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBTASK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBTASK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUBTASK):
    case SUCCESS(ACTION_TYPES.UPDATE_SUBTASK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUBTASK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/sub-tasks';

// Actions

export const getEntities: ICrudGetAllAction<ISubTask> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SUBTASK_LIST,
    payload: axios.get<ISubTask>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISubTask> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUBTASK,
    payload: axios.get<ISubTask>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISubTask> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUBTASK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISubTask> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUBTASK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISubTask> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUBTASK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
