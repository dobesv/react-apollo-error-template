import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

const PERSON_FRAGMENT = gql`
  fragment PersonFragment on Person {
    id
    name
  }
`;

export default function App() {
  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      <Query query={ALL_PEOPLE} onCompleted={(arg) => {
        console.log('onCompleted', arg);
      }}>
        {({ loading, client, data }) =>
          loading ? (
            <p>Loading…</p>
          ) : (
            <>
              <ul>
                {data.people.map(person => (
                  <li key={person.id}>{person.name}</li>
                ))}
              </ul>
              <h2>Buttons</h2>
              <div>
                <button
                  onClick={() => {
                    const data = client.readFragment({
                      id: "Person:1",
                      fragment: PERSON_FRAGMENT,
                      fragmentName: "PersonFragment"
                    });
                    let updatedData = {
                      ...data,
                      name: data.name + "X",
                    };
                    console.log('onClick', updatedData);
                    client.writeFragment({
                      data: updatedData,
                      fragment: PERSON_FRAGMENT,
                      fragmentName: "PersonFragment",
                      id: "Person:1",
                    });
                  }}
                >
                  click me
                </button>
              </div>
            </>
          )
        }
      </Query>
    </main>
  );
}
