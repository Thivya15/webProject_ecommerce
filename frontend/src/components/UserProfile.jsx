import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );

  return (
    isAuthenticated && (
      <div className="flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            User Profile
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Username:</span>
              <span className="text-gray-800">{user.nickname}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-800">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfile;
