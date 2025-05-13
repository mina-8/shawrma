<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class Lang
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $lang = $request->segment(1);
        $supportedLanguages = ['en', 'ar'];
        // Check if the language is supported
        if (in_array($lang, $supportedLanguages)) {
            // Set the locale for the application
            app()->setLocale($lang);
            URL::defaults(['lang' => $lang]); // Set default route parameter to match the locale
        }else{
            // If the language is not supported, redirect to the default language
            return redirect()->to('/en' . $request->getRequestUri());
        }
        // Set the locale for Carbon
        return $next($request);
    }
}
