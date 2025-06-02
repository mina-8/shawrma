<?php

namespace App\Http\Controllers;

use App\Models\OurImpact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OurImpactController extends Controller
{


    public function show(string $lang, string $slug)
    {
        $ourimpact = OurImpact::where("slug->$lang", $slug)
            ->first();
        if (!$ourimpact) {
            return Inertia::render('Welcome/NotFound/NotFound');
        }

        $slugs = $ourimpact->getTranslations('slug');
        $ourimpactData = [
            'id' => $ourimpact->id,
            'title' => $ourimpact->getTranslation('title', $lang),
            'content' => $ourimpact->getTranslation('content', $lang),
            'image' => Storage::url($ourimpact->image)
        ];
        return Inertia::render('Welcome/OurImpact/Show', ['ourimpact' => $ourimpactData , 'slugs'=>$slugs]);
    }
}
