import React from 'react';
import { Grid, Container, Button, Image } from 'semantic-ui-react';

export default function Banner({movie, isLoading, isError}) {
  let onlyRenderEight = []

  if (isError){
    return isError
  }

  if (!isLoading){
    for (let i = 0; i < movie.movies.length; i++) {
      if (i < 8){
        onlyRenderEight.push(movie.movies[i])
      }
    }
  }
  
  return (
    <div className="banner" >
      <Container>
        <Grid columns='equal' style={{ position: 'relative', top: '180px' }}>
          <Grid.Column>
            <h1 id="titleBanner">American Made</h1>
            <p id="explanation"> <span>2017</span> | <span>Comedy</span> | <span>1 hr 55mins</span></p>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
              <Button
                color={"twitter"}
                size={"huge"}
                className={"b"}
              >
                WATCH NOW
              </Button>
              <Button
                inverted size={"huge"}
                className={"b"}
              >
                + PLAYLIST
              </Button>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <h2 className="sideBtitle">New Arrival</h2>
            <Image.Group size='small'>
              {
                isLoading === true ? ('') : 
                  <>
                    {
                    onlyRenderEight.map((el, idx) => (
                      <Image src={el.poster_path} key={idx} /> 
                    ))
                  }
                  </>
              }
            </Image.Group>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}


