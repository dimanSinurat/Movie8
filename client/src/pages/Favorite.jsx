import { useReactiveVar } from '@apollo/client';
import React from 'react';
import {useLocation} from 'react-router-dom';
import { Container, Header, Grid, Card } from 'semantic-ui-react';
import CardComponent from '../components/Card.jsx'
import Navbar from '../components/Navbar.jsx';
import { addFavorite } from '../graphQL/reactiveVar';;

let styles = {
  pt: {
    paddingTop: '50px'
  }
}

export default function Favorite() {
  const favoriteData = useReactiveVar(addFavorite)
  const {pathname} = useLocation()

  return (
    <>
      <Navbar />
      <Container style={styles.pt}>
        <Header as="h1">FAVORITE</Header>
        <Grid>
          <Grid.Column width={16}>
            <Card.Group itemsPerRow={4}>
              {
                favoriteData.length === 0 ? 
                (<b style={{margin:'0 auto', marginTop:200}}>You have not entered the data to favorites</b>) 
                : (
                  favoriteData.map((el, idx) => (
                      <CardComponent
                        raised
                        key={idx}
                        data={el}
                        whoRender={pathname.substr(1)}
                      />
                  ))
                )
              }
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}
