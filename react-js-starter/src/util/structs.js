import { object, string, nonempty } from "superstruct";

export const WelcomeStruct = object({
  firstName: nonempty(string()),
  lastName: nonempty(string()),
  phone: nonempty(string()),
  address: nonempty(string()),
  city: nonempty(string()),
  province: nonempty(string()),
  postalCode: nonempty(string()),
});
