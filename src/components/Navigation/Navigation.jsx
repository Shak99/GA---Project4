import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon, Form, Button } from "semantic-ui-react";
import {Navbar, Nav, NavDropdown, FormControl, Container} from 'react-bootstrap'

export default function Navigation({ user, handleLogout }) {
    console.log(user, 'user in header')
  return (
      <Segment clearing>
        <Header as="h2" floated="right">
          <Link to="/">
            <Icon name="home"></Icon>
          </Link>
          <Link to="/marvel">
            Marvel
          </Link>
          <Link to="/dc">
            DC
          </Link>
          <Link to="/:userid">
            Favorites
          </Link>
          <Link to="" onClick={handleLogout}>
            Logout
          </Link>
        </Header>
        <Header as="h2" floated="left">
          <Link to={`/${user?.username}`}>
            {user?.username}
          </Link>
        </Header>
      </Segment>
  );
}



//     <Navbar bg="light" expand="lg">
//   <Container fluid>
//     <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//     <Navbar.Toggle aria-controls="navbarScroll" />
//     <Navbar.Collapse id="navbarScroll">
//       <Nav
//         className="me-auto my-2 my-lg-0"
//         style={{ maxHeight: '100px' }}
//         navbarScroll
//       >
//         <Nav.Link href="#action1">Home</Nav.Link>
//         <Nav.Link href="#action2">Link</Nav.Link>
//         <NavDropdown title="Link" id="navbarScrollingDropdown">
//           <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//           <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
//           <NavDropdown.Divider />
//           <NavDropdown.Item href="#action5">
//             Something else here
//           </NavDropdown.Item>
//         </NavDropdown>
//         <Nav.Link href="#" disabled>
//           Link
//         </Nav.Link>
//       </Nav>
//       <Form className="d-flex">
//         <FormControl
//           type="search"
//           placeholder="Search"
//           className="me-2"
//           aria-label="Search"
//         />
//         <Button variant="outline-success">Search</Button>
//       </Form>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>