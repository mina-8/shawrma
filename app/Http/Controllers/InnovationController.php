<?php

namespace App\Http\Controllers;

use App\Models\Innovation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InnovationController extends Controller
{
    public function index()
    {
        $appLang = app()->getLocale();
        $innovation = Innovation::first();
        if (!$innovation) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }
        $corevesions = [];
        $corestations = [];
        // vesions
        if ($innovation && $innovation->corevesion !== null) {
            $corevesions = $innovation->corevesion->map(function ($corevesion) use ($appLang) {
                return [
                    'id' => $corevesion->id,
                    'title' => $corevesion->getTranslation('title', $appLang),
                    'content' => $corevesion->getTranslation('content', $appLang),
                    'image' => Storage::url($corevesion->image)
                ];
            });
        }
        // stations
        if ($innovation && $innovation->corestation !== null) {
            $corestations = $innovation->corestation->map(function ($corestation) use ($appLang) {
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title', $appLang),
                    'content' => $corestation->getTranslation('content', $appLang),
                    'image' => Storage::url($corestation->image),
                ];
            });
        }

        $dataInnovation = [
            'id' => $innovation->id,
            'title' => $innovation->getTranslation('title' , $appLang),
            'content' => $innovation->getTranslation('content' , $appLang),
            'banner' => Storage::url($innovation->banner),
            'image' => Storage::url($innovation->image),
            'corevesions' => $corevesions,
            'corestations' => $corestations
        ];


        return Inertia::render('Welcome/Innovation/Index', ['innovation'=>$dataInnovation]);
    }
}
