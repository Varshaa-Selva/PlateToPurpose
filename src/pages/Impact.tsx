import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Heart, 
  Clock, 
  Truck, 
  Target,
  Award,
  Calendar,
  BarChart3
} from "lucide-react";

const Impact = () => {
  const stats = [
    {
      title: "Total Meals Served",
      value: "2,547,832",
      change: "+12.5%",
      icon: Heart,
      description: "Meals provided to communities in need"
    },
    {
      title: "Food Waste Reduced",
      value: "1,243 tons",
      change: "+18.3%",
      icon: TrendingUp,
      description: "Food diverted from landfills"
    },
    {
      title: "Active Volunteers",
      value: "3,247",
      change: "+8.7%",
      icon: Users,
      description: "Volunteers making a difference"
    },
    {
      title: "Partner NGOs",
      value: "156",
      change: "+15.2%",
      icon: Target,
      description: "Organizations we work with"
    }
  ];

  const monthlyData = [
    { month: "Jan", meals: 185000, food: 95 },
    { month: "Feb", meals: 192000, food: 98 },
    { month: "Mar", meals: 210000, food: 108 },
    { month: "Apr", meals: 225000, food: 115 },
    { month: "May", meals: 240000, food: 122 },
    { month: "Jun", meals: 258000, food: 130 }
  ];

  const achievements = [
    {
      title: "Zero Hunger Champion",
      description: "Helped serve over 2.5M meals",
      icon: Award,
      date: "June 2024"
    },
    {
      title: "Sustainability Leader",
      description: "Reduced food waste by 1,200+ tons",
      icon: Target,
      date: "May 2024"
    },
    {
      title: "Community Builder",
      description: "Connected 150+ partner organizations",
      icon: Users,
      date: "April 2024"
    }
  ];

  const sdgGoals = [
    { goal: "Zero Hunger", progress: 78, color: "bg-orange-500" },
    { goal: "Responsible Consumption", progress: 85, color: "bg-blue-500" },
    { goal: "Partnerships for Goals", progress: 92, color: "bg-green-500" },
    { goal: "Climate Action", progress: 67, color: "bg-teal-500" }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Our Impact</h1>
            <p className="text-muted-foreground">Measuring our collective progress towards Zero Hunger</p>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: Today
          </Badge>
        </div>
      </motion.div>

      {/* Main Stats */}
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
                          {stat.change}
                        </Badge>
                        <span className="text-xs text-muted-foreground">vs last month</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-compassion">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Monthly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{data.month} 2024</span>
                      <span className="text-muted-foreground">{data.meals.toLocaleString()} meals</span>
                    </div>
                    <Progress value={((data.meals - 150000) / 150000) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SDG Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-compassion">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                UN SDG Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sdgGoals.map((goal, index) => (
                  <div key={goal.goal} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.goal}</span>
                      <span className="text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-primary" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={achievement.title} className="text-center p-4 border rounded-lg border-border">
                  <achievement.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <Badge variant="outline" className="text-xs">{achievement.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center py-8"
      >
        <Card className="card-impact bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Together, we can achieve Zero Hunger by 2030. Every donation, every volunteer hour, 
              and every partnership brings us closer to our goal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white">
                Start Donating
              </Button>
              <Button variant="outline">
                Become a Volunteer
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Impact;