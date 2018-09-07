// @flow
import sortBy from 'lodash/sortBy';
import type { ApolloClient } from 'react-apollo';

import ThematicsQuery from '../../../graphql/ThematicsQuery.graphql';
import { convertEntries } from '../../form/utils';
import type { FileValue } from '../../form/types.flow';
import { convertEntriesToRawContentState } from '../../../utils/draftjs';
import type { MediaValue, SurveyAdminValues } from './types.flow';

export const load = async (client: ApolloClient, fetchPolicy: FetchPolicy) => {
  const { data } = await client.query({
    query: ThematicsQuery,
    variables: { identifier: 'survey' },
    fetchPolicy: fetchPolicy
  });
  return data;
};

type Video = {
  htmlCode: ?string,
  mediaFile: ?FileValue
};
export function convertMedia(video: Video): MediaValue {
  return {
    htmlCode: video.htmlCode || '',
    img: video.mediaFile || null
  };
}

const getChildren = thematic =>
  sortBy(thematic.children, 'order').map(t => ({
    id: t.id,
    title: convertEntries(t.titleEntries),
    img: t.img,
    children: getChildren(t)
  }));

export function postLoadFormat(data: ThematicsQueryQuery): SurveyAdminValues {
  return {
    themes: sortBy(data.thematics, 'order').map(t => ({
      id: t.id,
      img: t.img,
      questions:
        (t.questions &&
          t.questions.map(q => ({
            id: q.id,
            title: convertEntries(q.titleEntries)
          }))) ||
        [],
      title: convertEntries(t.titleEntries),
      video: {
        present: Boolean(t.video),
        media: t.video ? convertMedia(t.video) : null,
        title: t.video ? convertEntries(t.video.titleEntries) : {},
        descriptionBottom: t.video ? convertEntries(convertEntriesToRawContentState(t.video.descriptionEntriesBottom)) : {},
        descriptionSide: t.video ? convertEntries(convertEntriesToRawContentState(t.video.descriptionEntriesSide)) : {},
        descriptionTop: t.video ? convertEntries(convertEntriesToRawContentState(t.video.descriptionEntriesTop)) : {}
      },
      children: getChildren(t)
    }))
  };
}