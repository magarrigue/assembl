// @flow
import React from 'react';

import UrlPreview, { type URLPreviewProps } from './urlPreview';
import { fetchURLMetadata } from '../../../utils/urlPreview';

type URLMetadataLoaderProps = {
  url: string,
  afterLoad: ?Function
};

type URLMetadataLoaderState = {
  loading: boolean,
  error: boolean,
  metadata: URLPreviewProps | null
};

class URLMetadataLoader extends React.Component<URLMetadataLoaderProps, URLMetadataLoaderState> {
  state = {
    loading: true,
    error: false,
    metadata: null
  };

  componentDidMount() {
    // fetch the URL metadata from our web service
    fetchURLMetadata(
      this.props.url,
      (metadata) => {
        this.setState({ loading: false, metadata: metadata });
      },
      () => {
        this.setState({ loading: false, error: true });
      }
    );
  }

  render() {
    const { afterLoad } = this.props;
    const { loading, error, metadata } = this.state;
    if (loading) return null;
    return metadata && !error ? <UrlPreview {...metadata} afterLoad={afterLoad} /> : null;
  }
}

export default URLMetadataLoader;