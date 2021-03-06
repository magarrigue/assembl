// @flow
import * as React from 'react';
import { Button, OverlayTrigger } from 'react-bootstrap';
import { Translate } from 'react-redux-i18n';
import { FieldArray } from 'react-final-form-arrays';

import { displayModal, closeModal } from '../../utils/utilityManager';
import { upTooltip, downTooltip } from '../common/tooltips';
import { createRandomId } from '../../utils/globalFunctions';

type ConfirmationMessageType = {
  field: Object,
  index: string
};

type Props = {
  name: string,
  renderFields: Function,
  titleMsgId?: string, // eslint-disable-line react/require-default-props
  tooltips: {
    addTooltip: React.Node,
    deleteTooltip: React.Node
  },
  withSeparators: boolean,
  confirmDeletion: boolean,
  confirmDeletionMessages: {
    confirmDeletionTitle: (props: ConfirmationMessageType) => React.Node,
    confirmDeletionBody: (props: ConfirmationMessageType) => React.Node
  }
};

function confirmDeletionModal(title: React.Node, body: React.Node, remove: () => void) {
  const footer = [
    <Button key="cancel" onClick={closeModal} className="button-cancel button-dark">
      <Translate value="cancel" />
    </Button>,
    <Button
      key="delete"
      onClick={() => {
        remove();
        closeModal();
      }}
      className="button-submit button-dark"
    >
      <Translate value="delete" />
    </Button>
  ];
  return displayModal(title, body, true, footer);
}

const FieldArrayWithActions = ({
  name,
  renderFields,
  titleMsgId,
  tooltips: { addTooltip, deleteTooltip },
  withSeparators,
  confirmDeletion,
  confirmDeletionMessages: { confirmDeletionTitle, confirmDeletionBody }
}: Props) => (
  <FieldArray name={name}>
    {({ fields }) => (
      <div>
        {fields.map((fieldname, idx) => {
          const fieldValue = fields.value[idx];
          const removeField = () => fields.remove(idx);
          const removeConfirmationData = { field: fieldValue, index: idx + 1 };
          const removeWithConfirmation = confirmDeletion
            ? () =>
              confirmDeletionModal(
                confirmDeletionTitle(removeConfirmationData),
                confirmDeletionBody(removeConfirmationData),
                removeField
              )
            : removeField;
          return (
            <div className="form-container" key={fieldname}>
              {titleMsgId && (
                <div className="title left">
                  <Translate value={titleMsgId} index={idx + 1} />
                </div>
              )}

              <div className="pointer right">
                <div className="inline">
                  {idx < fields.length - 1 ? (
                    <OverlayTrigger placement="top" overlay={downTooltip}>
                      <Button onClick={() => fields.swap(idx, idx + 1)} className="admin-icons">
                        <span className="assembl-icon-down-bold grey" />
                      </Button>
                    </OverlayTrigger>
                  ) : null}
                  {idx > 0 ? (
                    <OverlayTrigger placement="top" overlay={upTooltip}>
                      <Button onClick={() => fields.swap(idx, idx - 1)} className="admin-icons">
                        <span className="assembl-icon-up-bold grey" />
                      </Button>
                    </OverlayTrigger>
                  ) : null}
                  <OverlayTrigger placement="top" overlay={deleteTooltip}>
                    <Button onClick={removeWithConfirmation} className="admin-icons">
                      <span className="assembl-icon-delete grey" />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div className="clear" />
              {renderFields({ name: fieldname, idx: idx })}
              {withSeparators && <div className="separator" />}
            </div>
          );
        })}

        <OverlayTrigger placement="top" overlay={addTooltip}>
          <div onClick={() => fields.push({ id: createRandomId() })} className="plus margin-l">
            +
          </div>
        </OverlayTrigger>
      </div>
    )}
  </FieldArray>
);

FieldArrayWithActions.defaultProps = {
  withSeparators: true,
  confirmDeletion: false,
  confirmDeletionMessages: {
    confirmDeletionTitle: () => <Translate value="deleteConfirmation.confirmDeletionTitle" />,
    confirmDeletionBody: () => <Translate value="deleteConfirmation.confirmDeletionBody" />
  }
};

export default FieldArrayWithActions;