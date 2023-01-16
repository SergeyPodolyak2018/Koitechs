import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';

export function RepoCard(props) {

  return (
    <Table striped bordered hover size="sm">
      <thead>
      <tr>
        <th>Name</th>
        <th>Link</th>
      </tr>
      </thead>
      <tbody>
      {props.repos.map((el,i)=>{
        return <tr key={i}>
                  <td>{el.name}</td>
                  <td>
                    <Nav.Item>
                      <Nav.Link eventKey="1" href={el.html_url}>
                        Show
                      </Nav.Link>
                    </Nav.Item>
                  </td>
                </tr>
      })}


      </tbody>
    </Table>
  )
}
