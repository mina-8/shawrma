<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'main_title',
        'title',
        'content',
        'image',
        'slug'
    ];
    public $translatable = ['main_title', 'title', 'content', 'slug'];

    protected $casts = [
        'main_title' => 'array',
        'title' => 'array',
        'content' => 'array',
        'slug' => 'array',
    ];

    protected $guarded = ['id'];

    public function factsAndNumbers()
    {
        return $this->morphMany(FactNumber::class, 'factable');
    }
}
