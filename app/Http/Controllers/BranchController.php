<?php

namespace App\Http\Controllers;

use App\Models\Bransh;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function index(){
        $branches = Bransh::get()
        ->map(function($branch){
            return  [
                'id' => $branch->id,
                'content' => $branch->content,
                'map' => $branch->map,
                'video' => $branch->video ? Storage::url($branch->video) : null
            ];
        });

        return Inertia::render('Welcome/Branch/Index' , ['branches'=> $branches]);
    }
}
