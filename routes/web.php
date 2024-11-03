<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Landing Page

Route::get('/', function () {
    if (Auth::check()) {
        // If the user is authenticated, redirect to the dashboard
        return redirect()->route('dashboard');
    }
    // If the user is not authenticated, render the landing page
    return Inertia\Inertia::render('LandingPage');
});

// Protected Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/fileupload', function () {
        return Inertia\Inertia::render('FileUpload');
    });

    // Letter List Route
    Route::get('/letterlist', [FileController::class, 'index'])->name('letterlist');

    // File CRUD Routes
    Route::put('/files/{id}', [FileController::class, 'update'])->name('files.update');
    Route::delete('/files/{id}', [FileController::class, 'destroy'])->name('files.destroy');
    Route::post('/files/{id}/change-file', [FileController::class, 'changeFile'])->name('files.change-file');
    Route::post('/change-file/{id}', [FileUploadController::class, 'changeFile']);


    // Category Routes
    Route::post('/add-category', [FileController::class, 'addCategory'])->name('category.add');
    Route::get('/api/categories', [FileUploadController::class, 'getCategories'])->name('categories.get');

    // File Upload Endpoints (Existing)
    Route::post('/file-upload', [FileUploadController::class, 'store'])->name('file.upload.store');
    
});

// Auth Routes
require __DIR__ . '/auth.php';
