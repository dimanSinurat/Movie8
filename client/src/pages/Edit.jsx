import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_MOVIE_MUTATION, FETCH_MOVIE, FETCH_ONE } from "../graphQL";
import { Container, Form, Button, Icon } from 'semantic-ui-react';
import Navbar from '../components/Navbar.jsx';
import Swal from 'sweetalert2';

export default function Edit() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [rating, setRating] = useState("");
  const [tags, setTags] = useState("");
  let { state } = useLocation();
  let { _id } = state;
  let history = useHistory()

  const { data, loading } = useQuery(FETCH_ONE, {
    variables: {
      id: _id,
    },
  });

  let [updateMovie, {data:dataUpdate,loading:loadingUpdate, error}] = useMutation(UPDATE_MOVIE_MUTATION, {
    refetchQueries: [FETCH_MOVIE]
  })

  useEffect(() => {
    if (!loading) {
      setTitle(data.movie.title);
      setOverview(data.movie.overview);
      setPosterPath(data.movie.poster_path);
      setRating(data.movie.popularity);
      setTags(data.movie.tags.join(","));
    }
  }, [data]);



  let style = {
    paddingRoot: {
      paddingTop: 30,
      paddingBottom: 20
    },
    root: {
      width: '70%'
    }
  }



  const updateData = () => {
    let payload = {
      _id,
      title,
      overview,
      poster_path: posterPath,
      tags,
      popularity: +rating
    }

    try {
      updateMovie({
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
        title: 'update data successfully'
      })
      history.push('/movie')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }

  }

  return (
    <>
      <Navbar />

      <Container style={style.root}>
        <h1 style={style.paddingRoot}>
          <Icon.Group size='large'>
            <Icon name='tv' />
            <Icon corner name='edit' color="blue" />
          </Icon.Group>
          <span style={{ marginLeft: 10 }}>EDIT</span>
        </h1>

        <Form onSubmit={updateData}>
          <Form.Field>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Field>

          <Form.Field>
            <label>Path Name</label>
            <input value={posterPath} onChange={(e) => setPosterPath(e.target.value)} />
          </Form.Field>

          <Form.Field>
            <label>Tag</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} />
          </Form.Field>

          <Form.Field>
            <label>Rating <Icon name="star" size="small"></Icon> </label>
            <input type="number" step="any" value={rating} onChange={(e) => setRating(e.target.value)} />
          </Form.Field>

          <textarea rows='5' value={overview} onChange={(e) => setOverview(e.target.value)} ></textarea>
          <br /><br />

          <Button
            type="submit"
            color="green"
            size="small" >
            <Icon name="edit"></Icon>update
          </Button>

          <Button
            size="small"
            onClick={() => history.push('/')}>
            <Icon name="repeat"></Icon>BACK
          </Button>

        </Form>
      </Container>
    </>
  )
}
