import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Orders from "./Pages/Orders";
import Payment from "./Pages/Payment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/:id/order" element={<Orders />} />
        <Route path="/:id/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
