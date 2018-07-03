import "core-js";
import "whatwg-fetch";
import "dom4";

import log from "loglevel";

System.global.log = log;

import Game from "./src/game";
import Renderer from "./src/renderer";

const playfield = {
    "size": {
      "width": 10,
      "height": 20
    },
    "padding": {
      "left": 0,
      "right": 0,
      "top": 20,
      "bottom": 0
    }
  };

const game = new Game(playfield);
const renderer = new Renderer(playfield);

game.run(::renderer.render).catch(e => console.error(e));
