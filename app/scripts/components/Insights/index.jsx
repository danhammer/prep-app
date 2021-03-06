import React from 'react';
import { Link } from 'react-router';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Card from '../Cards/Card';

class DashboardsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createInsightModalOpen: false
    };
  }

  componentDidMount() {
    if (!this.props.data.length) {
      this.props.getInsightsList();
    }
  }

  getContent() {
    if (!this.props.data || this.props.data.length === 0) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

    let items = [];
    this.props.data.forEach((item, index) => {
      items.push(
        <div className={`columns small-10 medium-5 align-stretch ${index % 2 === 0 ? 'small-offset-1' : ''}`}
          key={`insight-item-${index}`}
          style={{display: 'flex'}}
        >
          <Card border="neutral">
            <h3>
              <Link to={`/insight/${item.slug}`}>
               {item.title}
              </Link>
            </h3>
            <p>
              {item.summary}
            </p>
            {item.partner &&
              <a href={item.partner.url} target="_blank">
                <img
                  src={config.apiUrl + item.partner.images.logo}
                  className="logo"
                  alt={item.partner.name}
                />
              </a>
            }
            {item.attribution &&
              <span className="attribution">{item.attribution}</span>
            }
          </Card>
        </div>
      );
    });

    return (
      <div className="row align-stretch">
        {items}
      </div>
    );
  }

  render() {
    let content = this.getContent();

    return (
      <div className="">
        <div className="sliced"></div>

        {content}

      </div>
    );
  }
}

DashboardsPage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
  /**
   * Define function to get the insights list
   */
  getInsightsList: React.PropTypes.func.isRequired,
  /**
   * Define insights list data
   */
  data: React.PropTypes.array
};

export default DashboardsPage;
