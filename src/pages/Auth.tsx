import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart, User, Building, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UserRole = 'donor' | 'ngo' | 'volunteer';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('donor');
  const [isLoading, setIsLoading] = useState(false);
  
  const mode = searchParams.get('mode') || 'signin';
  const initialRole = searchParams.get('role') as UserRole || 'donor';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: '',
  });

  const roles = [
    {
      value: 'donor',
      label: 'Food Donor',
      description: 'Restaurants, grocery stores, or individuals with surplus food',
      icon: Heart,
    },
    {
      value: 'ngo',
      label: 'NGO/Organization',
      description: 'Non-profits, shelters, and community organizations',
      icon: Building,
    },
    {
      value: 'volunteer',
      label: 'Volunteer',
      description: 'Help with pickup, delivery, and coordination',
      icon: HandHeart,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to appropriate dashboard
      navigate(`/${selectedRole}-dashboard`);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="card-compassion">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">PlateToPurpose</span>
            </div>
            <CardTitle className="text-2xl">
              {mode === 'signup' ? 'Join Our Mission' : 'Welcome Back'}
            </CardTitle>
            <CardDescription>
              {mode === 'signup' 
                ? 'Create your account and start making an impact'
                : 'Sign in to continue your compassionate journey'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={mode} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="signin"
                  onClick={() => navigate('/auth?mode=signin')}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  onClick={() => navigate('/auth?mode=signup')}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a...</Label>
                    <RadioGroup
                      value={selectedRole}
                      onValueChange={(value) => setSelectedRole(value as UserRole)}
                      className="space-y-3"
                    >
                      {roles.map((role) => (
                        <div key={role.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                          <RadioGroupItem value={role.value} id={role.value} />
                          <div className="flex items-center space-x-3 flex-1">
                            <role.icon className="w-5 h-5 text-primary" />
                            <div>
                              <Label htmlFor={role.value} className="font-medium cursor-pointer">
                                {role.label}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {role.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {selectedRole === 'ngo' ? 'Organization Name' : 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={selectedRole === 'ngo' ? 'Your Organization' : 'Your Name'}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;