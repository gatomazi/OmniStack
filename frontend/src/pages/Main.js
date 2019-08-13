import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import "./Main.css";

import api from "../services/api";

import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import itsamatch from "../assets/itsamatch.png";

export default function Main({ match }) {
  const { id: loggedId } = match.params;

  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  //Sempre que o id da URL for alterado, irá executar a função
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: loggedId }
      });
      setUsers(response.data);
    }

    loadUsers();
  }, [loggedId]);

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      query: {
        user: loggedId
      }
    });

    socket.on("match", dev => {
      setMatchDev(dev);
    });
  }, [loggedId]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: loggedId }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: loggedId }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button onClick={() => handleDislike(user._id)} type="button">
                  <img src={dislike} alt="dislike" />
                </button>
                <button onClick={() => handleLike(user._id)} type="button">
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou</div>
      )}
      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} alt="It's a match" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setMatchDev(null)}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
