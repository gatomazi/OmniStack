import axios from "axios";

const api = axios.create({
  //Não esquecer de rodar 'adb reverse tcp:3333 tcp:3333'
  baseURL: "http://localhost:3333"
});

export default api;
