import React from 'react';
import { Button, Header, Image, Modal, Icon, Rating } from 'semantic-ui-react';
import { useReactiveVar } from "@apollo/client";
import { addFavorite } from "../graphQL/reactiveVar";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function ModalFav({ id, title, image, rating, explanation, tags }) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory()

  const favoriteBase = useReactiveVar(addFavorite);

  function remove(data) {
    let favoriteUpdated = [...favoriteBase];

    favoriteUpdated.forEach((el, index) => {
      if (el._id === data) {
        favoriteUpdated.splice(index, 1);
      }
    });

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'remove from favorite card',
      showConfirmButton: false,
      timer: 1500
    })

    addFavorite(favoriteUpdated);
    history.push('/favorite')
    setOpen(false)
  }



  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="black" size="small"><span style={{ fontSize: 10 }}><Icon name="unordered list"></Icon>DETAIL</span></Button>}
    >
      <Modal.Content image>
        <Image size="medium" src={image} wrapped />
        <Modal.Description>
        <Header as="h1">{title}</Header>
          <p style={{ color: '#000' }}>#Tags: {tags.join('-')}</p>
          <Rating icon='star' defaultRating={Math.floor(rating)} maxRating={5} /> <b  style={{ color: '#000' }}>{rating}</b>
          <p style={{ color: '#000' }}>
            {explanation}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Remove from favorite"
          labelPosition='left'
          icon='close'
          onClick={() => remove(id)}
          negative
        />
        <Button
          content="OK"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalFav
