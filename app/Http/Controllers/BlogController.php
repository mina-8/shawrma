<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(string $lang, string $slug)
    {
        // Step 1: Find blog by checking all translated slugs
        $blog = Blog::where("slug->$lang" , $slug)->first();
        // Step 2: Handle not found
        if (!$blog) {
            abort(404);
        }

        $slugs = $blog->getTranslations('slug');
        // Step 4: Prepare translated blog data
        $blogData = [
            'id' => $blog->id,
            'title' => $blog->getTranslation('title', $lang),
            'content' => $blog->getTranslation('content', $lang),
            'image' => Storage::url($blog->image),
            'created_at' => $blog->created_at,
            'updated_at' => $blog->updated_at,
        ];

        return Inertia::render('Welcome/OurNews/Show', ['blog' => $blogData, 'slugs' => $slugs]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
