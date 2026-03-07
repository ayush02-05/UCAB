import { Toaster } from "sonner";

import MainRoutes from "../routes/MainRoutes";
import { AppProvider } from "./context/AppContext";
import { UserProvider } from "./context/UserContext";
import { CaptainProvider } from "./context/CaptainContext";

export default function App() {
  return (
    <div>
      <AppProvider>
        <UserProvider>
          <CaptainProvider>
            <Toaster position="top-center" richColors closeButton />
            <MainRoutes />
          </CaptainProvider>
        </UserProvider>
      </AppProvider>
    </div>
  );
}
