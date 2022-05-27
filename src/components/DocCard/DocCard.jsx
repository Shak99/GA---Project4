import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
function DocCard({ doc, isProfile, removeStar, addStar, user }) {
  // call the addLike or the removeLike when we click on the heart!

  // We need to know if the logged in user has liked this particular post!
  // we search the array of objects that is post.likes to see if the logged in users
  // id exists in that array of objects
  const starIndex = doc.stars.findIndex(
    (star) => star.username === user.username
  );

  const clickHandler =
    starIndex > -1
      ? () => removeStar(doc.stars[starIndex]._id)
      : () => addStar(doc._id);

  // if the logged users id exists, the heart should be red, because the logged in user has liked the post
  // and the clicked handler should removeLike
  const starColor = starIndex > -1 ? "yellow" : "grey";

  // if the logged users id doesn't exist in the post.likes array, then the heart should be
  // grey, because the user hasn't liked the post, and the click handler should be addLike
  return (
    <Card key={doc._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${doc.user.username}`}>
              <Image
                size="large"
                avatar
                src={
                  doc.user.photoUrl
                    ? doc.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {doc.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}

      <Image src={`${doc.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{doc.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"heart"}
          size="large"
          color={starColor}
          onClick={clickHandler}
        />
        {doc.stars.length} Starred
      </Card.Content>
    </Card>
  );
}

export default DocCard;