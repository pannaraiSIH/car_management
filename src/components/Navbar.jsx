/* eslint-disable react/prop-types */

const Navbar = ({ children }) => {
  return (
    <>
      <header className="container py-6">
        <h1 className="uppercase font-bold text-2xl">Car Management</h1>
      </header>
      {children}
    </>
  );
};

export default Navbar;
