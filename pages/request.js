import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const REQUEST_RESET_PASSWORD = gql`
  mutation REQUEST_RESET_PASSWORD($email: String!) {
    requestResetPassword(email: $email) {
      message
    }
  }
`;

function Request() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [requestResetPassword, { loading, error }] = useMutation(
    REQUEST_RESET_PASSWORD,
    {
      variables: { email },
      onCompleted: data => {
        if (data) {
          setMessage(data.requestResetPassword.message);
        }
      },
    }
  );

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await requestResetPassword();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Please enter email to proceed reset password</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>

      <div>{message && <p style={{ color: "blue" }}>{message}</p>}</div>

      <div>
        {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )}
      </div>
    </div>
  );
}

export default Request;
