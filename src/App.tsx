import "./App.css";
import CreateNewUser from "./components/CreateNewUser";
import ListOfUser from "./components/ListOfUser";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <ListOfUser />
      <CreateNewUser />
      <Toaster richColors />
    </>
  );
}

export default App;
