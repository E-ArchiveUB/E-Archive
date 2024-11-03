<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Category;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Total counts
        $totalMails = File::count();
        $incomingMails = File::where('mailType', 'incoming')->count();
        $outgoingMails = File::where('mailType', 'outgoing')->count();

        // Categories with mail counts
        $categories = Category::withCount('files')->get();

        return Inertia::render('Dashboard', [
            'totalMails' => $totalMails,
            'incomingMails' => $incomingMails,
            'outgoingMails' => $outgoingMails,
            'categories' => $categories,
        ]);
    }
}
