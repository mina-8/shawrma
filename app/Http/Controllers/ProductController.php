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



}
