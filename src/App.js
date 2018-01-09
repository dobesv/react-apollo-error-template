import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    const { data: { error, loading } } = this.props;
    console.log({error, loading});
    if (error) {
      return <div>error.message</div>;
    }
    if(loading) {
    return <div>Loading ...</div>;
    }
    return <div>Expected an error!</div>;
  }
}


export default graphql(
  gql`
    query ErrorTemplate1 {
      p1: people {
        id
        name
      }
    }
  `,
)(
  graphql(
    gql`
      query ErrorTemplate2 {
        p2: people {
          id
          name
        }
      }
    `,
  )(App),
);
