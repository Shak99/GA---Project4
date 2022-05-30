import React from 'react';
import { Card, Dimmer, Segment, Image  } from 'semantic-ui-react'
import DocCard from '../DocCard/DocCard';
import Loader from '../Loader/Loader';

export default function DocFeed({docs, numDocsCol, isProfile, loading, addStar, removeStar, user }){

    return (
        <Card.Group itemsPerRow={numDocsCol} stackable>
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="small">Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        {docs.map((doc) => {
            console.log(doc, '---Doc')
          return (
            <DocCard
              doc={doc}
              key={doc._id}
              isProfile={isProfile}
              addStar={addStar}
              removeStar={removeStar}
              user={user}
            />
          );
        })}
      </Card.Group>
  
    )
}