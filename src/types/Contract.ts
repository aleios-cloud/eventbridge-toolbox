export interface Contract {
  readonly 'detail-type': string;
  readonly detail: Detail;
}

export interface Detail {
  readonly 'detail-version': number;
  readonly data: Record<string, unknown>;
}
