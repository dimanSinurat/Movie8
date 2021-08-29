import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import {DELETE_MOVIE_MUTATION, FETCH_MOVIE} from '../graphQL';
import {DELETE_TV_MUTATION, FETCH_TV} from '../graphQL/tv';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2'

function Confirm({id}) {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
    refetchQueries: [FETCH_MOVIE],

  });
  const [deleteTvSeries] = useMutation(DELETE_TV_MUTATION, {
    refetchQueries: [FETCH_TV],
  });

  const deleteContent = (id) => {
    deleteMovie({
      variables: {
        _id: id,
      },
    });
    setOpen(false)
    history.push('/')
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
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
      title: 'deleted  successfully'
    })
  }

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button color="youtube" size="tiny"><Icon name="delete"></Icon>DELETE</Button>}
    >
      <Header icon style={{paddingTop:200}}>
        <Icon name='delete' />
        Are you sure to Delete this file
      </Header>
      <Modal.Content>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => deleteContent(id)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Confirm
