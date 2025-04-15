
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Check, AlertCircle, Upload, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { parseCsvFile, validateCsvData, transformCsvToTutorials, uploadTutorialsToSupabase } from '@/utils/csvImport';

const Import = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [tutorialCount, setTutorialCount] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile && !selectedFile.name.endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }
    
    setFile(selectedFile);
    setErrors([]);
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setProgress(10);
    setErrors([]);
    
    try {
      // Parse CSV
      const csvData = await parseCsvFile(file);
      setProgress(30);
      
      // Validate data
      const validationErrors = validateCsvData(csvData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        throw new Error("Validation failed");
      }
      setProgress(50);
      
      // Transform data
      const tutorials = transformCsvToTutorials(csvData);
      setProgress(70);
      
      // Upload to Supabase
      const result = await uploadTutorialsToSupabase(tutorials);
      setProgress(100);
      
      // Success
      setTutorialCount(tutorials.length);
      setSuccess(true);
      
      toast({
        title: "Upload successful",
        description: `${tutorials.length} tutorials have been imported`,
        variant: "default"
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSearchRedirect = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Import Tutorials | OpenCrochet</title>
        <meta name="description" content="Import crochet patterns from CSV files" />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar onSearch={() => {}} />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Import Crochet Patterns</h1>
                <p className="text-muted-foreground mt-2">
                  Upload a CSV file containing crochet pattern data to import into the database.
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>CSV Import</CardTitle>
                  <CardDescription>
                    Your CSV file should include columns for: id, title, description, tags, category, 
                    difficulty, instructions, materials, and optionally image.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="csv-upload"
                      className="hidden"
                      accept=".csv"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="csv-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      {file ? (
                        <>
                          <FileText className="h-12 w-12 text-primary" />
                          <p className="mt-2 font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 font-medium">Click to upload CSV file</p>
                          <p className="text-sm text-muted-foreground">
                            or drag and drop
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-center text-muted-foreground">
                        Processing your file... {progress}%
                      </p>
                    </div>
                  )}
                  
                  {errors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Import failed</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {errors.slice(0, 5).map((error, index) => (
                            <li key={index} className="text-sm">{error}</li>
                          ))}
                          {errors.length > 5 && (
                            <li className="text-sm">...and {errors.length - 5} more errors</li>
                          )}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle>Import successful</AlertTitle>
                      <AlertDescription>
                        {tutorialCount} crochet patterns have been imported successfully.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Upload and Import'}
                  </Button>
                </CardFooter>
              </Card>
              
              {success && (
                <div className="flex justify-center">
                  <Button 
                    variant="default" 
                    onClick={handleSearchRedirect}
                    className="mt-4"
                  >
                    Browse Imported Patterns
                  </Button>
                </div>
              )}
              
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-2">CSV Format Instructions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your CSV file should have the following columns:
                </p>
                <div className="text-sm space-y-2">
                  <p><strong>id</strong> - Optional unique identifier</p>
                  <p><strong>title</strong> - Pattern title (required)</p>
                  <p><strong>description</strong> - Pattern description (required)</p>
                  <p><strong>tags</strong> - Comma-separated list of tags</p>
                  <p><strong>category</strong> - One of: Amigurumi, Apparel, Bags, Blankets, Coasters, Decor, Hats, Scarves, Toys, Other (required)</p>
                  <p><strong>difficulty</strong> - Difficulty level (will be added as a tag)</p>
                  <p><strong>instructions</strong> - Pipe (|) separated list of instruction steps (required)</p>
                  <p><strong>materials</strong> - Pipe (|) separated list of materials (required)</p>
                  <p><strong>image</strong> - Optional URL to pattern image (defaults to placeholder if not provided)</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Import;
