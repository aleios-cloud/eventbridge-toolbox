export interface Contract {
  readonly "detail-type": string;
  readonly detail: {
    readonly detailVersion: number;
    readonly data: Record<string, unknown>;
  };
}

export interface Detail {
  readonly detailVersion: number;
  readonly data: Record<string, unknown>;
}
