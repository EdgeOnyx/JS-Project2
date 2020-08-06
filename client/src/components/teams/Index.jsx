import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    (async () => {
      await getTeams();
    })();
  }, []);

  const getTeams = async () => {
    const teamResp = await Axios.get('/api/teams');
    if (teamResp.status === 200) setTeams(teamResp.data);
  };

  const deleteTeam = async team => {
    try {
      const resp = await Axios.post('/api/teams/delete', {
        id: team._id
      });

      if (resp.status === 200) toast("The team was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getTeams();
    } catch (error) {
      toast("There was an error deleting the team,", {type: toast.TYPE.ERROR});
    }
  };

  return (
    <Container className="my-5">
      <header>
        <h1>Archive</h1>
      </header>

      <hr/>

      <div className="content">
        {teams && teams.map((team, i) => (
          <div key={i} className="card my-3">
            <div className="card-header clearfix">
              <div className="float-left">
                <h5 className="card-title">
                  {team.name}
                </h5>
            </div> 
        </div>          

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/teams/edit",
                  state: {
                    id: team._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteTeam(team)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;