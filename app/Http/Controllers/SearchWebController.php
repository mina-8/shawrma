<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchWebController extends Controller
{
    public function search(string $lang , Request $request){
        $query = $request->query('search');



        $products = Product::where(function ($q) use($lang , $query){
            $q->where("title->$lang" , 'like' , "%$query%")
            ->orWhere("content->$lang" , 'like' , "%$query%");
        })

        ->limit(10)
        ->get()
        ->map(fn($product) => [
            'type' => 'product',
            'route' => 'product.show',
            'id' => $product->id,
            'title' => $product->getTranslation('title' , $lang),
            'slug' => $product->getTranslation('slug' , $lang),
        ]);

        $blogs = Blog::where(function ($q) use($lang , $query){
            $q->where("title->$lang" , 'like' , "%$query%");
        })
        ->limit(10)
        ->get()
        ->map(fn ($blog) =>
             [
                'type' => 'blog',
                'route' => 'news.show',
                'id' => $blog->id,
                'title' => $blog->getTranslation('title' , $lang),
                'slug' => $blog->getTranslation('slug' , $lang),
            ]
        );
        $results = $products->concat($blogs);

        return Inertia::render('Welcome/SearchWeb/Index' , ['results'=>$results , 'query' => $query]);
    }
}
