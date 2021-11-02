import React from "react";
import { ListTemplate } from "./ListTemplate";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      templates: []
    };
  }

  componentWillMount() {
    this.setState({
        _templates: [
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
            // {
            //     id: 2.2,
            //     title: "Template B2",
            //     link: "templates/email_b2.2.html"
            // },
            // {
            //     id: 2.3,
            //     title: "Template B3",
            //     link: "templates/email_b2.3.html"
            // },
            // {
            //     id: 2.4,
            //     title: "Template B4",
            //     link: "templates/email_b2.4.html"
            // },

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
        ],
        get templates() {
            return this._templates;
        },
        set templates(value) {
            this._templates = value;
        },
    });
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
