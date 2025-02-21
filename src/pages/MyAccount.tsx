
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      </div>
    </div>
  );
}
