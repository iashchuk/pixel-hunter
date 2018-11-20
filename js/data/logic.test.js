import {assert} from 'chai';
import * as logic from '../logic';

describe(`Scoring`, () => {
  it(`should return -1 if less than 10 answers`, () => {
    assert.equal(logic.scoring([
      logic.AnswerScore.FAST,
      logic.AnswerScore.FAST,
      logic.AnswerScore.FAST,
      logic.AnswerScore.WRONG,
      logic.AnswerScore.WRONG,
      logic.AnswerScore.NORMAL,
      logic.AnswerScore.NORMAL,
      logic.AnswerScore.NORMAL,
      logic.AnswerScore.NORMAL
    ], 3), -1);
  });
});
