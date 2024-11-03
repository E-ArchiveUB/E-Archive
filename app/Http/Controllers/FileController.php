<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    public function index()
    {
        $mailInfo = File::select(
            'id',
            'name as fileName',
            'reference_number as mailReference',
            'sender',
            'recipient',
            'category_id as category_id',
            'file_url',
            'upload_date as date',
            'created_at',
            'updated_at',
            'mailType'
        )->get();

        return Inertia::render('LetterList', [
            'mailInfo' => $mailInfo
        ]);
    }

    // In your FileController.php
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

    public function destroy($id)
    {
        // Find the file
        $file = File::findOrFail($id);

        // Optionally delete the file from storage if needed
        // ...

        // Delete the file record
        $file->delete();

        return redirect()->back()->with('message', 'File deleted successfully');
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

}
