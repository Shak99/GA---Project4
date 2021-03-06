import React, { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddDocForm from "../../components/AddDocForm/AddDocForm";
import DocFeed from "../../components/DocFeed/DocFeed";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as docAPI from "../../utils/docApi";
import { Grid } from "semantic-ui-react";

export default function Feed() {
  const [docs, setDocs] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function handleAddDoc(doc) {
    try {
      setLoading(true);
      const data = await docAPI.create(doc); // our server is going to return
      // the created post, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data, " this is response from the server, in handleAddDoc");
      setDocs([data.docs, ...docs]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  // R read in crud
  async function getDocs() {
    try {
      const data = await docAPI.getAll();
      console.log(data, " this is data,");
      setDocs([...data.docs]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  const document = docs.map((doc, index) => {
    console.log(doc)
    return (
        <div key={index}>
        <input type="submit" id={doc._id} value="Delete Doc" onClick={handleDeleteDoc}  /> 
        </div>
    )
  })

  async function handleDeleteDoc(e) {
    try {
      const docId = e.target.id
      console.log(docId)
      setLoading(true);
      const data = await docAPI.deleteDoc(docId);
      const docArray = await docs.filter(doc => doc._id !== docId);
         setDocs(docArray);
     setLoading(false);
    } catch (err) {
        console.log(err);
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
        <PageHeader />
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader />
        <Loading />
      </>
    );
  } 

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddDocForm handleAddDoc={handleAddDoc} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <DocFeed
            docs={docs}
            numDocsCol={1}
            isProfile={false}
            loading={loading}
          />
          {document} 
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

