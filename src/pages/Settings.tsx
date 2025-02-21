
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toast({
      title: "Theme Updated",
      description: `Theme switched to ${newTheme} mode`,
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast({
      title: "Language Updated",
      description: `Language switched to ${
        newLanguage === "en" ? "English" : 
        newLanguage === "es" ? "Spanish" : 
        newLanguage === "fr" ? "French" : "German"
      }`,
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Sent",
      description: "Thank you for your feedback!",
    });
    setFeedback("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 gradient-text">Settings</h1>
      
      <div className="grid gap-6">
        {/* Theme Settings */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Manage your theme preferences</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="w-24"
              onClick={() => handleThemeChange("light")}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="w-24"
              onClick={() => handleThemeChange("dark")}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Language</CardTitle>
            <CardDescription>Choose your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>Help us improve by sharing your thoughts</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you think..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Send Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
