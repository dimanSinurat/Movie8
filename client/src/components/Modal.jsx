import React, {useEffect} from 'react';
import { Button, Header, Image, Modal, Icon, Rating } from 'semantic-ui-react';
import Confirm from './Confirm.jsx';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { addFavorite } from '../graphQL/reactiveVar'
import { useReactiveVar } from '@apollo/client';

function ModalPopup({ id, title, image, rating, explanation, tags }) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  const favoriteData = useReactiveVar(addFavorite)
  let hasFavorite = false

  let track = favoriteData.filter((el) => {
    if (el._id === id){
      hasFavorite = true
    }
  })


  let addFav = (title, image, rating, explanation, id, tags) => {
    let payload = {
      _id: id,
      title: title,
      poster_path: image,
      popularity: rating,
      overview: explanation,
      tags: tags,
    }
    let newFav = [...favoriteData, payload];
    addFavorite(newFav);

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: `add ${title} to favorite successfully`
    })
  }

  let edit = (title, image, rating, explanation, _id) => {
    let payload = {
      _id,
      title,
      image,
      rating,
      explanation
    }
    history.push('/edit', payload);
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
          <p style={{ color: '#000', margin:'30px 0' }}>
            {explanation}
          </p>
          <Button size="tiny" color="twitter" onClick={() => edit(title, image, rating, explanation, id)}><Icon name="edit outline"></Icon>EDIT</Button>
          <Confirm id={id} />
          {
            hasFavorite ? <Button disabled size="tiny">Sudah ditambahkan ke Favorite</Button> : 
          <Button color="black" size="tiny" onClick={() => addFav(title, image, rating, explanation, id, tags)}><Icon name="bookmark"></Icon> ADD TO FAVORITE</Button>
          }
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
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

export default ModalPopup
