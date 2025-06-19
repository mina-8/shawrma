<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkUs extends Model
{
    use \Spatie\Translatable\HasTranslations;

    protected $fillable = [
        'banner',
        'header_title',
        'header_content',
        'title',
        'content'
    ];

    public $translatable = ['header_title', 'header_content', 'title', 'content'];

    protected $casts = [
        'header_title' => 'array',
        'header_content' => 'array',
        'title' => 'array',
        'content' => 'array',
    ];

    protected $guarded = ['id'];

    
    public function corevesion()
    {
        return $this->morphMany(CoreVesion::class, 'vesionable');
    }
}
