import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE_MUTATION, FETCH_MOVIE } from '../graphQL';
import { Container, Form, Button, Icon } from 'semantic-ui-react';
import Navbar from '../components/Navbar.jsx';
import Swal from 'sweetalert2';

export default function Add() {
  const { register, handleSubmit, reset } = useForm();
  let { state } = useLocation()
  let history = useHistory()
  let [addMovie, {data,loading, error}] = useMutation(ADD_MOVIE_MUTATION, {
    refetchQueries: [FETCH_MOVIE]
  })

  const addData = (content) => {
    let { title, poster_path, tags, popularity, overview } = content;
    tags = tags.split(',')

    let convert = 0
    if (popularity.length === 1){
       popularity = `${popularity}.01`
       convert = +popularity
    } else {
       convert = +popularity
    } //temporary logic to let integer convert as decimal , because in backend we only receive float, fix soon


    let payload = {
      title,
      overview,
      poster_path,
      tags,
      popularity: convert
    }

    try {
      addMovie({
        variables: payload
      })

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
        title: 'add data successfully'
      })
      history.push('/movie')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }

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
      title: 'add data successfully'
    })
  }

  let style = {
    paddingRoot: {
      paddingTop: 30,
      paddingBottom: 20
    },
    root: {
      width: '70%'
    }
  }


  return (
    <>
      <Navbar />
      <Container style={style.root}>
        <h1 style={style.paddingRoot}>
          <Icon.Group size='large'>
            <Icon name='tv' />
            <Icon corner name='add' color="blue" />
          </Icon.Group>
          <span style={{ marginLeft: 10 }}>Add</span> {state}
        </h1>

        <Form onSubmit={handleSubmit(addData)}>
          <Form.Field>
            <label>Title</label>
            <input placeholder="e.g  initial D" {...register('title')} />
          </Form.Field>

          <Form.Field>
            <label>Path Name</label>
            <input placeholder="e.g  www.unsplash/initialD/example.jpg" {...register('poster_path')} />
          </Form.Field>

          <Form.Field>
            <label>Tag</label>
            <input placeholder="use comma to add tags more than 1" {...register('tags')} />
          </Form.Field>

          <Form.Field>
            <label>Rating <Icon name="star" size="small"></Icon> </label>
            <input type="number" step="any"  placeholder="e.g  4.5" {...register('popularity')} />
          </Form.Field>

          <textarea control='textarea' rows='5' placeholder="Overview explanation here" {...register('overview')}  ></textarea>
          <br/><br/>

          <Button
            type="submit"
            color="twitter"
            size="small" >
            <Icon name="add"></Icon>ADD
          </Button>

          <Button
            size="small"
            onClick={() => reset()}>
            <Icon name="repeat"></Icon>RESET
          </Button>

        </Form>

      </Container>
    </>
  )
}
