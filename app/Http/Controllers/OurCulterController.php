<?php

namespace App\Http\Controllers;

use App\Models\OurCulter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OurCulterController extends Controller
{
    public function index(){
        $appLang = app()->getLocale();
        $ourculter = OurCulter::first();
        if(!$ourculter){
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $corevesions = [];
        $corestations = [];

        // vesions
        if($ourculter && $ourculter->corevesion !== null ){
            $corevesions = $ourculter->corevesion->map(function ($corevesion) use($appLang){
                return [
                    'id' => $corevesion->id,
                    'title' => $corevesion->getTranslation('title' , $appLang),
                    'content' => $corevesion->getTranslation('content' , $appLang),
                    'image' => Storage::url($corevesion->image)
                ];
            });
        }

        // stations
        if($ourculter && $ourculter->corestation !== null ){
            $corestations =  $ourculter->corestation->map(function ($corestation) use($appLang){
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title' , $appLang),
                    'content' => $corestation->getTranslation('content' , $appLang),
                    'image' => Storage::url($corestation->image)
                ];
            });
        }
        $dataOurCulter = [
            'id' => $ourculter->id,
            'title' => $ourculter->getTranslation('title' , $appLang),
            'description' => $ourculter->getTranslation('description' , $appLang),
            'content' => $ourculter->getTranslation('content' , $appLang),
            'banner' => $ourculter->banner === null ? null : Storage::url($ourculter->banner),
            'image' => Storage::url($ourculter->image),
            'corevesions' => $corevesions,
            'corestations' => $corestations
        ];
        return Inertia::render('Welcome/OurCulter/Index' , ['ourculture'=>$dataOurCulter]);
    }
}
