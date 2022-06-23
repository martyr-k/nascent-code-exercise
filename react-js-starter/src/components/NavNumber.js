import { NavLink } from "react-router-dom";

const Number = ({ value, path, disabled }) => {
  return (
    <NavLink
      to={disabled ? "#" : path}
      className={`
  rounded-full bg-white w-8 h-8 flex items-center justify-center ${
    disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
  }`}
      style={({ isActive }) =>
        isActive && !disabled ? { boxShadow: "0 0 15px 0 red" } : undefined
      }
    >
      {value}
    </NavLink>
  );
};

export default Number;
