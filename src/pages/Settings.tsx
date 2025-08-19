import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Globe, Palette, Save, Camera, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
    phone: "",
    organization: state.user?.organization || "",
    bio: "",
    location: ""
  });

  const [notifications, setNotifications] = useState({
    emailMatches: true,
    emailUpdates: true,
    emailNewsletter: false,
    pushMatches: true,
    pushUpdates: false,
    smsUrgent: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showLocation: true,
    showStats: true,
    dataSharing: false
  });

  const handleProfileSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (state.user) {
        dispatch({
          type: 'SET_USER',
          payload: {
            ...state.user,
            name: profile.name,
            email: profile.email,
            organization: profile.organization
          }
        });
      }
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully."
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleNotificationSave = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been saved."
    });
  };

  const handlePrivacySave = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and organization details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <Separator />

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={profile.organization}
                  onChange={(e) => setProfile(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="Your organization"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself and your mission..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
              />
            </div>

            <Button 
              onClick={handleProfileSave} 
              disabled={isLoading}
              className="gradient-primary text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified about matches and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Notifications */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Notifications
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Match Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified when your donations are matched</p>
                  </div>
                  <Switch
                    checked={notifications.emailMatches}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailMatches: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status Updates</p>
                    <p className="text-sm text-muted-foreground">Updates on pickup and delivery status</p>
                  </div>
                  <Switch
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailUpdates: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Weekly impact reports and platform updates</p>
                  </div>
                  <Switch
                    checked={notifications.emailNewsletter}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailNewsletter: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Push Notifications */}
            <div>
              <h4 className="font-medium mb-3">Push Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Urgent Matches</p>
                    <p className="text-sm text-muted-foreground">Immediate notifications for urgent food requests</p>
                  </div>
                  <Switch
                    checked={notifications.pushMatches}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, pushMatches: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">General Updates</p>
                    <p className="text-sm text-muted-foreground">Non-urgent platform notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, pushUpdates: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* SMS Notifications */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                SMS Notifications
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Urgent Only</p>
                  <p className="text-sm text-muted-foreground">Critical notifications via SMS</p>
                </div>
                <Switch
                  checked={notifications.smsUrgent}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, smsUrgent: checked }))
                  }
                />
              </div>
            </div>

            <Button onClick={handleNotificationSave} variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Control your privacy settings and data sharing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                </div>
                <Switch
                  checked={privacy.profileVisible}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, profileVisible: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Location</p>
                  <p className="text-sm text-muted-foreground">Display your general location for better matching</p>
                </div>
                <Switch
                  checked={privacy.showLocation}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, showLocation: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Impact Statistics</p>
                  <p className="text-sm text-muted-foreground">Include your contributions in public impact reports</p>
                </div>
                <Switch
                  checked={privacy.showStats}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, showStats: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Sharing</p>
                  <p className="text-sm text-muted-foreground">Share anonymized data for research purposes</p>
                </div>
                <Switch
                  checked={privacy.dataSharing}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Account Management</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline">Download My Data</Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>

            <Button onClick={handlePrivacySave} variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Save Privacy Settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="card-compassion">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Type</p>
                <p className="text-sm text-muted-foreground capitalize">{state.user?.role} Account</p>
              </div>
              <Badge className="bg-success text-success-foreground">Verified</Badge>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">Member Since</p>
                <p className="text-muted-foreground">{state.user?.joinDate}</p>
              </div>
              <div>
                <p className="font-medium">Total Donations</p>
                <p className="text-muted-foreground">{state.donations.length}</p>
              </div>
              <div>
                <p className="font-medium">Impact Score</p>
                <p className="text-muted-foreground">92% (Excellent)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;