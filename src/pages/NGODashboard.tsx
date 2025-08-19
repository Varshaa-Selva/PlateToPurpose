import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Clock, Package, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NGODashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const stats = [
    { label: "Active Requests", value: "8", icon: Package, color: "text-warning" },
    { label: "Meals Received", value: "324", icon: CheckCircle, color: "text-success" },
    { label: "Families Served", value: "89", icon: MapPin, color: "text-primary" },
    { label: "Partners", value: "12", icon: Clock, color: "text-primary" },
  ];

  const availableDonations = [
    {
      id: 1,
      foodType: "Fresh Vegetables",
      quantity: "25 kg",
      donor: "Green Market",
      location: "Downtown Area",
      expiryDate: "2024-01-20",
      distance: "2.3 km",
      status: "available",
    },
    {
      id: 2,
      foodType: "Bread & Pastries",
      quantity: "40 units",
      donor: "Sunshine Bakery",
      location: "City Center",
      expiryDate: "2024-01-18",
      distance: "1.8 km",
      status: "available",
    },
    {
      id: 3,
      foodType: "Prepared Meals",
      quantity: "50 portions",
      donor: "Community Kitchen",
      location: "North District",
      expiryDate: "2024-01-17",
      distance: "4.1 km",
      status: "urgent",
    },
  ];

  const myRequests = [
    {
      id: 1,
      foodType: "Dairy Products",
      quantity: "15 kg",
      status: "matched",
      donor: "Farm Fresh Co",
      expectedDate: "Today",
    },
    {
      id: 2,
      foodType: "Canned Goods",
      quantity: "100 units",
      status: "pending",
      donor: "TBD",
      expectedDate: "Tomorrow",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'matched': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleRequestFood = (donationId: number) => {
    console.log('Requesting food donation:', donationId);
    // Handle food request logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">NGO Dashboard</h1>
          <p className="text-muted-foreground">Find and request food donations for your community</p>
        </div>
        <Button className="gradient-primary text-white">
          <Package className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-impact">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="card-compassion">
        <CardHeader>
          <CardTitle>Available Food Donations</CardTitle>
          <CardDescription>
            Browse and request food donations from verified donors in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search food donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="bread">Bread & Bakery</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="prepared">Prepared Meals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {availableDonations.map((donation, index) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-border rounded-lg p-4 transition-smooth hover:shadow-card"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{donation.foodType}</h3>
                      <Badge className={getStatusColor(donation.status)}>
                        {donation.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        {donation.quantity}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {donation.location} ({donation.distance})
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Expires: {donation.expiryDate}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Donated by: <span className="font-medium">{donation.donor}</span>
                    </p>
                  </div>
                  <Button
                    onClick={() => handleRequestFood(donation.id)}
                    className="w-full sm:w-auto"
                    variant={donation.status === 'urgent' ? 'destructive' : 'default'}
                  >
                    Request Food
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Requests */}
      <Card className="card-compassion">
        <CardHeader>
          <CardTitle>My Food Requests</CardTitle>
          <CardDescription>
            Track your submitted requests and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{request.foodType}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.quantity} • Expected: {request.expectedDate}
                    </p>
                    {request.donor !== 'TBD' && (
                      <p className="text-xs text-muted-foreground">
                        From: {request.donor}
                      </p>
                    )}
                  </div>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NGODashboard;