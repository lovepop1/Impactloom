import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StakeholdersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Stakeholders</h1>
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-primary">Stakeholder Management</CardTitle>
          <CardDescription>Manage and engage with your project stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This page will contain tools for managing stakeholders across all projects.</p>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Add New Stakeholder</Button>
        </CardContent>
      </Card>
    </div>
  )
}

