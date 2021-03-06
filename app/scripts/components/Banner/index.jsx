import React from 'react';

import homepageBg from '../../../images/bg/bg-home.jpg';
import partnershipBg from '../../../images/bg/bg-partnership.jpg';
import dashboardsBg from '../../../images/bg/bg-dashboards.jpg';
import dashboardBg from '../../../images/bg/bg-dashboard.png';
import insightsBg from '../../../images/bg/bg-insights.jpg';
import partnershipEngagementBg from '../../../images/bg/bg-partnership-engagement.jpg';
import partnershipPlatformsBg from '../../../images/bg/bg-partnership-platforms.jpg';
import contactBg from '../../../images/bg/bg-contact.jpg';
import resourcesBg from '../../../images/bg/bg-resources.jpg';
import createBg from '../../../images/bg/bg-create.jpg';
import partnersBg from '../../../images/bg/bg-partners.jpg';
import faqBg from '../../../images/bg/bg-faq.jpg';

const bg = {
  defaults: homepageBg,
  home: homepageBg,
  partnership: partnershipBg,
  dashboards: dashboardsBg,
  dashboard: dashboardBg,
  partnershipEngagement: partnershipEngagementBg,
  partnershipPlatforms: partnershipPlatformsBg,
  insights: insightsBg,
  insight: insightsBg,
  datasets: homepageBg,
  contact: contactBg,
  resources: resourcesBg,
  create: createBg,
  partners: partnersBg,
  faq: faqBg
};

class Banner extends React.Component {

  getClassName() {
    let sizeClassName = `c-banner -inverse -${this.props.size || 'medium'}`;
    if (this.props.landing) {
      sizeClassName = `${sizeClassName} -landing`;
    }
    return sizeClassName;
  }

  render() {
    const styles = {
      backgroundImage: `url(${bg[this.props.bg || 'defaults']})`
    };

    return (
      <div
        className={this.getClassName()}
        style={styles}
      >
        <div className="row align-middle">
          <div className="column small-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

export default Banner;
