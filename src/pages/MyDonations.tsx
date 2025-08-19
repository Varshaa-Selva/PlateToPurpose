import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  MapPin, 
  Clock, 
  Calendar, 
  Search,
  Filter,
  TrendingUp,
  Heart,
  Award,
  CheckCircle,
  AlertCircle,
  Truck,
  Users,
  Star,
  Plus
} from "lucide-react";

const MyDonations = () => {
  const [filter, setFilter] = useState("all");

  const donations = [
    {
      id: 1,
      title: "Fresh Vegetables & Fruits",
      quantity: "25 kg mixed vegetables",
      status: "delivered",
      recipient: "Hope Foundation",
      location: "Delhi North",
      donatedDate: "2024-01-15",
      expiryDate: "2024-01-16",
      pickupTime: "2:00 PM",
      deliveryTime: "4:30 PM",
      volunteer: "Rajesh Kumar",
      mealsServed: 50,
      description: "Fresh produce from restaurant surplus - tomatoes, onions, potatoes, and seasonal fruits",
      impact: {
        co2Saved: "12 kg",
        mealsProvided: 50,
        familiesHelped: 15
      },
      tracking: [
        { status: "donated", time: "2:00 PM", date: "Jan 15", completed: true },
        { status: "picked_up", time: "2:30 PM", date: "Jan 15", completed: true },
        { status: "in_transit", time: "3:00 PM", date: "Jan 15", completed: true },
        { status: "delivered", time: "4:30 PM", date: "Jan 15", completed: true }
      ]
    },
    {
      id: 2,
      title: "Prepared Meals - Lunch Boxes",
      quantity: "100 meal boxes",
      status: "in_transit",
      recipient: "Elder Care Society",
      location: "Bangalore Central",
      donatedDate: "2024-01-18",
      expiryDate: "2024-01-18",
      pickupTime: "1:00 PM",
      deliveryTime: "Expected 3:00 PM",
      volunteer: "Priya Sharma",
      mealsServed: 100,
      description: "Ready-to-eat lunch boxes with rice, dal, vegetables, and chapati",
      impact: {
        co2Saved: "25 kg",
        mealsProvided: 100,
        familiesHelped: 30
      },
      tracking: [
        { status: "donated", time: "1:00 PM", date: "Jan 18", completed: true },
        { status: "picked_up", time: "1:15 PM", date: "Jan 18", completed: true },
        { status: "in_transit", time: "1:45 PM", date: "Jan 18", completed: true },
        { status: "delivered", time: "Expected 3:00 PM", date: "Jan 18", completed: false }
      ]
    },
    {
      id: 3,
      title: "Bakery Items - Bread & Pastries",
      quantity: "50 bread loaves, 30 pastries",
      status: "matched",
      recipient: "Street Hope Initiative",
      location: "Mumbai Suburbs",
      donatedDate: "2024-01-18",
      expiryDate: "2024-01-19",
      pickupTime: "Scheduled 5:00 PM",
      deliveryTime: "Expected 7:00 PM",
      volunteer: "Volunteer needed",
      mealsServed: 80,
      description: "End-of-day bakery items in perfect condition, suitable for evening distribution",
      impact: {
        co2Saved: "15 kg",
        mealsProvided: 80,
        familiesHelped: 25
      },
      tracking: [
        { status: "donated", time: "11:00 AM", date: "Jan 18", completed: true },
        { status: "picked_up", time: "Scheduled 5:00 PM", date: "Jan 18", completed: false },
        { status: "in_transit", time: "Pending", date: "Jan 18", completed: false },
        { status: "delivered", time: "Expected 7:00 PM", date: "Jan 18", completed: false }
      ]
    },
    {
      id: 4,
      title: "Dairy Products & Snacks",
      quantity: "20L milk, 50 snack packs",
      status: "pending",
      recipient: "Looking for NGO match",
      location: "Chennai East",
      donatedDate: "2024-01-18",
      expiryDate: "2024-01-20",
      pickupTime: "Pending volunteer",
      deliveryTime: "TBD",
      volunteer: "Not assigned",
      mealsServed: 40,
      description: "Fresh dairy products and healthy snacks, perfect for children's nutrition programs",
      impact: {
        co2Saved: "10 kg",
        mealsProvided: 40,
        familiesHelped: 12
      },
      tracking: [
        { status: "donated", time: "9:00 AM", date: "Jan 18", completed: true },
        { status: "picked_up", time: "Pending", date: "Jan 18", completed: false },
        { status: "in_transit", time: "Pending", date: "Jan 18", completed: false },
        { status: "delivered", time: "Pending", date: "Jan 18", completed: false }
      ]
    },
    {
      id: 5,
      title: "Rice & Lentils Bulk Donation",
      quantity: "100 kg rice, 50 kg lentils",
      status: "delivered",
      recipient: "Community Kitchen Network",
      location: "Pune West",
      donatedDate: "2024-01-10",
      expiryDate: "2024-06-10",
      pickupTime: "10:00 AM",
      deliveryTime: "12:30 PM",
      volunteer: "Volunteer Team",
      mealsServed: 300,
      description: "Bulk donation of staple foods for community kitchen operations",
      impact: {
        co2Saved: "75 kg",
        mealsProvided: 300,
        familiesHelped: 100
      },
      tracking: [
        { status: "donated", time: "10:00 AM", date: "Jan 10", completed: true },
        { status: "picked_up", time: "10:30 AM", date: "Jan 10", completed: true },
        { status: "in_transit", time: "11:00 AM", date: "Jan 10", completed: true },
        { status: "delivered", time: "12:30 PM", date: "Jan 10", completed: true }
      ]
    }
  ];

  const stats = [
    {
      title: "Total Donations",
      value: "47",
      change: "+5",
      icon: Package,
      description: "Lifetime food donations"
    },
    {
      title: "Meals Provided",
      value: "1,250",
      change: "+180",
      icon: Heart,
      description: "People fed through donations"
    },
    {
      title: "CO₂ Saved",
      value: "245 kg",
      change: "+38 kg",
      icon: TrendingUp,
      description: "Environmental impact"
    },
    {
      title: "Impact Score",
      value: "850",
      change: "+95",
      icon: Star,
      description: "Community impact points"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "in_transit": return "bg-blue-100 text-blue-800";
      case "matched": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return CheckCircle;
      case "in_transit": return Truck;
      case "matched": return Users;
      case "pending": return AlertCircle;
      default: return Package;
    }
  };

  const filteredDonations = filter === "all" 
    ? donations 
    : donations.filter(donation => donation.status === filter);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">My Donations</h1>
            <p className="text-muted-foreground">Track your food donations and see their impact on the community</p>
          </div>
          <Button className="gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Donation
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-impact transition-smooth hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <stat.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs text-green-600">
                          {stat.change} this month
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search donations by recipient, location, or food type..."
            className="pl-10"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Donations</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="matched">Matched</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Donations List */}
      <div className="space-y-6">
        {filteredDonations.map((donation, index) => {
          const StatusIcon = getStatusIcon(donation.status);
          return (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="card-compassion">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{donation.title}</CardTitle>
                        <Badge className={getStatusColor(donation.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {donation.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-1" />
                          {donation.quantity}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {donation.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {donation.donatedDate}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {donation.mealsServed} meals
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{donation.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Donation Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Recipient:</span>
                            <span>{donation.recipient}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pickup Time:</span>
                            <span>{donation.pickupTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Delivery Time:</span>
                            <span>{donation.deliveryTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Volunteer:</span>
                            <span>{donation.volunteer}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Impact Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">CO₂ Saved:</span>
                            <span className="text-green-600 font-medium">{donation.impact.co2Saved}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Meals Provided:</span>
                            <span className="text-blue-600 font-medium">{donation.impact.mealsProvided}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Families Helped:</span>
                            <span className="text-purple-600 font-medium">{donation.impact.familiesHelped}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Progress */}
                  <div>
                    <h4 className="font-medium mb-3">Tracking Progress</h4>
                    <div className="space-y-3">
                      {donation.tracking.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1 flex items-center justify-between">
                            <span className={`text-sm capitalize ${
                              step.completed ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.status.replace('_', ' ')}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {step.time} • {step.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Track Progress
                    </Button>
                    {donation.status === "delivered" && (
                      <Button size="sm" variant="outline">
                        <Award className="w-4 h-4 mr-1" />
                        View Impact
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center py-8"
      >
        <Card className="card-impact bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Your Impact Journey</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              You're making a real difference in your community. Every donation counts towards 
              achieving Zero Hunger and building a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white">
                <Plus className="w-4 h-4 mr-2" />
                Make Another Donation
              </Button>
              <Button variant="outline">
                <Award className="w-4 h-4 mr-2" />
                View Achievements
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MyDonations;