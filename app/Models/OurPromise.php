<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurPromise extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'description',
        'content',
        'footer_title',
        'image',
        'slug'
    ];
    public $translatable = ['title', 'description', 'content', 'footer_title' , 'slug'];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'content' => 'array',
        'footer_title' => 'array',
        'slug' => 'array',
    ];

    protected $guarded = ['id'];


    public function corestory()
    {
        return $this->morphMany(CoreStory::class , 'storyable');
    }

    public function coresustainability(){
        return $this->morphMany(CoreSustainability::class , 'sustainable');
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
