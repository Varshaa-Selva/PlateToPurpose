import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Package, Clock, CheckCircle, MapPin, Calendar, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const DonorDashboard = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expiryDate: '',
    pickupLocation: '',
    description: '',
  });

  const stats = [
    { label: "Total Donations", value: "24", icon: Package, color: "text-primary" },
    { label: "Meals Served", value: "156", icon: Utensils, color: "text-success" },
    { label: "Active Listings", value: "3", icon: Clock, color: "text-warning" },
    { label: "Impact Score", value: "92%", icon: CheckCircle, color: "text-primary" },
  ];

  const recentDonations = [
    {
      id: 1,
      foodType: "Fresh Vegetables",
      quantity: "15 kg",
      status: "delivered",
      ngo: "Hope Kitchen",
      date: "2 days ago",
    },
    {
      id: 2,
      foodType: "Bread & Pastries",
      quantity: "30 units",
      status: "picked-up",
      ngo: "Community Center",
      date: "1 week ago",
    },
    {
      id: 3,
      foodType: "Dairy Products",
      quantity: "8 kg",
      status: "pending",
      ngo: "Local Shelter",
      date: "3 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success text-success-foreground';
      case 'picked-up': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Donation submitted:', formData);
    setShowDonationForm(false);
    setFormData({
      foodType: '',
      quantity: '',
      expiryDate: '',
      pickupLocation: '',
      description: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Donor Dashboard</h1>
          <p className="text-muted-foreground">Manage your food donations and track your impact</p>
        </div>
        <Button 
          onClick={() => setShowDonationForm(true)}
          className="gradient-primary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Donation
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

      {/* Donation Form Modal */}
      {showDonationForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background rounded-lg shadow-floating w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Donation</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="foodType">Food Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                      <SelectItem value="fruits">Fresh Fruits</SelectItem>
                      <SelectItem value="bread">Bread & Bakery</SelectItem>
                      <SelectItem value="dairy">Dairy Products</SelectItem>
                      <SelectItem value="prepared">Prepared Meals</SelectItem>
                      <SelectItem value="canned">Canned Goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="e.g., 10 kg, 20 units"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    name="pickupLocation"
                    placeholder="Full address"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Notes</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Any special instructions or details..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDonationForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gradient-primary text-white"
                  >
                    Submit Donation
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Recent Donations */}
      <Card className="card-compassion">
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>
            Track the status of your food donations and their impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <motion.div
                key={donation.id}
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
                    <h3 className="font-medium">{donation.foodType}</h3>
                    <p className="text-sm text-muted-foreground">
                      {donation.quantity} • {donation.ngo}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {donation.date}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(donation.status)}>
                  {donation.status.replace('-', ' ')}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-success" />
              Impact This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Meals Provided</span>
                <span className="font-semibold">48</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">CO₂ Saved</span>
                <span className="font-semibold">125 kg</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Families Helped</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-compassion">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Active Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Fresh Vegetables</span>
                  <Badge variant="outline" className="text-warning border-warning/50">
                    Expires in 2 days
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Awaiting pickup • 15 kg
                </p>
              </div>
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dairy Products</span>
                  <Badge variant="outline" className="text-primary border-primary/50">
                    Matched
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Hope Kitchen • 8 kg
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;