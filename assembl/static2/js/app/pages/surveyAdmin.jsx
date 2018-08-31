// @flow
import React from 'react';
import { I18n } from 'react-redux-i18n';

import SectionTitle from '../components/administration/sectionTitle';
import SurveyAdminForm from '../components/administration/survey';
import { PHASES_ADMIN_MENU } from '../constants';
import { getAdminMenuSection } from '../utils/administration/menu';

type Props = {
  section: string,
  thematicId: string
};

const SectionHlper = ({ section, thematicId }: Props) => {
  if (thematicId) return null;
  switch (section) {
  case '1':
    return (
      <div className="sction-hlper">
        <h4 className="section-helper-title">{I18n.t('administration.survey.configThematicsHlperTitle')}</h4>
        <div className="section-helper-description">{I18n.t('administration.survey.configThematicsHlperDescription')}</div>
      </div>
    );
  default:
    return null;
  }
};

const SurveyAdmin = ({ section, thematicId }: Props) => {
  const menuItem = getAdminMenuSection(section, PHASES_ADMIN_MENU.survey.subMenu);
  const sectionTitleMsgId = menuItem && menuItem.title;
  return (
    <div className="survey-admin">
      <div className="admin-box">
        <SectionTitle title={I18n.t(sectionTitleMsgId)} annotation={I18n.t('administration.annotation')} />
        <SectionHlper section={section} thematicId={thematicId} />
        <SurveyAdminForm section={section} thematicId={thematicId} />
      </div>
    </div>
  );
};

export default SurveyAdmin;