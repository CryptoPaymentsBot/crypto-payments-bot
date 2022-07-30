/// <reference types="node" />

import assert from "node:assert";
import { test } from "node:test";

test("Tests will run", (t) => {
  t.test("First test", () => {
    assert.strictEqual(2 + 2, 4);
  });
});
