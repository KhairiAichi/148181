import { UserProvider } from '../../context/UserContext';

export default function App({ children }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
