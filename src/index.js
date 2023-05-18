import PubSub from "pubsub-js";
import "./styles/index.scss";
import { userSession } from "./data/userSession";
import projectModule from "./project-list-panel/projectModule";
import todoModule from "./todo-list-panel/todoModule";
import todoDetailModule from "./todo-details-panel/todoDetailModule";

PubSub.subscribe("data_changed", () => {
  projectModule.update();
  todoModule.update();
  todoDetailModule.update();
});
