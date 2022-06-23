import { object, string, nonempty, size, define } from "superstruct";
import isPostalCode from "validator/lib/isPostalCode";

const postalCode = () =>
  define("postalCode", (value) => isPostalCode(value, "CA"));

export const WelcomeStruct = object({
  firstName: nonempty(string()),
  lastName: nonempty(string()),
  phone: size(string(), 10, 10),
  address: nonempty(string()),
  city: nonempty(string()),
  province: nonempty(string()),
  postalCode: nonempty(postalCode()),
});
