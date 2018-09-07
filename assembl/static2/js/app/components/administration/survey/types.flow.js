// @flow
import type { FileValue, I18nValue } from '../../form/types.flow';

type QuestionValue = {
  id: string,
  title: I18nValue
};

export type MediaValue = {|
  htmlCode: string,
  img: FileValue
|};

type VideoValue = {
  present: boolean,
  media: ?MediaValue,
  title: I18nValue,
  descriptionBottom: I18nValue,
  descriptionSide: I18nValue,
  descriptionTop: I18nValue
};

export type ThemeValue = {
  id: string,
  img: FileValue,
  questions: Array<QuestionValue>,
  title: I18nValue,
  video: VideoValue,
  children: Array<ThemeValue>
};

export type ThemesValue = Array<ThemeValue>;

export type SurveyAdminValues = {
  themes: ThemesValue
};