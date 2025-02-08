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
import { Checkbox } from "@/components/ui/checkbox"
import { PDFDocument } from "pdf-lib";
import { ArrowLeft } from "lucide-react"
import * as pdfjsLib from "pdfjs-dist";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";




// async function configurePdfWorker() {
//   const pdfJsVersion = (await import("pdfjs-dist/package.json")).version;
//   GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJsVersion}/pdf.worker.min.js`;
// }

// configurePdfWorker(); // Call function to set up worke

// GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();
// GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"; // Will be served locally

// GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.10.377/build/pdf.worker.min.js";




const formSchema = z.object({
  project_name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  budget: z.string().refine((val) => !Number.isNaN(Number.parseInt(val, 10)), {
    message: "Please enter a valid number for the budget.",
  }),
  targeted_outcome: z.string().min(10, {
    message: "Targeted outcome must be at least 10 characters.",
  }),
  beneficiaries: z.string().refine((val) => !Number.isNaN(Number.parseInt(val, 10)), {
    message: "Please enter a valid number for beneficiaries.",
  }),
  important_fields: z.string().refine(
    (val) => {
      if (val === "") return true // Allow empty string
      const fields = val.split(",")
      return fields.every((field) => field.includes(":"))
    },
    {
      message: "Important fields must be in the format 'field1:value1,field2:value2'",
    },
  ),
  start_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid start date.",
  }),
  end_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid end date.",
  }),
})

type FormValues = z.infer<typeof formSchema>

// async function parsePDF(file: File): Promise<string> {
//   const reader = new FileReader();
//   return new Promise((resolve, reject) => {
//     reader.onload = async () => {
//       try {
//         const pdfDoc = await PDFDocument.load(reader.result as ArrayBuffer);
//         const textContent = await pdfDoc.extractText();
//         resolve(textContent.join("\n"));
//       } catch (error) {
//         reject(error);
//       }
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsArrayBuffer(file);
//   });
// }

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: "",
      description: "",
      budget: "",
      targeted_outcome: "",
      beneficiaries: "",
      important_fields: "",
      start_date: "",
      end_date: "",
    },
  })
    interface CheckedItems {
      ISO26000: boolean;
      GRI: boolean;
      SASB: boolean;
      TCFD: boolean;
      SDG: boolean;
    }

    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
      ISO26000: false,
      GRI: false,
      SASB: false,
      TCFD: false,
      SDG: false,
    });

    const toggleCheckbox = (key: keyof CheckedItems) => {
      setCheckedItems((prev: CheckedItems) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };
  // async function parsePDF(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = async () => {
  //       try {
  //         const pdfData = new Uint8Array(reader.result as ArrayBuffer);
  //         const pdf = await getDocument({ data: pdfData }).promise;
  //         let content = "";
  
  //         for (let i = 1; i <= pdf.numPages; i++) {
  //           const page = await pdf.getPage(i);
  //           const textContent = await page.getTextContent();
  //           const pageText = textContent.items.map((item: any) => item.str).join(" ");
  //           content += pageText + "\n";
  //         }
  
  //         if (!content.trim()) throw new Error("PDF content is empty");
  //         resolve(content);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsArrayBuffer(file);
  //   });
  // }
  async function onSubmit(values: FormValues) {
    try {
      const formattedValues = {
        ...values,
        budget: parseInt(values.budget, 10),
        beneficiaries: parseInt(values.beneficiaries, 10),
        start_date: new Date(values.start_date).toISOString(),
        end_date: new Date(values.end_date).toISOString(),
      };
  
      // ✅ Create project first
      const projectRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedValues),
      });
  
      const projectData = await projectRes.json();
      if (!projectRes.ok) throw new Error(projectData.error || "Failed to create project");
  
      console.log("📂 Project Created:", projectData.project?.id);
  
      // ✅ Handle file upload if a file is selected
      if (files.length > 0 && files[0] instanceof File) {
        const file = files[0];
        const formData = new FormData();
        formData.append("FILE", file); // ✅ Correct key based on `api/parsepdf`
  
        if (file.type === "text/plain") {
          // ✅ Handle plain text files
          const textContent = await file.text();
          console.log("📄 Text Content:", textContent);
  
          const docRes = await fetch("/api/documents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              project_id: projectData.project?.id || "MISSING_PROJECT_ID",
              content: textContent.replace(/\x00/g, "").trim(),
            }),
          });
  
          if (!docRes.ok) throw new Error("Failed to save text document");
        } else if (file.type === "application/pdf") {
          // ✅ Use `/api/parsepdf` to process the PDF
          const pdfRes = await fetch("/api/parsepdf", {
            method: "POST",
            body: formData,
          });
  
          if (!pdfRes.ok) {
            const errorText = await pdfRes.text();
            throw new Error(`Failed to parse PDF: ${errorText}`);
          }
  
          const parsedText = await pdfRes.text(); // ✅ Expecting plain text response
          console.log("📄 Parsed PDF Text:", parsedText);
  
          if (!parsedText.trim()) {
            throw new Error("Parsed PDF content is empty!");
          }
  
          // ✅ Save parsed text to documents
          const docRes = await fetch("/api/documents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              project_id: projectData.project?.id || "MISSING_PROJECT_ID",
              content: parsedText.replace(/\x00/g, "").trim(),
            }),
          });
  
          if (!docRes.ok) throw new Error("Failed to save parsed document");
        } else {
          toast({
            title: "Error",
            description: "Unsupported file type",
            variant: "destructive",
          });
          return;
        }
      }
  
      toast({
        title: "Success",
        description: "Project created successfully.",
      });
  
      router.push("/projects");
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) errorMessage = error.message;
      console.error(error);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    }
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
                name="project_name"
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
                name="targeted_outcome"
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
                name="important_fields"
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
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Select the project's start date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Select the project's end date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
      <FormLabel>Compliance & Standards</FormLabel>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={checkedItems.ISO26000} 
            onClick={() => toggleCheckbox("ISO26000")} 
          />
          <FormLabel>ISO 26000</FormLabel>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={checkedItems.GRI} 
            onClick={() => toggleCheckbox("GRI")} 
          />
          <FormLabel>GRI</FormLabel>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={checkedItems.SASB} 
            onClick={() => toggleCheckbox("SASB")} 
          />
          <FormLabel>SASB</FormLabel>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={checkedItems.TCFD} 
            onClick={() => toggleCheckbox("TCFD")} 
          />
          <FormLabel>TCFD</FormLabel>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={checkedItems.SDG} 
            onClick={() => toggleCheckbox("SDG")} 
          />
          <FormLabel>SDG</FormLabel>
        </div>
      </div>
    </div>
              <FormField
                name="files"
                render={() => (
                  <FormItem>
                    <FormLabel>Project Files</FormLabel>
                    <FormControl>
                      <FileUploader files={files} setFiles={setFiles} />
                    </FormControl>
                    <FormDescription>Upload the CSR project document. PDFs and Text files are accepted.</FormDescription>
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