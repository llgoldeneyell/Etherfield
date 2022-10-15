import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function NormalButton(props) {
  return (
    <Container className=' d-flex justify-content-center'>
      <Button className='m-2 ' variant={props.Variant} onClick={props.OpenModal} size="lg">{props.Content}</Button>
    </Container>
  );
}

export default NormalButton;