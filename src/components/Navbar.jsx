/* eslint-disable react/prop-types */

const Navbar = ({ children }) => {
  return (
    <div className="bg-primary-foreground">
      <header className="container py-6">
        <h1 className="uppercase font-bold text-2xl text-primary">
          Car Management
        </h1>
      </header>
      {children}
    </div>
  );
};

export default Navbar;
