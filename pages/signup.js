import React, { useState } from "react";
import Link from 'next/link'
import apolloClient from "../apollo/apolloClient";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const SIGN_UP = gql`
  mutation SIGN_UP($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const Div = styled.div`
  margin: 100px;
  padding: 20px;
  color: red;
`;

const Para = styled.p`
  color: blue;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 30%;
`;

const Input = styled.input`
  margin: 5px;
  height: 30px;
  background-color: pink;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 9px;
`;

function SignupPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false)

  const handleChange = async e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(userInfo);

  const [signup, {loading, error, data}] = useMutation(SIGN_UP, { variables: { ...userInfo },
    onCompleted: data => {
        console.log(data)
        if (data) {

            setSuccess(true)
            setUserInfo({
                name: '', email: '', password: ''
            })
        }
    }
})


  const handleSubmit = async e => {
    e.preventDefault();
    try {
        await signup()
        
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <Para>sign up</Para>
        <Input
          type="text"
          name="name"
          placeholder="Username"
          onChange={handleChange}
          value={userInfo.name}
        />
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={userInfo.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={userInfo.password}
        />
        <Button type="submit" disabled={loading}>SUBMIT</Button>
      </Form>

      <div>{success && <p>success, you can <Link href="/signin"><a>sign in</a></Link> now</p>}</div>

      {error && <p>{error.graphQLErrors[0].message}</p>}
    </Div>
  );
}

export default apolloClient(SignupPage);
