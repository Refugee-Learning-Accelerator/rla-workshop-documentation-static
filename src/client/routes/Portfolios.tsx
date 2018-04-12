import * as React from 'react';
import * as $ from 'jquery';

import PortfolioPage from '../components/PortfolioPage';

class Portfolios extends React.Component<any, any> {
  
  constructor(props) {
    super(props);
    
    this.state = { 
      'teamNames': [],
      'teamFolderLinks': {},
      'currentName': '',
      'teamDescriptions': {}
    };
  }
  
  
  componentWillMount() {
    $.get('dist/data.json').then((data) => {
      var teamNames = data['teams'];
      var teamDescriptions = {};
      teamNames.forEach((name) => {
        $.get('assets/desc/' + name.toLowerCase() + '.txt').then((description) => {
          if (description.startsWith('<!DOCTYPE html>')) description = '';
          teamDescriptions[name] = description;
          if (Object.keys(teamDescriptions).length == teamNames.length) {
            this.setState({
              'teamDescriptions': teamDescriptions,
              'teamNames': teamNames,
              'currentName': ''
            })
          }
        })
      })
    });
  }
  
  handleKeyPress(e) {
    
  }
  
  render() {
    return (
      <div 
        className="page-content uk-background-muted" 
        onKeyDown={(e) => { if(e.keyCode == 27) this.componentWillMount() }}>
        <div className="uk-tile uk-tile-secondary overview-tile">
        Fourteen teams which had shown the greatest progress and had the promise to take their ideas further, were invited to a workshop in Amman, Jordan. Over the course of eight days, teams visited NGOs, discussed their ideas with experts, participated in seminars, built preliminary prototypes, and pitched their project to a panel of guests and their peers. The focus was on identifying a specific problem and finding an appropriate solution. We emphasized collaboration and community over competition.
        </div>
        <div className="portfolio-tile-container">
          {this.state.teamNames.map((name) => {
            return (<div 
              key={name} 
              className="portfolio-tile uk-tile uk-tile-secondary" 
              uk-toggle="target: #portfolio-modal"
              onClick={() => { this.setState({'currentName': name})}}>
                <h3>{name}</h3>
                <p>{this.state.teamDescriptions[name]}</p>
              </div>
            );
          })}
        </div>
        
        <div id="portfolio-modal" className="uk-modal-full" uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body" uk-overflow-auto="true">
            
            <PortfolioPage name={this.state.currentName} />
            
            <button className="uk-modal-close-full uk-close-small" type="button" uk-close="true" onClick={this.componentWillMount.bind(this)}></button>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Portfolios;
