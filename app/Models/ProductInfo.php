<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductInfo extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'nav_title',
        'title',
        'content',
        'image',
        'slug'
    ];
    public $translatable = ['nav_title', 'title' , 'content', 'slug'];

    protected $casts = [
        'nav_title' => 'array',
        'title' => 'array',
        'content' => 'array',
        'slug' => 'array',
    ];

    protected $guarded = ['id'];


    public function corestation()
    {
        return $this->morphMany(CoreStation::class , 'stationable');
    }

}
