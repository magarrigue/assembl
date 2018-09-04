// @flow
import * as React from 'react';
import { withApollo, type ApolloClient } from 'react-apollo';
import { Translate, Localize } from 'react-redux-i18n';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { prefetchMenuQuery } from './menuTable';
import { getPhaseStatus, isSeveralIdentifiers } from '../../../utils/timeline';
import { displayModal } from '../../../utils/utilityManager';
import { get, goTo } from '../../../utils/routeMap';
import { isMobile } from '../../../utils/globalFunctions';
import { PHASE_STATUS, PHASES } from '../../../constants';

export const phasesToIgnore = [PHASES.voteSession];

export type DebateType = {
  debateData: {
    slug: string,
    useSocialMedia: boolean
  }
};

type TimelineSegmentProps = {
  timeline: Timeline,
  index: number,
  client: ApolloClient,
  title: string,
  startDate: string,
  endDate: string,
  phaseIdentifier: string,
  phaseId: string,
  debate: DebateType,
  barPercent: number,
  locale: string,
  active: boolean,
  onSelect: Function,
  onDeselect: Function
};

type TimelineSegmentState = {
  active: boolean
};

export class DumbTimelineSegment extends React.Component<TimelineSegmentProps, TimelineSegmentState> {
  state = {
    active: false
  };

  componentWillMount() {
    const { phaseId, phaseIdentifier, title, startDate, endDate, locale, client } = this.props;
    this.isTouchScreenDevice = isMobile.any();
    this.phaseStatus = getPhaseStatus(startDate, endDate);
    const notStarted = this.phaseStatus === PHASE_STATUS.notStarted;
    const ignore = phasesToIgnore.includes(phaseIdentifier);
    this.ignoreMenu = ignore && !notStarted;
    this.phaseName = title;
    const discussionPhaseId = phaseId ? atob(phaseId).split(':')[1] : null;
    if (discussionPhaseId && !ignore && !notStarted) {
      // don't prefetch if we're not going to use it
      prefetchMenuQuery(client, {
        lang: locale,
        identifier: phaseIdentifier,
        discussionPhaseId: discussionPhaseId
      });
    }
  }

  phaseStatus = null;

  phaseName = null;

  ignoreMenu = false;

  isTouchScreenDevice = false;

  segment = null;

  select = () => {
    const { onSelect, index } = this.props;
    onSelect(index);
  };

  renderNotStarted = () => {
    const { startDate } = this.props;
    return (
      <div>
        <Translate value="debate.notStarted" phaseName={this.phaseName} />
        <Localize value={startDate} dateFormat="date.format" />
      </div>
    );
  };

  displayPhase = () => {
    const { phaseId, phaseIdentifier, onDeselect, timeline } = this.props;
    const { debateData } = this.props.debate;
    const params = { slug: debateData.slug, phase: phaseIdentifier, phaseId: phaseId };
    const isSeveralPhases = isSeveralIdentifiers(timeline);
    if (isSeveralPhases) {
      if (this.phaseStatus === PHASE_STATUS.notStarted) {
        displayModal(null, this.renderNotStarted(), true, null, null, true);
        onDeselect();
      }
      if (this.phaseStatus === PHASE_STATUS.inProgress || this.phaseStatus === PHASE_STATUS.completed) {
        goTo(get('debate', params));
        onDeselect();
      }
    } else {
      goTo(get('debate', params));
      onDeselect();
    }
  };

  render() {
    const { barPercent, title, active } = this.props;
    const inProgress = this.phaseStatus === PHASE_STATUS.inProgress;
    const timelineClass = 'timeline-title txt-active-light';
    const touchActive = this.isTouchScreenDevice && !active;
    const onClick = touchActive ? this.select : this.displayPhase;
    return (
      <div
        ref={(segment) => {
          this.segment = segment;
        }}
        className={classNames('minimized-timeline', {
          active: active
        })}
        onMouseOver={!this.isTouchScreenDevice ? this.select : null}
      >
        <div onClick={onClick} className={timelineClass}>
          {inProgress && <span className="arrow assembl-icon assembl-icon-right-dir" />}
          <div className="timeline-link">{title}</div>
        </div>
        <div className="timeline-graph">
          <div className="timeline-bars">
            {barPercent > 0 && (
              <div className="timeline-bar-filler" style={barPercent < 20 ? { width: '20%' } : { width: `${barPercent}%` }}>
                &nbsp;
              </div>
            )}
            <div className="timeline-bar-background-container">
              &nbsp;
              <div className="timeline-bar-background" />
            </div>
          </div>
        </div>
        {!this.ignoreMenu && active && <span className="timeline-arrow" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.i18n.locale,
  debate: state.debate,
  timeline: state.timeline
});

// $FlowFixMe
export default connect(mapStateToProps)(withApollo(DumbTimelineSegment));