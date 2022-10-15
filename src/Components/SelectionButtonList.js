import Dropdown from 'react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';

function SelectionButtonList(props) {
  return (
    <Container fluid className='m-2'>
  <Dropdown className="d-grid">
        <Dropdown.Toggle id="dropdown-autoclose-true" variant={props.Variant} size="lg">
            {props.Content}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
</Container>
    
  );
}

export default SelectionButtonList;