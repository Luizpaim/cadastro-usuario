import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  type User = {
    userId: string;
    name: string;
    email: string;
    age: number;
  };

  const [users, setUser] = useState<User[]>([]);

  const userId = RandomId();

  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);

  const createUser = async () => {
    try {
      await api
        .post("/users", {
          userId: userId,
          name: inputName.current?.value,
          email: inputEmail.current?.value,
          age: Number(inputAge.current?.value),
        })
        .then((response) => setUser([...users, response.data]));
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      await api.get("/").then((response) => setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuário</h1>
        <input type="text" name="nome" placeholder="Nome" ref={inputName} />
        <input type="number" name="idade" placeholder="Idade" ref={inputAge} />
        <input type="email" name="email" placeholder="Email" ref={inputEmail} />
        <button onClick={createUser} type="button">
          Cadastrar
        </button>
      </form>

      {users?.map((user) => (
        <div key={user.userId} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button type="button">
            <img src={Trash} alt="delete-user" />
          </button>
        </div>
      ))}
    </div>
  );
}
function RandomId() {
  return Math.random().toString(36).substr(2, 9);
}
