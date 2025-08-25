import React from "react";
import { ListTemplate } from "./ListTemplate";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
    templates: [
      {
        id: 1,
        title: "Template A",
        link: "templates/email_a.html"
      },
      {
        id: 2,
        title: "Template B",
        link: "templates/email_b.html"
      },
      {
        id: 3,
        title: "Template C",
        link: "templates/email_c.html"
      },
      {
        id: 4,
        title: "Template D",
        link: "templates/email_d.html"
      },
      {
        id: 5,
        title: "Template E",
        link: "templates/email_e.html"
      }
    ]
    };
  }

  render() {
    return (
      <div>
        <ListTemplate templates={this.state.templates} />
      </div>
    );
  }
}

export default List;
