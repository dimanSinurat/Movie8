import React from 'react'
import { Card, Rating, Image } from 'semantic-ui-react';
import Modal from '../components/Modal';
import ModalFav from '../components/ModalFavorite.jsx';



function CardComponent(props) {
  const { _id, title, poster_path, popularity, overview, tags } = props.data
  const { whoRender } = props
  let point = Math.floor(popularity)

  return (
    <Card>
      <Image src={poster_path} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <Rating defaultRating={point} maxRating={5} color="black" size="small" style={{ marginRight: 15, marginTop: 10 }} />
          <b>{popularity}</b>
        </Card.Meta>
        <Card.Description>
          {`${overview.substr(0, 50)} ...`}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {
          whoRender === 'favorite' ? (
            <ModalFav
              title={title}
              image={poster_path}
              rating={popularity}
              explanation={overview}
              tags={tags}
              id={_id}
            />
          ) : (
            <Modal
              title={title}
              image={poster_path}
              rating={popularity}
              explanation={overview}
              tags={tags}
              id={_id}
            />
          )
        }


      </Card.Content>
    </Card>
  )
}


export default CardComponent