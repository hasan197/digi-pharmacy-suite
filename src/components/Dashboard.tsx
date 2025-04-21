
import { useEffect, useState } from "react";
import { 
  ShoppingCart, 
  Pill,
  FileText,
  Users,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
  PieChart,
  Pie
} from "recharts";

// Sample data for charts
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 }
];

const categoryData = [
  { name: "Antibiotics", value: 35 },
  { name: "Pain Relief", value: 25 },
  { name: "Vitamins", value: 20 },
  { name: "Skincare", value: 15 },
  { name: "Other", value: 5 }
];

const expiringSoonData = [
  { name: "< 30 days", count: 10, fill: "#FF6B6B" },
  { name: "30-60 days", count: 15, fill: "#FFA06B" },
  { name: "60-90 days", count: 25, fill: "#FFCE6B" },
  { name: "90+ days", count: 50, fill: "#6BCB77" }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Set greeting based on time of day
  useEffect(() => {
    const hour = currentTime.getHours();
    let newGreeting = "";
    
    if (hour < 12) {
      newGreeting = "Good morning";
    } else if (hour < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }
    
    setGreeting(newGreeting);
    
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentTime);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{greeting}</h1>
          <p className="text-muted-foreground">
            <Clock className="inline-block mr-1 h-4 w-4" />
            {formattedDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Button>New Prescription</Button>
          <Button variant="outline">Run Reports</Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Sales" 
          value="$2,456.78"
          trend="up"
          trendValue="12% from yesterday"
          icon={<ShoppingCart size={20} />}
        />
        <StatCard 
          title="Inventory Items" 
          value="1,245"
          description="42 items low on stock"
          icon={<Pill size={20} />}
        />
        <StatCard 
          title="Prescriptions" 
          value="32"
          description="8 awaiting pickup"
          icon={<FileText size={20} />}
        />
        <StatCard 
          title="Active Customers" 
          value="2,842"
          trend="up"
          trendValue="5% this month"
          icon={<Users size={20} />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="weekly">
              <TabsList className="mb-4">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#0078D7" fill="#E6F3FF" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="weekly" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#0078D7" fill="#E6F3FF" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="monthly" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#0078D7" fill="#E6F3FF" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[200px]">
                <h3 className="text-sm font-medium mb-2 text-center">Category Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[200px]">
                <h3 className="text-sm font-medium mb-2 text-center">Expiring Medication</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expiringSoonData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count">
                      {expiringSoonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Amoxicillin 500mg</p>
                    </div>
                    <Badge variant={item === 1 ? "default" : "outline"}>
                      {item === 1 ? "New" : "Processing"}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="link" className="mt-4 w-full">View All Prescriptions</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Paracetamol 500mg</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-amber-600 font-medium">5 units</span> remaining
                      </p>
                    </div>
                    <Button size="sm">Reorder</Button>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="link" className="mt-4 w-full">View All Inventory</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
