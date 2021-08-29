import React from 'react'
import { Menu, Segment, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  return (
    <div>
      <Segment inverted >
        <Container>
          <Menu inverted secondary>
            <NavLink to="/" >
              <Menu.Item
                name='home'
              />
            </NavLink>
            <NavLink to="/movie" >
              <Menu.Item
                name='movie'
              />
            </NavLink>
            <NavLink to="/tvSeries">
              <Menu.Item
                name='tv-series'
              />
            </NavLink>
            <Menu.Menu position='right'>
              <NavLink to="/favorite">
                <Menu.Item
                  icon="bookmark"
                  name='favorite'
                />
              </NavLink>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
    </div>
  )
}
