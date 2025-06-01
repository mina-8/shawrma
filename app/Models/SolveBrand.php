<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolveBrand extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'banner',
        'title',
        'slug'
    ];
    public $translatable = ['title' , 'slug'];

    protected $casts = [
        'title' => 'array',
        'slug' => 'array'
    ];

    protected $guarded = ['id'];

    public function mainproducts(){
        return $this->hasMany(MainProduct::class , 'solve_brands_id');
    }
}
