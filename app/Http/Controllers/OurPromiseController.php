<?php

namespace App\Http\Controllers;

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

        $corevesions = [];
        $corestations = [];
        $corestories = [];


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

        // core story
        if($ourpromise && $ourpromise->corestory !== null){
            $corestories = $ourpromise->corestory->map(function ($corestory) use($appLang){
                return[
                    'id' => $corestory->id,
                    'title'=> $corestory->getTranslation('title' , $appLang),
                    'youtube_link' => $corestory->youtube_link
                ];
            });
        }

        $dataOurPromise = [
            'id' => $ourpromise->id,
            'title' => $ourpromise->getTranslation('title' , $appLang),
            'content' => $ourpromise->getTranslation('content' , $appLang),
            'banner' => Storage::url($ourpromise->banner),
            'image' => Storage::url($ourpromise->image),
            'corevesions' => $corevesions,
            'corestations' => $corestations,
            'corestories' => $corestories
        ];

        return Inertia::render('Welcome/OurPromise/Index' , ['ourpromise'=>$dataOurPromise]);
    }
}
