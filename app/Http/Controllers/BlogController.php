<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\OurBlog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function index()
    {
        $appLang = app()->getLocale();

        $ourteam = OurBlog::first();

        if(!$ourteam) {
            return inertia('Welcome/NotFound/NotFound');
        }

        $blogs = Blog::paginate(5);

        $blogs->getCollection()->transform(function ($blog) use ($appLang){
            return [
                'id' => $blog->id,
                'title' => $blog->getTranslation('title', $appLang),
                'content' => $blog->getTranslation('content', $appLang),
                'youtube_link' => $blog->youtube_link,
                'image' => Storage::url($blog->image),
            ];
        });

        $dataourteam = [
            'id' => $ourteam->id,
            'title' => $ourteam->getTranslation('title', $appLang),
            'content' => $ourteam->getTranslation('content', $appLang),
            'image' => Storage::url($ourteam->image),
            'news' => $blogs,
        ];

        return inertia('Welcome/OurNews/Index', ['ourblog' => $dataourteam]);
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


        $blogData = [
            'id' => $blog->id,
            'title' => $blog->getTranslation('title', $lang),
            'content' => $blog->getTranslation('content', $lang),
            'youtube_link' => $blog->youtube_link,
            'image' => Storage::url($blog->image),
            'created_at' => $blog->created_at,
            'updated_at' => $blog->updated_at,
        ];

        return Inertia::render('Welcome/OurNews/Show', ['blog' => $blogData , 'slugs' => $slugs]);
    }

}
