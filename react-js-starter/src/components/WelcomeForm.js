import { useState } from "react";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { assert } from "superstruct";
import { useNavigate } from "react-router-dom";

import { WelcomeStruct } from "../util/structs";
import { TextInput, FormLabel, SelectInput } from "./index";
import { provinces } from "../util/const";

const WelcomeForm = ({ welcomeData, save }) => {
  const [formState, setFormState] = useState({
    firstName: welcomeData.firstName || "",
    lastName: welcomeData.lastName || "",
    phone: welcomeData.phone || "",
    address: welcomeData.address || "",
    city: welcomeData.city || "",
    postalCode: welcomeData.postalCode || "",
    province: welcomeData.province || "Alberta",
  });
  const [errorState, setErrorState] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    address: false,
    city: false,
    postalCode: false,
    province: false,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const updatedFormState = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    setFormState(updatedFormState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      assert(formState, WelcomeStruct);

      save("welcome", formState);
      navigate("/partner");
    } catch (error) {
      const formErrors = {};
      for (const failure of error.failures()) {
        formErrors[failure.path] = true;
        setErrorState(formErrors);
      }
    }
  };

  return (
    <>
      <p className="text-white mb-3 text-lg">
        First, let's start by gathering some information about you.
      </p>
      <form
        className="w-full bg-zinc-50 rounded-md p-4 text-gray-600 shadow"
        onSubmit={handleSubmit}
      >
        <p className="mb-3 font-light">All fields are required.</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <FormLabel htmlFor="firstName">First Name:</FormLabel>
            <TextInput
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={formState.firstName}
              error={errorState.firstName}
              errorLabel="first name"
            />
          </div>
          <div>
            <FormLabel htmlFor="lastName">Last Name:</FormLabel>
            <TextInput
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formState.lastName}
              error={errorState.lastName}
              errorLabel="last name"
            />
          </div>
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="phone">Phone Number:</FormLabel>
          <TextInput
            type="text"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formState.phone}
            error={errorState.phone}
            errorLabel="phone number"
          />
        </div>
        <div className="mb-3">
          <FormLabel htmlFor="address">Street Address:</FormLabel>
          <TextInput
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={formState.address}
            error={errorState.address}
            errorLabel="street address"
          />
        </div>
        <div className="App-location mb-4">
          <div>
            <FormLabel htmlFor="city">City:</FormLabel>
            <TextInput
              type="text"
              id="city"
              name="city"
              onChange={handleChange}
              value={formState.city}
              error={errorState.city}
              errorLabel="city"
            />
          </div>
          <div>
            <FormLabel htmlFor="province">Province:</FormLabel>
            <SelectInput
              type="text"
              id="province"
              name="province"
              onChange={handleChange}
              value={formState.province}
            >
              {provinces.map((province) => {
                return (
                  <option key={province.name} value={province.name}>
                    {province.abbreviation}
                  </option>
                );
              })}
            </SelectInput>
          </div>
          <div>
            <FormLabel htmlFor="postalCode">Postal Code:</FormLabel>
            <TextInput
              type="text"
              id="postalCode"
              name="postalCode"
              onChange={handleChange}
              value={formState.postalCode}
              error={errorState.postalCode}
              errorLabel="postal code"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-3 py-2 rounded font-semibold bg-violet-800 text-white hover:bg-violet-900 transition-colors flex ml-auto"
        >
          Choose a Pokèmon
          <ArrowCircleRightIcon className="h-6 ml-2" />
        </button>
      </form>
    </>
  );
};

export default WelcomeForm;
