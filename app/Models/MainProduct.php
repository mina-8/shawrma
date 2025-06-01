<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainProduct extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'solve_brands_id',
        'title',
        'content',
        'color',
        'icon',
        'image',
        'slug'
    ];
    public $translatable = ['title', 'content', 'slug'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'slug' => 'array',
    ];

    protected $guarded = ['id'];

    public function products(){
        return $this->hasMany(Product::class , 'mainproduct_id');
    }

    public function solvebrand(){
        return $this->belongsTo(SolveBrand::class , 'solve_brands_id');
    }
}
