import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Users, 
  Heart, 
  Award, 
  Search,
  Filter,
  Building,
  Phone,
  Mail,
  Globe,
  Star,
  Calendar,
  TrendingUp
} from "lucide-react";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "Hope Foundation",
      type: "NGO",
      location: "Delhi, India",
      established: "2015",
      beneficiaries: "50,000+",
      mealsServed: "125,000",
      rating: 4.9,
      status: "active",
      description: "Dedicated to fighting hunger in urban communities through food distribution and education programs.",
      contact: {
        phone: "+91 98765 43210",
        email: "contact@hopefoundation.org",
        website: "www.hopefoundation.org"
      },
      specialties: ["Food Distribution", "Child Nutrition", "Emergency Relief"]
    },
    {
      id: 2,
      name: "Feeding Bangalore",
      type: "NGO",
      location: "Bangalore, India",
      established: "2018",
      beneficiaries: "75,000+",
      mealsServed: "200,000",
      rating: 4.8,
      status: "active",
      description: "Technology-driven initiative focused on reducing food waste and hunger in Bangalore.",
      contact: {
        phone: "+91 87654 32109",
        email: "hello@feedingbangalore.org",
        website: "www.feedingbangalore.org"
      },
      specialties: ["Tech Solutions", "Urban Outreach", "Volunteer Programs"]
    },
    {
      id: 3,
      name: "Akshaya Patra Foundation",
      type: "NGO",
      location: "Multiple Cities",
      established: "2000",
      beneficiaries: "1,800,000+",
      mealsServed: "3,000,000",
      rating: 4.9,
      status: "active",
      description: "World's largest NGO-run mid-day meal program serving school children across India.",
      contact: {
        phone: "+91 98765 43211",
        email: "info@akshayapatra.org",
        website: "www.akshayapatra.org"
      },
      specialties: ["School Meals", "Large Scale Operations", "Infrastructure"]
    },
    {
      id: 4,
      name: "Green Valley Restaurant",
      type: "Restaurant Partner",
      location: "Mumbai, India",
      established: "2012",
      beneficiaries: "N/A",
      mealsServed: "45,000",
      rating: 4.7,
      status: "active",
      description: "Premium restaurant chain committed to zero food waste through regular donations.",
      contact: {
        phone: "+91 76543 21098",
        email: "sustainability@greenvalley.com",
        website: "www.greenvalley.com"
      },
      specialties: ["Surplus Food", "Quality Meals", "Regular Donations"]
    },
    {
      id: 5,
      name: "Metro Food Corporation",
      type: "Corporate Partner",
      location: "Chennai, India",
      established: "2005",
      beneficiaries: "N/A",
      mealsServed: "80,000",
      rating: 4.6,
      status: "active",
      description: "Leading food processing company with CSR initiatives focused on hunger relief.",
      contact: {
        phone: "+91 65432 10987",
        email: "csr@metrofood.in",
        website: "www.metrofood.in"
      },
      specialties: ["Bulk Donations", "Food Processing", "CSR Programs"]
    },
    {
      id: 6,
      name: "Community Kitchen Network",
      type: "Community Group",
      location: "Pune, India",
      established: "2020",
      beneficiaries: "25,000+",
      mealsServed: "60,000",
      rating: 4.5,
      status: "active",
      description: "Grassroots community initiative running kitchens in low-income neighborhoods.",
      contact: {
        phone: "+91 54321 09876",
        email: "network@communitykitchen.org",
        website: "www.communitykitchen.org"
      },
      specialties: ["Community Kitchens", "Local Impact", "Volunteer Training"]
    }
  ];

  const partnerStats = [
    {
      title: "Total Partners",
      value: "156",
      change: "+12",
      icon: Building,
      description: "Active partner organizations"
    },
    {
      title: "NGO Partners",
      value: "89",
      change: "+8",
      icon: Heart,
      description: "Non-profit organizations"
    },
    {
      title: "Corporate Partners",
      value: "45",
      change: "+3",
      icon: TrendingUp,
      description: "Business partnerships"
    },
    {
      title: "Community Groups",
      value: "22",
      change: "+1",
      icon: Users,
      description: "Local community initiatives"
    }
  ];

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case "NGO": return "bg-blue-100 text-blue-800";
      case "Restaurant Partner": return "bg-green-100 text-green-800";
      case "Corporate Partner": return "bg-purple-100 text-purple-800";
      case "Community Group": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
            <h1 className="text-3xl font-bold text-gradient">Our Partners</h1>
            <p className="text-muted-foreground">Building a network of change-makers working towards Zero Hunger</p>
          </div>
          <Button className="gradient-primary text-white">
            <Building className="w-4 h-4 mr-2" />
            Become a Partner
          </Button>
        </div>
      </motion.div>

      {/* Partner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partnerStats.map((stat, index) => (
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
                          +{stat.change} this month
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
            placeholder="Search partners by name, location, or specialty..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Partner Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Partners</SelectItem>
            <SelectItem value="ngo">NGOs</SelectItem>
            <SelectItem value="restaurant">Restaurants</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
            <SelectItem value="community">Community Groups</SelectItem>
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

      {/* Partners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="card-compassion h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <Badge className={getPartnerTypeColor(partner.type)}>
                        {partner.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {partner.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Est. {partner.established}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {partner.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{partner.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {partner.beneficiaries !== "N/A" && (
                    <div>
                      <p className="font-medium">Beneficiaries</p>
                      <p className="text-muted-foreground">{partner.beneficiaries}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">Meals Served</p>
                    <p className="text-muted-foreground">{partner.mealsServed}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">Contact Information</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2" />
                      {partner.contact.phone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-2" />
                      {partner.contact.email}
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-3 h-3 mr-2" />
                      {partner.contact.website}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Partnership CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center py-8"
      >
        <Card className="card-impact bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Join Our Partner Network</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Are you an organization looking to make a difference in the fight against hunger? 
              Join our growing network of partners and amplify your impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white">
                <Building className="w-4 h-4 mr-2" />
                Apply for Partnership
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Partners;