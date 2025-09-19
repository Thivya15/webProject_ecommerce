import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const SyncUser = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const saveUser = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();

          const response = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify({
              email: user.email,       
              username: user.nickname,
              name: user.name,
              phoneNumber: user.phone_number || null,
              country: user["https://yourapp.com/country"] || null,
            }),
          });

          if (!response.ok) {
            // response 401/403/other error
            const text = await response.text();
            console.error("Failed to save user:", text);
            return;
          }

          const data = await response.json();
          console.log("User saved in backend:", data);
        } catch (err) {
          console.error("Error saving user:", err);
        }
      }
    };

    saveUser();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return null;
};

export default SyncUser;
