<?php

namespace App\Http\Controllers;

use App\Models\Sustainability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SustainabilityController extends Controller
{
    public function index(){
        $appLang = app()->getLocale();

        $Sustainability = Sustainability::first();

        if(!$Sustainability){
            abort(404);
        }

        $corestations = [];
        $corevesions = [];

        if($Sustainability && $Sustainability->corestation !== null ){
            $corestations = $Sustainability->corestation->map(function ($corestation) use($appLang){
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title' , $appLang),
                    'content' => $corestation->getTranslation('content' , $appLang),
                    'image' => Storage::url($corestation->image)
                ];
            });
        }

        if($Sustainability && $Sustainability->corevesion !== null){
            $corevesions = $Sustainability->corevesion->map(function ($corevesion) use($appLang){
                return [
                    'id'=> $corevesion->id,
                    'title' => $corevesion->getTranslation('title' , $appLang),
                    'content' => $corevesion->getTranslation('content' , $appLang),
                    'image' => Storage::url($corevesion->image)
                ];
            });
        }

        $dataSustainability = [
            'id' => $Sustainability->id,
            'title' => $Sustainability->getTranslation('title' , $appLang),
            'content' => $Sustainability->getTranslation('content' , $appLang),
            'banner' => Storage::url($Sustainability->banner),
            'image' => Storage::url($Sustainability->image),
            'pdf' => Storage::url($Sustainability->pdf),
            'corestations' => $corestations,
            'corevesions' => $corevesions
        ];


        return Inertia::render('Welcome/Sustainability/Index' , ['sustainability'=> $dataSustainability]);
    }
}
