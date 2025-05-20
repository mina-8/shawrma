<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Home;
use App\Models\MainProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appLang = app()->getLocale(); // 'en' or 'ar'

        $blogs = Blog::latest()
            ->take(4)
            ->get()
            ->map(function ($blog) use ($appLang) {
                $title = $blog->getTranslation('title', $appLang);
                $content = $blog->getTranslation('content', $appLang);
                $slug = $blog->getTranslation('slug', $appLang);
                $image = Storage::url($blog->image);

                return [
                    'id' => $blog->id,
                    'title' => $title,
                    'content' => $content,
                    'image' => $image,
                    'slug' => $slug
                ];
            });


        return Inertia::render('Welcome', [
            'blogs' => $blogs,
            
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Home $home)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Home $home)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Home $home)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Home $home)
    {
        //
    }
}
