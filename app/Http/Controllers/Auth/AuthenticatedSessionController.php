<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        // Check if authentication succeeds
        if (!$request->authenticate()) {
            // Log an explicit message for debugging purposes
            \Log::info('Authentication failed. Returning validation error.');

            // Use Inertia's `Inertia::render` to ensure the response is Inertia-compatible
            return Inertia::render('Auth/Login', [
                'errors' => [
                    'login' => 'Invalid username or password. Please try again.',
                ]
            ])->withViewData(['errors' => session('errors')]); // Force Inertia to recognize the errors

            // Alternatively, throw a ValidationException if the above doesn't work
        }

        // Regenerate session and proceed on successful authentication
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}