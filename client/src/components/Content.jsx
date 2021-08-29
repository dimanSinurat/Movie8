import React from 'react';
import { Container, Grid, Card } from 'semantic-ui-react';
import MovieCard from '../components/Card.jsx'



export default function Content(props) {
  const {movie, isLoading, isError, render} = props;
  
  if (isError){
    return isError
  }

  return (



    <>
      <Container style={{paddingTop:'50px'}}>
      <Grid>
          <Grid.Column width={16}>
            <Card.Group itemsPerRow={4}>
            {
                isLoading === true ? ('') : 
                  <>
                    {
                    render !== 'tvSeries' ? ( 
                    movie.movies.map((el, idx) => (
                      <MovieCard
                       raised 
                       key={idx}
                       data={el}
                       />
                    ))
                    ) : (
                      movie.tvSeries.map((el, idx) => (
                        <MovieCard
                         raised 
                         key={idx}
                         data={el}
                         />
                      ))
                    )
                  }
                  </>
              }
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}
