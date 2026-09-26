export type ExpireMode = "preset" | "custom";

export type FormValues = {
  resourceUri: string;
  saPolicyName: string;
  saKey: string;
  expireMode: ExpireMode;
  expireHours: number;
  customExpireDate: string;
};

export type FieldErrors = Partial<Record<keyof FormValues, string>>;
