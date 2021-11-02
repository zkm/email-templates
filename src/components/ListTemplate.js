import React from "react";

export class ListTemplate extends React.Component {
  render() {
    return (
      <ul className="App-list">
        {this.props.templates.map((template, key) =>
          <li className="App-link" key={key}>
            <a href={template.link}>
              {template.title}
            </a>
          </li>
        )}
      </ul>
    );
  }
}

export default ListTemplate;
