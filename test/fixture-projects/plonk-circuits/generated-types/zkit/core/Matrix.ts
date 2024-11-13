/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */

import {
  CircuitZKit,
  CircuitZKitConfig,
  Groth16Proof,
  PlonkProof,
  NumberLike,
  NumericString,
  PublicSignals,
  Groth16Implementer,
  PlonkImplementer,
} from "@solarity/zkit";

import { normalizePublicSignals, denormalizePublicSignals } from "../utils";

export type PrivateMatrixPlonk = {
  a: NumberLike[][];
  b: NumberLike[][];
  c: NumberLike;
};

export type PublicMatrixPlonk = {
  d: NumberLike[][];
  e: NumberLike[][];
  f: NumberLike;
  a: NumberLike[][];
};

export type ProofMatrixPlonk = {
  proof: PlonkProof;
  publicSignals: PublicMatrixPlonk;
};

export type CalldataMatrixPlonk = [
  [
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
  ],
  [
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
    NumericString,
  ],
];

export class Matrix extends CircuitZKit<"plonk"> {
  constructor(config: CircuitZKitConfig) {
    super(config, new PlonkImplementer());
  }

  public async generateProof(inputs: PrivateMatrixPlonk): Promise<ProofMatrixPlonk> {
    const proof = await super.generateProof(inputs as any);

    return {
      proof: proof.proof,
      publicSignals: this._normalizePublicSignals(proof.publicSignals),
    };
  }

  public async calculateWitness(inputs: PrivateMatrixPlonk): Promise<bigint[]> {
    return super.calculateWitness(inputs as any);
  }

  public async verifyProof(proof: ProofMatrixPlonk): Promise<boolean> {
    return super.verifyProof({
      proof: proof.proof,
      publicSignals: this._denormalizePublicSignals(proof.publicSignals),
    });
  }

  public async generateCalldata(proof: ProofMatrixPlonk): Promise<CalldataMatrixPlonk> {
    return super.generateCalldata({
      proof: proof.proof,
      publicSignals: this._denormalizePublicSignals(proof.publicSignals),
    });
  }

  public getSignalNames(): string[] {
    return ["d", "e", "f", "a"];
  }

  public getSignalDimensions(name: string): number[] {
    switch (name) {
      case "d":
        return [3, 3];
      case "e":
        return [3, 3];
      case "f":
        return [];
      case "a":
        return [3, 3];
      default:
        throw new Error(`Unknown signal name: ${name}`);
    }
  }

  private _normalizePublicSignals(publicSignals: PublicSignals): PublicMatrixPlonk {
    return normalizePublicSignals(publicSignals, this.getSignalNames(), this.getSignalDimensions);
  }

  private _denormalizePublicSignals(publicSignals: PublicMatrixPlonk): PublicSignals {
    return denormalizePublicSignals(publicSignals, this.getSignalNames());
  }
}

export default Matrix;
