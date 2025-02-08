"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploader } from "@/components/FileUploader"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  budget: z.string().refine((val) => !Number.isNaN(Number.parseInt(val, 10)), {
    message: "Please enter a valid number for the budget.",
  }),
  targetedOutcome: z.string().min(10, {
    message: "Targeted outcome must be at least 10 characters.",
  }),
  beneficiaries: z.string().refine((val) => !Number.isNaN(Number.parseInt(val, 10)), {
    message: "Please enter a valid number for beneficiaries.",
  }),
  importantFields: z.string().refine(
    (val) => {
      if (val === "") return true // Allow empty string
      const fields = val.split(",")
      return fields.every((field) => field.includes(":"))
    },
    {
      message: "Important fields must be in the format 'field1:value1,field2:value2'",
    },
  ),
})

type FormValues = z.infer<typeof formSchema>

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      budget: "",
      targetedOutcome: "",
      beneficiaries: "",
      importantFields: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values, files)
    toast({
      title: "Project created successfully",
      description: "Your new project has been added to the dashboard.",
    })
    router.push("/projects")
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>Enter the details for your new CSR project</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormDescription>This is the name of your CSR project.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your CSR project" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Provide a brief description of your CSR project.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter project budget" {...field} />
                    </FormControl>
                    <FormDescription>Enter the allocated budget for this project.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetedOutcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Targeted Outcome</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the targeted outcome" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>What is the expected outcome of this CSR project?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="beneficiaries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Beneficiaries</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter number of beneficiaries" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the estimated number of people who will benefit from this project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="importantFields"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Important Fields</FormLabel>
                    <FormControl>
                      <Input placeholder="field1:value1,field2:value2" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter important fields in the format 'field1:value1,field2:value2'
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="files"
                render={() => (
                  <FormItem>
                    <FormLabel>Project Files</FormLabel>
                    <FormControl>
                      <FileUploader files={files} setFiles={setFiles} />
                    </FormControl>
                    <FormDescription>Upload any relevant project files.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.push("/projects")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                </Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

