import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, MapPin, TrendingUp, Shield, Clock, ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-food-donation.jpg";

const Landing = () => {
  const impactStats = [
    { label: "Meals Served", value: "2.5M+", icon: Heart },
    { label: "NGO Partners", value: "150+", icon: Users },
    { label: "Cities Reached", value: "50+", icon: MapPin },
    { label: "Food Saved (tons)", value: "1,200+", icon: TrendingUp },
  ];

  const features = [
    {
      icon: Shield,
      title: "Safe & Verified",
      description: "All donors and NGOs are verified for security and food safety compliance."
    },
    {
      icon: Clock,
      title: "Real-time Matching",
      description: "AI-powered matching system connects surplus food with those in need instantly."
    },
    {
      icon: MapPin,
      title: "Smart Routing",
      description: "Optimized delivery routes for volunteers to maximize efficiency and impact."
    },
    {
      icon: TrendingUp,
      title: "Impact Tracking",
      description: "Transparent analytics showing your contribution to reducing hunger and waste."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Community food donation and distribution" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/80 to-secondary/10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gradient">Plate</span>
                <span className="text-foreground">To</span>
                <span className="text-gradient">Purpose</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-secondary mb-4">
                Code for Compassion
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                Transforming food surplus into hope. Our platform connects donors, NGOs, and volunteers 
                to fight hunger while reducing waste through technology, transparency, and community action.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="gradient-primary text-white shadow-floating" asChild>
                <Link to="/auth?mode=donor">
                  <Plus className="w-5 h-5 mr-2" />
                  Donate Food
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <Link to="/auth?mode=ngo">
                  <Minus className="w-5 h-5 mr-2" />
                  Request Food
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 w-20 h-20 gradient-primary rounded-full blur-xl opacity-20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-32 right-16 w-32 h-32 gradient-secondary rounded-full blur-xl opacity-20"
        />
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Our Impact Together
            </h2>
            <p className="text-lg text-muted-foreground">
              Every donation and every connection makes a difference in the fight against hunger.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-impact text-center transition-smooth hover:scale-105">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Make a <span className="text-gradient">Difference</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform leverages technology to create efficient, transparent, and impactful 
              connections between food donors and communities in need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-compassion h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of donors, NGOs, and volunteers working together for Zero Hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary" asChild>
                <Link to="/auth">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;