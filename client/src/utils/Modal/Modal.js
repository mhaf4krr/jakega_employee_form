import React from "react";
import { Modal, Button } from "semantic-ui-react";

export default function ModalWrapper({
  modalMessage,
  children,
  modalState,
  closeModal,
}) {
  return (
    <Modal centered={false} open={modalState}>
      <Modal.Header>{modalMessage}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => closeModal()}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
