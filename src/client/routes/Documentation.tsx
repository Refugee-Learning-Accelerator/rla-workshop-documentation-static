import * as React from 'react';
import * as $ from 'jquery';

class Documentation extends React.Component<any, any> {
  
  constructor(props){
    super(props);
    
    this.state = { 
      'teams': [],
      'folders': [],
      'folderName': ''
    };
  }
  
  
  componentWillMount() {
    $.get('dist/data.json').then((data) => {
      this.setState({
        'teams': data['teams'],
        'folders': data['folders']
      })
    });
  }
  
  handleChange(e) {
    this.setState({'folderName': e.target.value});
  }
  
  render() {
    return (
      <div className="uk-padding uk-section uk-section-secondary page-content">        
        {/* <h3 className="uk-heading-divider">General Documents</h3> */}
        <table className="uk-table uk-table-small uk-table-responsive uk-table-middle">
          <tbody>
            <tr>
              <td>Slides from all teams' pitch presentations on Friday</td>
              <td className="limit-width"><a className="uk-button uk-button-primary document-button" href="https://drive.google.com/drive/folders/1m5PJBaLYNOXBypAeL2zh12tq4QHix2Sh?usp=sharing">Presentations</a></td>
            </tr>
            <tr>
              <td>Slide decks and worksheets from throughout the week</td>
              <td className="limit-width"><a className="uk-button uk-button-primary document-button" href="https://drive.google.com/open?id=1CFoO69vGhimnAozX2Gdl4WaIDNpVpH4H">Sessions</a></td>
            </tr>
            <tr>
              <td>Notes from from field interviews and NGO discussions</td>
              <td className="limit-width"><a className="uk-button uk-button-primary document-button" href="https://drive.google.com/drive/folders/1bMuOHSuXzpQQ0ZqPuP07GCTaGuRlmMSq?usp=sharing">NGO Field Visits</a></td>
            </tr>
            <tr>
              <td>Photos combined from all different sources</td>
              <td className="limit-width"><a className="uk-button uk-button-primary document-button" href="https://drive.google.com/drive/folders/10uAdRUcUJyVPm9je7jzwhKWnumiA7SvJ?usp=sharing">All Photos</a></td>
            </tr>
          </tbody>
        </table>
      
        {/* <h3 className="uk-heading-divider">Team Folders</h3>
        <div>
          <div className="folder-button-container">
            {this.state.teams.map((team) => {
              return (
                <a key={team} className="uk-button uk-button-primary folder-button" href={this.state.folders[team]}>{team}</a>
              );
            })}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Documentation;
