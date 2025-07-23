<?php

namespace App\Http\Controllers;

use App\Models\Product;
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


                $image = Storage::url($slide->image);

                return [
                    'id' => $slide->id,


                    'image' => $image,



                ];
            });

        $product = Product::get()
            ->map(function ($slide) use ($appLang) {
                $title = $slide->title;
                $content = $slide->conttent;
                $image = Storage::url($slide->image);
                $price = $slide->price;;
                return [
                    'id' => $slide->id,
                    'title' => $title,
                    'content' => $content,
                    'image' => $image,

                    'price' => $price,

                ];
            });

        return Inertia::render('Welcome', [
            'slides' => $slides,
            'proudct' => $product
        ]);
    }

    public function servay(){
        return Inertia::render('Welcome/Servay/Servay');
    }
}
