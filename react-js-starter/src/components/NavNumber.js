import { NavLink } from "react-router-dom";

const Number = ({ value, path }) => {
  return (
    <NavLink
      to={path}
      className="
  rounded-full bg-white w-8 h-8 flex items-center justify-center cursor-pointer"
      style={({ isActive }) =>
        isActive ? { boxShadow: "0 0 15px 0 red" } : undefined
      }
    >
      {value}
    </NavLink>
  );
};

export default Number;
