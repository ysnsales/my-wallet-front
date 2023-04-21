import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components"
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {

  const [formData, setFormData] = useState({name:'', email:'', password:'', confirmPassword:''});
  const navigate = useNavigate();


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)

    const promise = axios.post("http://localhost:5000/sign-up", { ...formData });
    promise.then((response) => {
      console.log(response.data);
      navigate("/");
    });
    promise.catch((error) => {
      console.log(error.data)
          alert('Erro, tente novamente');
    });
  }

  return (
    <SingUpContainer>
      <Form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <Input 
        placeholder="Nome" 
        type="text" 
        name="name"
        onChange={handleChange}
        value={formData.name}
        required/>

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
        required />

        <Input 
        placeholder="Confirme a senha" 
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        value={formData.confirmPassword}
        required
        />

        <Button type="submit">Cadastrar</Button>
      </Form>

      <Link to="/"> 
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Form = styled.form``
const Button = styled.button``
const Input = styled.input``