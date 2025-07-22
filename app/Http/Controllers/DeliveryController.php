<?php

namespace App\Http\Controllers;

use App\Models\OurDelivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DeliveryController extends Controller
{
    public function index(){
        $appLang = app()->getLocale();
        $ourdelivery = OurDelivery::first();

        if(!$ourdelivery){
            return Inertia::render('Welcome/NotFound/NotFound');
        }


        $corevesions = [];
        $corestations = [];

        // vesions
        if($ourdelivery && $ourdelivery->corevesion !== null ){
            $corevesions = $ourdelivery->corevesion->map(function ($corevesion) use($appLang){
                return [
                    'id' => $corevesion->id,
                    'title' => $corevesion->getTranslation('title' , $appLang),
                    'content' => $corevesion->getTranslation('content' , $appLang),
                    'image' => Storage::url($corevesion->image)
                ];
            });
        }

        // core station
        if($ourdelivery && $ourdelivery->corestation !== null){
            $corestations = $ourdelivery->corestation->map(function ($corestation) use($appLang){
                return [
                    'id' => $corestation->id,
                    'title' => $corestation->getTranslation('title' , $appLang),
                    'content' => $corestation->getTranslation('content' , $appLang),
                    'image' => Storage::url($corestation->image)
                ];
            });
        }



        $dataOurDelivery = [
            'id' => $ourdelivery->id,
            'title' => $ourdelivery->getTranslation('title' , $appLang),
            'content' => $ourdelivery->getTranslation('content' , $appLang),
            'call_us' => $ourdelivery->getTranslation('call_us' , $appLang),
            'shop_link' => $ourdelivery->getTranslation('shop_link' , $appLang),
            'phone' => $ourdelivery->phone,
            'corevesions' => $corevesions,
            'corestations' => $corestations,

        ];

        return Inertia::render('Welcome/OurDelivery/Index' , ['ourdelivery'=>$dataOurDelivery]);
    }
}
