import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignInPage() {

  const [formData, setFormData] = useState({ email: '', password: '' })


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <SingInContainer>
      <Form>
        <MyWalletLogo />
        <Input 
        placeholder="E-mail" 
        type="email" 
        onChange={handleChange}
        required/>

        <Input 
        placeholder="Senha" 
        type="password" 
        autocomplete="new-password" 
        onChange={handleChange}
        required/>

        <Button type="submit">Entrar</Button>
      </Form>

      <Link to="/cadastro">
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