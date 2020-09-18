import React, { useState, useContext } from "react";
import Router from "next/router";
import apolloClient from "../apollo/apolloClient";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Cookies from 'js-cookie'

import {AuthContext} from '../auth/AuthProvider'

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        createdProducts{
            id
            description
          }
          carts{
            id
            product {
              description
              price
              imageUrl
            }
            quantity
          }
      }
      jwt
    }
  }
`

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

function SignInPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const {setAuthUser} = useContext(AuthContext)

  
  const [login, { loading, error, data }] = useMutation(LOGIN, {
    variables: { ...userInfo },
    onCompleted: data => {
      console.log(data);
      if (data) {
        setAuthUser(data.login.user)
        Cookies.set('token', data.login.jwt)
        setUserInfo({
          email: "",
          password: "",
        });
      }
      console.log('completed')
      
      console.log(error)
      Router.push('/products')
    },
  });
  
  
    const handleChange = async e => {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    };
  
    //   console.log(userInfo);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <Para>sign in</Para>
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
        <Button type="submit" disabled={loading}>
          SUBMIT
        </Button>
      </Form>

    </Div>
  );
}

export default apolloClient(SignInPage);
