<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $lang, string $slug)
    {
        
        $Product = Product::with(['mainproduct', 'usageproduct'])
            ->where("slug->$lang" , $slug)->first();


        if (!$Product) {
            abort(404);
        }

        $slugs = $Product->getTranslations('slug');
        $productData = [
            'id' => $Product->id,
            'title' => $Product->getTranslation('title', $lang),
            'content' => $Product->getTranslation('content', $lang),
            'uses' => $Product->getTranslation('uses', $lang),
            'advantages' => $Product->getTranslation('advantages', $lang),
            'image' => Storage::url($Product->image),
            'pdf' => Storage::url($Product->pdf),
            'special' => $Product->special,
            'usageproduct' => $Product->usageproduct->map(function ($item) use ($lang) {
                return [
                    'id' => $item->id,
                    'title' => $item->getTranslation('title', $lang),
                    'content' => $item->getTranslation('content', $lang)
                ];
            })
        ];

        return Inertia::render('Welcome/Product/Show', ['product' => $productData , 'slugs'=>$slugs]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
