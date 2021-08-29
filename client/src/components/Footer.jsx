import React from 'react';
import { Container, Grid, Button, Icon, Header, Divider } from 'semantic-ui-react'

const style = {
  wrap: {
    minHeight: '482px',
    backgroundColor: '#131722',
    paddingTop: '50px',
    color:'#949cb0'
  },
  footEnd: {
    minHeight: '54px',
    backgroundColor: '#06090F',
    paddingTop: '20px'
  }
}

const CopyRight = () => {
  return (
    <div style={style.footEnd}>
      <Container>
        <p className="footerText">Hacktiv8 Student Project - Munich Fox 2021</p>
      </Container>
    </div>
  )
}

export default function Footer() {
  return (
    <>
      <div style={style.wrap}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h1" style={{color:'#fff'}}>Hacktivaganza</Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color='youtube' size="small">
                  <Icon name='youtube' /> Youtube
                </Button>
              </Grid.Column>
            </Grid.Row>
                <Divider />
            <Grid.Row style={{ marginTop: '30px' }}>
              <Grid.Column width={8}>
                <Header as="h4" style={{color:'#fff'}}>Disclaimer</Header>
                <p>this web is only for study material, basic idea from https://preview.themeforest.net/item/vodi-video-wordpress-theme-for-movies-tv-shows</p>
                <Header as="h4" style={{color:'#fff'}}>Disclaimer</Header>
                <p>this web is only for study material, basic idea from https://preview.themeforest.net/item/vodi-video-wordpress-theme-for-movies-tv-shows</p>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as={"h4"} style={{color:'#fff'}}>Find me on </Header>
                <Button color='facebook' size="small">
                  <Icon name='facebook' /> Facebook
                </Button>
                <Button color='instagram' size="small">
                  <Icon name='instagram' /> Instagram
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Container>
      </div>
      <CopyRight />
    </>
  )
}
