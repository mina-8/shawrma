<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function index(){
        $appLang = app()->getLocale();
        $blogs = Blog::latest()->get()->map(function ($blog) use($appLang){
            return [
                'id'=>$blog->id,
                'title' => $blog->getTranslation('title' , $appLang),
                'content' => $blog->getTranslation('content' , $appLang),
                'image' => Storage::url($blog->image),
                'slug' => $blog->getTranslation('slug' , $appLang)
            ];
        });
        return Inertia::render('Welcome/OurNews/Index' , ['blogs'=>$blogs]);
    }
    public function show(string $lang, string $slug)
    {
        // Step 1: Find blog by checking all translated slugs
        $blog = Blog::where("slug->$lang" , $slug)->first();
        // Step 2: Handle not found
        if (!$blog) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $slugs = $blog->getTranslations('slug');

        $otherblogs = Blog::whereNot('id' , $blog->id)
        ->latest()
        ->get()

                            ->take(6)
                            ->map(function ($blog) use($lang){
                                return [
                                    'id' => $blog->id,
                                    'title' => $blog->getTranslation('title' , $lang),
                                    'content' => $blog->getTranslation('content' , $lang),
                                    'image' => Storage::url($blog->image),
                                    'slug' => $blog->getTranslation('slug' , $lang)
                                ];
                            });
        // Step 4: Prepare translated blog data
        $blogData = [
            'id' => $blog->id,
            'title' => $blog->getTranslation('title', $lang),
            'content' => $blog->getTranslation('content', $lang),
            'image' => Storage::url($blog->image),
            'created_at' => $blog->created_at,
            'updated_at' => $blog->updated_at,
        ];

        return Inertia::render('Welcome/OurNews/Show', ['blog' => $blogData , 'otherblogs'=>$otherblogs, 'slugs' => $slugs]);
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
