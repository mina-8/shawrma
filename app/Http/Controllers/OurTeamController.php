<?php

namespace App\Http\Controllers;

use App\Models\OurTeam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OurTeamController extends Controller
{
    public function index()
    {
        $appLang = app()->getLocale();

        $ourteam = OurTeam::first();

        if(!$ourteam) {
            return inertia('Welcome/NotFound/NotFound');
        }

        $corevesions = [];
        if ($ourteam && $ourteam->corevesion !== null) {
            $corevesions = $ourteam->corevesion->map(function ($corevesion) use ($appLang) {
                return [
                    'id' => $corevesion->id,
                    'title' => $corevesion->getTranslation('title', $appLang),
                    'content' => $corevesion->getTranslation('content', $appLang),
                    'image' => Storage::url($corevesion->image),
                ];
            });
        }

        $dataourteam = [
            'id' => $ourteam->id,
            'banner' => $ourteam->banner=== null ? null : Storage::url($ourteam->banner),
            'title' => $ourteam->getTranslation('title', $appLang),
            'content' => $ourteam->getTranslation('content', $appLang),
            'image' => Storage::url($ourteam->image),
            'corevesions' => $corevesions,
        ];

        return inertia('Welcome/OurTeam/Index', ['ourteam' => $dataourteam]);
    }
}
