import AbstractView from './abstract-view';
import indicators from './components/indicators-component';
import getPreloadImages from '../data/preolad-images';
import {DEBUG, AnswersType, ImagesType} from '../logic/config';


const ENTER_KEYCODE = 13;

export default class GuessGameView extends AbstractView {
  constructor(state, game) {
    super();
    this.state = state;
    this.game = game;
  }

  get images() {
    return getPreloadImages(this.game);
  }

  get template() {
    return `
      <section class="game">
            <p class="game__task">${this.game.description}</p>
            <form class="game__content game__content--triple">
            ${this.game.params.map((param, index) => `
            <div class="game__option">
              ${DEBUG ? `<span class="debug">${param.type}</span>` : ``}
              <img src="${this.images[index].src}" data-type="${this.images[index].type}" alt="Option ${index}" width="${this.images[index].width}" height="${this.images[index].height}">
            </div>`).join(``)}
            </form>
            ${indicators(this.state.answers)}
      </section>
    `;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);

    const getAnswer = () => {
      return (this.game.description.includes(ImagesType.photo)) ? AnswersType.photo : AnswersType.painting;
    };

    const answerElementHandler = (evt) => {
      this.answerHandler(evt.target.dataset.type === getAnswer());
    };

    const answerKeyDownHandler = (evt) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        answerElementHandler(evt);
        document.removeEventListener(`keydown`, answerKeyDownHandler);
      }
    };

    gameContent.addEventListener(`click`, answerElementHandler);
    document.addEventListener(`keydown`, answerKeyDownHandler);
  }

  answerHandler() {}
}
