/* Autogenerated file. Do not edit manually. */
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */

import { CircuitZKit, CircuitZKitConfig, Groth16Proof, NumberLike, NumericString, PublicSignals } from "@solarity/zkit";

export type PrivateMatrix = {
  a: NumberLike[][];
  b: NumberLike[][];
  c: NumberLike;
};

export type PublicMatrix = {
  d: NumericString[][];
  e: NumericString[][];
  f: NumericString;
  a: NumericString[][];
};

export type ProofMatrix = {
  proof: Groth16Proof;
  publicSignals: PublicMatrix;
};

export type Calldata = [
  [NumericString, NumericString],
  [[NumericString, NumericString], [NumericString, NumericString]],
  [NumericString, NumericString],
  [NumericString, NumericString, NumericString, NumericString],
];

export class Matrix extends CircuitZKit {
  constructor(config: CircuitZKitConfig) {
    super(config);
  }

  public async generateProof(inputs: PrivateMatrix): Promise<ProofMatrix> {
    const proof = await super.generateProof(inputs as any);

    return {
      proof: proof.proof,
      publicSignals: this._normalizePublicSignals(proof.publicSignals),
    };
  }

  public async calculateWitness(inputs: PrivateMatrix): Promise<bigint[]> {
    return await super.calculateWitness(inputs as any);
  }

  public async verifyProof(proof: ProofMatrix): Promise<boolean> {
    return await super.verifyProof({
      proof: proof.proof,
      publicSignals: this._denormalizePublicSignals(proof.publicSignals),
    });
  }

  public async generateCalldata(proof: ProofMatrix): Promise<Calldata> {
    return await super.generateCalldata({
      proof: proof.proof,
      publicSignals: this._denormalizePublicSignals(proof.publicSignals),
    });
  }

  public getSignalNames(): string[] {
    return ["d", "e", "f", "a"];
  }

  private _normalizePublicSignals(publicSignals: PublicSignals): PublicMatrix {
    const signalNames = this.getSignalNames();

    return signalNames.reduce((acc: any, signalName, index) => {
      acc[signalName] = publicSignals[index];
      return acc;
    }, {});
  }

  private _denormalizePublicSignals(publicSignals: PublicMatrix): PublicSignals {
    const signalNames = this.getSignalNames();

    return signalNames.map((signalName) => (publicSignals as any)[signalName]);
  }
}

export default Matrix;
