<?php

namespace App\Http\Controllers;

use App\Models\BuildInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BuildInformationController extends Controller
{
    public function index(){

        $appLang = app()->getLocale();
        $buildinfo = BuildInformation::first();

        if(!$buildinfo){
            abort(404);
        }

        $dataBuildInfo = [
            'id' => $buildinfo->id,
            'title' => $buildinfo->getTranslation('title' , $appLang),
            'content' => $buildinfo->getTranslation('content' , $appLang),
            'banner' => Storage::url($buildinfo->banner)
        ];

        return Inertia::render('Welcome/BuildInformation/Index' , ['buildinforamtion'=>$dataBuildInfo]);
    }
}
