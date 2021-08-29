import React from 'react';
import { Grid, Card, Container, Button, Icon} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom'

export default function MiddleBoard(props) {
  const {movie, isLoading, isError, title1, title2, title3, render} = props
  const history = useHistory()
  const location = history.location.pathname.substr(1)
  let onlyRenderSix = [];
  let style = {
    bg: {
      backgroundColor: '#f5f5f5',
      marginTop: '-20px',
      padding: '100px 0'
    }
  }

  if (!isLoading && render !== 'tvSeries'){
    for (let i = 0; i < movie.movies.length; i++) {
      if (i < 4){
        onlyRenderSix.unshift(movie.movies[i])
      }
    }
  }
  if (!isLoading && render === 'tvSeries'){
    for (let i = 0; i < movie.tvSeries.length; i++) {
      if (i < 4){
        onlyRenderSix.unshift(movie.tvSeries[i])
      }
    }
  }

  if (isError){
    return isError
  }
  
  return (
    <div style={style.bg}>
      <Container>
        <Grid>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={4}>
              {
                isLoading === true ? ('') : 
                  <>
                    {
                    onlyRenderSix.map((el, idx) => (
                      <Card raised image={el.poster_path} key={idx} />
                    ))
                  }
                  </>
              }
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <div>
              <h1 className="titleBoard2">{title1} <br /> {title2} <br /> {title3}</h1>
              {
                props.render === '/movie' || props.render === '/tv-series' ? <Button size="small" color="twitter"  onClick={() => history.push('/add', location)}><Icon name='add' />Add {props.name}</Button> :  <Button size="small"><Icon name='tv' />see more</Button>
              }
            </div>
          </Grid.Column>
        </Grid>
        
      </Container>
    </div>
  )
}
