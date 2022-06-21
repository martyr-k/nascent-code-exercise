import { object, string, nonempty, define } from "superstruct";
import isPostalCode from "validator/lib/isPostalCode";

const postalCode = () =>
  define("postalCode", (value) => isPostalCode(value, "CA"));

export const WelcomeStruct = object({
  firstName: nonempty(string()),
  lastName: nonempty(string()),
  phone: nonempty(string()),
  address: nonempty(string()),
  city: nonempty(string()),
  province: nonempty(string()),
  postalCode: nonempty(postalCode()),
});
