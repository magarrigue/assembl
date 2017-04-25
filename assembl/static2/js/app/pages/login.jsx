import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import get from 'lodash/get';
import { I18n } from 'react-redux-i18n';
import AsLogin from '../components/login/assemblLogin';
import { SocialMedia } from '../components/login/socialMediaLogin';
import { getProvidersData } from '../utils/globalFunctions';

class Login extends React.Component {
  render() {
    const { debateData } = this.props.debate;
    const providers = getProvidersData();
    const next = get(this.props, 'location.query.next', null);
    const isSocialMedias = providers.length > 0;
    return (
      <Grid fluid>
        <Col xs={12} md={isSocialMedias ? 6 : 4} className="col-centered">
          <div className="box-title">{debateData ? debateData.topic : I18n.t('login.login')}</div>
          <div className="box">
            {isSocialMedias && 
              <div>
                <Col xs={12} md={5}>
                  <SocialMedia providers={providers} /> 
                </Col>
                <Col xs={12} md={1}>&nbsp;</Col>
              </div>
            }
            <Col xs={12} md={isSocialMedias ? 6 : 12}>
              <AsLogin next={next} slug={debateData ? debateData.slug : null} />
            </Col>
            <div className="clear">&nbsp;</div>
          </div>
        </Col>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    debate: state.debate,
    context: state.context
  };
};

export default connect(mapStateToProps)(Login);