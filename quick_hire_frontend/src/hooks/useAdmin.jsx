import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !loading) {
      fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/users/admin/${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.admin);
          setIsAdminLoading(false);
        })
        .catch((error) => {
          console.error("Failed to verify admin state:", error);
          setIsAdminLoading(false);
        });
    } else if (!loading) {
      setIsAdminLoading(false);
    }
  }, [user, loading]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
