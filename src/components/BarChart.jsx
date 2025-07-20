import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChart({ data }) {
   const byCat = data.reduce((acc, g) => {
     acc[g.category] = (acc[g.category] || 0) + g.savedAmount;
     return acc;
   }, {});
   const chartData = Object.entries(byCat).map(([name, value]) => ({ name, value }));

   return (
     <ResponsiveContainer width="100%" height={200}>
       <RechartsBarChart data={chartData}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Bar dataKey="value" />
         </RechartsBarChart>
     </ResponsiveContainer>
   );
 }
