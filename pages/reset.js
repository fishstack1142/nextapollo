import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {useRouter} from 'next/router'
const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token) {
      message
    }
  }
`;

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const router = useRouter()

  const [resetPassword, { loading, error }] = useMutation(
    RESET_PASSWORD,
    {
      variables: { password, token: router && router.query.token },
      onCompleted: data => {
        if (data) {
          setMessage(data.resetPassword.message);
        }
      },
    }
  );

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await resetPassword();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(router && router.query.token)

  return (
    <div>
      <div>Enter new password to proceed</div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="New password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit"
        disabled={loading}
        >
          Submit
        </button>
      </form>

      <div>{message && <p>{message}</p>}</div>

      <div>{error && <p>{error.graphQLErrors[0].message}</p>}</div>
    </div>
  );
}

export default ResetPassword;
