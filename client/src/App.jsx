import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import Toast from "./components/ui/Toast";

export default function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <AppRouter />
        <Toast />
      </AuthProvider>
    </UIProvider>
  );
}
