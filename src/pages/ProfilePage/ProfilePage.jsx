import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import DocGallery from "../../components/DocGallery/DocGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import * as starsAPI from '../../utils/starApi';

import { useParams } from "react-router-dom";





export default function ProfilePage(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [docs, setDocs] = useState([]);
  // We need to grab the username out of the url,
  const { username } = useParams();


  async function addStar(docId){
    try {
      const data = await starsAPI.create(docId)
      console.log(data, ' <- the response from the server when we make a like');
      getProfile(); // <- to go get the updated posts with the like
    } catch(err){
      console.log(err)
      setError(err.message)
    }
  }

  async function removeStar(starId){
    try {
      const data = await starsAPI.removeStar(starId);
      console.log(data, '<-  this is the response from the server when we remove a like')
      getProfile()
      
    } catch(err){
      console.log(err);
      setError(err.message);
    }
  }

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " < -- data");
      setLoading(() => false);
      setUser(() => data.user);
      setDocs(() => data.docs);
    } catch (err) {
      console.log(err);
      setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
    }
  }


  // then when the component loads we can use that username to fetch all the users data
  // then we can store that in state
  useEffect(() => {
    getProfile();
  }, []);




  if (error) {
    return (
      <>
        <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        <Loading />
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
        <DocGallery
            isProfile={true}
            docs={docs}
            numDocsCol={3}
            user={props.user}
            addStar={addStar}
            removeStar={removeStar}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}