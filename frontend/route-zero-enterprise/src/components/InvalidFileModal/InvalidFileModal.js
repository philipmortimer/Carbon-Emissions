import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// Modal that pops up with relevant error message when backend rejects CSV file
export const InvalidFileModal = (props) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Invalid CSV File
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="InvalidFileModalHeader">File Incorretly Formatted</h4>
        <p>
          The CSV file chosen is invalid as it does not meet the CSV schema.
          Please review the CSV schema and upload a valid file.
          An error message is provided below to help identify the issue.
        </p>
        <p>
          <b><em>{props.msg}</em></b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
