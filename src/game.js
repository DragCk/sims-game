import { createScene } from "./scene.js";
import { createCity } from "./city.js";

export function createGame() {
  let activeTollId = "";
  const scene = createScene();
  const city = createCity(16);

  scene.initialize(city);
  scene.onObjectSelected = (selectedObject) => {
    let { x, y } = selectedObject.userData;
    const tile = city.data[x][y];

    if (activeTollId === "bulldoze") {
      //remove existing building
      tile.buildingId = undefined;
      scene.update(city);
    } else if (!tile.buildingId) {
      //place building at that location
      tile.buildingId = activeTollId;
      scene.update(city);
    }
  };

  document.oncontextmenu = (e) => {
    e.preventDefault();
  };
  document.addEventListener("mousedown", scene.onMouseDown.bind(scene), false);
  document.addEventListener("mouseup", scene.onMouseUp.bind(scene), false);
  document.addEventListener("mousemove", scene.onMouseMove.bind(scene), false);

  const game = {
    update() {
      city.update();
      scene.update(city);
    },
    setActiveTollId(toolId) {
      activeTollId = toolId;
      console.log(activeTollId);
    },
  };

  setInterval(() => {
    game.update();
  }, 1000);

  scene.start();

  return game;
}
