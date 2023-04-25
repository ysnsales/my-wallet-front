import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../services/api";

export default function TransactionsPage() {

  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({description:'', value:''})


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e){
    e.preventDefault();
    setLoading(true);

    const valueNumber = Number(parseFloat(formData.value.replace(',', '.')).toFixed(2));


    const body = {...formData, value: valueNumber};
    const promise = api.createTransaction(user.token, body, type);
    console.log(body)

    promise.then((response) => {
      console.log(response.data);
      setLoading(false)
      navigate("/home");
    });

    promise.catch((err) => {
      console.log(err.response.data.message);
      setLoading(false)
      if (err.response.status === 422) {
        alert('Verifique se os dados foram preenchidos corretamente! (Valor precisa ser um número')
      }else {
        alert('Ocorreu um erro inesperado! Tente novamente')
      }
    });

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <Form onSubmit={handleSubmit}>
        <Input 
        placeholder="Valor" 
        type="text"
        name="value"
        onChange={handleChange}
        value={formData.value}
        required/>

        <Input 
        placeholder="Descrição" 
        type="text"
        name="description"
        onChange={handleChange}
        value={formData.description}
        required />
        <Button type="submit" disabled={loading}>Salvar TRANSAÇÃO</Button>
      </Form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
const Form = styled.form``
const Button = styled.button``
const Input = styled.input``