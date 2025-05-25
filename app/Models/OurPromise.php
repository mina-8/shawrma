<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurPromise extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'banner',
        'title',
        'content',
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

    public function factsAndNumbers()
    {
        return $this->morphMany(FactNumber::class, 'factable');
    }

    public function corestory()
    {
        return $this->morphMany(CoreStory::class , 'storyable');
    }

    public function corestation()
    {
        return $this->morphMany(CoreStation::class , 'stationable');
    }
    public function corevesion()
    {
        return $this->morphMany(CoreVesion::class , 'vesionable');
    }
}
