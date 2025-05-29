<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Innovation extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'title',
        'content',
        'banner',
    ];
    public $translatable = ['title', 'content'];
    protected $casts = [
        'title' => 'array',
        'content' => 'array',
    ];
    protected $guarded = ['id'];
    public function corestation()
    {
        return $this->morphMany(CoreStation::class, 'stationable');
    }
    public function corevesion()
    {
        return $this->morphMany(CoreVesion::class, 'vesionable');
    }
}
