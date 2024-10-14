import { useEffect, useState } from "react";
import { User } from "../types/User";

const UserList: React.FC = () => {

    const [users, setUser] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('URL')
                if (!response.ok) throw new Error('Network repsonse wos not ok');
                const data: User[] = await response.json();
                setUser(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [])


    
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

    return <>
  <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>
    </>
}

export default UserList;