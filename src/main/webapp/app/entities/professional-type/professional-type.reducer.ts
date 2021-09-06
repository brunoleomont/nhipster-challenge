import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfessionalType, defaultValue } from 'app/shared/model/professional-type.model';

export const ACTION_TYPES = {
  FETCH_PROFESSIONALTYPE_LIST: 'professionalType/FETCH_PROFESSIONALTYPE_LIST',
  FETCH_PROFESSIONALTYPE: 'professionalType/FETCH_PROFESSIONALTYPE',
  CREATE_PROFESSIONALTYPE: 'professionalType/CREATE_PROFESSIONALTYPE',
  UPDATE_PROFESSIONALTYPE: 'professionalType/UPDATE_PROFESSIONALTYPE',
  PARTIAL_UPDATE_PROFESSIONALTYPE: 'professionalType/PARTIAL_UPDATE_PROFESSIONALTYPE',
  DELETE_PROFESSIONALTYPE: 'professionalType/DELETE_PROFESSIONALTYPE',
  RESET: 'professionalType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfessionalType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProfessionalTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfessionalTypeState = initialState, action): ProfessionalTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFESSIONALTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFESSIONALTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFESSIONALTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PROFESSIONALTYPE):
    case REQUEST(ACTION_TYPES.DELETE_PROFESSIONALTYPE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONALTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFESSIONALTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFESSIONALTYPE):
    case FAILURE(ACTION_TYPES.CREATE_PROFESSIONALTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PROFESSIONALTYPE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONALTYPE):
    case FAILURE(ACTION_TYPES.DELETE_PROFESSIONALTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSIONALTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSIONALTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFESSIONALTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFESSIONALTYPE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONALTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFESSIONALTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/professional-types';

// Actions

export const getEntities: ICrudGetAllAction<IProfessionalType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSIONALTYPE_LIST,
    payload: axios.get<IProfessionalType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProfessionalType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSIONALTYPE,
    payload: axios.get<IProfessionalType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProfessionalType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFESSIONALTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfessionalType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFESSIONALTYPE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IProfessionalType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONALTYPE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfessionalType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFESSIONALTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
