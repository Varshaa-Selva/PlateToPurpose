import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Navigation, Clock, CheckCircle, Route, User, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VolunteerTaskExtended {
  id: string;
  type: 'pickup' | 'delivery';
  donationId: string;
  volunteerId?: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: 'available' | 'assigned' | 'in-progress' | 'completed';
  scheduledTime: string;
  estimatedDuration: number;
  pickupCoords: [number, number];
  deliveryCoords: [number, number];
  distance: number;
  priority: 'low' | 'medium' | 'high';
}

const VolunteerDashboard = () => {
  const { state, dispatch } = useApp();
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [mapCenter] = useState<[number, number]>([40.7128, -74.0060]); // NYC coordinates

  const volunteerTasks: VolunteerTaskExtended[] = [
    {
      id: "vt1",
      type: "pickup",
      donationId: "d1",
      pickupLocation: "Green Market, 123 Main St",
      deliveryLocation: "Hope Kitchen, 456 Oak Ave",
      status: "available",
      scheduledTime: "2024-01-16T14:00:00Z",
      estimatedDuration: 45,
      pickupCoords: [40.7580, -73.9855],
      deliveryCoords: [40.7505, -73.9934],
      distance: 2.3,
      priority: "medium"
    },
    {
      id: "vt2",
      type: "delivery",
      donationId: "d2",
      pickupLocation: "Sunshine Bakery, 789 Pine St",
      deliveryLocation: "Community Center, 321 Elm St",
      status: "assigned",
      volunteerId: "v1",
      scheduledTime: "2024-01-16T16:00:00Z",
      estimatedDuration: 60,
      pickupCoords: [40.7614, -73.9776],
      deliveryCoords: [40.7484, -73.9857],
      distance: 3.1,
      priority: "high"
    },
    {
      id: "vt3",
      type: "pickup",
      donationId: "d3",
      pickupLocation: "Fresh Foods, 555 Cedar Ave",
      deliveryLocation: "Local Shelter, 888 Maple Dr",
      status: "in-progress",
      volunteerId: "v1",
      scheduledTime: "2024-01-16T11:00:00Z",
      estimatedDuration: 30,
      pickupCoords: [40.7749, -73.9442],
      deliveryCoords: [40.7282, -74.0776],
      distance: 4.2,
      priority: "high"
    }
  ];

  const stats = [
    { label: "Tasks Completed", value: "47", icon: CheckCircle, color: "text-success" },
    { label: "Hours Volunteered", value: "156", icon: Clock, color: "text-primary" },
    { label: "Distance Covered", value: "342 km", icon: Route, color: "text-warning" },
    { label: "Families Helped", value: "89", icon: User, color: "text-primary" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-muted text-muted-foreground';
      case 'assigned': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAcceptTask = (taskId: string) => {
    // Simulate accepting a task
    console.log('Accepting task:', taskId);
    // In real app, would dispatch action to update task status
  };

  const handleCompleteTask = (taskId: string) => {
    // Simulate completing a task
    console.log('Completing task:', taskId);
    // In real app, would dispatch action to update task status
  };

  const getRouteCoordinates = (task: VolunteerTaskExtended) => {
    return [task.pickupCoords, task.deliveryCoords];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Volunteer Dashboard</h1>
          <p className="text-muted-foreground">Coordinate pickups and deliveries to maximize impact</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger className="w-48">
              <Navigation className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Tasks</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      {/* Map and Tasks Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-compassion h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Route Map
              </CardTitle>
              <CardDescription>
                View pickup and delivery locations with optimized routes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] rounded-b-lg overflow-hidden">
                <MapContainer
                  center={mapCenter}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {volunteerTasks.map((task) => (
                    <div key={task.id}>
                      {/* Pickup Marker */}
                      <Marker position={task.pickupCoords}>
                        <Popup>
                          <div className="p-2">
                            <h4 className="font-medium">Pickup Location</h4>
                            <p className="text-sm">{task.pickupLocation}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(task.scheduledTime).toLocaleTimeString()}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                      
                      {/* Delivery Marker */}
                      <Marker position={task.deliveryCoords}>
                        <Popup>
                          <div className="p-2">
                            <h4 className="font-medium">Delivery Location</h4>
                            <p className="text-sm">{task.deliveryLocation}</p>
                            <p className="text-xs text-muted-foreground">
                              Est. {task.estimatedDuration} min delivery
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                      
                      {/* Route Line */}
                      <Polyline
                        positions={getRouteCoordinates(task)}
                        pathOptions={{
                          color: task.status === 'in-progress' ? '#10b981' : 
                                 task.status === 'assigned' ? '#f59e0b' : '#6b7280',
                          weight: 3,
                          opacity: 0.7
                        }}
                      />
                    </div>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-compassion h-[500px]">
            <CardHeader>
              <CardTitle>Available Tasks</CardTitle>
              <CardDescription>
                Accept tasks and track your volunteer activities
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] overflow-y-auto p-6 pt-0">
                <div className="space-y-4">
                  {volunteerTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-border rounded-lg p-4 transition-smooth hover:shadow-card"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority} priority
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {task.distance} km
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2">
                          <Navigation className="w-4 h-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Pickup</p>
                            <p className="text-sm text-muted-foreground">{task.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Delivery</p>
                            <p className="text-sm text-muted-foreground">{task.deliveryLocation}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(task.scheduledTime).toLocaleString()}
                        </span>
                        <span>{task.estimatedDuration} min</span>
                      </div>

                      <div className="flex gap-2">
                        {task.status === 'available' && (
                          <Button
                            size="sm"
                            onClick={() => handleAcceptTask(task.id)}
                            className="flex-1"
                          >
                            Accept Task
                          </Button>
                        )}
                        {task.status === 'assigned' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            Start Route
                          </Button>
                        )}
                        {task.status === 'in-progress' && (
                          <Button
                            size="sm"
                            onClick={() => handleCompleteTask(task.id)}
                            className="flex-1 bg-success text-success-foreground"
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your volunteer schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {volunteerTasks
                .filter(task => task.status === 'assigned' || task.status === 'in-progress')
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div>
                        <p className="font-medium">{task.type === 'pickup' ? 'Pick up' : 'Deliver'} food</p>
                        <p className="text-sm text-muted-foreground">
                          {task.type === 'pickup' ? task.pickupLocation : task.deliveryLocation}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{new Date(task.scheduledTime).toLocaleTimeString()}</p>
                      <p className="text-sm text-muted-foreground">{task.estimatedDuration} min</p>
                    </div>
                  </div>
                ))}
              
              {volunteerTasks.filter(task => task.status === 'assigned' || task.status === 'in-progress').length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No scheduled tasks for today</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Available Tasks
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VolunteerDashboard;