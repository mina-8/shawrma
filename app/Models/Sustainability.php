<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sustainability extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'banner',
        'title',
        'content',
        'image',
        'pdf'
    ];

    public $translatable = ['title' , 'content', 'slug'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'slug' => 'array',
    ];

    protected $guarded = ['id'];

    public function corestation()
    {
        return $this->morphMany(CoreStation::class , 'stationable');
    }

    public function corevesion()
    {
        return $this->morphMany(CoreVesion::class , 'vesionable');
    }
}
