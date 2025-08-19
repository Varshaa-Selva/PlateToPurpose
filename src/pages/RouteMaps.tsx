import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Route, 
  Search,
  Filter,
  Truck,
  Package,
  Users,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pickupIcon = L.icon({
  iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMjJjNTVlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

const deliveryIcon = L.icon({
  iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjZWY0NDQ0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

L.Marker.prototype.options.icon = defaultIcon;

const RouteMaps = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [mapView, setMapView] = useState("overview");

  const routes = [
    {
      id: 1,
      title: "Morning Pickup Circuit - North Delhi",
      volunteer: "Rajesh Kumar",
      status: "active",
      progress: 60,
      startTime: "9:00 AM",
      estimatedEnd: "12:30 PM",
      distance: "15.2 km",
      stops: 4,
      pickups: [
        { lat: 28.7041, lng: 77.1025, name: "Green Valley Restaurant", type: "pickup", food: "Fresh vegetables", quantity: "25 kg" },
        { lat: 28.7341, lng: 77.1425, name: "Bread Palace Bakery", type: "pickup", food: "Bread & pastries", quantity: "40 loaves" }
      ],
      deliveries: [
        { lat: 28.6562, lng: 77.2410, name: "Hope Foundation", type: "delivery", food: "Mixed items", quantity: "65 kg" },
        { lat: 28.6139, lng: 77.2090, name: "Elder Care Society", type: "delivery", food: "Fresh produce", quantity: "20 kg" }
      ],
      route: [
        [28.7041, 77.1025],
        [28.7341, 77.1425],
        [28.6562, 77.2410],
        [28.6139, 77.2090]
      ]
    },
    {
      id: 2,
      title: "Emergency Relief Route - Bangalore",
      volunteer: "Priya Sharma",
      status: "completed",
      progress: 100,
      startTime: "2:00 PM",
      estimatedEnd: "4:30 PM",
      distance: "22.8 km",
      stops: 3,
      pickups: [
        { lat: 12.9716, lng: 77.5946, name: "Metro Food Corporation", type: "pickup", food: "Emergency supplies", quantity: "200 kg" }
      ],
      deliveries: [
        { lat: 12.9141, lng: 77.6229, name: "Emergency Relief Center", type: "delivery", food: "Dry rations", quantity: "150 kg" },
        { lat: 12.9298, lng: 77.6848, name: "Community Center", type: "delivery", food: "Emergency meals", quantity: "50 kg" }
      ],
      route: [
        [12.9716, 77.5946],
        [12.9141, 77.6229],
        [12.9298, 77.6848]
      ]
    },
    {
      id: 3,
      title: "Evening Distribution - Mumbai",
      volunteer: "Volunteer needed",
      status: "pending",
      progress: 0,
      startTime: "5:00 PM",
      estimatedEnd: "8:00 PM",
      distance: "18.5 km",
      stops: 5,
      pickups: [
        { lat: 19.0760, lng: 72.8777, name: "City Catering Services", type: "pickup", food: "Event surplus", quantity: "150 portions" },
        { lat: 19.1136, lng: 72.8697, name: "Hotel Grandeur", type: "pickup", food: "Buffet leftovers", quantity: "80 portions" }
      ],
      deliveries: [
        { lat: 19.0176, lng: 72.8562, name: "Street Hope Initiative", type: "delivery", food: "Hot meals", quantity: "120 portions" },
        { lat: 18.9388, lng: 72.8354, name: "Railway Station Shelter", type: "delivery", food: "Packaged meals", quantity: "70 portions" },
        { lat: 18.9067, lng: 72.8186, name: "Children's Home", type: "delivery", food: "Fresh food", quantity: "40 portions" }
      ],
      route: [
        [19.0760, 72.8777],
        [19.1136, 72.8697],
        [19.0176, 72.8562],
        [18.9388, 72.8354],
        [18.9067, 72.8186]
      ]
    }
  ];

  const stats = [
    {
      title: "Active Routes",
      value: "8",
      change: "+2",
      icon: Route,
      description: "Currently in progress"
    },
    {
      title: "Total Distance",
      value: "156 km",
      change: "+23 km",
      icon: Navigation,
      description: "Covered today"
    },
    {
      title: "Volunteers On Route",
      value: "15",
      change: "+3",
      icon: Users,
      description: "Active volunteers"
    },
    {
      title: "Efficiency Score",
      value: "94%",
      change: "+5%",
      icon: Target,
      description: "Route optimization"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return Truck;
      case "completed": return Target;
      case "pending": return Clock;
      default: return Package;
    }
  };

  const center: [number, number] = [28.6139, 77.2090]; // Delhi coordinates

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Route Maps</h1>
            <p className="text-muted-foreground">Real-time tracking and optimization of food delivery routes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Zap className="w-4 h-4 mr-2" />
              Optimize Routes
            </Button>
            <Button className="gradient-primary text-white">
              <Navigation className="w-4 h-4 mr-2" />
              Live Tracking
            </Button>
          </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="card-compassion">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Live Route Map
                </CardTitle>
                <Select value={mapView} onValueChange={setMapView}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="active">Active Routes</SelectItem>
                    <SelectItem value="completed">Completed Routes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer
                  center={center}
                  zoom={11}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {routes.map((route) => (
                    <div key={route.id}>
                      {/* Pickup markers */}
                      {route.pickups.map((pickup, index) => (
                        <Marker
                          key={`pickup-${route.id}-${index}`}
                          position={[pickup.lat, pickup.lng]}
                          icon={pickupIcon}
                        >
                          <Popup>
                            <div className="p-2">
                              <h3 className="font-semibold text-green-600">📦 Pickup Location</h3>
                              <p className="font-medium">{pickup.name}</p>
                              <p className="text-sm text-gray-600">{pickup.food}</p>
                              <p className="text-sm text-gray-600">Quantity: {pickup.quantity}</p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                      
                      {/* Delivery markers */}
                      {route.deliveries.map((delivery, index) => (
                        <Marker
                          key={`delivery-${route.id}-${index}`}
                          position={[delivery.lat, delivery.lng]}
                          icon={deliveryIcon}
                        >
                          <Popup>
                            <div className="p-2">
                              <h3 className="font-semibold text-red-600">🏠 Delivery Location</h3>
                              <p className="font-medium">{delivery.name}</p>
                              <p className="text-sm text-gray-600">{delivery.food}</p>
                              <p className="text-sm text-gray-600">Quantity: {delivery.quantity}</p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                      
                      {/* Route line */}
                      {selectedRoute === route.id && (
                        <Polyline
                          positions={route.route as [number, number][]}
                          color={route.status === 'active' ? '#3b82f6' : route.status === 'completed' ? '#10b981' : '#f59e0b'}
                          weight={4}
                          opacity={0.7}
                        />
                      )}
                    </div>
                  ))}
                </MapContainer>
              </div>
              
              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Pickup Locations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Delivery Locations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-1 bg-blue-500 mr-2"></div>
                  <span>Active Route</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Routes List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <Card className="card-compassion">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route className="w-5 h-5 mr-2 text-primary" />
                Active Routes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {routes.map((route, index) => {
                const StatusIcon = getStatusIcon(route.status);
                return (
                  <div
                    key={route.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedRoute === route.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm leading-tight">{route.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{route.volunteer}</p>
                        </div>
                        <Badge className={getStatusColor(route.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {route.status}
                        </Badge>
                      </div>
                      
                      {route.status === 'active' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{route.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                              style={{ width: `${route.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                          <span>{route.startTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Navigation className="w-3 h-3 mr-1 text-muted-foreground" />
                          <span>{route.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                          <span>{route.stops} stops</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-3 h-3 mr-1 text-muted-foreground" />
                          <span>{route.estimatedEnd}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Route Optimization */}
          <Card className="card-impact bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Route Optimization</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered routing saves 25% time and reduces emissions by 30%
                  </p>
                  <Button size="sm" className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Optimize All Routes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="card-compassion cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-6 text-center">
            <Navigation className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Plan New Route</h3>
            <p className="text-sm text-muted-foreground">Create optimized delivery routes</p>
          </CardContent>
        </Card>
        
        <Card className="card-compassion cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Assign Volunteers</h3>
            <p className="text-sm text-muted-foreground">Match volunteers to routes</p>
          </CardContent>
        </Card>
        
        <Card className="card-compassion cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">View Analytics</h3>
            <p className="text-sm text-muted-foreground">Route performance insights</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RouteMaps;