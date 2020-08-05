import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {

  const [inputs, setInputs] = useState({
    name: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    player5: '',
    status: 'DRAFT'
  });

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/teams', inputs);

      if (resp.status === 200)  {
        toast("The team was created successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue creating the team", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue creating the team", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/team"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Create A New Team</h1>
      </header>

      <hr/>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Team Name:</Form.Label>
            <Form.Control
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Player 1:</Form.Label>
            <Form.Control
              name="player1"
              onChange={handleInputChange}
              value={inputs.player1}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Player 2</Form.Label>
            <Form.Control
              name="player2"
              onChange={handleInputChange}
              value={inputs.player2}
            />
          </Form.Group>

          
          <Form.Group>
          <Form.Label>Player 3</Form.Label>
          <Form.Control
            name="player3"
            onChange={handleInputChange}
            value={inputs.player3}
          />
          </Form.Group>
            
          <Form.Group>
          <Form.Label>Player 4</Form.Label>
          <Form.Control
            name="player4"
            onChange={handleInputChange}
            value={inputs.player4}
          />
          </Form.Group>

          <Form.Group>
          <Form.Label>Player 5</Form.Label>
          <Form.Control
            name="player5"
            onChange={handleInputChange}
            value={inputs.player5}
          />
        </Form.Group>

          <Form.Group>
            <Form.Label>Team Status:</Form.Label>
            <Form.Control
              as="select"
              name="status"
              onChange={handleInputChange}
              defaultValue={inputs.status || 'INPROGRESS'}
            >
              <option value="INPROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Create</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default New;