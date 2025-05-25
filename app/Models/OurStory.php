<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurStory extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'banner',
        'title',
        'description',
        'content',
        'image',
        'slug'
    ];
    public $translatable = ['title' , 'description', 'content', 'slug'];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'content' => 'array',
        'slug' => 'array',
    ];

    protected $guarded = ['id'];

    public function factsandnumbers()
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

}
