import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="text-2xl">Page Not Found</h1>
      <Link to="/" className="text-blue-600">
        Please go to homepage.
      </Link>
    </div>
  );
};

export default Error;
