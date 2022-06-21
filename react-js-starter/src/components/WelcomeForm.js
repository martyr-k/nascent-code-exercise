import { useState } from "react";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

import { TextInput, FormLabel, SelectInput } from "./index";

const provinces = [
  {
    name: "Alberta",
    abbreviation: "AB",
  },
  {
    name: "British Columbia",
    abbreviation: "BC",
  },
  {
    name: "Manitoba",
    abbreviation: "MB",
  },
  {
    name: "New Brunswick",
    abbreviation: "NB",
  },
  {
    name: "Newfoundland and Labrador",
    abbreviation: "NL",
  },
  {
    name: "Northwest Territories",
    abbreviation: "NT",
  },
  {
    name: "Nova Scotia",
    abbreviation: "NS",
  },
  {
    name: "Nunavut",
    abbreviation: "NU",
  },
  {
    name: "Ontario",
    abbreviation: "ON",
  },
  {
    name: "Prince Edward Island",
    abbreviation: "PE",
  },
  {
    name: "Quebec",
    abbreviation: "QC",
  },
  {
    name: "Saskatchewan",
    abbreviation: "SK",
  },
  {
    name: "Yukon Territory",
    abbreviation: "YT",
  },
];

const WelcomeForm = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "Alberta",
  }); // or localstorage

  const handleChange = (e) => {
    const updatedFormState = { ...formState, [e.target.name]: e.target.value };
    setFormState(updatedFormState);
  };
  const handleSubmit = () => {};

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
          />
        </div>
        <div className="App-location mb-5">
          <div>
            <FormLabel htmlFor="city">City:</FormLabel>
            <TextInput
              type="text"
              id="city"
              name="city"
              onChange={handleChange}
              value={formState.city}
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
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-3 py-2 rounded font-semibold bg-red-800 text-white hover:bg-red-900 transition-colors flex ml-auto"
        >
          Choose a Pokèmon
          <ArrowCircleRightIcon className="h-6 ml-2" />
        </button>
      </form>
    </>
  );
};

export default WelcomeForm;
