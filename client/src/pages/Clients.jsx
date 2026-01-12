import { ClientProvider } from "../context/ClientContext";
import PrivateLayout from "../components/layout/PrivateLayout";
import ClientForm from "../components/clients/ClientForm";
import ClientList from "../components/clients/ClientList";


export default function Clients() {
  return (
    <ClientProvider>
      <PrivateLayout>
        <div className="grid md:grid-cols-2 gap-6">
          <ClientForm />
          <ClientList />
        </div>
      </PrivateLayout>
    </ClientProvider>
  );
}
