<?php

namespace App\Http\Controllers;

use App\Models\MainProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MainProductController extends Controller
{
    public function index(){
        $appLang = app()->getLocale();
        $mainProduct = MainProduct::get()
                                    ->map(function ($mainproduct) use($appLang){
                                        return [
                                            'id' => $mainproduct->id,
                                            'title' => $mainproduct->getTranslation('title' , $appLang),
                                            'content'=> $mainproduct->getTranslation('content' , $appLang),
                                            'link' => $mainproduct->link,
                                            'image' => Storage::url($mainproduct->image),

                                        ];
                                    });


        return Inertia::render('Welcome/MainProduct/Index' , ['mainproduct'=>$mainProduct ]);
    }
   
}
