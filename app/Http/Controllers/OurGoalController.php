<?php

namespace App\Http\Controllers;

use App\Models\OurGoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OurGoalController extends Controller
{
    public function index()
    {
        $appLang = app()->getLocale();

        $ourgoal = OurGoal::first();

        if (!$ourgoal) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $corestations = [];
        $productvideo = [];

        if ($ourgoal && $ourgoal->corestation !== null) {
            $corestations = $ourgoal->corestation->map(function ($corestation) use ($appLang) {
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title', $appLang),
                    'content' => $corestation->getTranslation('content', $appLang),
                    'image' => Storage::url($corestation->image),
                ];
            });
        }

        // product video
        if($ourgoal && $ourgoal->productvideo !== null ){
            $productvideo = $ourgoal->productvideo->map(function ($product) use($appLang){
                return [
                    'id' => $product->id,
                    'image' => Storage::url($product->image),
                    'youtube_link' => $product->youtube_link,

                ];
            });
        }

        $dataOurGoal = [
            'id' => $ourgoal->id,
            'title' => $ourgoal->getTranslation('title' , $appLang),
            'content' => $ourgoal->getTranslation('content' , $appLang),
            'color' => $ourgoal->color,
            'corestations' => $corestations,
            'productvideo' => $productvideo
        ];

        return Inertia::render('Welcome/OurGoal/Index', ['ourgoal' => $dataOurGoal]);

    }
}
