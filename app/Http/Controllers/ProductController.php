<?php

namespace App\Http\Controllers;

use App\Models\MainProduct;
use App\Models\Product;
use App\Models\ProductVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{


    public function search(string $lang , Request $request)
    {
        $rules = [
            'product' => 'nullable|string',     // make nullable because may search only by mainproduct
            'mainproduct' => 'nullable|integer', // expect mainproduct id (integer)
        ];

        $validation = Validator::make($request->all(), $rules);

        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validation->errors()
            ], 400);
        }

        $productSearch = $request->input('product');
        $mainproductSearch = $request->input('mainproduct');

        $query = Product::query();

        // Filter by product title if provided
        if (!empty($productSearch)) {

            $query->where("title->$lang", 'LIKE', '%' . $productSearch . '%');
        }

        // Filter by mainproduct_id if provided
        if (!empty($mainproductSearch)) {
            $query->where('mainproduct_id', $mainproductSearch);
        }

        $resultproduct = null;
        $isSearch = !empty($productSearch) || !empty($mainproductSearch);

        if($isSearch){
            $resultproduct = $query->get()->map(function ($product) use ($lang) {
                return [
                    'id' => $product->id,
                    'title' => $product->getTranslation('title', $lang),
                    'description' => $product->getTranslation('description', $lang),
                    'image' => Storage::url($product->image),
                    'slug' => $product->getTranslation('slug', $lang)
                ];
            });
        }

        $mainproducts = MainProduct::all()->map(function ($mainproduct) use ($lang) {
            return [
                'id' => $mainproduct->id,
                'title' => $mainproduct->getTranslation('title', $lang),
                'slug' => $mainproduct->getTranslation('slug', $lang),
            ];
        });

        $products = Product::all()->map(function ($product) use ($lang) {
            return [
                'id' => $product->id,
                'title' => $product->getTranslation('title', $lang),
                'description' => $product->getTranslation('description', $lang),
                'image' => Storage::url($product->image),
                'slug' => $product->getTranslation('slug', $lang)
            ];
        });

        return Inertia::render('Welcome/Product/Search', [
            'searchmainproducts' => $mainproducts,
            'searchproducts' => $products,
            'resultproduct' => $resultproduct
        ]);
    }


    public function video(string $lang) {
        $productvideo = ProductVideo::latest()
        ->whereNull('productvideoable_id')
        ->whereNull('productvideoable_type')
        ->get()->map(function($video){
            return [
                'id'=>$video->id,
                'image' => Storage::url($video->image) ,
                'youtube_link' => $video->youtube_link
            ];
        });
        return Inertia::render('Welcome/Productvideo/Index' , ['productvideo'=>$productvideo]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $lang, string $slug)
    {

        $Product = Product::with(['mainproduct', 'usageproduct'])
            ->where("slug->$lang", $slug)->first();


        if (!$Product) {
            abort(404);
        }

        $slugs = $Product->getTranslations('slug');

        $otherproducts = Product::whereNot("id", $Product->id)
        ->where('mainproduct_id' , $Product->mainproduct_id)
        ->latest()
        ->get()
            ->take(9)
            ->map(function($products) use($lang){
                return [
                    'id' => $products->id,
                    'title' => $products->getTranslation('title' , $lang),
                    'description' => $products->getTranslation('description' , $lang),
                    'image' => Storage::url($products->image),
                    'slug' => $products->getTranslation('slug' , $lang)
                ];
            });

        $productData = [
            'id' => $Product->id,
            'title' => $Product->getTranslation('title', $lang),
            'description' => $Product->getTranslation('description', $lang),
            'content' => $Product->getTranslation('content', $lang),
            'uses' => $Product->getTranslation('uses', $lang),
            'advantages' => $Product->getTranslation('advantages', $lang),
            'color' => $Product->color,
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

        return Inertia::render('Welcome/Product/Show', ['product' => $productData, 'otherproducts'=>$otherproducts , 'slugs' => $slugs]);
    }
}
