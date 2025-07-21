<?php

namespace App\Http\Controllers;

use App\Models\JobAd;
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
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $corevesions = [];

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


        $dataWorkUs = [
            'id' => $workus->id,
            'title' => $workus->getTranslation('title' , $appLang),
            'content' => $workus->getTranslation('content' , $appLang),
            'image' => Storage::url($workus->image),
            'content_title' => $workus->getTranslation('content_title' , $appLang),
            'footer_content' => $workus->getTranslation('footer_content' , $appLang),
            'corevesions' => $corevesions,

        ];
        return Inertia::render('Welcome/WorkUs/Index' , ['workus'=>$dataWorkUs]);
    }

    public function show(string $lang , string $slug){

        $jobad = JobAd::where("slug->$lang", $slug)->first();

        if(!$jobad){
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $slugs = $jobad->getTranslations('slug');

        $dataJobAd = [
            'title' => $jobad->getTranslation('title', $lang),
            'content' => $jobad->getTranslation('content', $lang),
            'image' => $jobad->image === null ? null : Storage::url($jobad->image),
            'slug' => $jobad->slug,
        ];

        return Inertia::render('Welcome/WorkUs/Show', ['jobad' => $dataJobAd , 'slugs' => $slugs]);
    }
}
