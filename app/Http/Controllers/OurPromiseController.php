<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\CoreStory;
use App\Models\FactNumber;
use App\Models\OurPromise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OurPromiseController extends Controller
{

    public function index(){
        $appLang = app()->getLocale();
        $ourpromise = OurPromise::first();

        if(!$ourpromise){
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $corestories = [];
        $coresustainability = [];
        $corevesions = [];
        $corestations = [];


        // core story
        if($ourpromise && $ourpromise->corestory !== null){
            $corestories = $ourpromise->corestory->map(function ($corestory) use($appLang){
                return[
                    'id' => $corestory->id,
                    'title'=> $corestory->getTranslation('title' , $appLang),
                    // 'image' => Storage::url($corestory->image)
                    'image' => $corestory->image
                ];
            });
        }

        // core sustainability
        if($ourpromise && $ourpromise->coresustainability !== null){
            $coresustainability = $ourpromise->coresustainability->map(function ($coresustain) use($appLang){
                return[
                    'id' => $coresustain->id,
                    'title'=> $coresustain->getTranslation('title' , $appLang),
                    'content' => $coresustain->getTranslation('content' , $appLang),
                    'color' => $coresustain->color,
                    'image' => Storage::url($coresustain->image)
                ];
            });
        }

        // vesions
        if($ourpromise && $ourpromise->corevesion !== null ){
            $corevesions = $ourpromise->corevesion->map(function ($corevesion) use($appLang){
                return [
                    'id' => $corevesion->id,
                    'title' => $corevesion->getTranslation('title' , $appLang),
                    'content' => $corevesion->getTranslation('content' , $appLang),
                    'image' => Storage::url($corevesion->image)
                ];
            });
        }

        // core station
        if($ourpromise && $ourpromise->corestation !== null){
            $corestations = $ourpromise->corestation->map(function ($corestation) use($appLang){
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title' , $appLang),
                    'content' => $corestation->getTranslation('content' , $appLang),
                    'image' => Storage::url($corestation->image)
                ];
            });
        }

        $ourNews = Blog::latest()
                    ->limit(3)
                    ->get()
                    ->map(function ($news) use($appLang){
                        return [
                            'id' => $news->id,
                            'title' => $news->getTranslation('title' , $appLang),
                            'image' => Storage::url($news->image),
                            'slug' => $news->getTranslation('slug' , $appLang)
                        ];
                    });


        $dataOurPromise = [
            'id' => $ourpromise->id,
            'title' => $ourpromise->getTranslation('title' , $appLang),
            'description' => $ourpromise->getTranslation('description' , $appLang),
            'content' => $ourpromise->getTranslation('content' , $appLang),
            'footer_title' => $ourpromise->getTranslation('footer_title' , $appLang),
            'image' => Storage::url($ourpromise->image),
            'corestories' => $corestories,
            'coresustains' => $coresustainability,
            'corevesions' => $corevesions,
            'corestations' => $corestations,
            'news' => $ourNews
        ];

        return Inertia::render('Welcome/OurPromise/Index' , ['ourpromise'=>$dataOurPromise]);
    }


    public function show(string $lang , string $id){
        $pdf = CoreStory::find($id);
        if(!$pdf){
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        return response()->file(Storage::disk('public')->path($pdf->image));
    }
}
