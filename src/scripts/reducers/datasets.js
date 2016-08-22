import {
  DATASET_LIST_RECEIVED,
  DATASET_DETAIL_RECEIVED,
  DATASET_LAYER_RECEIVED,
  DATASET_METADATA_RECEIVED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS,
  DATASET_LAYER_FETCH_ERROR,
  DATASET_SET_FILTER
} from '../constants';

const initialState = {
  list: [],
  details: {},
  layers: {},
  metadatas: {},
  filters: {
    tag: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATASET_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    case DATASET_DETAIL_RECEIVED: {
      const details = Object.assign({}, state.details, {});
      details[action.payload.data.attributes.datasetId] = action.payload.data;
      return Object.assign({}, state, { details });
    }
    case DATASET_LAYER_RECEIVED: {
      const layers = Object.assign({}, state.layers, {});
      layers[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, { layers });
    }
    case DATASET_METADATA_RECEIVED: {
      const metadatas = Object.assign({}, state.metadatas, {});
      metadatas[action.payload.attributes.dataset] = action.payload;
      return Object.assign({}, state, { metadatas });
    }
    case DATASET_LAYER_FETCH_ERROR: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload.id) {
          list[i].active = false;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    case DATASET_SET_FILTER: {
      return Object.assign({}, state, { filters: action.payload });
    }
    case TOGGLE_LAYER_STATUS: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload) {
          list[i].active = !list[i].active;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    case SET_LAYER_STATUS: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload.id) {
          list[i].active = action.payload.status;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    default:
      return state;
  }
}