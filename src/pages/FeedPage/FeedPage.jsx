import React, { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddDocForm from "../../components/AddDocForm/AddDocForm";
import DocGallery from "../../components/DocGallery/DocGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as docAPI from "../../utils/docApi";
import * as starAPI from '../../utils/starApi';




import { Grid } from "semantic-ui-react";



export default function Feed({user, handleLogout}) {
  console.log(docAPI, " <-- docAPI")
  const [docs, setDocs] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  async function addStar(docId){
    try {
      const data = await starAPI.create(docId)
      console.log(data, ' <- the response from the server when we make a like');
      getDocs(); // <- to go get the updated posts with the like
    } catch(err){
      console.log(err)
      setError(err.message)
    }
  }

  async function removeStar(starId){
    try {
      const data = await starAPI.removeStar(starId);
      console.log(data, '<-  this is the response from the server when we remove a like')
      getDocs()
      
    } catch(err){
      console.log(err);
      setError(err.message);
    }
  }



  // C create in Crud
  // we invoke this function in addPost component when the submit button on our form is clicked
  // so we need to pass it as a prop
  async function handleAddDoc(doc) {
    try {
      setLoading(true);
      const data = await docAPI.create(doc); // our server is going to return
      // the created post, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data, " this is response from the server, in handleAddPost");
      setDocs([data.doc, ...docs]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  // R read in crud
  async function getDocs() {
    try {
      const data = await docAPI.getAll(user._id); //may have to take user out
      console.log(data, " this is data,");
      setDocs([...data.docs]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  // useEffect runs once
  // the component is first rendered (whenever you first view the component)
  // Component Lifecycle in react
  useEffect(() => {
    getDocs();
  }, []);



  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <Loading />
      </>
    );
  } 

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddDocForm handleAddDoc={handleAddDoc} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <DocGallery
            docs={docs}
            numDocsCol={1}
            isProfile={false}
            loading={loading}
            addStar={addStar}
            removeStar={removeStar}
            user={user}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}