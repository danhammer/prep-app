import { connect } from 'react-redux';
import { getPartners, getFeaturedPartners } from '../../actions/partners';
import Partners from '../../components/Partners';

const mapStateToProps = (state) => ({
  data: state.partners.list
});

const mapDispatchToProps = (dispatch) => ({
  getPartners: () => dispatch(getPartners()),
  getFeaturedPartners: () => dispatch(getFeaturedPartners())
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
