import getFilteredKeyArray from "../helper/getFilteredKeyArray";
import { getObjectFromKeys } from "../helper/getObjectFromKeys";

function getListOfAllProjectsFromLocalStorage() {
  const projectKeys = getFilteredKeyArray("tictoc.project_");
  const projectObjects = getObjectFromKeys(...projectKeys);
  return projectObjects;
}

export default getListOfAllProjectsFromLocalStorage;
