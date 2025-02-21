
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string;
  insurance_type: 'liability' | 'collision' | 'comprehensive' | null;
  insurance_amount: number | null;
}

export default function MyAccount() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, insurance_type, insurance_amount")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">My Account</h1>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View and manage your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Username</h3>
                <p className="text-muted-foreground">{profile?.username || "Not set"}</p>
              </div>
              <div>
                <h3 className="font-medium">Member Since</h3>
                <p className="text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-6 w-6" />
              Insurance Status
            </CardTitle>
            <CardDescription>Your current car insurance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile?.insurance_type ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-800 mb-2">Active Insurance</h3>
                  <p className="text-green-700 mb-2">
                    Type: {profile.insurance_type.charAt(0).toUpperCase() + profile.insurance_type.slice(1)}
                  </p>
                  {profile.insurance_amount && (
                    <p className="text-green-700 mb-4">
                      Amount: ${profile.insurance_amount.toLocaleString()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-800 mb-2">No Active Insurance</h3>
                  <p className="text-yellow-700 mb-4">You currently don't have an active car insurance policy with us.</p>
                  <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                    <Link to="/">Get a Quote Now</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
