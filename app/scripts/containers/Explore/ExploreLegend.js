import { connect } from 'react-redux';
import ExploreMapLegend from '../../components/Explore/ExploreLegend';

import { setModalMetadata } from '../../actions/modal';
import { getDatasetMetadata } from '../../actions/datasets';
import { setLayersOrder, toggleLayerOpacity } from '../../actions/exploremap';
import { updateURL } from '../../actions/links';

function isLayerReady(dataset, layers) {
  if (dataset.layers && dataset.layers.length) {
    const layerId = dataset.layers[0].layer_id;
    if (layers && layers[layerId]) {
      return true;
    }
  }
  return false;
}

function sortByIndex(a, b) {
  if (a.index < b.index) return -1;
  if (a.index > b.index) return 1;
  return 0;
}

function getActiveLayers(datasets, layers) {
  if (!datasets.length) {
    return [];
  }
  const activeLayers = [];
  datasets.forEach((dataset) => {
    if (dataset.active && isLayerReady(dataset, layers)) {
      const layer = layers[dataset.layers[0].layer_id];
      layer.title = dataset.name;
      layer.index = dataset.index;
      layer.opacity = dataset.opacity;
      activeLayers.push(layer);
    }
  });
  activeLayers.sort(sortByIndex);
  return activeLayers;
}

const mapStateToProps = (state) => ({
  data: getActiveLayers(state.datasets.list, state.datasets.layers)
});
const mapDispatchToProps = (dispatch) => ({
  onInfoClick: (datasetId) => {
    dispatch(getDatasetMetadata(datasetId));
    dispatch(setModalMetadata(true, datasetId));
  },
  setLayersOrder: (layers) => {
    dispatch(setLayersOrder(layers));
    dispatch(updateURL());
  },
  toggleLayerOpacity: (layerId) => {
    dispatch(toggleLayerOpacity(layerId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMapLegend);
