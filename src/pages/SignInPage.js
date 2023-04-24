import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo"
import { UserContext } from "../contexts/UserContext";
import api from "../services/api";

export default function SignInPage() {
  const {user, setUser} = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const promise = api.signIn({ ...formData });
    promise.then((response) => {
      console.log(response.data);
      const {idUser, token, name} = response.data;
      setUser({idUser, token, name})
      navigate("/home", {state:{name}});
    });

    promise.catch((error) => {
      if ( error.response.status === 404) {
        alert('Email não cadastrado')
      }else if (error.response.status === 401) {
        alert('Senha incorreta')
      }else if (error.response.status === 422) {
        alert('Verifique se os dados foram preenchidos corretamente')
      }
     
    });
  }

  return (
    <SingInContainer>
      <Form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <Input 
        placeholder="E-mail" 
        type="email" 
        name="email"
        onChange={handleChange}
        value={formData.email}
        required/>

        <Input 
        placeholder="Senha" 
        type="password" 
        name="password"
        autocomplete="new-password" 
        onChange={handleChange}
        value={formData.password}
        required/>

        <Button type="submit">Entrar</Button>
      </Form>

      <Link to="/sign-up">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Form = styled.form``
const Button = styled.button``
const Input = styled.input``