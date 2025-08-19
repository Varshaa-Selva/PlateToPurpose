import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  AlertCircle,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FoodRequests = () => {
  const { toast } = useToast();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    quantity: "",
    urgency: "",
    location: "",
    contact: "",
    organizationType: ""
  });

  const requests = [
    {
      id: 1,
      title: "Emergency Food Relief for Flood Victims",
      organization: "Hope Foundation",
      location: "North Delhi",
      urgency: "urgent",
      quantity: "500 meals",
      description: "Immediate food assistance needed for families affected by recent flooding. We require ready-to-eat meals and dry rations.",
      timePosted: "2 hours ago",
      deadline: "Today, 6:00 PM",
      contact: {
        phone: "+91 98765 43210",
        email: "emergency@hopefoundation.org"
      },
      status: "open",
      responses: 3
    },
    {
      id: 2,
      title: "Weekly Meal Distribution for Senior Citizens",
      organization: "Elder Care Society",
      location: "Bangalore Central",
      urgency: "medium",
      quantity: "200 meals",
      description: "Regular weekly meal distribution for elderly residents in our care facility. Looking for nutritious, easy-to-digest meals.",
      timePosted: "5 hours ago",
      deadline: "Tomorrow, 12:00 PM",
      contact: {
        phone: "+91 87654 32109",
        email: "meals@eldercare.org"
      },
      status: "open",
      responses: 7
    },
    {
      id: 3,
      title: "Children's Nutritional Program",
      organization: "Bright Future NGO",
      location: "Mumbai Suburbs",
      urgency: "low",
      quantity: "300 meals",
      description: "Daily nutritional support for underprivileged children aged 5-12. Seeking wholesome meals with balanced nutrition.",
      timePosted: "1 day ago",
      deadline: "Next Week",
      contact: {
        phone: "+91 76543 21098",
        email: "nutrition@brightfuture.org"
      },
      status: "in_progress",
      responses: 12
    },
    {
      id: 4,
      title: "Homeless Shelter Evening Meals",
      organization: "Street Hope Initiative",
      location: "Chennai Downtown",
      urgency: "medium",
      quantity: "150 meals",
      description: "Daily evening meal service for homeless individuals. Simple, filling meals that can be served hot.",
      timePosted: "6 hours ago",
      deadline: "Tonight, 8:00 PM",
      contact: {
        phone: "+91 65432 10987",
        email: "shelter@streethope.org"
      },
      status: "open",
      responses: 5
    },
    {
      id: 5,
      title: "Community Kitchen Expansion",
      organization: "Feed the Need",
      location: "Pune East",
      urgency: "low",
      quantity: "1000 meals",
      description: "Expanding our community kitchen operations to serve more families. Looking for bulk food donations and prepared meals.",
      timePosted: "3 days ago",
      deadline: "End of Week",
      contact: {
        phone: "+91 54321 09876",
        email: "operations@feedtheneed.org"
      },
      status: "fulfilled",
      responses: 8
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "fulfilled": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return AlertCircle;
      case "in_progress": return Clock;
      case "fulfilled": return CheckCircle;
      default: return AlertCircle;
    }
  };

  const handleSubmitRequest = () => {
    toast({
      title: "Request Submitted",
      description: "Your food request has been posted and will be visible to donors.",
    });
    setShowRequestForm(false);
    setNewRequest({
      title: "",
      description: "",
      quantity: "",
      urgency: "",
      location: "",
      contact: "",
      organizationType: ""
    });
  };

  const handleRespond = (requestId: number) => {
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the requesting organization.",
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Food Requests</h1>
            <p className="text-muted-foreground">Browse and respond to food requests from organizations in need</p>
          </div>
          <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white">
                <Plus className="w-4 h-4 mr-2" />
                Post Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit a Food Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Request Title</label>
                    <Input
                      placeholder="e.g., Emergency meals for 100 families"
                      value={newRequest.title}
                      onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Organization Type</label>
                    <Select 
                      value={newRequest.organizationType} 
                      onValueChange={(value) => setNewRequest({...newRequest, organizationType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="shelter">Shelter</SelectItem>
                        <SelectItem value="community">Community Kitchen</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity Needed</label>
                    <Input
                      placeholder="e.g., 200 meals, 50kg rice"
                      value={newRequest.quantity}
                      onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Urgency Level</label>
                    <Select 
                      value={newRequest.urgency} 
                      onValueChange={(value) => setNewRequest({...newRequest, urgency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (Same Day)</SelectItem>
                        <SelectItem value="medium">Medium (1-3 Days)</SelectItem>
                        <SelectItem value="low">Low (1+ Week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      placeholder="Area, City"
                      value={newRequest.location}
                      onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Information</label>
                    <Input
                      placeholder="Phone or email"
                      value={newRequest.contact}
                      onChange={(e) => setNewRequest({...newRequest, contact: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Provide details about your food requirements, specific needs, and any other relevant information..."
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSubmitRequest} className="flex-1">Submit Request</Button>
                  <Button variant="outline" onClick={() => setShowRequestForm(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search requests by organization, location, or food type..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <MapPin className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Requests List */}
      <div className="space-y-6">
        {requests.map((request, index) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="card-compassion">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {request.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {request.organization}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {request.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {request.quantity}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {request.timePosted}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{request.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Deadline
                      </p>
                      <p className="text-muted-foreground">{request.deadline}</p>
                    </div>
                    <div>
                      <p className="font-medium">Responses</p>
                      <p className="text-muted-foreground">{request.responses} donors interested</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-sm">Contact Information</p>
                    <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {request.contact.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {request.contact.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleRespond(request.id)}
                      disabled={request.status === "fulfilled"}
                    >
                      {request.status === "fulfilled" ? "Fulfilled" : "Offer Help"}
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
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
            <h2 className="text-2xl font-bold mb-4">Make a Difference Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every meal donation matters. Browse through active requests and help organizations 
              in your community serve those in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white">
                Browse All Requests
              </Button>
              <Button variant="outline">
                Become a Regular Donor
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FoodRequests;