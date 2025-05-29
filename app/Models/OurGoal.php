<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurGoal extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'color',
        'slug'
    ];
    public $translatable = ['title', 'content' , 'slug'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'slug' => 'array'
    ];

    protected $guarded = ['id'];

    public function corestation()
    {
        return $this->morphMany(CoreStation::class , 'stationable');
    }
    public function productvideo()
    {
        return $this->morphMany(ProductVideo::class , 'productvideoable');
    }
}
