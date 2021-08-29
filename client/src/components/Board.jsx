import React from 'react';
import { Grid, Card, Container, Divider, Icon, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom'

let style = {
  bg: {
    backgroundColor: '#131722',
    minHeight: '500px',
    marginTop: '-20px',
    paddingBottom: '70px'
  },
  cardText: {
    fontSize: '10px',
    display:'block',
    fontWeight: 800
  }
}

export default function Board({movie, isLoading, isError}) {
  const history = useHistory()

 
  
  return (
    <div style={style.bg}>
      <Container style={{ marginBottom: '20px' }}>
        <Grid>
          <Grid.Column width={4}>
            <div>
              <h1 className="titleBoard">Popular <br /> Movies <br /> to Watch Now</h1>
              <p className="muted" style={{ fontSize: '15px', margin: '30px 0px' }}>Most watched movies by days</p>
              <Divider />
            </div>
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={5}>
            {
                isLoading === true ? ('') : 
                  <>
                    {
                    movie.movies.map((el, idx) => (
                      <Card raised 
                      key={idx} 
                      image={el.poster_path}
                      header={<div style={{display:'block'}}><Icon name="star" color="yellow" size="small"></Icon> <b>{el.popularity}</b></div>} 
                      description={<small>{el.title}</small>} 
                      onClick={()=> history.push('/movie')}>
                      </Card>
                    ))
                  }
                  </>
              }
            </Card.Group>
          </Grid.Column>
        </Grid>
        {/* <Grid.Column width={12} style={{ marginTop: '20px' }}>
          <Card.Group itemsPerRow={7}>
             {
                isLoading === true ? ('') : 
                  <>
                    {
                    movie.movies.map((el, idx) => (
                      <Card raised image={el.poster_path} extra={extra} key={idx}/>
                    ))
                  }
                  </>
              }
          </Card.Group>
        </Grid.Column> */}
      </Container>
      <Segment basic textAlign='center'>
        <Divider horizontal><p style={{ color: '#f5f5f5' }}>Movie</p></Divider>
      </Segment>
    </div>
  )
}
// const src = "https://images.unsplash.com/photo-1505067072600-5d7426eb98c5?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8dG93SlpGc2twR2d8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
