import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfessional, defaultValue } from 'app/shared/model/professional.model';

export const ACTION_TYPES = {
  FETCH_PROFESSIONAL_LIST: 'professional/FETCH_PROFESSIONAL_LIST',
  FETCH_PROFESSIONAL: 'professional/FETCH_PROFESSIONAL',
  CREATE_PROFESSIONAL: 'professional/CREATE_PROFESSIONAL',
  UPDATE_PROFESSIONAL: 'professional/UPDATE_PROFESSIONAL',
  PARTIAL_UPDATE_PROFESSIONAL: 'professional/PARTIAL_UPDATE_PROFESSIONAL',
  DELETE_PROFESSIONAL: 'professional/DELETE_PROFESSIONAL',
  RESET: 'professional/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfessional>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProfessionalState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfessionalState = initialState, action): ProfessionalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFESSIONAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFESSIONAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFESSIONAL):
    case REQUEST(ACTION_TYPES.UPDATE_PROFESSIONAL):
    case REQUEST(ACTION_TYPES.DELETE_PROFESSIONAL):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFESSIONAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFESSIONAL):
    case FAILURE(ACTION_TYPES.CREATE_PROFESSIONAL):
    case FAILURE(ACTION_TYPES.UPDATE_PROFESSIONAL):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONAL):
    case FAILURE(ACTION_TYPES.DELETE_PROFESSIONAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSIONAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSIONAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFESSIONAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFESSIONAL):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFESSIONAL):
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

const apiUrl = 'api/professionals';

// Actions

export const getEntities: ICrudGetAllAction<IProfessional> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSIONAL_LIST,
    payload: axios.get<IProfessional>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProfessional> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSIONAL,
    payload: axios.get<IProfessional>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProfessional> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFESSIONAL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfessional> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFESSIONAL,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IProfessional> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PROFESSIONAL,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfessional> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFESSIONAL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
