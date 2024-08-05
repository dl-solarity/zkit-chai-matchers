import { CircuitZKit, Signals } from "@solarity/zkit";

import { loadOutputs, stringifySignal } from "./utils";

export function witness(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void {
  chai.Assertion.addMethod("witnessInputs", function (this: any, inputs: Signals) {
    const obj = utils.flag(this, "object");

    if (!(obj instanceof CircuitZKit)) {
      throw new Error("`witnessInputs` is expected to be called on `CircuitZKit`");
    }

    const promise = (this.then === undefined ? Promise.resolve() : this).then(async () => {
      const witness = await (obj as CircuitZKit).calculateWitness(inputs);

      utils.flag(this, "inputs", inputs);
      utils.flag(this, "witness", witness);
    });

    this.then = promise.then.bind(promise);
    this.catch = promise.catch.bind(promise);

    return this;
  });

  chai.Assertion.addMethod("witnessOutputsStrict", function (this: any, outputs: Signals) {
    const obj = utils.flag(this, "object");

    if (!(obj instanceof CircuitZKit)) {
      throw new Error("`witnessOutputsStrict` is expected to be called on `CircuitZKit`");
    }

    const promise = (this.then === undefined ? Promise.resolve() : this).then(async () => {
      const witness = utils.flag(this, "witness");
      const inputs = utils.flag(this, "inputs");

      if (!witness) {
        throw new Error("`witnessOutputsStrict` is expected to be called after `witnessInputs`");
      }

      if (Object.keys(inputs).length === 0) {
        throw new Error("Circuit must have at least one input to extract outputs");
      }

      const actual = loadOutputs(obj as CircuitZKit, witness, inputs);

      if (Object.keys(actual).length !== Object.keys(outputs).length) {
        throw new Error(`Expected ${Object.keys(outputs).length} outputs, but got ${Object.keys(actual).length}`);
      }

      for (const output of Object.keys(outputs)) {
        this.assert(
          stringifySignal(actual[output]) === stringifySignal(outputs[output]),
          `Expected output "${output}" to be "${stringifySignal(outputs[output])}", but got "${stringifySignal(actual[output])}"`,
          `Expected output "${output}" NOT to be "${stringifySignal(outputs[output])}", but it is"`,
        );
      }
    });

    this.then = promise.then.bind(promise);
    this.catch = promise.catch.bind(promise);

    return this;
  });

  chai.Assertion.addMethod("witnessOutputs", function (this: any, outputs: Signals) {
    const obj = utils.flag(this, "object");

    if (!(obj instanceof CircuitZKit)) {
      throw new Error("`witnessOutputs` is expected to be called on `CircuitZKit`");
    }

    const promise = (this.then === undefined ? Promise.resolve() : this).then(async () => {
      const witness = utils.flag(this, "witness");
      const inputs = utils.flag(this, "inputs");

      if (!witness) {
        throw new Error("`witnessOutputs` is expected to be called after `witnessInputs`");
      }

      if (Object.keys(inputs).length === 0) {
        throw new Error("Circuit must have at least one input to extract outputs");
      }

      const actual = loadOutputs(obj as CircuitZKit, witness, inputs);

      for (const output of Object.keys(outputs)) {
        this.assert(
          stringifySignal(actual[output]) === stringifySignal(outputs[output]),
          `Expected output "${output}" to be "${stringifySignal(outputs[output])}", but got "${stringifySignal(actual[output])}"`,
          `Expected output "${output}" NOT to be "${stringifySignal(outputs[output])}", but it is"`,
        );
      }
    });

    this.then = promise.then.bind(promise);
    this.catch = promise.catch.bind(promise);

    return this;
  });
}
