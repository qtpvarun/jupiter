import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICarrier, defaultValue } from 'app/shared/model/carrier.model';

export const ACTION_TYPES = {
  FETCH_CARRIER_LIST: 'carrier/FETCH_CARRIER_LIST',
  FETCH_CARRIER: 'carrier/FETCH_CARRIER',
  CREATE_CARRIER: 'carrier/CREATE_CARRIER',
  UPDATE_CARRIER: 'carrier/UPDATE_CARRIER',
  DELETE_CARRIER: 'carrier/DELETE_CARRIER',
  RESET: 'carrier/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICarrier>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CarrierState = Readonly<typeof initialState>;

// Reducer

export default (state: CarrierState = initialState, action): CarrierState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARRIER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARRIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CARRIER):
    case REQUEST(ACTION_TYPES.UPDATE_CARRIER):
    case REQUEST(ACTION_TYPES.DELETE_CARRIER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CARRIER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARRIER):
    case FAILURE(ACTION_TYPES.CREATE_CARRIER):
    case FAILURE(ACTION_TYPES.UPDATE_CARRIER):
    case FAILURE(ACTION_TYPES.DELETE_CARRIER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRIER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRIER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARRIER):
    case SUCCESS(ACTION_TYPES.UPDATE_CARRIER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARRIER):
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

const apiUrl = 'api/carriers';

// Actions

export const getEntities: ICrudGetAllAction<ICarrier> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CARRIER_LIST,
    payload: axios.get<ICarrier>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICarrier> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARRIER,
    payload: axios.get<ICarrier>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICarrier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARRIER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICarrier> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARRIER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICarrier> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARRIER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
