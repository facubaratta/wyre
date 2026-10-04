import assert from 'node:assert/strict';
import test from 'node:test';
import { importSource } from './helpers/importSource.mjs';

const { createTimeline } = await importSource(
  '../src/scroll/scrollTimeline.ts',
);
const { getPortfolioStage } = await importSource(
  '../src/portfolio/portfolioSequence.ts',
);

test('portfolio keeps the first project until entrance and preserves project/closing boundaries', () => {
  for (const introScreens of [0, 3.75, 7.25]) {
    const timeline = createTimeline(5, introScreens);
    assert.equal(getPortfolioStage(0, 5, timeline), 0);
    assert.equal(
      getPortfolioStage(timeline.projectsStart - 0.01, 5, timeline),
      0,
    );
    for (let index = 0; index < 5; index++) {
      assert.equal(
        getPortfolioStage(timeline.projectsStart + index + 0.01, 5, timeline),
        index,
      );
      assert.equal(
        getPortfolioStage(timeline.projectsStart + index + 0.99, 5, timeline),
        index,
      );
    }
    assert.equal(
      getPortfolioStage(timeline.closingStart + 0.49, 5, timeline),
      4,
    );
    assert.equal(
      getPortfolioStage(timeline.closingStart + 0.5, 5, timeline),
      5,
    );
    assert.equal(getPortfolioStage(timeline.closingEnd + 10, 5, timeline), 5);
  }
});
