// @flow
import React from 'react';
import { Col, Grid } from 'react-bootstrap';
import activeHtml from 'react-active-html';
import { postBodyReplacementComponents } from '../common/post/postBody';

export type InstructionsTextProps = {
  /** Instruction title */
  title: string,
  /** Instruction body */
  body: string
};

const renderRichtext = text => activeHtml(text, postBodyReplacementComponents());

const InstructionsText = ({ title, body }: InstructionsTextProps) => (
  <Grid fluid className="background-light instructions-text">
    <div className="max-container">
      <div className="content-section">
        <div className="announcement">
          <div className="announcement-title">
            <div className="title-hyphen">&nbsp;</div>
            <h3 className="announcement-title-text dark-title-1">{title}</h3>
          </div>
          <Col xs={12} md={8} className="announcement-media col-md-push-2">
            {renderRichtext(body)}
          </Col>
        </div>
      </div>
    </div>
  </Grid>
);

export default InstructionsText;