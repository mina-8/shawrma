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

        $corevesion = [];



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

        $jobads = JobAd::latest()->get()->map(function ($jobad) use($appLang){
            return [
                'id' => $jobad->id,
                'title' => $jobad->getTranslation('title', $appLang),
                'content' => $jobad->getTranslation('content', $appLang),
                'image' => Storage::url($jobad->image),
                'slug' => $jobad->slug,
            ];
        });

        $dataWorkUs = [
            'id' => $workus->id,
            'banner' => Storage::url($workus->banner),
            'header_title' => $workus->getTranslation('header_title' , $appLang),
            'header_content' => $workus->getTranslation('header_content' , $appLang),
            'content' => $workus->getTranslation('content' , $appLang),
            'title' => $workus->getTranslation('title' , $appLang),
            'corevesions' => $corevesions,
            'jobads' => $jobads,
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
