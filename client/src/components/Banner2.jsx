import React from 'react';
import { Grid, Container, Button} from 'semantic-ui-react';

export default function Banner2() {
  return (
    <div className="banner2" >
      <Container>
        <Grid columns='equal' style={{ position: 'relative', top: '180px' }}>
          <Grid.Column>
            <h1 id="titleBanner2">American Made</h1>
            <p className="subForBanner2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, enim vitae eum, ducimus, illum quod molestiae minus qui beatae veniam quaerat facere? Optio asperiores tempora tempore ducimus iusto beatae quo?</p>
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
          </Grid.Column>
          <Grid.Column width={8}>
           
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}


