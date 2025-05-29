<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurBrand extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'banner',
        'header_title',
        'title',
        'content',
        'color',
        'image',
        'pdf',
        'slug'
    ];
    public $translatable = ['header_title', 'title', 'content', 'slug'];
    protected $casts = [
        'header_title' => 'array',
        'title' => 'array',
        'content' => 'array',
        'slug' => 'array',
    ];
    protected $guarded = ['id'];
        public function factsAndNumbers()
    {
        return $this->morphMany(FactNumber::class, 'factable');
    }


    public function corestation()
    {
        return $this->morphMany(CoreStation::class , 'stationable');
    }

}
