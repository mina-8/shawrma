<?php

namespace App\Http\Controllers;

use App\Models\Contactform;
use App\Models\ContactUs;
use App\Models\OurRegionalOffice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContactUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appLang = app()->getLocale();

        $contact_us = ContactUs::first();

        if(!$contact_us){
            return Inertia::render('Welcome/NotFound/NotFound');
        }


        $datacotantcus = [
            'id' => $contact_us->id,
            'title' => $contact_us->getTranslation('title', $appLang),
            'addres' => $contact_us->addres,
            'phone' => $contact_us->phone,
            'fax' => $contact_us->fax,
            'map' => $contact_us->map,
            'banner' => Storage::url($contact_us->banner),
        ];

        return Inertia::render('Welcome/ContactUs/Index', ['contactus' => $datacotantcus]);
    }

    public function store(string $lang, Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|regex:/^05\d{8}$/|max:10',
            'country' => 'required|string|max:100',
            'message' => 'required|string|max:2000',
        ]);

        Contactform::create($validated);

        return redirect()->back()->with('success', 'Your message has been sent.');
    }
}
