<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use App\Models\OurRegionalOffice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appLang = app()->getLocale();

        $ourregionaloffice = OurRegionalOffice::latest()->get()
            ->map(function ($ourregionl) use ($appLang) {
                return [
                    'id' => $ourregionl->id,
                    'state' => $ourregionl->getTranslation('state', $appLang),
                    'address' => $ourregionl->getTranslation('address', $appLang),
                    'mailbox' => $ourregionl->mailbox,
                    'phone' => $ourregionl->phone,
                    'email' => $ourregionl->email
                ];
            });

        return Inertia::render('Welcome/ContactUs/Index', ['ourregionalOffice' => $ourregionaloffice]);
    }

    public function store(string $lang, Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:inquiry,complaint,comments',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'message' => 'required|string|max:2000',
        ]);

        ContactUs::create($validated);

        return redirect()->back()->with('success', 'Your message has been sent.');
    }
}
