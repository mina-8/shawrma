<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\FactNumber;
use App\Models\Home;
use App\Models\MainProduct;
use App\Models\OurImpact;
use App\Models\Slide;
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

        // Slides
        $slides = Slide::get()
            ->map(function ($slide) use ($appLang) {
                $title = $slide->getTranslation('title', $appLang);
                $content = $slide->getTranslation('content', $appLang);
                $image = Storage::url($slide->image);
                $str_btn = $slide->getTranslation('str_btn', $appLang);
                return [
                    'id' => $slide->id,
                    'title' => $title,
                    'content' => $content,
                    'image' => $image,
                    'str_btn' => $str_btn,
                    'link' => $slide->link
                ];
            });

        // Blogs
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

        // facts and number
        $factsandnumber = FactNumber::whereNull('factable_type')
            ->get()
            ->map(function ($factnumber) use ($appLang) {
                return [
                    'id' => $factnumber->id,
                    'title' => $factnumber->getTranslation('title', $appLang),
                    'number' => $factnumber->number,
                    'image' => Storage::url($factnumber->image)
                ];
            });
        // our impact
        $ourimpacts = OurImpact::latest()
            ->take(5)
            ->get()
            ->map(function ($ourimpact) use ($appLang) {
                return [
                    'id' => $ourimpact->id,
                    'title' => $ourimpact->getTranslation('title', $appLang),
                    'content' => $ourimpact->getTranslation('content', $appLang),
                    'image' => Storage::url($ourimpact->image),
                    'slug' => $ourimpact->getTranslation('slug', $appLang)
                ];
            });

        return Inertia::render('Welcome', [
            'slides' => $slides,
            'blogs' => $blogs,
            'factnumbers' => $factsandnumber,
            'ourimpacts' => $ourimpacts
        ]);
    }
}
