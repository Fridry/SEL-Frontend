import React, { useState } from "react";

import api from "../../../services/api";
import { getToken } from "../../../utils/Autentication";
import Template from "../../../components/Template";

const Novo = () => {
  const [atendente, setAtendente] = useState({
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const [senhaConf, setSenhaConf] = useState("");
  const [msg, setMsg] = useState([]);
  const [msgErr, setMsgErr] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAtendente((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitUser = async (e) => {
    e.preventDefault();

    if (atendente.senha !== senhaConf) {
      setMsgErr(["danger", "As senhas informadas não coincidem."]);
      setTimeout(() => setMsgErr([]), 5000);

      return;
    }

    try {
      await api.post("/atendentes", atendente, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setAtendente({
        nome: "",
        data_nascimento: "",
        cpf: "",
        email: "",
        telefone: "",
        senha: "",
        setSenhaConf: "",
      });

      setMsg(["success", "Atendente adicionado com sucesso."]);
    } catch (error) {
      console.log({ error });
      setMsg(["danger", "Erro ao cadastrar atendente."]);
    }

    setTimeout(() => setMsg([]), 5000);
  };

  return (
    <Template title="Novo Atendente">
      <div className="card">
        <div className="card-body px-5">
          {msg[0] && (
            <div className={`alert alert-${msg[0]} text-center`} role="alert">
              {msg[1]}
            </div>
          )}

          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Nome"
                required
                name="nome"
                value={atendente.nome}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="data_nascimento">Data de nascimento</label>
              <input
                type="date"
                className="form-control"
                id="data_nascimento"
                placeholder="Data de nascimento"
                required
                name="data_nascimento"
                value={atendente.data_nascimento}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                placeholder="CPF"
                name="cpf"
                value={atendente.cpf}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="phone"
                className="form-control"
                id="telefone"
                placeholder="Telefone"
                name="telefone"
                value={atendente.telefone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                value={atendente.email}
                onChange={handleInputChange}
              />
            </div>

            {msgErr[0] && (
              <div
                className={`alert alert-${msgErr[0]} text-center`}
                role="alert"
              >
                {msgErr[1]}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                placeholder="Senha"
                name="senha"
                value={atendente.senha}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="senhaConf">Confirmar senha</label>
              <input
                type="password"
                className="form-control"
                id="senhaConf"
                placeholder="Confirmar senha"
                name="senha"
                value={senhaConf}
                onChange={(e) => setSenhaConf(e.target.value)}
              />
            </div>

            <div className="form-group text-center">
              <button
                className="btn btn-primary mt-5 btn-block"
                type="submit"
                onClick={submitUser}
              >
                Salvar atendente
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Novo;
