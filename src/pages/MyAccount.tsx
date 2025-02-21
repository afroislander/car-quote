
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyAccount() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Account</h1>
      
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
                <p className="text-muted-foreground">user@example.com</p>
              </div>
              <div>
                <h3 className="font-medium">Member Since</h3>
                <p className="text-muted-foreground">January 2024</p>
              </div>
              <div>
                <h3 className="font-medium">Account Status</h3>
                <p className="text-muted-foreground">Active</p>
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
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">No Active Insurance</h3>
                <p className="text-yellow-700 mb-4">You currently don't have an active car insurance policy with us.</p>
                <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  <Link to="/">Get a Quote Now</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
