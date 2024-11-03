<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class FileUploadController extends Controller
{
    public function index()
    {
        // Optionally, return a view or data
    }

    public function store(Request $request)
    {
        // Log all incoming request data
        Log::info('File upload request received', [
            'all' => $request->all(),
            'files' => $request->files->all(),
            'headers' => $request->headers->all()
        ]);

        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'reference_number' => 'nullable|string|max:255',
            'sender' => 'nullable|string|max:255',
            'recipient' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
            'upload_date' => 'nullable|date',
            'mailType' => 'nullable|string|in:incoming,outgoing',
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed', [
                'errors' => $validator->errors()->toArray(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
                'received_data' => [
                    'name' => $request->input('name'),
                    'has_file' => $request->hasFile('file'),
                    'category_id' => $request->input('category_id'),
                ]
            ], 422);
        }

        try {
            // Get the file
            $file = $request->file('file');
            if (!$file->isValid()) {
                throw new \Exception('Invalid file upload');
            }

            // Cloudinary upload configuration
            $cloudName = env('CLOUDINARY_CLOUD_NAME');
            $uploadPreset = env('CLOUDINARY_UPLOAD_PRESET');

            if (!$cloudName || !$uploadPreset) {
                throw new \Exception('Cloudinary configuration missing');
            }

            // Prepare the form data for Cloudinary
            $formData = [
                'file' => fopen($file->getRealPath(), 'r'),
                'upload_preset' => $uploadPreset,
                'resource_type' => 'auto', // Optional: Adjust based on your needs
            ];

            // Upload to Cloudinary
            $response = Http::asMultipart()->post("https://api.cloudinary.com/v1_1/{$cloudName}/upload", $formData);

            if ($response->failed()) {
                throw new \Exception('Cloudinary upload failed: ' . $response->body());
            }

            $cloudinaryData = $response->json();

            // Save to database
            $fileRecord = File::create([
                'name' => $request->name,
                'reference_number' => $request->reference_number,
                'sender' => $request->sender,
                'recipient' => $request->recipient,
                'category_id' => $request->category_id,
                'file_url' => $cloudinaryData['secure_url'],
                'upload_date' => $request->upload_date ?? now(),
                'mailType' => $request->mailType ?? 'incoming', // Default to 'incoming' if not provided
            ]);

            Log::info('File uploaded successfully', ['id' => $fileRecord->id]);

            return response()->json([
                'message' => 'File uploaded successfully',
                'url' => $cloudinaryData['secure_url']
            ]);

        } catch (\Exception $e) {
            Log::error('File upload failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'File upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function addCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories,name',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $category = Category::create(['name' => $request->name]);

        return response()->json(['category' => $category, 'message' => 'Category added successfully']);
    }

    public function getCategories()
    {
        $categories = Category::all();

        return response()->json(['categories' => $categories]);
    }

    public function changeFile(Request $request, $id)
    {
        // Validate the request
        $validatedData = $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
        ]);

        // Find the file
        $file = File::findOrFail($id);

        // Upload the new file to Cloudinary
        // Reuse the upload logic from your `store` method in `FileUploadController`
        try {
            // Get the file
            $newFile = $request->file('file');
            if (!$newFile->isValid()) {
                throw new \Exception('Invalid file upload');
            }

            // Cloudinary upload configuration
            $cloudName = env('CLOUDINARY_CLOUD_NAME');
            $uploadPreset = env('CLOUDINARY_UPLOAD_PRESET');

            if (!$cloudName || !$uploadPreset) {
                throw new \Exception('Cloudinary configuration missing');
            }

            // Prepare the form data for Cloudinary
            $formData = [
                'file' => fopen($newFile->getRealPath(), 'r'),
                'upload_preset' => $uploadPreset,
                'resource_type' => 'auto',
            ];

            // Upload to Cloudinary
            $response = Http::asMultipart()->post("https://api.cloudinary.com/v1_1/{$cloudName}/upload", $formData);

            if ($response->failed()) {
                throw new \Exception('Cloudinary upload failed: ' . $response->body());
            }

            $cloudinaryData = $response->json();

            // Update the file_url in the database
            $file->update([
                'file_url' => $cloudinaryData['secure_url'],
            ]);

            return response()->json([
                'message' => 'File changed successfully',
                'url' => $cloudinaryData['secure_url']
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'File change failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        // Log incoming request data
        \Log::info('Update request data:', $request->all());

        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'reference_number' => 'nullable|string|max:255',
            'sender' => 'nullable|string|max:255',
            'recipient' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'upload_date' => 'nullable|date',
            'mailType' => 'nullable|string|in:incoming,outgoing',
        ]);

        // Find the file
        $file = File::findOrFail($id);

        // Update the file
        $file->update($validatedData);

        // Return a redirect response
        return redirect()->back()->with('message', 'File updated successfully');
    }

}

