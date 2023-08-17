export interface Contract {
  readonly detailVersion: number;
  readonly detailType: string;
  readonly data: Record<string, unknown>;
}
