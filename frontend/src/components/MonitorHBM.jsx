import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MonitorHBM() {
  const [medicoes, setMedicoes] = useState([]);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/medicoes");

        if (Array.isArray(response.data)) {
          setMedicoes(response.data);
        } else {
          console.error("Formato inesperado da resposta:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar medições", error.response?.data || error.message);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Monitor de Batimentos Cardíacos</h1>
        
        {alerta && (
          <p className="mt-4 text-lg font-bold text-center text-red-500 animate-pulse">
            ⚠️ Alerta: {alerta}
          </p>
        )}

        <div className="mt-6 w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={medicoes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(tick) => new Date(tick * 1000).toLocaleTimeString()} 
                className="text-gray-600"
              />
              <YAxis domain={[0.5, 1.5]} className="text-gray-600"/>
              <Tooltip 
                labelFormatter={(label) => new Date(label * 1000).toLocaleTimeString()} 
                contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "10px" }}
              />
              <Line 
                type="monotone" 
                dataKey="valor" 
                stroke="#4f46e5" 
                strokeWidth={3} 
                dot={{ stroke: "#4f46e5", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2, fill: "#4f46e5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
