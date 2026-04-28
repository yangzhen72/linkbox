import { useEffect, useState } from "react";
import { api } from "./api";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (api.getToken()) {
      setReady(true);
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  return api.getToken() ? <Dashboard /> : <Login />;
}

export default App;