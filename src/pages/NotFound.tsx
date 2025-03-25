
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 pt-24">
      <div className="text-center">
        <div className="mb-6 text-dairy-500">
          <svg
            className="mx-auto h-24 w-24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mb-8 text-lg text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
          <Link to="/">
            <Button className="bg-dairy-500 hover:bg-dairy-600">
              Return to Home
            </Button>
          </Link>
          <Link to="/resources">
            <Button variant="outline" className="border-dairy-500 text-dairy-600">
              View Resources
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
