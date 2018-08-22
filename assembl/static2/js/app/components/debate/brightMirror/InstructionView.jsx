// @flow
import React from 'react';

import { Col } from 'react-bootstrap';
import activeHtml from 'react-active-html';
import { postBodyReplacementComponents } from '../common/post/postBody';
import Permissions, { connectedUserCan } from '../../../utils/permissions';
import TopPostFormContainer from '../../../components/debate/common/topPostFormContainer';
import { getIfPhaseCompletedById } from '../../../utils/timeline';

type Announcement = {
  title: string,
  body: string
};

type Props = {
  isUserConnected: boolean,
  ideaId: string,
  refetchIdea: Function,
  posts: Array<*>,
  timeline: Timeline,
  phaseId: string,
  announcementContent: Announcement
};

const InstructionView = ({ isUserConnected, ideaId, refetchIdea, posts, announcementContent, timeline, phaseId }: Props) => (
  <div className="overflow-x">
    <div className="announcement">
      <div className="announcement-title">
        <div className="title-hyphen">&nbsp;</div>
        <h3 className="announcement-title-text dark-title-1">{announcementContent.title}</h3>
      </div>
      <Col xs={12} md={8} className="announcement-media col-md-push-4">
        <div>{activeHtml(announcementContent.body, postBodyReplacementComponents())}</div>
      </Col>
    </div>
    {isUserConnected && connectedUserCan(Permissions.ADD_POST) && !getIfPhaseCompletedById(timeline, phaseId) ? (
      <TopPostFormContainer
        ideaId={ideaId}
        refetchIdea={refetchIdea}
        topPostsCount={posts.length}
        instructionLabel="debate.brightMirror.startFictionLabel"
        fillBodyLabel="debate.brightMirror.fillBodyLabel"
        bodyPlaceholder="debate.brightMirror.fillBodyLabel"
        postSuccessMsg="debate.brightMirror.postSuccessMsg"
      />
    ) : null}
  </div>
);

export default InstructionView;