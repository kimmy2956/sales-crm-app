import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:3001/customers");
    setCustomers(res.data);
  };

  const addCustomer = async () => {
    await axios.post("http://localhost:3001/customers", { name, email });
    setName(""); setEmail("");
    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">ระบบจัดการฝ่ายขาย</h1>
      <input placeholder="ชื่อลูกค้า" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={addCustomer}>เพิ่มลูกค้า</button>
      <ul>
        {customers.map(c => (
          <li key={c.id}>{c.name} - {c.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
