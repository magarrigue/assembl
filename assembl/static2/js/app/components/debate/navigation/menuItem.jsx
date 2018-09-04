// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { isMobile } from '../../../utils/globalFunctions';
import { get, goTo } from '../../../utils/routeMap';
import PostsAndContributorsCount from '../../common/postsAndContributorsCount';

type ItemNode = {
  id: string,
  title: string,
  img: {
    externalUrl: string
  },
  numContributors: number,
  numPosts: number
};

type MenuItemProps = {
  item: ItemNode,
  identifier: string,
  phaseId: string,
  selected: boolean,
  hasSubItems: boolean,
  slug: string,
  onClick: Function,
  onMouseOver: Function,
  onMouseLeave: Function
};

export class DumbMenuItem extends React.Component<MenuItemProps> {
  showMenu = () => {
    const { onMouseOver, item } = this.props;
    if (onMouseOver) onMouseOver(item.id);
  };

  hideMenu = () => {
    const { onMouseLeave, item } = this.props;
    if (onMouseLeave) onMouseLeave(item.id);
  };

  onLinkClick = () => {
    const { identifier, phaseId, item, slug, onClick } = this.props;
    if (onClick) onClick();
    goTo(get('idea', { slug: slug, phase: identifier, phaseId: phaseId, themeId: item.id }));
  };

  render() {
    const { item, selected, hasSubItems } = this.props;
    const { title, img, numContributors, numPosts } = item;
    // The first touch show the menu and the second activate the link
    const isTouchScreenDevice = isMobile.any();
    const displayArrow = selected && hasSubItems;
    const touchActive = isTouchScreenDevice && hasSubItems && !selected;
    const onLinkClick = touchActive ? this.showMenu : this.onLinkClick;
    return (
      <div
        className={classNames('menu-item-container', {
          active: selected,
          empty: selected && !displayArrow
        })}
        onMouseOver={!isTouchScreenDevice && this.showMenu}
        onMouseLeave={!isTouchScreenDevice && this.hideMenu}
      >
        <div onClick={onLinkClick} className="menu-item">
          <div className="thumb-img" style={img && img.externalUrl ? { backgroundImage: `url(${img.externalUrl})` } : null}>
            <div className="thumb-img-background" />
          </div>
          <div className="thumb-body">
            <div title={title} className="thumb-title">
              {title}
            </div>
            <PostsAndContributorsCount className="menu-stats" numContributors={numContributors} numPosts={numPosts} />
          </div>
          {displayArrow && <span className="thumb-arrow assembl-icon assembl-icon-right-dir" />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  slug: state.debate.debateData.slug
});

export default connect(mapStateToProps)(DumbMenuItem);