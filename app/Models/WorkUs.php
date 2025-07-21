<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkUs extends Model
{
    use \Spatie\Translatable\HasTranslations;

    protected $fillable = [
        'title',
        'content',
        'content_title',
        'footer_content',
        'image',
    ];

    public $translatable = ['title', 'content', 'content_title', 'footer_content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'content_title' => 'array',
        'footer_content' => 'array',
    ];

    protected $guarded = ['id'];


    public function corevesion()
    {
        return $this->morphMany(CoreVesion::class, 'vesionable');
    }
}
