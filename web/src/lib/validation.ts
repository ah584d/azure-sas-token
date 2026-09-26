import type { FieldErrors, FormValues } from "./types";

export function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  const uri = values.resourceUri.trim();
  if (!uri) {
    errors.resourceUri = "Resource URI is required";
  } else if (!/^https?:\/\/\S+/i.test(uri)) {
    errors.resourceUri = "Must be a full URL starting with http:// or https://";
  }

  if (!values.saPolicyName.trim()) {
    errors.saPolicyName = "Policy name is required";
  }

  const key = values.saKey.trim();
  if (!key) {
    errors.saKey = "Key is required";
  } else if (key.length < 44) {
    errors.saKey = "Key must be at least 44 characters";
  }

  if (values.expireMode === "custom") {
    const raw = values.customExpireDate.trim();
    if (!raw) {
      errors.customExpireDate = "Custom expiration date is required";
    } else {
      const parsed = new Date(raw);
      if (Number.isNaN(parsed.getTime())) {
        errors.customExpireDate =
          "Invalid date. Use ISO 8601, e.g. 2026-10-04T12:00:00Z";
      } else if (parsed.getTime() <= Date.now()) {
        errors.customExpireDate = "Expiration date must be in the future";
      }
    }
  }

  return errors;
}
