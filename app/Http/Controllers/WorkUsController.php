<?php

namespace App\Http\Controllers;

use App\Models\WorkUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WorkUsController extends Controller
{
    public function index(){
        $appLang = app()->getLocale();

        $workus = WorkUs::first();
        if(!$workus){
            abort(404);
        }

        $corevesion = [];
        $corestation = [];

        //station
        // vesions
        if($workus && $workus->corevesion !== null ){
            $corevesions = $workus->corevesion->map(function ($corevesion) use($appLang){
                return [
                    'id' => $corevesion->id,
                    'title' => $corevesion->getTranslation('title' , $appLang),
                    'content' => $corevesion->getTranslation('content' , $appLang),
                    'image' => Storage::url($corevesion->image)
                ];
            });
        }

        // stations
        if($workus && $workus->corestation !== null ){
            $corestations =  $workus->corestation->map(function ($corestation) use($appLang){
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title' , $appLang),
                    'content' => $corestation->getTranslation('content' , $appLang),
                    'image' => Storage::url($corestation->image)
                ];
            });
        }
        $dataWorkUs = [
            'id' => $workus->id,
            'banner' => Storage::url($workus->banner),
            'header_title' => $workus->getTranslation('header_title' , $appLang),
            'header_content' => $workus->getTranslation('header_content' , $appLang),
            'content' => $workus->getTranslation('content' , $appLang),
            'title' => $workus->getTranslation('title' , $appLang),
            'corevesions' => $corevesions,
            'corestations' => $corestations
        ];
        return Inertia::render('Welcome/WorkUs/Index' , ['workus'=>$dataWorkUs]);
    }
}
