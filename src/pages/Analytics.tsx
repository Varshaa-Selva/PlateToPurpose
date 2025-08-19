import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Users, Package, MapPin, Calendar, Download, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";

const Analytics = () => {
  const { state } = useApp();
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("donations");

  // Sample analytics data
  const donationTrends = [
    { month: 'Jan', donations: 45, meals: 180, co2Saved: 125 },
    { month: 'Feb', donations: 52, meals: 210, co2Saved: 145 },
    { month: 'Mar', donations: 38, meals: 155, co2Saved: 98 },
    { month: 'Apr', donations: 67, meals: 275, co2Saved: 186 },
    { month: 'May', donations: 71, meals: 290, co2Saved: 198 },
    { month: 'Jun', donations: 58, meals: 235, co2Saved: 162 },
  ];

  const foodTypeDistribution = [
    { name: 'Vegetables', value: 35, color: '#10b981' },
    { name: 'Fruits', value: 25, color: '#f59e0b' },
    { name: 'Bread & Bakery', value: 20, color: '#ef4444' },
    { name: 'Dairy', value: 12, color: '#8b5cf6' },
    { name: 'Prepared Meals', value: 8, color: '#06b6d4' },
  ];

  const impactMetrics = [
    { label: "Total Meals Served", value: "2,547", change: "+12%", trend: "up", icon: Package },
    { label: "Active Partners", value: "156", change: "+8%", trend: "up", icon: Users },
    { label: "Cities Reached", value: "52", change: "+15%", trend: "up", icon: MapPin },
    { label: "CO₂ Saved (kg)", value: "1,245", change: "+18%", trend: "up", icon: TrendingUp },
  ];

  const weeklyActivity = [
    { day: 'Mon', pickups: 12, deliveries: 8 },
    { day: 'Tue', pickups: 15, deliveries: 12 },
    { day: 'Wed', pickups: 8, deliveries: 6 },
    { day: 'Thu', pickups: 18, deliveries: 15 },
    { day: 'Fri', pickups: 22, deliveries: 18 },
    { day: 'Sat', pickups: 16, deliveries: 14 },
    { day: 'Sun', pickups: 10, deliveries: 8 },
  ];

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'meals':
        return donationTrends.map(d => ({ ...d, value: d.meals }));
      case 'co2':
        return donationTrends.map(d => ({ ...d, value: d.co2Saved }));
      default:
        return donationTrends.map(d => ({ ...d, value: d.donations }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your impact and platform performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-impact">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="w-6 h-6 text-primary" />
                  <Badge 
                    variant="outline" 
                    className={metric.trend === 'up' ? 'text-success border-success' : 'text-destructive border-destructive'}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Donation Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-compassion">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Impact Trends</CardTitle>
                  <CardDescription>Track your impact over time</CardDescription>
                </div>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-36">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donations">Donations</SelectItem>
                    <SelectItem value="meals">Meals Served</SelectItem>
                    <SelectItem value="co2">CO₂ Saved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={getMetricData()}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Food Type Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-compassion">
            <CardHeader>
              <CardTitle>Food Type Distribution</CardTitle>
              <CardDescription>Breakdown of donated food categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={foodTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {foodTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {foodTypeDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-medium ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Pickup and delivery patterns throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="pickups" fill="hsl(var(--primary))" name="Pickups" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deliveries" fill="hsl(var(--secondary))" name="Deliveries" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle>Platform Insights</CardTitle>
            <CardDescription>Key insights and recommendations based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h4 className="font-medium text-success mb-2">🎉 Great Impact!</h4>
                <p className="text-sm text-muted-foreground">
                  Your donations this month have served 18% more meals compared to last month. 
                  Keep up the excellent work!
                </p>
              </div>
              
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-medium text-warning mb-2">💡 Optimization Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Consider posting donations on Thursdays and Fridays when request activity is highest. 
                  This could reduce your average matching time by 15%.
                </p>
              </div>
              
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-medium text-primary mb-2">📈 Growth Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  There's high demand for prepared meals in your area. 
                  Consider expanding into this category to maximize your impact.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;