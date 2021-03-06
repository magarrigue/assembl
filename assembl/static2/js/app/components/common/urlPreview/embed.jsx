// @flow
import * as React from 'react';
import { getURLComponent } from '../../../utils/urlPreview';

type EmbedProps = {
  url: string,
  defaultEmbed: React.Node
};

const Embed = ({ url, defaultEmbed }: EmbedProps) => getURLComponent(url) || defaultEmbed;

export default Embed;