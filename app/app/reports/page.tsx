"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function DynamicReporting() {
  const [reportType, setReportType] = useState("")
  const [selectedSections, setSelectedSections] = useState<string[]>([])

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const generateReport = () => {
    // Here you would generate the report based on reportType and selectedSections
    console.log("Generating report:", { reportType, selectedSections })
    // You could then trigger a download or display the report
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dynamic Reporting</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>Select report type and customize sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <Select onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="board">Board Report</SelectItem>
                  <SelectItem value="investor">Investor Report</SelectItem>
                  <SelectItem value="public">Public Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sections to Include</label>
              <div className="space-y-2">
                {[
                  "Executive Summary",
                  "Financial Overview",
                  "Project Details",
                  "Impact Metrics",
                  "Stakeholder Feedback",
                ].map((section) => (
                  <div key={section} className="flex items-center">
                    <Checkbox
                      id={section}
                      checked={selectedSections.includes(section)}
                      onCheckedChange={() => handleSectionToggle(section)}
                    />
                    <label htmlFor={section} className="ml-2 text-sm text-gray-700">
                      {section}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={generateReport} disabled={!reportType || selectedSections.length === 0}>
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

