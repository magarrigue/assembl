import React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { Translate } from 'react-redux-i18n';
import { Link } from 'react-router';
import { NavDropdown, MenuItem } from 'react-bootstrap';

import { getContextual, get } from '../../utils/routeMap';
import UserQuery from '../../graphql/userQuery.graphql';
import withoutLoadingIndicator from './withoutLoadingIndicator';
import { browserHistory } from '../../router';

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentView = this.setCurrentView.bind(this);
  }

  componentWillMount() {
    this.setCurrentView();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location) {
      this.setState({ next: nextProps.location });
    }
  }

  setCurrentView() {
    const { location } = this.props;
    this.setState({
      next: location
    });
  }

  render() {
    const { slug, connectedUserId } = this.props;
    const dropdownUser = (
      <div className="inline">
        <span className="assembl-icon-profil grey" />
        <span className="user-account"><Translate value="profile.panelTitle" /></span>
      </div>
    );
    return (
      <div className="right avatar">
        {!connectedUserId && (
          <Link to={`${getContextual('login', { slug: slug })}?next=${this.state.next}`}>
            <div className="connection">
              <Translate value="navbar.connection" />
            </div>
          </Link>
        )}
        {connectedUserId && (
          <ul className="dropdown-xs">
            <NavDropdown pullRight title={dropdownUser} id="user-dropdown">
              <MenuItem
                onClick={() => {
                  browserHistory.push(get('profile', { slug: slug, userId: connectedUserId }));
                }}
              >
                <Translate value="profile.panelTitle" />
              </MenuItem>
              <MenuItem href={`${getContextual('oldLogout', { slug: slug })}?next=${get('home', { slug: slug })}`}>
                <Translate value="navbar.logout" />
              </MenuItem>
            </NavDropdown>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ context, debate }) => ({
  slug: debate.debateData.slug,
  connectedUserId: context.connectedUserId,
  id: context.connectedUserIdBase64
});

export default compose(
  connect(mapStateToProps),
  graphql(UserQuery, {
    props: ({ data }) => {
      if (data.loading) {
        return { loading: true };
      }
      if (data.error) {
        return { error: data.error };
      }
      return {
        displayName: data.user.displayName
      };
    }
  }),
  withoutLoadingIndicator()
)(ProfileIcon);