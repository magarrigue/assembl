// @flow
/*
  Note that this component is fully uncontrolled
  Warning: you need to set a key on it to specify if editor state is empty or not
  Therefore, react will recreate the editor if the status (empty/not empty) changes
*/
// eslint-disable-next-line
// See https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key

import * as React from 'react';
import { Translate, I18n } from 'react-redux-i18n';
import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import classNames from 'classnames';
import punycode from 'punycode';
import throttle from 'lodash/throttle';

import AtomicBlockRenderer from './atomicBlockRenderer';
import Toolbar from './toolbar';
import type { ButtonConfigType } from './buttonConfigType';
import EditAttachments from '../editAttachments';
import attachmentsPlugin from './attachmentsPlugin';

type RichTextEditorProps = {
  rawContentState: RawDraftContentState,
  handleInputFocus?: Function,
  maxLength: number,
  placeholder?: string,
  textareaRef?: Function,
  toolbarPosition: string,
  updateContentState: Function,
  withAttachmentButton: boolean,
  handleCharCountChange: Function
};

type RichTextEditorState = {
  editorState: EditorState,
  editorHasFocus: boolean
};

function customBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: AtomicBlockRenderer,
      editable: false
    };
  }

  return null;
}

export default class RichTextEditor extends React.Component<RichTextEditorProps, RichTextEditorState> {
  editor: ?HTMLDivElement;

  static defaultProps = {
    handleInputFocus: undefined,
    maxLength: 0,
    toolbarPosition: 'top',
    withAttachmentButton: false,
    handleCharCountChange: () => {}
  };

  constructor(props: RichTextEditorProps): void {
    super(props);
    const editorState = props.rawContentState
      ? EditorState.createWithContent(convertFromRaw(props.rawContentState))
      : EditorState.createEmpty();
    this.state = {
      editorState: editorState,
      editorHasFocus: false
    };
  }

  getCurrentRawContentState = () => convertToRaw(this.state.editorState.getCurrentContent());

  onBlur = () => {
    this.setState(
      {
        editorHasFocus: false
      },
      () => {
        this.props.updateContentState(this.getCurrentRawContentState());
      }
    );
  };

  onChange = (newEditorState: EditorState): void => {
    this.setState(
      {
        editorState: newEditorState
      },
      throttle(() => {
        this.props.updateContentState(this.getCurrentRawContentState());
        const charCount = this.getCharCount(newEditorState);
        this.props.handleCharCountChange(charCount);
      }, 300)
    );
  };

  handleEditorFocus = (): void => {
    const { handleInputFocus } = this.props;
    this.setState(
      {
        editorHasFocus: true
      },
      handleInputFocus
    );
  };

  getToolbarButtons(): Array<ButtonConfigType> {
    const bold = {
      id: 'bold',
      icon: 'text-bold',
      label: I18n.t('common.editor.bold'),
      type: 'style',
      style: 'BOLD'
    };
    const italic = {
      id: 'italic',
      icon: 'text-italics',
      label: I18n.t('common.editor.italic'),
      type: 'style',
      style: 'ITALIC'
    };
    const bullets = {
      id: 'bullets',
      icon: 'text-bullets',
      label: I18n.t('common.editor.bulletList'),
      type: 'block-type',
      style: 'unordered-list-item'
    };
    const buttons = [bold, italic, bullets];
    return buttons;
  }

  getCharCount(editorState: EditorState): number {
    // this code is "borrowed" from the draft-js counter plugin
    const decodeUnicode = str => punycode.ucs2.decode(str); // func to handle unicode characters
    const plainText = editorState.getCurrentContent().getPlainText('');
    const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, '').trim(); // replace above characters w/ nothing
    return decodeUnicode(cleanString).length;
  }

  shouldHidePlaceholder(): boolean {
    // don't display placeholder if user changes the block type (to bullet list) before to type anything
    const contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        return true;
      }
    }
    return false;
  }

  focusEditor = (): void => {
    // Hacky: Wait to focus the editor so we don't lose selection.
    // The toolbar actions don't work at all without this.
    setTimeout(() => {
      if (this.editor) {
        this.editor.focus();
      }
    }, 50);
  };

  renderRemainingChars = (): React.Element<any> => {
    const { maxLength } = this.props;
    const editorState = this.state.editorState;
    const charCount = this.getCharCount(editorState);
    const remainingChars = maxLength - charCount;
    return (
      <div className="annotation margin-xs">
        <Translate value="debate.remaining_x_characters" nbCharacters={remainingChars < 10000 ? remainingChars : maxLength} />
      </div>
    );
  };

  handleReturn = (e: KeyboardEvent): string => {
    // Pressing shift-enter keys creates a new line (<br/>) instead of an new paragraph (<p>)
    // See https://github.com/HubSpot/draft-convert/issues/83
    // For example, this enables to create line returns inside a list item.
    const { editorState } = this.state;
    if (e.shiftKey) {
      this.setState({ editorState: RichUtils.insertSoftNewline(editorState) });
      return 'handled';
    }
    return 'not-handled';
  };

  deleteAttachment = (documentId: string): void => {
    const contentState = this.state.editorState.getCurrentContent();
    const newContentState = attachmentsPlugin.removeAttachment(contentState, documentId);
    this.setState(
      {
        editorState: EditorState.createWithContent(newContentState)
      },
      () => {
        this.props.updateContentState(convertToRaw(newContentState));
      }
    );
  };

  renderToolbar = () => {
    const withAttachmentButton = this.props.withAttachmentButton;
    return (
      <Toolbar
        buttonsConfig={this.getToolbarButtons()}
        editorState={this.state.editorState}
        focusEditor={this.focusEditor}
        onChange={this.onChange}
        withAttachmentButton={withAttachmentButton}
      />
    );
  };

  render() {
    const { maxLength, placeholder, textareaRef, toolbarPosition } = this.props;
    const { editorState } = this.state;
    const divClassName = classNames('rich-text-editor', { hidePlaceholder: this.shouldHidePlaceholder() });
    const attachments = attachmentsPlugin.getAttachments(this.getCurrentRawContentState());
    return (
      <div className={divClassName} ref={textareaRef}>
        <div className="editor-header">
          {this.state.editorState.getCurrentContent().hasText() ? (
            <div className="editor-label form-label">{placeholder}</div>
          ) : null}
          {toolbarPosition === 'top' ? this.renderToolbar() : null}
          <div className="clear" />
        </div>
        <div onClick={this.focusEditor}>
          <Editor
            blockRendererFn={customBlockRenderer}
            editorState={editorState}
            handleReturn={this.handleReturn}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.handleEditorFocus}
            placeholder={placeholder}
            ref={(e) => {
              this.editor = e;
            }}
            spellCheck
          />
        </div>
        {maxLength ? this.renderRemainingChars() : null}
        {toolbarPosition === 'bottom' ? this.renderToolbar() : null}

        <EditAttachments attachments={attachments} onDelete={this.deleteAttachment} />
      </div>
    );
  }
}