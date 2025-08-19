import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Users, 
  Package, 
  Search,
  Filter,
  Calendar,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VolunteerTasks = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");

  const tasks = [
    {
      id: 1,
      title: "Food Pickup from Green Valley Restaurant",
      type: "pickup",
      priority: "high",
      status: "available",
      location: {
        pickup: "Green Valley Restaurant, Bandra West",
        delivery: "Hope Foundation, Dharavi"
      },
      distance: "12.5 km",
      estimatedTime: "45 mins",
      quantity: "50 meal boxes",
      timeSlot: "2:00 PM - 4:00 PM",
      deadline: "Today, 5:00 PM",
      description: "Pick up surplus meals from restaurant and deliver to NGO for evening distribution.",
      points: 25,
      contact: {
        pickup: "+91 98765 43210",
        delivery: "+91 87654 32109"
      }
    },
    {
      id: 2,
      title: "Emergency Delivery - Flood Relief Supplies",
      type: "delivery",
      priority: "urgent",
      status: "available",
      location: {
        pickup: "Metro Food Corporation, Andheri",
        delivery: "Emergency Relief Center, Kurla"
      },
      distance: "18.2 km",
      estimatedTime: "60 mins",
      quantity: "200kg dry rations",
      timeSlot: "11:00 AM - 1:00 PM",
      deadline: "Today, 3:00 PM",
      description: "Emergency food delivery for flood-affected families. Vehicle provided by organization.",
      points: 40,
      contact: {
        pickup: "+91 76543 21098",
        delivery: "+91 65432 10987"
      }
    },
    {
      id: 3,
      title: "Community Kitchen Support",
      type: "onsite_help",
      priority: "medium",
      status: "assigned",
      location: {
        pickup: "Community Kitchen Network",
        delivery: "Same Location"
      },
      distance: "8.3 km",
      estimatedTime: "3 hours",
      quantity: "Meal preparation for 100",
      timeSlot: "9:00 AM - 12:00 PM",
      deadline: "Tomorrow",
      description: "Help with meal preparation and packaging at community kitchen.",
      points: 30,
      contact: {
        pickup: "+91 54321 09876",
        delivery: "+91 54321 09876"
      }
    },
    {
      id: 4,
      title: "Senior Citizen Meal Distribution",
      type: "distribution",
      priority: "medium",
      status: "available",
      location: {
        pickup: "Elder Care Society Kitchen",
        delivery: "Multiple Senior Homes"
      },
      distance: "15.7 km",
      estimatedTime: "2 hours",
      quantity: "75 meals",
      timeSlot: "12:00 PM - 2:00 PM",
      deadline: "Tomorrow, 3:00 PM",
      description: "Weekly meal distribution to elderly residents across 3 locations.",
      points: 35,
      contact: {
        pickup: "+91 43210 98765",
        delivery: "Multiple contacts"
      }
    },
    {
      id: 5,
      title: "Food Collection from Corporate Event",
      type: "pickup",
      priority: "low",
      status: "completed",
      location: {
        pickup: "Tech Plaza Conference Center",
        delivery: "Street Hope Initiative"
      },
      distance: "22.1 km",
      estimatedTime: "75 mins",
      quantity: "150 portions",
      timeSlot: "6:00 PM - 8:00 PM",
      deadline: "Yesterday",
      description: "Collected surplus food from corporate event for homeless shelter distribution.",
      points: 20,
      contact: {
        pickup: "+91 32109 87654",
        delivery: "+91 21098 76543"
      }
    }
  ];

  const stats = [
    {
      title: "Available Tasks",
      value: "12",
      change: "+3",
      icon: Package,
      description: "Tasks ready for volunteers"
    },
    {
      title: "Active Volunteers",
      value: "145",
      change: "+8",
      icon: Users,
      description: "Currently helping today"
    },
    {
      title: "Completed Today",
      value: "28",
      change: "+15",
      icon: CheckCircle,
      description: "Tasks completed successfully"
    },
    {
      title: "Impact Points",
      value: "2,450",
      change: "+180",
      icon: Star,
      description: "Points earned this month"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pickup": return "bg-blue-100 text-blue-800";
      case "delivery": return "bg-green-100 text-green-800";
      case "onsite_help": return "bg-purple-100 text-purple-800";
      case "distribution": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "assigned": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAcceptTask = (taskId: number) => {
    toast({
      title: "Task Accepted",
      description: "You have successfully accepted this volunteer task. Check your schedule for details.",
    });
  };

  const handleStartTask = (taskId: number) => {
    toast({
      title: "Task Started",
      description: "Task has been marked as in progress. Safe travels!",
    });
  };

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Volunteer Tasks</h1>
            <p className="text-muted-foreground">Find and manage volunteer opportunities in your area</p>
          </div>
          <Button className="gradient-primary text-white">
            <Navigation className="w-4 h-4 mr-2" />
            Open Maps
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
                          {stat.change} today
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
            placeholder="Search tasks by location, type, or organization..."
            className="pl-10"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Task Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="assigned">My Tasks</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <Package className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Task Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pickup">Pickup</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
            <SelectItem value="onsite_help">On-site Help</SelectItem>
            <SelectItem value="distribution">Distribution</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tasks List */}
      <div className="space-y-6">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="card-compassion">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge className={getTypeColor(task.type)}>
                        {task.type.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Navigation className="w-4 h-4 mr-1" />
                        {task.distance}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {task.estimatedTime}
                      </div>
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        {task.quantity}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {task.points} points
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{task.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Pickup Location
                      </p>
                      <p className="text-sm text-muted-foreground">{task.location.pickup}</p>
                    </div>
                    {task.location.delivery !== "Same Location" && (
                      <div>
                        <p className="font-medium text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Delivery Location
                        </p>
                        <p className="text-sm text-muted-foreground">{task.location.delivery}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Time Slot
                      </p>
                      <p className="text-sm text-muted-foreground">{task.timeSlot}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Deadline
                      </p>
                      <p className="text-sm text-muted-foreground">{task.deadline}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {task.status === "available" && (
                    <>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleAcceptTask(task.id)}
                      >
                        Accept Task
                      </Button>
                      <Button size="sm" variant="outline">
                        View Route
                      </Button>
                    </>
                  )}
                  {task.status === "assigned" && (
                    <>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleStartTask(task.id)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start Task
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </>
                  )}
                  {task.status === "completed" && (
                    <Button size="sm" variant="outline" className="flex-1" disabled>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Completed
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center py-8"
      >
        <Card className="card-impact bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Become a Volunteer Hero</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our volunteer network and make a direct impact in your community. 
              Every task completed brings us closer to Zero Hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white">
                <Users className="w-4 h-4 mr-2" />
                Join Volunteer Network
              </Button>
              <Button variant="outline">
                View Training Resources
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VolunteerTasks;