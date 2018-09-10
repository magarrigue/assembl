// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { FormGroup, Button } from 'react-bootstrap';
import { I18n, Translate } from 'react-redux-i18n';
import classNames from 'classnames';
import { EditorState } from 'draft-js';

import createPostMutation from '../../../graphql/mutations/createPost.graphql';
import uploadDocumentMutation from '../../../graphql/mutations/uploadDocument.graphql';
import { convertContentStateToHTML, editorStateIsEmpty } from '../../../utils/draftjs';
import { getDomElementOffset } from '../../../utils/globalFunctions';
import { displayAlert, promptForLoginOr } from '../../../utils/utilityManager';
import { TextInputWithRemainingChars } from '../../common/textInputWithRemainingChars';
import RichTextEditor from '../../common/richTextEditor';
import attachmentsPlugin from '../../common/richTextEditor/attachmentsPlugin';

export const TEXT_INPUT_MAX_LENGTH = 140;
export const TEXT_AREA_MAX_LENGTH = 3000;

type TopPostFormProps = {
  contentLocale: string,
  createPost: Function,
  ideaId: string,
  refetchIdea: Function,
  uploadDocument: Function,
  ideaOnColumn: boolean,
  messageClassifier: string,
  scrollOffset: number,
  onDisplayForm: Function,
  fillBodyLabel: string,
  bodyPlaceholder: string,
  postSuccessMsg: string
};

type TopPostFormState = {
  body: EditorState,
  isActive: boolean,
  subject: string,
  submitting: boolean
};

class TopPostForm extends React.Component<TopPostFormProps, TopPostFormState> {
  formContainer: ?HTMLDivElement;

  static defaultProps = {
    scrollOffset: 125,
    onDisplayForm: () => {},
    fillBodyLabel: 'debate.thread.fillBody',
    bodyPlaceholder: 'debate.insert',
    postSuccessMsg: 'debate.thread.postSuccess'
  };

  constructor() {
    super();
    this.state = {
      body: EditorState.createEmpty(),
      isActive: false,
      subject: '',
      submitting: false
    };
  }

  displayForm = (isActive: boolean): void => {
    this.props.onDisplayForm(isActive);
    this.setState(
      {
        isActive: isActive
      },
      () => {
        if (this.formContainer) {
          const elmOffset = getDomElementOffset(this.formContainer).top - this.props.scrollOffset;
          window.scroll({ top: elmOffset, left: 0, behavior: 'smooth' });
        }
      }
    );
  };

  resetForm = () => {
    this.displayForm(false);
    this.setState({ subject: '' });
    this.setState({ body: EditorState.createEmpty() });
  };

  createTopPost = () => {
    const {
      contentLocale,
      createPost,
      ideaId,
      refetchIdea,
      uploadDocument,
      messageClassifier,
      ideaOnColumn,
      fillBodyLabel,
      postSuccessMsg
    } = this.props;
    const { body, subject } = this.state;
    this.setState({ submitting: true });
    const bodyIsEmpty = editorStateIsEmpty(body);
    if ((subject || this.props.ideaOnColumn) && !bodyIsEmpty) {
      displayAlert('success', I18n.t('loading.wait'));

      // first, we upload each attachment
      // $FlowFixMe we know that body is not empty
      const uploadDocumentsPromise = attachmentsPlugin.uploadNewAttachments(body, uploadDocument);
      uploadDocumentsPromise.then((result) => {
        const variables = {
          contentLocale: contentLocale,
          ideaId: ideaId,
          subject: subject || null,
          messageClassifier: messageClassifier || null,
          // use the updated content state with new entities
          body: convertContentStateToHTML(result.contentState),
          attachments: result.documentIds
        };

        createPost({ variables: variables })
          .then(() => {
            refetchIdea();
            displayAlert('success', I18n.t(postSuccessMsg));
            this.resetForm();
            this.setState({ submitting: false });
          })
          .catch((error) => {
            displayAlert('danger', `${error}`);
            this.setState({ submitting: false });
          });
      });
    } else if (!subject && !ideaOnColumn) {
      displayAlert('warning', I18n.t('debate.thread.fillSubject'));
      this.setState({ submitting: false });
    } else if (bodyIsEmpty) {
      displayAlert('warning', I18n.t(fillBodyLabel));
      this.setState({ submitting: false });
    }
  };

  handleInputFocus = promptForLoginOr(() => this.displayForm(true));

  updateBody = (newValue) => {
    this.setState({
      body: newValue
    });
  };

  handleSubjectChange = (e) => {
    this.setState({
      subject: e.target.value
    });
  };

  getClassNames() {
    const { ideaOnColumn } = this.props;
    const { submitting } = this.state;
    return classNames([
      'button-submit',
      'button-dark',
      'btn',
      'btn-default',
      'right',
      !ideaOnColumn ? 'margin-l' : 'margin-m',
      submitting && 'cursor-wait'
    ]);
  }

  setFormContainerRef = (el: ?HTMLDivElement): void => {
    this.formContainer = el;
  };

  render() {
    return (
      <div className="form-container" ref={this.setFormContainerRef}>
        <FormGroup>
          {!this.props.ideaOnColumn ? (
            <TextInputWithRemainingChars
              value={this.state.subject}
              label={I18n.t('debate.subject')}
              maxLength={TEXT_INPUT_MAX_LENGTH}
              handleTxtChange={this.handleSubjectChange}
              handleInputFocus={this.handleInputFocus}
              isActive={this.state.isActive}
            />
          ) : null}
          {this.state.isActive || this.props.ideaOnColumn ? (
            <div className="margin-m">
              <RichTextEditor
                editorState={this.state.body}
                handleInputFocus={this.handleInputFocus}
                maxLength={TEXT_AREA_MAX_LENGTH}
                onChange={this.updateBody}
                placeholder={I18n.t(this.props.bodyPlaceholder)}
                withAttachmentButton
              />
              {!this.props.ideaOnColumn ? (
                <Button className="button-cancel button-dark btn btn-default left margin-l" onClick={this.resetForm}>
                  <Translate value="cancel" />
                </Button>
              ) : null}
              <Button
                className={this.getClassNames()}
                onClick={this.createTopPost}
                style={{ marginBottom: '30px' }}
                disabled={this.state.submitting}
              >
                <Translate value="debate.post" />
              </Button>
            </div>
          ) : null}
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contentLocale: state.i18n.locale
});

export default compose(
  connect(mapStateToProps),
  graphql(createPostMutation, { name: 'createPost' }),
  graphql(uploadDocumentMutation, { name: 'uploadDocument' })
)(TopPostForm);